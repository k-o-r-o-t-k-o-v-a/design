import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { api } from '../../services/api';
import reorder, { reorderQuoteMap } from '../../services/dnd';

import Column from '../../components/column/Column';
import BaseLayout from '../../layout/BaseLayout';

const StyledSection = styled.section`
	flex: 1 0 calc(100vw - 272px);
	max-width: 100%;
	width: calc(100vw - 272px);
	overflow-y: auto;
	margin: 32px 0;
`;

const StyledColumns = styled.div`
	display: flex;
	margin: 0 -10px;
`;

const StyledColumnCreate = styled.div`
	padding: 8px 12px;
	width: 284px;
	min-width: 284px;
	height: 40px;
	border-radius: 8px;
	cursor: pointer;
	text-align: center;
	margin: 0 10px;
	background: ${props => props.theme.colors.primary10};
`;

const BoardsPage = () => {
	const navigate = useNavigate();
	const { workspaceId, boardId } = useParams();

	const { board, boardsData } = useSelector(state => state.boardsSlice)

	const [columns, setColumns] = useState({});
	const [ordered, setOrdered] = useState([])

	const { updateColumnPosition, updateTaskPosition } = api();

	useEffect(() => {
		setColumns(boardsData)
		setOrdered(Object.keys(boardsData))
	}, [boardsData])

	const onDragEnd = (result) => {
		if (result.combine) {
			if (result.type === "COLUMN") {
				const shallow = [...ordered];
				shallow.splice(result.source.index, 1);
				setOrdered(shallow);
				return;
			}

			const column = columns[result.source.droppableId];
			const withQuoteRemoved = [...column];

			withQuoteRemoved.splice(result.source.index, 1);

			const orderedColumns = {
				...columns,
				[result.source.droppableId]: withQuoteRemoved
			};
			setColumns(orderedColumns);
			return;
		}

		// dropped nowhere
		if (!result.destination) {
			return;
		}

		const source = result.source;
		const destination = result.destination;

		// did not move anywhere - can bail early
		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return;
		}

		// reordering column
		if (result.type === "COLUMN") {
			const reorderedorder = reorder(ordered, source.index, destination.index);

			updateColumnPosition({ boardId: boardId, updateColumns: reorderedorder })

			setOrdered(reorderedorder);

			return;
		}

		const data = reorderQuoteMap({
			quoteMap: columns,
			source,
			destination
		});

		updateTaskPosition({ updateTasks: data.updateTasks });
		setColumns(data.quoteMap);
	};

	const handleClickAddColumn = () => {
		navigate(`/workspaces/${workspaceId}/boards/${boardId}/columns/create`)
	}

	return (
		<BaseLayout title={board?.name || 'Доска'}>
			<StyledSection>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable
						droppableId="board"
						type="COLUMN"
						direction="horizontal"
					>
						{(provided) => (
							<StyledColumns
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{ordered.map((key, index) => (
									<Column
										key={key}
										index={index}
										title={key}
										column={columns[key]}
										tasks={columns[key].tasks}
									/>
								))}
								{provided.placeholder}
								<StyledColumnCreate onClick={handleClickAddColumn}>
									+
								</StyledColumnCreate>
							</StyledColumns>
						)}
					</Droppable>
				</DragDropContext>
			</StyledSection>
		</BaseLayout>
	);
};

export default BoardsPage;