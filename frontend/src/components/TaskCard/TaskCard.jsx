import React from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import "./TaskCard.css";
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
      <h4 className="task-title">
        {item.title[0].toUpperCase() + item.title.slice(1)}
      </h4>

      <div className="task-description-wrapper">
        <span className="task-description-label">Description</span>
        <p className="task-description">{item.description}</p>
      </div>
      <div className="task-badges">
        <span className={`priority-badge ${item.priority?.toLowerCase()}`}>
          {item.priority} Priority
        </span>

        <span className="category-badge">{item.category}</span>
      </div>

      {item.attachment &&
        (item.attachment.type.startsWith("image/") ? (
          <div className="task-attachment">
            <span className="attachment-label">Attachment</span>

            <img
              src={item.attachment.url}
              alt={item.attachment.name}
              className="attachment-preview"
            />
          </div>
        ) : (
          <div className="task-attachment">
            <span className="attachment-label">Attachment</span>

            <div className="pdf-attachment">
              <span>📄</span>
              <span className="pdf-filename">{item.attachment.name}</span>
            </div>
          </div>
        ))}
      <div className="task-actions">
        {column === "todo" && (
          <button
            className="btn-move"
            onClick={() => moveTaskProgress(item.id, "inprogress")}
          >
            Move to In Progress
          </button>
        )}

        {column === "inprogress" && (
          <button
            className="btn-move"
            onClick={() => moveTaskProgress(item.id, "done")}
          >
            Move to Done
          </button>
        )}
        <button className="btn-edit" onClick={() => updateTask(item)}>
          Edit
        </button>

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
              onChange={(value) =>
                setEditTask({ ...editTask, priority: value })
              }
            />

            <CustomSelect
              options={categoryOptions}
              value={editTask.category}
              onChange={(value) =>
                setEditTask({ ...editTask, category: value })
              }
            />

            <button className="btn-save" onClick={saveTask}>
              Save
            </button>
          </>
        )}

        <button className="btn-delete" onClick={() => deleteTask(item.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskCard;
