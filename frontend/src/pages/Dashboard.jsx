import React, { useEffect, useState } from "react"
import PieChart from "../components/PieChart";
import { Wallet, PieChartIcon, Receipt} from "lucide-react";
import MonthPicker from "../components/MonthPicker";


export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toISOString().slice(0, 7)
    );

    

    //fetch expenses for chart
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await fetch("https://expense-backend-gviv.onrender.com/my-expenses", {
                    headers: {
                        "Content-Type": "application/json", 
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (!res.ok) {
                    console.error("AUTH ERROR:", res.status);
                }

                const data = await res.json();
                setExpenses(data.expenses || []);
            } catch (err) {
                console.error("Error loading chart expenses: ", err);
            }
            setLoading(false);
        };

        fetchExpenses()
    }, []);

    // filter by months
    const filteredExpenses = expenses.filter((exp) => {
        if (!exp.date) return false;
        return exp.date.startsWith(selectedMonth)
    })

    // summary calculations

    //total amounts spent
    const totalAmount = expenses.reduce(
        (sum, exp) => sum +parseFloat(exp.amount),
        0
    );

    // Total spending per category
    const categoryTotals = {}
    expenses.forEach(exp => {
        const amount = parseFloat(exp.amount);
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + amount; 
    });

    //Most expensive category
    const mostExpensiveCategory = Object.keys(categoryTotals).length
     ? Object.keys(categoryTotals).reduce((a, b) => 
          categoryTotals[a] > categoryTotals[b] ? a : b
      )
     : "N/A"; 

    if (loading) return <p>Loading dashboard...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Welcome to your Dashboard, {user.full_name}!</h1>

            <MonthPicker
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />

            <div style={{
                display: "flex",
                gap: "20px",
                margin: "20px 0"
            }}>
                <div style={{
                    flex: 1,
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "15",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    border: "1px solid #eef1f5",
                }}
                >
                    <Wallet size={30} color="#007AFF" />
                    <div>
                        <h4 style={{ margin: 0, color: "#555"}}>Total Spent</h4>
                        <p style={{ margin: 0, fontSize: "20px", fontWeight: "bold"}}>
                            £{totalAmount.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div style={{
                    flex: 1,
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "15",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    border: "1px solid #eef1f5",
                }}
                >
                    <PieChartIcon size={30} color="#FF3B30" />
                    <div>
                        <h4 style={{ margin: 0, color: "#555"}}>Most Expensive Category</h4>
                        <p style={{ margin: 0, fontSize: "20px", fontWeight: "bold"}}>
                            {mostExpensiveCategory}
                        </p>
                    </div>
                </div>


                 <div style={{
                    flex: 1,
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "10",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    border: "1px solid #eef1f5",
                }}
                >
                    <Receipt size={30} color="#34C759" />
                    <div>
                        <h4 style={{ margin: 0, color: "#555"}}>Total Expenses</h4>
                        <p style={{ margin: 0, fontSize: "20px", fontWeight: "bold"}}>
                            {expenses.length}
                        </p>
                    </div>
                </div>



            </div>

            <div className="dashboard-section">
                <h2>Spending Breakdown</h2>

                <div 
                 className="chart-wrapper"
                 style={{
                     width: "400px", 
                     height: "400px",
                     marginTop: "20px"
                    }}
                >
                    <PieChart expenses={expenses}  />
                </div>
            </div>
        </div>
    );
}