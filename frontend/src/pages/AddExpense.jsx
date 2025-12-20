import React, { useState } from "react";

function AddExpense() {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [showCustomCategory, setshowCustomCategory] = useState(false);
    const [customCategory, setCustomCategory] = useState("");
    const [date, setDate] = useState("");


    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
        alert("You must be logged in!");
        window.location.href = "/login"
        return;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

       const finalCategory = category === "other" ? customCategory : category

        const response = await fetch("https://expense-backend-gviv.onrender.com/expenses", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                description,
                amount: Number(amount),
                category: finalCategory,
                date,
            }),
        });

        const result = await response.json();
        console.log("DEBUG ADD EXPENSE RESPONSE:", result);

        if (!response.ok) {
            alert("Error:" + (result?.detail || "Unknown error"));
            return;
        }

        alert("Expense added!");
        setDescription("");
        setAmount("");
        setCategory("");
        setDate("");

         //Redirect
            window.location.href = "/my-expenses";
             return;
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Add Expense</h2>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />

                <label>Category</label>
                <select
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                    if (e.target.value === "other") {
                        setshowCustomCategory(true);
                    } else {
                        setshowCustomCategory(false);
                    }
                }}
                style={{padding: "6px", borderRadius: "6px", marginBottom:"8px" }}
                >
                    <option value="food">Food</option>
                    <option value="shopping">Shopping</option>
                    <option value="transport">Transport</option>
                    <option value="bills">Bills</option>
                    <option value="health">Health</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other (Custom)</option>
                </select>

                {showCustomCategory && (
                 <input
                    type="text"
                    placeholder="Enter custom category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    style={{
                        padding: "8px",
                        borderRadius: "8px",
                        marginBottom: "10px",
                        display: "block"
                    }}
                  />
                )}
            

                <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />

                <button type="submit">Add Expense</button>


            </form>
        </div>
    );
}

export default AddExpense