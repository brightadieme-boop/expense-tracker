export default function MonthPicker({ selectedMonth, setSelectedMonth }) {
    //generates months for the last 12 months
    const months = [];
    const now = new Date();

    for (let i =0; i < 12; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

        months.push({
            label: date.toLocaleString("default", {month: "long", year: "numeric"}),
            value,
        });
    }

    return (
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            marginBottom: "20px",
            marginTop: "10px"
          }}
        >
            {months.map((m) => (
                <option key={m.value} value={m.value}>
                    {m.label}
                </option>
            ))}
        </select>
    );
}