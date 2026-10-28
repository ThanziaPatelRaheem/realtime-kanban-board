import React from "react";
import "./TaskChart.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const TaskChart = ({
  todoCount,
  inProgressCount,
  doneCount,
  completionPercentage,
}) => {
  const data = [
    { name: "To Do", value: todoCount },
    { name: "In Progress", value: inProgressCount },
    { name: "Done", value: doneCount },
  ];
  const totalTasks = todoCount + inProgressCount + doneCount;
  const COLORS = [
    "#60a5fa", // To Do
    "#fbbf24", // In Progress
    "#34d399", // Done
  ];

  return (
    <div className="task-progress-chart">
      <div className="chart-main">
        <div className="chart-visual">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>
              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#f8fafc"
                fontSize="26"
                fontWeight="700"
              >
                {totalTasks}
              </text>

              <text
                x="50%"
                y="59%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#94a3b8"
                fontSize="12"
              >
                Total Tasks
              </text>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  color: "#f8fafc",
                }}
                itemStyle={{ color: "#f8fafc" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-insights">
          <h4>Project Health</h4>

          <div className="completion-info">
            <span>Completion progress</span>
            <strong>{completionPercentage}%</strong>
          </div>

          <div
            className="completion-track"
            role="progressbar"
            aria-label="Task completion"
            aria-valuenow={completionPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="completion-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="project-insight">
            <h5>Project Insight</h5>
            <p>
              {totalTasks === 0
                ? "No tasks created yet."
                : doneCount === totalTasks
                  ? "All tasks completed!"
                  : `${todoCount} task(s) waiting to be started, ${inProgressCount} in progress, and ${doneCount} completed.`}
            </p>
          </div>
        </div>
      </div>

      <div className="chart-legend">
        {data.map((entry, index) => (
          <div className="legend-item" key={entry.name}>
            <span
              className="legend-dot"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskChart;
