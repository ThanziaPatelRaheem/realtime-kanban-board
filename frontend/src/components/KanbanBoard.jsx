import React, { useEffect, useState } from "react";
import TaskChart from "./TaskChart";
import { socket } from "../socket.js";
import { useRef } from "react";
import TaskCard from "./TaskCard.jsx";
import CustomSelect from "./CustomSelect.jsx";
import DropColumn from "./DropColumn.jsx";
import { ImSpinner9 } from "react-icons/im";

function KanbanBoard() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("Feature");
  const [editTask, setEditTask] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fileError, setFileError] = useState("");

  const fileInputRef = useRef(null);

  const todoCount = list.filter((item) => item.status === "todo").length;
  const inProgressCount = list.filter(
    (item) => item.status === "inprogress",
  ).length;
  const doneCount = list.filter((item) => item.status === "done").length;
  const totalTasks = list.length;
  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((doneCount / totalTasks) * 100);

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const categoryOptions = [
    { value: "Bug", label: "Bug" },
    { value: "Feature", label: "Feature" },
    { value: "Enhancement", label: "Enhancement" },
  ];

  function addTask(e) {
    e.preventDefault();

    if (!task.trim()) {
      return;
    }
    const newTask = {
      id: Date.now(),
      title: task,
      description,
      status: "todo",
      priority,
      category,
      attachment,
    };
    socket.emit("task:create", newTask);

    setTask("");
    setDescription("");
    setAttachment(null);
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function moveTaskProgress(id, status) {
    socket.emit("task:move", { id, status });
  }

  function deleteTask(id) {
    socket.emit("task:delete", id);
  }

  function updateTask(item) {
    setEditTask(item);
  }
  function saveTask() {
    socket.emit("task:update", editTask);
    setEditTask(null);
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const isFileValid =
      file.type.startsWith("image/") || file.type === "application/pdf";

    if (!isFileValid) {
      setFileError("Only images and PDF's are allowed");
      setAttachment(null);
      e.target.value = "";
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setAttachment({
      name: file.name,
      type: file.type,
      url: fileUrl,
    });

    setFileError("");
  }

  useEffect(() => {
    console.log("Socket Connected");

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    socket.on("sync:tasks", (tasksFromServer) => {
      console.log(tasksFromServer);
      setList(tasksFromServer);
      setLoading(false);
    });

    return () => {
      clearTimeout(timer);
      socket.off("sync:tasks");
    };
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <ImSpinner9 size={40} className="spin" />
      </div>
    );
  }

  return (
    <div className="board-wrapper">
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <CustomSelect
          options={priorityOptions}
          value={priority}
          onChange={setPriority}
          placeholder="Select Priority"
        />
        <CustomSelect
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          placeholder="Select Category"
        />
        <div className="upload-file-wrapper">
          <label htmlFor="file-upload">Upload File</label>
          <input
            id="file-upload"
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </div>

        {fileError && <p className="file-error">{fileError}</p>}

        <button>Add Task</button>
      </form>
      <section className="progress-wrapper">
        <p className="to-do-bg">To Do:{todoCount}</p>
        <p className="in-progress-bg">In Progress: {inProgressCount}</p>
        <p className="done-bg">Done :{doneCount}</p>
        <p className="completion-bg">Completion:{completionPercentage}%</p>
      </section>

      <section className="chart-container">
        <h3>Task Progress Chart</h3>
        {list.length === 0 ? (
          <p className="empty-chart">No tasks available yet</p>
        ) : (
          <TaskChart
            todoCount={todoCount}
            inProgressCount={inProgressCount}
            doneCount={doneCount}
            completionPercentage={completionPercentage}
          />
        )}
      </section>
      <section className="task-columns">
        <DropColumn
          title="To Do"
          status="todo"
          moveTaskProgress={moveTaskProgress}
        >
          <ul>
            {list
              .filter((item) => item.status === "todo")
              .map((item) => (
                <TaskCard
                  key={item.id}
                  item={item}
                  column="todo"
                  editTask={editTask}
                  setEditTask={setEditTask}
                  updateTask={updateTask}
                  saveTask={saveTask}
                  deleteTask={deleteTask}
                  moveTaskProgress={moveTaskProgress}
                  priorityOptions={priorityOptions}
                  categoryOptions={categoryOptions}
                />
              ))}
          </ul>
        </DropColumn>

        <DropColumn
          title="In Progress"
          status="inprogress"
          moveTaskProgress={moveTaskProgress}
        >
          <ul>
            {list
              .filter((item) => item.status === "inprogress")
              .map((item) => (
                <TaskCard
                  key={item.id}
                  item={item}
                  column="inprogress"
                  editTask={editTask}
                  setEditTask={setEditTask}
                  updateTask={updateTask}
                  saveTask={saveTask}
                  deleteTask={deleteTask}
                  moveTaskProgress={moveTaskProgress}
                  priorityOptions={priorityOptions}
                  categoryOptions={categoryOptions}
                />
              ))}
          </ul>
        </DropColumn>

        <DropColumn
          title="Done"
          status="done"
          moveTaskProgress={moveTaskProgress}
        >
          <ul>
            {list
              .filter((item) => item.status === "done")
              .map((item) => (
                <TaskCard
                  key={item.id}
                  item={item}
                  column="done"
                  editTask={editTask}
                  setEditTask={setEditTask}
                  updateTask={updateTask}
                  saveTask={saveTask}
                  deleteTask={deleteTask}
                  moveTaskProgress={moveTaskProgress}
                  priorityOptions={priorityOptions}
                  categoryOptions={categoryOptions}
                />
              ))}
          </ul>
        </DropColumn>
      </section>
    </div>
  );
}

export default KanbanBoard;
