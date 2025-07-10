import { useState, useCallback, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "./KYCForm.css";
import type {
  FileState,
  IKycRequest,
  IKycResponse,
  KYCFormData,
} from "@/interfaces/kyc.interface";
import type { AxiosResponse } from "axios";
import { getKycByUserId, submitKyc } from "@/apis/kyc.api";
import type { GetResponse, GetSignleResponse } from "@/types";
import axios from "axios";
import useAuth from "@/Context/AuthContext";

function KYCForm() {
  const [kycSubmitted, setKycSubmitted] = useState(false);
  const [kycData, setKycData] = useState<IKycResponse | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<KYCFormData>({
    mode: "onChange",
  });

  const [files, setFiles] = useState<FileState>({
    image: null,
    frontDoc: null,
    backDoc: null,
  });

  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { userId, status } = useAuth();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      toast.error("Failed to access camera. Please allow camera access.", {
        style: { background: "#fef2f2", color: "#ef4444" },
      });
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured_photo.jpg", {
            type: "image/jpeg",
          });
          console.log(file);
          setFiles((prev) => ({ ...prev, image: file }));
          stopCamera();
        }
      }, "image/jpeg");
    }
  }, [stopCamera]);

  const onDrop = useCallback((acceptedFiles: File[], type: keyof FileState) => {
    if (acceptedFiles[0]) {
      setFiles((prev) => ({ ...prev, [type]: acceptedFiles[0] }));
    }
  }, []);

  const frontDropzone = useDropzone({
    onDrop: (files: File[]) => onDrop(files, "frontDoc"),
    accept: { "image/*": [".jpg", ".png"], "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const backDropzone = useDropzone({
    onDrop: (files: File[]) => onDrop(files, "backDoc"),
    accept: { "image/*": [".jpg", ".png"], "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const submitForm = async (data: KYCFormData) => {
    if (!files.image || !files.frontDoc || !files.backDoc) {
      toast.error("Please upload all required files!", {
        style: { background: "#fef2f2", color: "#ef4444" },
      });
      return;
    }

    try {
      const kycPayload: IKycRequest = { ...data, ...files };

      const response: AxiosResponse<GetResponse<IKycResponse>> =
        await submitKyc(kycPayload);

      if (response.status == 200) {
        toast.success("Kyc submitted successfully.", {
          style: { background: "#f0fdf4", color: "#22c55e" },
          onClose: () => {
            reset();
          },
        });

        let fetchResponse: AxiosResponse<GetSignleResponse<IKycResponse>> =
          await getKycByUserId(userId);
        if (fetchResponse.status === 200 && fetchResponse.data.data) {
          setKycData(fetchResponse.data.data);
          setKycSubmitted(true);
        }
        reset();
        setFiles({ image: null, frontDoc: null, backDoc: null });
      }
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data?.data || "Request failed!";
        toast.error(message, {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      } else {
        console.log(error);
        toast.error("Something went wrong. Please try again.", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      }
    }
  };

  const handleEditKyc = () => {
    console.log("Editing KYC");
    setKycSubmitted(false);
    toast.info("Editing KYC", {
      style: { background: "#eff6ff", color: "#2563eb" },
    });
  };

  useEffect(() => {
    async function fetchUserKyc() {
      let response: AxiosResponse<GetSignleResponse<IKycResponse>> =
        await getKycByUserId(userId);
      console.log(response.data.data);
      if (response.status == 200 && response.data.data) {
        setKycData(response.data.data);
        setKycSubmitted(true);
      }
    }
    fetchUserKyc();
  }, [kycSubmitted]);

  return (
    <div className="settings-section kyc-section">
      {kycSubmitted ? (
        <>
          <h3>KYC Details</h3>
          <div className="kyc-details">
            <p>
              <strong>Full Name:</strong> {kycData?.name}
            </p>
            <p>
              <strong>Email:</strong> {kycData?.email}
            </p>
            <p>
              <strong>Date of Birth:</strong> {kycData?.dob}
            </p>
            <p>
              <strong>Address:</strong> {kycData?.address}
            </p>
            <p>
              <strong>Phone Number:</strong> {kycData?.phone}
            </p>
            <p>
              <strong>Document-Type:</strong> {kycData?.documentType}
            </p>
            <p>
              <strong>Document no:</strong> {kycData?.documentNumber}
            </p>
            <p>
              <strong>Verification Status:</strong>{" "}
              <span style={{ color: "#f59e0b" }}>{status}</span>
            </p>
            <p>
              <strong>DeepFace Confidence:</strong> 78%
            </p>
            <p>
              <strong>OCR Front Confidence:</strong> 87%
            </p>
            <p>
              <strong>OCR Back Confidence:</strong> 85%
            </p>
            <p>
              <strong>Reviewed by:</strong>{" "}
              <span style={{ color: "#f59e0b" }}>{kycData?.reviewedBy}</span>
            </p>
            <p>
              <strong>Reviewed At:</strong>{" "}
              <span style={{ color: "#f59e0b" }}>{kycData?.reviewedAt}</span>
            </p>
          </div>
          <button
            className="edit-kyc"
            onClick={handleEditKyc}
            aria-label="Edit KYC"
          >
            Edit KYC
          </button>
        </>
      ) : (
        <>
          <h3>Submit KYC</h3>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="kyc-form"
            aria-describedby="kycDesc"
          >
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                {...register("name", { required: "Full Name is required" })}
                placeholder="John Doe"
                aria-required="true"
              />
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="john@example.com"
                aria-required="true"
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                {...register("address", { required: "Address is required" })}
                placeholder="123 Main St, City"
                aria-required="true"
              />
              {errors.address && (
                <span className="error">{errors.address.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                {...register("phone", { required: "Phone Number is required" })}
                placeholder="+1234567890"
                aria-required="true"
              />
              {errors.phone && (
                <span className="error">{errors.phone.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Document number: </label>
              <input
                id="documentNo"
                type="text"
                {...register("documentNumber", {
                  required: "Document number is required",
                })}
                placeholder="1111-a1a1-22bb"
                aria-required="true"
              />
              {errors.documentNumber && (
                <span className="error">{errors.documentNumber.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Document Type: </label>
              <select
                id="documentType"
                {...register("documentType", {
                  required: "Document number is required",
                })}
                defaultValue=""
                aria-required="true"
              >
                <option value="" disabled>
                  -- Choose a Document Type --
                </option>
                <option value="Citizenship">Citizenship</option>
                <option value="Passport">Passport</option>
                <option value="NID">NID</option>
              </select>
              {/* <input
                id="documentType"
                type="text"
                placeholder="1111-a1a1-22bb"
                aria-required="true"
              /> */}
              {errors.documentType && (
                <span className="error">{errors.documentType.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob"
                type="date"
                {...register("dob", { required: "Date of Birth is required" })}
                aria-required="true"
              />
              {errors.dob && (
                <span className="error">{errors.dob.message}</span>
              )}
            </div>
          </form>
          <div className="kyc-upload-section">
            <h4>Capture Photo</h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <video
                ref={videoRef}
                autoPlay
                style={{
                  display: isCameraActive ? "block" : "none",
                  maxWidth: "300px",
                  maxHeight: "200px",
                }}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
              {!isCameraActive ? (
                <button
                  onClick={startCamera}
                  className="upload-label"
                  style={{ width: "fit-content" }}
                >
                  Start Camera
                </button>
              ) : (
                <button
                  onClick={capturePhoto}
                  className="upload-label"
                  style={{ width: "fit-content" }}
                >
                  Capture Photo
                </button>
              )}
            </div>
            {files.image && (
              <img
                src={URL.createObjectURL(files.image)}
                alt="Captured Photo Preview"
                style={{
                  maxWidth: "150px",
                  maxHeight: "100px",
                  marginTop: "10px",
                }}
              />
            )}
          </div>

          <div className="kyc-upload-section">
            <label
              // {...frontDropzone.getRootProps()}
              className="upload-label"
              tabIndex={0}
            >
              Upload ID Front
              <input
                {...frontDropzone.getInputProps()}
                id="frontUpload"
                className="hidden-file-input"
              />
            </label>
            <p
              style={{
                fontSize: "0.9rem",
                marginTop: "0.25rem",
                color: "#6b7280",
              }}
            >
              Accepted formats: JPG, PNG, PDF
            </p>
            {files.frontDoc && files.frontDoc.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(files.frontDoc)}
                alt="ID Front Preview"
                style={{ maxWidth: "150px", maxHeight: "100px" }}
              />
            )}
          </div>
          <div className="kyc-upload-section">
            <label
              // {...backDropzone.getRootProps()}
              className="upload-label"
              tabIndex={0}
            >
              Upload ID Back
              <input
                {...backDropzone.getInputProps()}
                id="backUpload"
                className="hidden-file-input"
              />
            </label>
            <p
              style={{
                fontSize: "0.9rem",
                marginTop: "0.25rem",
                color: "#6b7280",
              }}
            >
              Accepted formats: JPG, PNG, PDF
            </p>
            {files.backDoc && files.backDoc.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(files.backDoc)}
                alt="ID Back Preview"
                style={{ maxWidth: "150px", maxHeight: "100px" }}
              />
            )}
          </div>
          <p className="kyc-status">
            Verification Status:{" "}
            <strong style={{ color: "#6b7280" }}>Not Submitted</strong>
          </p>
          <button
            className="submit-kyc"
            onClick={handleSubmit(submitForm)}
            disabled={!files.image || !files.frontDoc || !files.backDoc}
          >
            Submit KYC
          </button>
        </>
      )}
    </div>
  );
}

export default KYCForm;
