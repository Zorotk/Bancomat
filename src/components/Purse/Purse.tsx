import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import PurseState from "../../store/PurseState";
import {observer} from "mobx-react-lite";
import styled from "./Purse.module.css";

const Purse = observer(() => {
    function handleOnDragEnd(result: any) {
        if (!result.destination) return;
        const items = Array.from(PurseState.limits);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        PurseState.setLimits(items);
    }

    return (
        <div className={styled.purse}>
            <h2>Кошелек</h2>
            <h2>Доступно средств {PurseState.money}</h2>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                    {(provided, snapshot) => (
                        <ul
                            style={{
                                background: snapshot.isDraggingOver
                                    ? "lightgreen"
                                    : "lightgrey",
                                minHeight: "150px",
                                padding: "11px",
                            }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {PurseState.limits.map(({value, count}, i) => {
                                return (
                                    <Draggable key={value} draggableId={`${value}`} index={i}>
                                        {(provided, snapshot) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <p
                                                    className={styled.money}
                                                    style={{
                                                        background: snapshot.isDragging ? "#ccc" : "white",
                                                    }}
                                                >
                                                    {value} * {count} шт
                                                </p>
                                            </li>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
});

export default Purse;
