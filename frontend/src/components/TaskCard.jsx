import React from "react";
import CustomSelect from "./CustomSelect";
import { useDrag } from "react-dnd";

const TaskCard = ({
  item,
  column,
  editTask,
  setEditTask,
  updateTask,
  saveTask,
  deleteTask,
  moveTaskProgress,
  priorityOptions,
  categoryOptions,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",

    item: { id: item.id },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <li
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab" }}
      className="task-card"
    >
      <h4> {item.title[0].toUpperCase() + item.title.slice(1)}</h4>
      <p>Description:{item.description}</p>
      <p>Priority: {item.priority}</p>
      <p>Category:{item.category}</p>

      {item.attachment &&
        (item.attachment.type.startsWith("image/") ? (
          <img
            src={item.attachment.url}
            alt={item.attachment.name}
            width="100"
          />
        ) : (
          <p>Attachment :{item.attachment.name}</p>
        ))}

      {column === "todo" && (
        <button onClick={() => moveTaskProgress(item.id, "inprogress")}>
          Move to In Progress
        </button>
      )}

      {column === "inprogress" && (
        <button onClick={() => moveTaskProgress(item.id, "done")}>
          Move to Done
        </button>
      )}
      <button onClick={() => updateTask(item)}>Edit</button>

      {editTask?.id === item.id && (
        <>
          <input
            value={editTask.title}
            onChange={(e) =>
              setEditTask({ ...editTask, title: e.target.value })
            }
          />

          <textarea
            value={editTask.description || ""}
            onChange={(e) =>
              setEditTask({
                ...editTask,
                description: e.target.value,
              })
            }
          />

          <CustomSelect
            options={priorityOptions}
            value={editTask.priority}
            onChange={(value) => setEditTask({ ...editTask, priority: value })}
          />

          <CustomSelect
            options={categoryOptions}
            value={editTask.category}
            onChange={(value) => setEditTask({ ...editTask, category: value })}
          />

          <button onClick={saveTask}>Save</button>
        </>
      )}

      <button onClick={() => deleteTask(item.id)}>Delete</button>
    </li>
  );
};

export default TaskCard;
