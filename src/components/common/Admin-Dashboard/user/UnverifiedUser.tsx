import React, { useEffect, useState } from "react";
import { getAllUserByKycStatus } from "@/apis/user.api";
import type { IUserResponse } from "@/interfaces/user.interface";
import { toast } from "react-toastify";
import axios, { type AxiosResponse } from "axios";
import UserTable from "../table/UserTable";
import { EKycStatus } from "@/enums";
import type { GetResponse } from "@/types";

const UnverifiedUsers: React.FC = () => {
  const [users, setUsers] = useState<IUserResponse[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: AxiosResponse<GetResponse<IUserResponse>> =
          await getAllUserByKycStatus(EKycStatus.PENDING);
        console.log(response);
        if (response.status == 200) {
          setUsers(response.data.data);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data || "Error while fetching unverified user.";
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

  return <UserTable type="unverifiedUsers" users={users} />;
};

export default UnverifiedUsers;
