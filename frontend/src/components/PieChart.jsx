import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ expenses }) {
    if (!Array.isArray(expenses) || expenses.length ===0) {
        return <p>No data to show yet.</p>;
    }

    const categoryTotals = {};

    expenses.forEach((exp) => {
        const amount = parseFloat(exp.amount);
        categoryTotals[exp.category] =
         (categoryTotals[exp.category] || 0) + amount;
    });


    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals),
                backgroundColor: [
                    "#007AFF",
                    "#FF3B30",
                    "#34C759",
                    "#FF9500",
                    "#AF52DE",
                    "#5AC8FA"
                ],
                hoverOffset: 10,
            },
        ],
    };

    const options = {responsive: true, maintainAspectRatio: false,};
    
    return (
        <div style={{ width: "350px", height: "350px", margin: "0 auto"}}>
            <Pie data={data} />;
        </div>
    );
}

