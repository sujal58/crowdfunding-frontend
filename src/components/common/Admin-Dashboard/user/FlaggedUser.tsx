import React, { useEffect, useState } from "react";
import { getAllUserByKycStatus } from "@/apis/user.api";
import type { IUserResponse } from "@/interfaces/user.interface";
import { toast } from "react-toastify";
import axios, { type AxiosResponse } from "axios";
import UserTable from "../table/UserTable";
import { EKycStatus } from "@/enums";
import type { GetResponse, UserOutletContextType } from "@/types";
import { useOutletContext } from "react-router-dom";

const FlaggedUser: React.FC = () => {
  const [users, setUsers] = useState<IUserResponse[]>([]);
  // const [refreshFlag, setRefreshFlag] = useState(0);

  // const refreshUsers = () => {
  //   setRefreshFlag((prev) => prev + 1);
  // };

  const { doRefresh, refreshFlag } = useOutletContext<UserOutletContextType>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: AxiosResponse<GetResponse<IUserResponse>> =
          await getAllUserByKycStatus(EKycStatus.FlAGGED);

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
  }, [refreshFlag]);

  return <UserTable type="flaggedUsers" users={users} onRefresh={doRefresh} />;
};

export default FlaggedUser;
