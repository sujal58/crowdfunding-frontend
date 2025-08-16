import React, { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import type { IUserResponse } from "@/interfaces/user.interface";
import axios from "axios";
import { toast } from "react-toastify";
import UserTable from "../table/UserTable";
import { getAllUserByKycStatus } from "@/apis/user.api";
import { EKycStatus } from "@/enums";
import type { GetResponse, UserOutletContextType } from "@/types";
import { useOutletContext } from "react-router-dom";

const VerifiedUsers: React.FC = () => {
  const [users, setUsers] = useState<IUserResponse[]>([]);

  const { doRefresh, refreshFlag } = useOutletContext<UserOutletContextType>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: AxiosResponse<GetResponse<IUserResponse>> =
          await getAllUserByKycStatus(EKycStatus.VERIFIED);
        if (response.status == 200) {
          setUsers(response.data.data);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.data || "Error while fetching verified user.";
          toast.error(message);
        } else {
          toast.error("Something went wrong. Please try again.", {
            style: { background: "#fef2f2", color: "#ef4444" },
          });
        }
      }
    };

    fetchUsers();
  }, [refreshFlag]);

  return <UserTable type="verifiedUsers" users={users} onRefresh={doRefresh} />;
};

export default VerifiedUsers;
