const MetricsPanel: React.FC = () => {
  return (
    <>
      <h2 className="text-3xl text-center font-extrabold mb-6 text-[#2563eb]">
        Platform Metrics
      </h2>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-4xl font-bold text-blue-600">150</h3>
          <p className="text-gray-500 mt-2">Total Campaigns</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-4xl font-bold text-blue-600">$10,000</h3>
          <p className="text-gray-500 mt-2">Total Donations</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-4xl font-bold text-blue-600">500</h3>
          <p className="text-gray-500 mt-2">Total Users</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-4xl font-bold text-blue-600">25</h3>
          <p className="text-gray-500 mt-2">Pending KYC</p>
        </div>
      </div>
    </>
  );
};

export default MetricsPanel;
