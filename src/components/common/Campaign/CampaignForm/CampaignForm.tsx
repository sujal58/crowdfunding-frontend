import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FileUpload from "../../../ui/FileUpload/FileUpload";
import "./CampaignForm.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "@/Context/AuthContext";
import { Tooltip as ReactTooltip } from "react-tooltip";
import type { ICampaignRequest } from "@/interfaces/campaign.interface";
import { createCampign } from "@/apis/campaign.api";
import axios from "axios";

type CampaignFormData = {
  title: string;
  description: string;
  goalAmount: number;
  tags?: string[];
  category?: string;
  campaignImage: File;
  supportingImage?: File[];
};

function CampaignForm() {
  const { status } = useAuth();
  const [isVerified, setIsVerified] = useState(
    status === "VERIFIED" ? true : false
  );
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setIsVerified(status === "VERIFIED" ? true : false);
  }, [status]);

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

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed && !tags.includes(trimmed)) {
        const newTags = [...tags, trimmed];
        setTags(newTags);
        setValue("tags", newTags, { shouldValidate: true });
      }
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue("tags", updatedTags, { shouldValidate: true });
  };

  const onSubmit = async (data: CampaignFormData) => {
    try {
      const payload: ICampaignRequest = data;
      console.log(payload);
      const response = await createCampign(payload);
      console.log(response);
      if (response.status == 200) {
        toast.success("Campaign submitted for review!", {
          style: { background: "#f0fdf4", color: "#22c55e" },
          onClose: () => {
            // reset();
            // setTags([]);
          },
        });
        // navigate("/user-dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.data || "Failed to create campaign!", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
        console.log(error.response.data);
      } else {
        console.log(error);
        toast.error("Failed to create campaign.", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      }
    }
  };

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
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters.",
              },
            })}
          />
          {errors.title && <div className="error">{errors.title.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="campaignDescription">Description</label>
          <textarea
            id="campaignDescription"
            placeholder="Describe your campaign"
            aria-label="Campaign Description"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 20,
                message: "Description must be at least 20 characters.",
              },
            })}
          ></textarea>
          {errors.description && (
            <div className="error">{errors.description.message}</div>
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
            {...register("goalAmount", {
              required: "Funding goal is required",
              min: {
                value: 100,
                message: "Goal must be at least $100.",
              },
            })}
          />
          {errors.goalAmount && (
            <div className="error">{errors.goalAmount.message}</div>
          )}
        </div>
        {/* <div className="form-group">
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
        </div> */}
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
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            id="tags"
            type="text"
            placeholder="Enter tags..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            aria-label="Tags"
          />
          <div className="tags-container">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button type="button" onClick={() => removeTag(index)}>
                  ×
                </button>
              </span>
            ))}
          </div>
          <input type="hidden" {...register("tags")} />
          {errors.tags && <div className="error">{errors.tags.message}</div>}
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
          // disabled={!isVerified}
          data-tooltip-content={
            isVerified ? "" : "Verify your kyc to create your first Campaign!"
          }
          data-tooltip-id="myTooltip"
        >
          Create Campaign
        </button>
        <ReactTooltip id="myTooltip" />
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
