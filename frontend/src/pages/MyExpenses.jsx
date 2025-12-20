import React, { useEffect, useState } from "react";
import MonthPicker from "../components/MonthPicker";

function MyExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

   const [selectedMonth, setSelectedMonth] = useState(
        new Date().toISOString().slice(0, 7)
  );

  // Fetch all expenses
  const getExpenses = async () => {
    try {
      const res = await fetch("https://expense-backend-gviv.onrender.com/my-expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setExpenses(data.expenses);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  // Delete an expense
  const deleteExpense = async (id) => {
    const confirmed = window.confirm("Delete this expense?");
    const token = localStorage.getItem("token");

    if (!confirmed) return;

    try {
      const res = await fetch(`https://expense-backend-gviv.onrender.com/my-expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        alert("Expense deleted");
        setExpenses(expenses.filter((e) => e.id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  if (loading) return <p>Loading...</p>;

   const filteredExpenses = expenses.filter((exp) => {
        if (!exp.date) return false;
        return exp.date.startsWith(selectedMonth)
    })

  return (
    <div className="expenses-container">
      <h1>Your Expenses</h1>

       <MonthPicker
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
       />

      {/* TOTAL SPENDING */}
      <div className="summary-box">
        <h2>Total Spending: £
          {expenses.reduce((total, e) => total + e.amount, 0).toFixed(2)}
        </h2>
      </div>

      {/* EXPENSE TABLE */}
      <table className="expenses-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id} className="fade-row">
              <td>{exp.description}</td>
              <td>£{exp.amount.toFixed(2)}</td>
              <td>
                <span className="tag">{exp.category}</span>
              </td>
              <td>{exp.date}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() =>
                    (window.location.href = `/edit/${exp.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteExpense(exp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default MyExpenses;
