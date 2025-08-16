import { getCurrentUser } from "@/apis/user.api";
import useAuth from "@/Context/AuthContext";
import { EKycStatus } from "@/enums";
import type { IUserResponse } from "@/interfaces/user.interface";
import type { GetSignleResponse } from "@/types";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Profile() {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { userId } = useAuth();
  const [user, setUser] = useState<IUserResponse>({
    userId: "",
    email: "",
    name: "",
    username: "",
    country: "",
    city: "",
    kycStatus: EKycStatus.PENDING,
    roles: [],
    createdAt: "",
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response: AxiosResponse<GetSignleResponse<IUserResponse>> =
          await getCurrentUser(userId);

        if (response.status == 200) {
          const userData = response.data.data;

          setUser(response.data.data);
          reset({
            name: userData.name,
            username: userData.username,
            email: userData.email,
          });
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message = err.response?.data?.data;
          toast.error(message);
        } else {
          toast.error("Something went wrong. Please try again.", {
            style: { background: "#fef2f2", color: "#ef4444" },
          });
        }
      }
    };

    fetchCampaign();
  }, []);

  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    setIsEditable(!isEditable);
    console.log("Editing profile:", data);
    toast.success("Profile edit requested!", {
      style: { background: "#f0fdf4", color: "#22c55e" },
    });
  };

  return (
    <div className="settings-section">
      <h3>Profile</h3>
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input
            id="username"
            {...register("name")}
            readOnly={!isEditable}
            aria-label="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            {...register("username")}
            readOnly={!isEditable}
            aria-label="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="profileEmail">Email</label>
          <input
            id="profileEmail"
            type="email"
            {...register("email")}
            readOnly={!isEditable}
            aria-label="Email"
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <input
            id="contact"
            type="tel"
            {...register("contact")}
            readOnly={!isEditable}
            aria-label="Contact Number"
          />
        </div> */}
        <button type="submit" className="submit-btn" aria-label="Edit Profile">
          {isEditable ? "Save changes" : "Edit Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
