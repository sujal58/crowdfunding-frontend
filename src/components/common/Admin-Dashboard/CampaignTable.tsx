import React, { useState, useEffect } from "react";

interface data {
  id: number;
  title?: string;
  creator?: string;
  goal?: string;
  status: string;
  submissionDate?: string;
  amount?: string;
  scheduledDate?: string;
  email?: string;
  username?: string;
}

interface CampaignTableProps {
  type: string;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ type }) => {
  const [campaigns, setCampaigns] = useState<data[]>([]);

  useEffect(() => {
    const data: { [key: string]: data[] } = {
      approved: [
        {
          id: 2,
          title: "Education for Every Child",
          creator: "Jane Smith",
          goal: "$15,000",
          status: "Active",
        },
      ],
      unapproved: [
        {
          id: 1,
          title: "Clean Water for All",
          creator: "John Doe",
          goal: "$10,000",
          status: "Pending",
        },
      ],
      suspicious: [
        {
          id: 3,
          title: "Quick Fundraiser",
          creator: "Bob Wilson",
          goal: "$5,000",
          status: "Suspicious",
        },
      ],
      verifiedUsers: [
        {
          id: 2,
          username: "Jane Smith",
          email: "janesmith@test.com",
          status: "Approved",
          submissionDate: "2025-05-08",
        },
      ],
      unverifiedUsers: [
        {
          id: 1,
          username: "Jane Smith",
          email: "janesmith@test.com",
          status: "Pending",
          submissionDate: "2025-05-08",
        },
        {
          id: 3,
          username: "Jane Smith",
          email: "janesmith@test.com",
          status: "Rejected",
          submissionDate: "2025-05-08",
        },
      ],
      releasedFunds: [
        {
          id: 1,
          title: "Education for Every Child",
          creator: "Jane Smith",
          goal: "$2,000",
          status: "Released",
          scheduledDate: "2025-05-12",
        },
        {
          id: 2,
          title: "Education for Every Child",
          creator: "Jane Smith",
          goal: "$1,000",
          status: "Released",
          scheduledDate: "2025-05-05",
        },
      ],
      pendingReleases: [
        {
          id: 1,
          title: "Clean Water for All",
          creator: "John Doe",
          goal: "$1,000",
          status: "Pending",
          scheduledDate: "2025-05-19",
        },
        {
          id: 3,
          title: "Education for Every Child",
          creator: "Jane Smith",
          goal: "$500",
          status: "Held",
          scheduledDate: "2025-05-19",
        },
      ],
    };
    setCampaigns(data[type] || []);
  }, [type]);

  const handleAction = (id: number, action: string, reason?: string | null) => {
    console.log(`Action ${action} on ${type} item ${id}, reason: ${reason}`);
    alert(`${action} successful!`);
  };

  const getActions = (campaign: data) => {
    switch (type) {
      case "unapproved":
        return (
          <>
            <button
              className="table-btn approve-btn"
              onClick={() => handleAction(campaign.id, "Approve")}
            >
              Approve
            </button>
            <button
              className="table-btn reject-btn"
              onClick={() =>
                handleAction(campaign.id, "Reject", prompt("Reason?"))
              }
            >
              Reject
            </button>
            <button
              className="table-btn flag-btn"
              onClick={() =>
                handleAction(campaign.id, "Flag", prompt("Reason?"))
              }
            >
              Flag
            </button>
          </>
        );
      case "approved":
        return (
          <>
            <button
              className="table-btn reject-btn"
              onClick={() =>
                handleAction(campaign.id, "Reject", prompt("Reason?"))
              }
            >
              Reject
            </button>
            <button
              className="table-btn flag-btn"
              onClick={() =>
                handleAction(campaign.id, "Flag", prompt("Reason?"))
              }
            >
              Flag
            </button>
          </>
        );
      case "suspicious":
        return (
          <>
            <button
              className="table-btn approve-btn"
              onClick={() => handleAction(campaign.id, "Approve")}
            >
              Approve
            </button>
            <button
              className="table-btn reject-btn"
              onClick={() =>
                handleAction(campaign.id, "Reject", prompt("Reason?"))
              }
            >
              Reject
            </button>
            <button
              className="table-btn clear-btn"
              onClick={() => handleAction(campaign.id, "Clear")}
            >
              Clear Flag
            </button>
          </>
        );
      case "unverifiedUsers":
      case "verifiedUsers":
        return (
          <button
            className="table-btn view-btn"
            onClick={() => handleAction(campaign.id, "View")}
          >
            View Details
          </button>
        );
      case "pendingReleases":
        return (
          <>
            <button
              className="table-btn view-btn"
              onClick={() => handleAction(campaign.id, "View")}
            >
              View Details
            </button>
            <button
              className="table-btn release-btn"
              onClick={() => handleAction(campaign.id, "Release")}
            >
              Release
            </button>
            <button
              className="table-btn hold-btn"
              onClick={() =>
                handleAction(campaign.id, "Hold", prompt("Reason?"))
              }
              disabled={campaign.status === "Held"}
            >
              Hold
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h2 className="text-3xl text-center font-extrabold mb-6 text-[#2563eb]">
        {type
          .replace("tab", "")
          .replace(/([A-Z])/g, " $1")
          .trim()}
      </h2>
      {type === "releasedFunds" && (
        <div className="flex gap-4 mb-6 flex-wrap">
          <input
            type="text"
            placeholder="Search by campaign or campaigner"
            className="p-3 border border-gray-300 rounded-lg min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="date"
            className="p-3 border border-gray-300 rounded-lg min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="date"
            className="p-3 border border-gray-300 rounded-lg min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select className="p-3 border border-gray-300 rounded-lg min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-600">
            <option value="All">All</option>
            <option value="Released">Released</option>
            <option value="Held">Held</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      )}
      <table className="w-full border-collapse mb-6 text-sm">
        <thead>
          <tr>
            {["unapproved", "approved", "suspicious"].includes(type) && (
              <>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Title
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Creator
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">Goal</th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Status
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Actions
                </th>
              </>
            )}
            {["verifiedUsers", "unverifiedUsers"].includes(type) && (
              <>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  User Name
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Email
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  KYC Status
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Submission Date
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Actions
                </th>
              </>
            )}
            {type === "releasedFunds" && (
              <>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Campaign
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Campaigner
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Amount
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Release Date
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Status
                </th>
              </>
            )}
            {type === "pendingReleases" && (
              <>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Campaign
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Campaigner
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Amount
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Scheduled Date
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Status
                </th>
                <th className="border border-gray-300 p-3 bg-gray-100">
                  Actions
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="hover:bg-blue-100">
              <td className="border border-gray-300 p-3">
                {campaign.title || campaign.username}
              </td>
              {["unapproved", "approved", "suspicious"].includes(type) && (
                <>
                  <td className="border border-gray-300 p-3">
                    {campaign.creator}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {campaign.goal}
                  </td>
                  <td
                    className="border border-gray-300 p-3"
                    style={{
                      color:
                        campaign.status === "Active"
                          ? "#22c55e"
                          : campaign.status === "Pending"
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  >
                    {campaign.status}
                  </td>
                </>
              )}
              {["verifiedUsers", "unverifiedUsers"].includes(type) && (
                <>
                  <td className="border border-gray-300 p-3">
                    {campaign.email}
                  </td>
                  <td
                    className="border border-gray-300 p-3"
                    style={{
                      color:
                        campaign.status === "Approved"
                          ? "#22c55e"
                          : campaign.status === "Pending"
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  >
                    {campaign.status}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {campaign.submissionDate}
                  </td>
                </>
              )}
              {type === "releasedFunds" && (
                <>
                  <td className="border border-gray-300 p-3">
                    {campaign.creator}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {campaign.goal}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {campaign.scheduledDate}
                  </td>
                  <td
                    className="border border-gray-300 p-3"
                    style={{ color: "#22c55e" }}
                  >
                    {campaign.status}
                  </td>
                </>
              )}
              {type === "pendingReleases" && (
                <>
                  <td className="border border-gray-300 p-3">
                    {campaign.creator}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {campaign.goal}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {campaign.scheduledDate}
                  </td>
                  <td
                    className="border border-gray-300 p-3"
                    style={{
                      color:
                        campaign.status === "Pending" ? "#f59e0b" : "#ef4444",
                    }}
                  >
                    {campaign.status}
                  </td>
                </>
              )}
              <td className="border border-gray-300 p-3">
                {getActions(campaign)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CampaignTable;

// Custom Tailwind styles for table buttons
const tableBtnBase =
  "px-3 py-1 rounded-lg font-semibold mr-2 focus:outline-none focus:ring-2 focus:ring-offset-2";
const tableBtnStyles = {
  approve: "bg-green-600 text-white hover:bg-green-700",
  reject: "bg-red-600 text-white hover:bg-red-700",
  view: "bg-blue-600 text-white hover:bg-blue-700",
  flag: "bg-blue-600 text-white hover:bg-blue-700",
  clear: "bg-blue-600 text-white hover:bg-blue-700",
  release: "bg-green-600 text-white hover:bg-green-700",
  hold: "bg-red-600 text-white hover:bg-red-700",
};
const tableBtn = `${tableBtnBase} ${tableBtnStyles["approve"]}`; // Default for example
const approveBtn = `${tableBtnBase} ${tableBtnStyles["approve"]}`;
const rejectBtn = `${tableBtnBase} ${tableBtnStyles["reject"]}`;
const viewBtn = `${tableBtnBase} ${tableBtnStyles["view"]}`;
const flagBtn = `${tableBtnBase} ${tableBtnStyles["flag"]}`;
const clearBtn = `${tableBtnBase} ${tableBtnStyles["clear"]}`;
const releaseBtn = `${tableBtnBase} ${tableBtnStyles["release"]}`;
const holdBtn = `${tableBtnBase} ${tableBtnStyles["hold"]}`;
