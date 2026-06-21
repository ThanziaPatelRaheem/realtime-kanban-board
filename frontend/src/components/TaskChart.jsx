import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const TaskChart = ({ todoCount, inProgressCount, doneCount }) => {
  const data = [
    { name: "To Do", value: todoCount },
    { name: "In Progress", value: inProgressCount },
    { name: "Done", value: doneCount },
  ];
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];
  return (
    <div className="task-progress-chart">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChart;
