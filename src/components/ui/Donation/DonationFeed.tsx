import "./DonationFeed.css";

function DonationFeed() {
  const donations = [
    { donor: "John", amount: 20, time: "2 min ago" },
    { donor: "Alice", amount: 50, time: "10 min ago" },
    { donor: "Michael", amount: 100, time: "30 min ago" },
    { donor: "Sara", amount: 10, time: "1 hour ago" },
  ];

  return (
    <div className="donation-feed" aria-live="polite" aria-relevant="additions">
      {donations.map((d, index) => (
        <div key={index} className="donation-feed-item">
          {d.donor} donated ${d.amount}, {d.time}
        </div>
      ))}
    </div>
  );
}

export default DonationFeed;
