import { useNavigate, useParams } from "react-router-dom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import ColumnHeader from './columnHeader/ColumnHeader';
import ColumnCard from './columnCard/ColumnCard';

const StyledColumn = styled.div`
	width: 284px;
	margin: 0 10px;
`;

const StyledColumnContent = styled.div`
	display: flex;
	flex-direction: column;
	margin: 8px 0 0;
`;

const StyledColumnCardCreate = styled.div`
	text-align: center;
	padding: 12px;
	border-radius: 8px;
	cursor: pointer;
	border: 1px solid ${props => props.theme.colors.primary50};
	background: ${props => props.theme.colors.neutral10};
`;

const StyledCardWrapper = styled.div`
	margin: 0 0 5px;
`

const Column = ({ title, column, tasks, index }) => {
	const navigate = useNavigate()
	const { workspaceId, boardId } = useParams();

	const handleClickAddTasks = (columnId) => {
		navigate(`/workspaces/${workspaceId}/boards/${boardId}/columns/${columnId}/tasks/create`)
	}

	return (
		<Draggable draggableId={title} index={index}>
			{(provided) => (
				<StyledColumn
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					<ColumnHeader
						title={title}
						quantity={tasks?.length || 0}
						{...provided.dragHandleProps}
					/>
					<Droppable
						droppableId={title}
						type="TASK"
					>
						{(dropProvided) => (
							<StyledColumnContent ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
								{tasks.map((task, index) => (
									<Draggable
										key={task.id}
										draggableId={task.id}
										index={index}
									>
										{(dragProvided) => (
											<StyledCardWrapper
												ref={dragProvided.innerRef}
												{...dragProvided.draggableProps}
												{...dragProvided.dragHandleProps}
											>
												<ColumnCard task={task} />
											</StyledCardWrapper>
										)}
									</Draggable>
								))}
								{dropProvided.placeholder}
								<StyledColumnCardCreate onClick={() => handleClickAddTasks(column.id)}>
									+
								</StyledColumnCardCreate>
							</StyledColumnContent>
						)}
					</Droppable>
				</StyledColumn>
			)}
		</Draggable>
	);
};

export default Column;