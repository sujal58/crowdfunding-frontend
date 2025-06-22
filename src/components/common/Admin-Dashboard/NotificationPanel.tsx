const NotificationPanel: React.FC = () => {
  const notifications = [
    {
      id: 1,
      message:
        "New campaign <strong>Clean Water for All</strong> submitted for approval.",
      unread: true,
    },
    {
      id: 2,
      message: "User <strong>Jane Smith</strong> submitted KYC documents.",
      unread: false,
    },
    {
      id: 3,
      message:
        "Payment of <strong>$2,000</strong> released to <strong>Jane Smith</strong>.",
      unread: false,
    },
  ];

  const handleMarkRead = (id: number) => {
    console.log(`Marked notification ${id} as read`);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`p-4 rounded-xl mb-4 flex justify-between items-center ${
            notif.unread ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
          tabIndex={0}
          aria-live="assertive"
        >
          <div dangerouslySetInnerHTML={{ __html: notif.message }} />
          <button
            onClick={() => handleMarkRead(notif.id)}
            className="text-inherit font-bold hover:underline"
          >
            Mark as read
          </button>
        </div>
      ))}
    </>
  );
};

export default NotificationPanel;
