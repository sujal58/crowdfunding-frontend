import React, { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import type {
  IGetUsersResponse,
  IUserResponse,
} from "@/interfaces/user.interface";
import axios from "axios";
import { toast } from "react-toastify";
import UserTable from "../table/UserTable";
import { getAllUserByKycStatus } from "@/apis/user.api";
import { EKycStatus } from "@/enums";

const RejectedUser: React.FC = () => {
  const [users, setUsers] = useState<IUserResponse[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: AxiosResponse<IGetUsersResponse> =
          await getAllUserByKycStatus(EKycStatus.REJECTED);
        if (response.status == 200) {
          setUsers(response.data.data);
          toast.success("Rejected user fetched successfully!");
          response.data.data.length == 0 &&
            toast.warn("No Rejected user exist!");
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.data || "Error while fetching rejected user.";
          toast.error(message);
        } else {
          toast.error("Something went wrong. Please try again.", {
            style: { background: "#fef2f2", color: "#ef4444" },
          });
        }
      }
    };

    fetchUsers();
  }, []);

  return <UserTable type="rejectedUser" users={users} />;
};

export default RejectedUser;
