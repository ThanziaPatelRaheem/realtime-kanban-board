import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { fireEvent } from "@testing-library/react";

import KanbanBoard from "../../components/KanbanBoard";

vi.mock("../../socket.js", () => ({
  socket: {
    on: vi.fn((event, callback) => {
      if (event === "sync:tasks") {
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

test("renders Kanban board title", () => {
  renderKanbanBoard();

  expect(screen.getByText(/task progress chart/i)).toBeInTheDocument();
});

test("shows error for invalid file upload", () => {
  renderKanbanBoard();

  const input = screen.getByLabelText(/file/i);

  const file = new File(["hello"], "test.txt", {
    type: "text/plain",
  });

  fireEvent.change(input, {
    target: {
      files: [file],
    },
  });

  expect(
    screen.getByText("Only images and PDF's are allowed"),
  ).toBeInTheDocument();
});
