// import React, { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// function SummaryChart({ transactionDetails }) {
//   const [summaryData, setSummaryData] = useState([]);

//   useEffect(() => {
//     calculateSummary(transactionDetails);
//   }, [transactionDetails]);

//   const calculateSummary = (details) => {
//     let totalIncome = 0;
//     let totalExpenses = 0;

//     details.forEach((item) => {
//       if (item.type === "1") {
//         totalIncome += item.amount;
//       } else {
//         totalExpenses += item.amount;
//       }
//     });

//     const currentBalance = totalIncome - totalExpenses;

//     setSummaryData([
//       { name: "Total Income", value: totalIncome },
//       { name: "Total Expenses", value: totalExpenses },
//       { name: "Current Balance", value: currentBalance },
//     ]);
//   };

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <PieChart width={400} height={400}>
//         <Pie
//           data={summaryData}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           label={renderCustomizedLabel}
//           outerRadius={100}
//           innerRadius={20}
//           isAnimationActive={true}
//           fill="#8884d8"
//           dataKey="value"
//         >
//           {summaryData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Legend
//           layout="horizontal"
//           verticalAlign="bottom"
//           align="left"
//           iconType="rect"
//         />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }

// export default SummaryChart;
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#ff82ac"];

const renderLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
  const radius = outerRadius + 20; // Increase the radius to position the labels outside
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <g>
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="14px"
        fontWeight="bold"
      >
        {name}
      </text>
      {/* <text
        x={x}
        y={y + 20}
        fill="#000"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12px"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text> */}
    </g>
  );
};

function SummaryChart({ transactionDetails }) {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    calculateSummary(transactionDetails);
  }, [transactionDetails]);

  const calculateSummary = (details) => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let currentBalance = 0;

    details.forEach((item) => {
      if (item.type === "1") {
        totalIncome += item.amount;
      } else {
        totalExpenses += item.amount;
      }
    });

    currentBalance = totalIncome - totalExpenses;

    setSummaryData([
      { name: "Income", value: totalIncome },
      { name: "Expenses", value: totalExpenses },
      { name: "Balance", value: currentBalance },
    ]);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        {summaryData.every((item) => item.value === 0) ? (
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            0
          </text>
        ) : (
          <Pie
            data={summaryData}
            cx="50%"
            cy="50%"
            labelLine={true} // Enable label lines
            label={renderLabel}
            outerRadius={100}
            innerRadius={0}
            fill="#8884d8"
            dataKey="value"
          >
            {summaryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SummaryChart;
