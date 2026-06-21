import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let tasks = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("sync:tasks", tasks);

  socket.on("task:create", (task) => {
    tasks.push(task);
    io.emit("sync:tasks", tasks);
  });

  socket.on("task:delete", (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    io.emit("sync:tasks", tasks);
  });

  socket.on("task:move", ({ id, status }) => {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, status: status } : task,
    );
    io.emit("sync:tasks", tasks);
  });

  socket.on("task:update", (updatedTask) => {
    tasks = tasks.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
    );
    io.emit("sync:tasks", tasks);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(8000, () => console.log("Server running on port 8000"));
