import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseBarChart({ transactionDetails }) {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    calculateExpenseData(transactionDetails);
  }, [transactionDetails]);

  const calculateExpenseData = (details) => {
    const categoryExpenses = {};

    details?.forEach((item) => {
      if (item?.type === "2") {
        if (!categoryExpenses[item?.category]) {
          categoryExpenses[item?.category] = 0;
        }
        categoryExpenses[item.category] += item.amount;
      }
    });

    const data = Object?.keys(categoryExpenses)?.map((category) => ({
      name: category,
      Expenses: categoryExpenses[category],
    }));

    setExpenseData(data);
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer>
        <BarChart data={expenseData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Expenses" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseBarChart;
// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// function ExpenseIncomeBarChart({ transactionDetails }) {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     calculateChartData(transactionDetails);
//   }, [transactionDetails]);

//   const calculateChartData = (details) => {
//     const categoryExpenses = {};
//     const categoryIncome = {};

//     details.forEach((item) => {
//       if (item.type === "2") {
//         if (!categoryExpenses[item.category]) {
//           categoryExpenses[item.category] = 0;
//         }
//         categoryExpenses[item.category] += item.amount;
//       } else {
//         if (!categoryIncome[item.category]) {
//           categoryIncome[item.category] = 0;
//         }
//         categoryIncome[item.category] += item.amount;
//       }
//     });

//     const data = Object.keys(categoryExpenses).map((category) => ({
//       name: category,
//       Expenses: categoryExpenses[category] || 0,
//       Income: categoryIncome[category] || 0,
//     }));

//     setChartData(data);
//   };

//   return (
//     <div style={{ width: "100%", height: "400px" }}>
//       <ResponsiveContainer>
//         <BarChart data={chartData}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="Expenses" fill="#82ca9d" />
//           <Bar dataKey="Income" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default ExpenseIncomeBarChart;
