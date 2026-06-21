import React from "react";
import { useDrop } from "react-dnd";

const DropColumn = ({ title, status, children, moveTaskProgress }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",

    drop: (draggedItem) => {
      moveTaskProgress(draggedItem.id, status);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <div
      className={`column-wrapper ${status} ${isOver ? "drag-over" : ""}`}
      ref={drop}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
};
export default DropColumn;
