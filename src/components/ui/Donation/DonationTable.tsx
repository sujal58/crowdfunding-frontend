import "./DonationTable.css";

function DonationsTable() {
  const donations = [
    { campaign: "Clean Water for All", date: "2024-06-20", amount: "$100" },
    {
      campaign: "Education for Every Child",
      date: "2024-06-18",
      amount: "$50",
    },
  ];

  return (
    <section aria-labelledby="donationsHeading">
      <h2 id="donationsHeading">My Donations</h2>
      <table aria-label="User donations history">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={index}>
              <td>{donation.campaign}</td>
              <td>{donation.date}</td>
              <td>{donation.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default DonationsTable;
