import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditExpense() {
    const { id } = useParams();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date,setDate] = useState("");

    const token = localStorage.getItem("token");

    // fetch rh existing expense
    useEffect(() => {
        const fetchExpense = async () => {
            const res = await fetch(`http://127.0.0.1:5000/my-expenses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            setDescription(data.expense.description);
            setAmount(data.expense.amount);
            setCategory(data.expense.category);
            setDate(data.expense.date);
        };

        fetchExpense();
    }, [id]);

    // Update handler
    const handleUpdate = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://127.0.0.1:5000/my-expenses/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                description,
                amount: Number(amount),
                category,
                date,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Expense updated!");
            window.location.href = "/my-expenses";
        } else {
            alert("Failed: " + data.detail);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Edit Expense</h2>
            
            <form onSubmit={handleUpdate}>
                <label>Description:</label>
                <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <label>Amount:</label>
                <input
                value={amount}
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                />

                <label>Category:</label>
                <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditExpense; 