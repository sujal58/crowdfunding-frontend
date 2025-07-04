import React from "react";
import type { Fund } from "@/types/index";

interface FundTableProps {
  type: "releasedFunds" | "pendingReleases";
  funds: Fund[];
  getActions: (fund: Fund) => React.ReactNode;
}

const FundTable: React.FC<FundTableProps> = ({ type, funds, getActions }) => {
  return (
    <>
      <h2 className="text-3xl text-center font-extrabold mb-6 text-[#2563eb]">
        {type === "releasedFunds" ? "Released Funds" : "Pending Releases"}
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
            <th className="border border-gray-300 p-3 bg-gray-100">Campaign</th>
            <th className="border border-gray-300 p-3 bg-gray-100">
              Campaigner
            </th>
            <th className="border border-gray-300 p-3 bg-gray-100">Amount</th>
            <th className="border border-gray-300 p-3 bg-gray-100">
              {type === "releasedFunds" ? "Release Date" : "Scheduled Date"}
            </th>
            <th className="border border-gray-300 p-3 bg-gray-100">Status</th>
            {type === "pendingReleases" && (
              <th className="border border-gray-300 p-3 bg-gray-100">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {funds.map((fund) => (
            <tr key={fund.id} className="hover:bg-blue-100">
              <td className="border border-gray-300 p-3">{fund.campaign}</td>
              <td className="border border-gray-300 p-3">{fund.campaigner}</td>
              <td className="border border-gray-300 p-3">{fund.amount}</td>
              <td className="border border-gray-300 p-3">
                {type === "releasedFunds"
                  ? fund.releaseDate
                  : fund.scheduledDate}
              </td>
              <td
                className="border border-gray-300 p-3"
                style={{
                  color:
                    fund.status === "Released"
                      ? "#22c55e"
                      : fund.status === "Pending"
                      ? "#f59e0b"
                      : "#ef4444",
                }}
              >
                {fund.status}
              </td>
              {type === "pendingReleases" && (
                <td className="border border-gray-300 p-3">
                  {getActions(fund)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FundTable;
