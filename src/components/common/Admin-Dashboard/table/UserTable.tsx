import React from "react";
import type { IUserResponse } from "@/interfaces/user.interface";
import { EKycStatus } from "@/enums";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

interface UserTableProps {
  type: "verifiedUsers" | "unverifiedUsers" | "rejectedUser";
  users: IUserResponse[];
  // getActions: (user: IUserResponse) => React.ReactNode;
}

const UserTable: React.FC<UserTableProps> = ({ type, users }) => {
  const navigate = useNavigate();

  const getActions = (user: IUserResponse) => (
    <div className="flex gap-2">
      <button
        className="table-btn view-btn bg-blue-500 text-white px-2 py-1 rounded"
        onClick={() => handleAction(user.userId, "View")}
      >
        View Details
      </button>
      {type === "unverifiedUsers" && (
        <>
          <button
            className="table-btn verify-btn bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => handleAction(user.userId, "Verify")}
          >
            Verify
          </button>
          <button
            className="table-btn reject-btn bg-red-500 text-white px-2 py-1 rounded"
            onClick={() =>
              handleAction(user.userId, "Reject", "KYC incomplete")
            }
          >
            Reject
          </button>
        </>
      )}
      {type === "verifiedUsers" && (
        <button
          className="table-btn flag-btn bg-yellow-500 text-white px-2 py-1 rounded"
          onClick={() =>
            handleAction(user.userId, "Flag", "Suspicious activity")
          }
        >
          Flag
        </button>
      )}
      {type === "rejectedUser" && (
        <button
          className="table-btn flag-btn bg-red-500 text-white px-2 py-1 rounded"
          onClick={() =>
            handleAction(user.userId, "Delete", "Rejected User cleaning!")
          }
        >
          Delete
        </button>
      )}
    </div>
  );

  const handleAction = async (
    id: number,
    action: string,
    reason?: string | null
  ) => {
    console.log(`Action ${action} on ${type} user ${id}, reason: ${reason}`);
    try {
      if (action === "View") {
        navigate(`/admin-dashboard/user/${id}`);
      } else if (action === "Verify") {
        // await verifyUser(id);
        toast.success(`User ${id} verified successfully`, {
          style: { background: "#f0fdf4", color: "#22c55e" },
        });
      } else if (action === "Reject") {
        toast.error(`User ${id} rejected: ${reason}`, {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      } else if (action === "Flag") {
        // await flagUser(id, reason);
        toast.warn(`User ${id} flagged: ${reason}`, {
          style: { background: "#fefce8", color: "#f59e0b" },
        });
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            `Failed to ${action.toLowerCase()} user`,
          {
            style: { background: "#fef2f2", color: "#ef4444" },
          }
        );
      } else {
        toast.error("Something went wrong. Please try again.", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      }
    }
  };
  return (
    <>
      <h2 className="text-3xl text-center font-extrabold mb-6 text-[#2563eb]">
        {type === "verifiedUsers" ? "Verified Users" : "Unverified Users"}
      </h2>
      <table className="w-full border-collapse mb-6 text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3 bg-gray-100">
              User Name
            </th>
            <th className="border border-gray-300 p-3 bg-gray-100">Name</th>
            <th className="border border-gray-300 p-3 bg-gray-100">Email</th>
            <th className="border border-gray-300 p-3 bg-gray-100">Country</th>
            <th className="border border-gray-300 p-3 bg-gray-100">
              KYC Status
            </th>
            <th className="border border-gray-300 p-3 bg-gray-100">
              Submission Date
            </th>
            <th className="border border-gray-300 p-3 bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId} className="hover:bg-blue-100">
              <td className="border border-gray-300 p-3">{user.username}</td>
              <td className="border border-gray-300 p-3">{user.name}</td>
              <td className="border border-gray-300 p-3">{user.email}</td>
              <td className="border border-gray-300 p-3">{user.country}</td>

              <td
                className="border border-gray-300 p-3"
                style={{
                  color:
                    user.kycStatus === EKycStatus.VERIFIED
                      ? "#22c55e" // green
                      : user.kycStatus === EKycStatus.PENDING
                      ? "#f59e0b" // yellow
                      : user.kycStatus === EKycStatus.REJECTED
                      ? "#dc2626" // red (for rejected)
                      : "#ef4444", // fallback/default (also red or error color)
                }}
              >
                {user.kycStatus}
              </td>
              <td className="border border-gray-300 p-3">
                {user.createdAt.split("T")[0]}
              </td>
              <td className="border border-gray-300 p-3">{getActions(user)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
