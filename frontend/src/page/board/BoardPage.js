import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import reorder, { reorderQuoteMap } from '../../services/dnd';

import Column from '../../components/column/Column';
import BaseLayout from '../../layout/BaseLayout';

const StyledSection = styled.section`
	margin: 32px 0 0;
`;

const StyledColumns = styled.div`
	display: flex;
	gap: 20px;
`;

const StyledColumnCreate = styled.div`
	/* display: flex; */
	/* align-items: center; */
	/* justify-content: space-between; */
	padding: 8px 12px;
	width: 284px;
	height: 40px;
	border-radius: 8px;
	cursor: pointer;
	text-align: center;
	margin: 8px 0 0;
	background: ${props => props.theme.colors.primary10};
`;

const initial = {
    'В работе': [
        {
            id: '1',
            title: 'Модуль Сервис 3'
        },
        {
            id: '2',
            title: 'Модуль Сервис 4'
        },
    ],
    'Готово к тестированию': [
        {
            id: '3',
            title: 'Модуль Сервис 3'
        },
        {
            id: '4',
            title: 'Модуль Сервис 4'
        },
    ],
}

const BoardPage = () => {
    const [columns, setColumns] = useState(initial);
    const [ordered, setOrdered] = useState(Object.keys(initial))

    useEffect(() => {
        console.log(columns, ordered)
    }, [columns, ordered])

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

            setOrdered(reorderedorder);

            return;
        }

        const data = reorderQuoteMap({
            quoteMap: columns,
            source,
            destination
        });

        setColumns(data.quoteMap);
    };

    return (
        <BaseLayout title="Tracking Plan">
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
                                        tasks={columns[key]}
                                    />
                                ))}
                                {provided.placeholder}
                                <StyledColumnCreate>+</StyledColumnCreate>
                            </StyledColumns>
                        )}
                    </Droppable>
                </DragDropContext>
            </StyledSection>
        </BaseLayout>
    );
};

export default BoardPage;
