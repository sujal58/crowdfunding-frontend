import "./TransparencyTable.css";

function TransparencyTable() {
  const transactions = [
    {
      date: "2024-06-20",
      donor: "John Doe",
      amount: "$100.00",
      details: "Online Payment",
    },
    {
      date: "2024-06-19",
      donor: "Maria S.",
      amount: "$50.00",
      details: "Credit Card",
    },
    {
      date: "2024-06-18",
      donor: "Anonymous",
      amount: "$200.00",
      details: "Bank Transfer",
    },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Donor</th>
          <th>Amount</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, index) => (
          <tr key={index}>
            <td>{t.date}</td>
            <td>{t.donor}</td>
            <td>{t.amount}</td>
            <td>{t.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransparencyTable;
