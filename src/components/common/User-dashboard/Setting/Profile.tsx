import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Profile() {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "johndoe",
      email: "john@example.com",
      contact: "+1234567890",
    },
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
        <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <input
            id="contact"
            type="tel"
            {...register("contact")}
            readOnly={!isEditable}
            aria-label="Contact Number"
          />
        </div>
        <button type="submit" className="submit-btn" aria-label="Edit Profile">
          {isEditable ? "Save changes" : "Edit Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
