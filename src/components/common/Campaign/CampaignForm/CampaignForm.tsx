import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FileUpload from "../../../ui/FileUpload/FileUpload";
import "./CampaignForm.css";
import { Link } from "react-router-dom";

type CampaignFormData = {
  campaignTitle: string;
  campaignDescription: string;
  fundingGoal: string; // or number if converted before submit
  duration: string;
  category: string;
  campaignImage: File;
  supportingImage?: File[];
};

function CampaignForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CampaignFormData>();

  const handleImageDrop = (file: File) => {
    setValue("campaignImage", file, { shouldValidate: true });
  };

  const handleDocDrop = (file: File[]) => {
    setValue("supportingImage", file, { shouldValidate: true });
  };

  const onSubmit = async (data: CampaignFormData) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("title", data.campaignTitle);
      formData.append("description", data.campaignDescription);
      formData.append("fundingGoal", data.fundingGoal);
      formData.append("duration", data.duration);
      formData.append("category", data.category);
      if (data.campaignImage) {
        formData.append("image", data.campaignImage);
      }

      // console.log("Creating campaign:", {
      //   title: data.campaignTitle,
      //   description: data.campaignDescription,
      //   fundingGoal: data.fundingGoal,
      //   duration: data.duration,
      //   category: data.category,
      //   image: data.campaignImage?.name,
      // });

      toast.success("Campaign submitted for review!", {
        style: { background: "#f0fdf4", color: "#22c55e" },
        onClose: () => {
          reset();
          window.location.hash = "dashboard";
        },
      });
    } catch (error) {
      toast.error("Failed to create campaign. Ensure you are KYC-verified.", {
        style: { background: "#fef2f2", color: "#ef4444" },
      });
    }
  };

  // const handleDashboard = (e: any) => {
  //   e.preventDefault();
  //   console.log("Navigating to dashboard");
  //   window.location.hash = "dashboard";
  // };

  return (
    <div className="campaign-form-card">
      <h2>Create Campaign</h2>
      <form id="campaignForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="campaignTitle">Campaign Title</label>
          <input
            type="text"
            id="campaignTitle"
            placeholder="Enter campaign title"
            aria-label="Campaign Title"
            {...register("campaignTitle", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters.",
              },
            })}
          />
          {errors.campaignTitle && (
            <div className="error">{errors.campaignTitle.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="campaignDescription">Description</label>
          <textarea
            id="campaignDescription"
            placeholder="Describe your campaign"
            aria-label="Campaign Description"
            {...register("campaignDescription", {
              required: "Description is required",
              minLength: {
                value: 20,
                message: "Description must be at least 20 characters.",
              },
            })}
          ></textarea>
          {errors.campaignDescription && (
            <div className="error">{errors.campaignDescription.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="fundingGoal">Funding Goal ($)</label>
          <input
            type="number"
            id="fundingGoal"
            placeholder="Enter funding goal"
            min="100"
            aria-label="Funding Goal"
            {...register("fundingGoal", {
              required: "Funding goal is required",
              min: {
                value: 100,
                message: "Goal must be at least $100.",
              },
            })}
          />
          {errors.fundingGoal && (
            <div className="error">{errors.fundingGoal.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (days)</label>
          <input
            type="number"
            id="duration"
            placeholder="Enter duration"
            min="7"
            max="90"
            aria-label="Duration"
            {...register("duration", {
              required: "Duration is required",
              min: {
                value: 7,
                message: "Duration must be at least 7 days.",
              },
              max: {
                value: 90,
                message: "Duration cannot exceed 90 days.",
              },
            })}
          />
          {errors.duration && (
            <div className="error">{errors.duration.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            aria-label="Category"
            {...register("category", { required: "Please select a category." })}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Medical">Medical</option>
            <option value="Education">Education</option>
            <option value="Charity">Charity</option>
            <option value="Creative">Creative</option>
            <option value="Emergency">Emergency</option>
          </select>
          {errors.category && (
            <div className="error">{errors.category.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="campaignImage">Campaign Image</label>
          <input
            type="hidden"
            {...register("campaignImage", {
              required: "Campaign image is required",
            })}
          />
          <FileUpload
            id="campaignImage"
            name="campaignImage"
            onDrop={handleImageDrop}
            error={errors.campaignImage?.message}
            setValue={setValue}
            getValues={getValues}
            register={register}
            isMultiple={false}
          />
          {errors.campaignImage && (
            <div className="error">{errors.campaignImage.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="supportingImage">
            Campaign Supporting Docs-Image (Optional)
          </label>

          <FileUpload
            id="supportingImage"
            name="supportingImage"
            onDrop={handleDocDrop}
            error={errors.supportingImage?.message}
            setValue={setValue}
            register={register}
            isMultiple={true}
            getValues={getValues}
          />
          {errors.supportingImage && (
            <div className="error">{errors.supportingImage.message}</div>
          )}
        </div>
        <button
          type="submit"
          className="submit-btn"
          aria-label="Create Campaign"
        >
          Create Campaign
        </button>
      </form>
      <div className="campaign-links">
        <Link to="/user-dashboard" id="toDashboard">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default CampaignForm;
