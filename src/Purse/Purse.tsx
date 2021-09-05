import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import styled from "./Purse.module.css";

const Purse = () => {
  
  const money = [
    { value: 2000, count: 1 },
    { value: 1000, count: 4 },
    { value: 100, count: 2 },
  ];
  const [characters, updateCharacters] = useState(money);
  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  }

  return (
    <div className={styled.purse}>
      <h2>Кошелек</h2>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {characters.map(({ value, count }, i) => {
                return (
                  <Draggable key={value} draggableId={`${value}`} index={i}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p className={styled.money}>
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
};

export default Purse;
