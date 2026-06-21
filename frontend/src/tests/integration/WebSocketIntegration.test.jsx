import { render, screen, fireEvent, act } from "@testing-library/react";
import { expect, vi } from "vitest";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { socket } from "../../socket.js";
import KanbanBoard from "../../components/KanbanBoard";

let syncTasksCallback;

vi.mock("../../socket.js", () => ({
  socket: {
    on: vi.fn((event, callback) => {
      if (event === "sync:tasks") {
        syncTasksCallback = callback;
        callback([]);
      }
    }),
    off: vi.fn(),
    emit: vi.fn(),
  },
}));

function renderKanbanBoard() {
  return render(
    <DndProvider backend={HTML5Backend}>
      <KanbanBoard />
    </DndProvider>,
  );
}

test("emits task:create when user adds a task", () => {
  renderKanbanBoard();

  fireEvent.change(screen.getByPlaceholderText("Enter Task"), {
    target: { value: "Build Kanban Board" },
  });

  fireEvent.click(screen.getByText("Add Task"));

  expect(socket.emit).toHaveBeenCalledWith(
    "task:create",
    expect.objectContaining({ title: "Build Kanban Board", status: "todo" }),
  );
});

test("updates UI when sync:tasks is rendered", async () => {
  renderKanbanBoard();

  act(() => {
    syncTasksCallback([
      {
        id: 1,
        title: "Build Kanban Board",
        description: "Test task",
        status: "todo",
        priority: "High",
        category: "Feature",
        attachment: null,
      },
    ]);
  });

  expect(screen.getByText(/build kanban board/i)).toBeInTheDocument();
  expect(screen.getByText(/test task/i)).toBeInTheDocument();
});
