import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import ColumnHeader from './columnHeader/ColumnHeader';
import ColumnCard from './columnCard/ColumnCard';

const StyledColumn = styled.div`
	width: 284px;
`;

const StyledColumnContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	margin: 8px 0 0;
`;

const StyledColumnCardCreate = styled.div`
	text-align: center;
	padding: 12px;
	border: 1px solid ${props => props.theme.colors.primary50};
	background: ${props => props.theme.colors.primary10};
	border-radius: 8px;
	cursor: pointer;
`;

const Column = ({ title, tasks, index }) => {
    return (
        <Draggable draggableId={title} index={index}>
            {(provided) => (
                <StyledColumnContent
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <ColumnHeader
                        title={title}
                        quantity={tasks.length}
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
                                            <div
                                                ref={dragProvided.innerRef}
                                                {...dragProvided.draggableProps}
                                                {...dragProvided.dragHandleProps}
                                            >
                                                <ColumnCard task={task} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {dropProvided.placeholder}
                                <StyledColumnCardCreate>
                                    +
                                </StyledColumnCardCreate>
                            </StyledColumnContent>
                        )}
                    </Droppable>
                </StyledColumnContent>
            )}
        </Draggable>
    );
};

export default Column;
