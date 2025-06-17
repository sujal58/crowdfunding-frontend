import { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "./KYCForm.css";

interface KYCFormData {
  fullName: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
}

interface FileState {
  photo: File | null;
  front: File | null;
  back: File | null;
}

function KYCForm() {
  const [kycSubmitted, setKycSubmitted] = useState(false);
  const [kycData, setKycData] = useState<KYCFormData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<KYCFormData>({
    mode: "onChange",
  });

  const [files, setFiles] = useState<FileState>({
    photo: null,
    front: null,
    back: null,
  });

  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
          setFiles((prev) => ({ ...prev, photo: file }));
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

  const photoDropzone = useDropzone({
    onDrop: (files: File[]) => onDrop(files, "photo"),
    accept: { "image/*": [".jpg", ".png"] },
    maxFiles: 1,
  });

  const frontDropzone = useDropzone({
    onDrop: (files: File[]) => onDrop(files, "front"),
    accept: { "image/*": [".jpg", ".png"], "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const backDropzone = useDropzone({
    onDrop: (files: File[]) => onDrop(files, "back"),
    accept: { "image/*": [".jpg", ".png"], "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const submitForm = (data: KYCFormData) => {
    if (!files.photo || !files.front || !files.back) {
      toast.error("Please upload all required files!", {
        style: { background: "#fef2f2", color: "#ef4444" },
      });
      return;
    }
    const kycPayload = { ...data, ...files };
    console.log("Submitting KYC:", kycPayload);
    setKycData(data);
    setKycSubmitted(true);
    toast.success("KYC submitted successfully!", {
      style: { background: "#f0fdf4", color: "#22c55e" },
    });
    reset();
    setFiles({ photo: null, front: null, back: null });
  };

  const handleEditKyc = () => {
    console.log("Editing KYC");
    setKycSubmitted(false);
    toast.info("Editing KYC", {
      style: { background: "#eff6ff", color: "#2563eb" },
    });
  };

  return (
    <div className="settings-section">
      {kycSubmitted ? (
        <>
          <h3>KYC Details</h3>
          <div className="kyc-details">
            <p>
              <strong>Full Name:</strong> {kycData?.fullName}
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
              <strong>Email:</strong> {kycData?.email}
            </p>
            <p>
              <strong>Verification Status:</strong>{" "}
              <span style={{ color: "#f59e0b" }}>Pending</span>
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
          </div>
          <button
            className="edit-btn"
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
                {...register("fullName", { required: "Full Name is required" })}
                placeholder="John Doe"
                aria-required="true"
              />
              {errors.fullName && (
                <span className="error">{errors.fullName.message}</span>
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
          </form>
          {/* <div className="kyc-upload-section">
            <label
              // {...photoDropzone.getRootProps()}
              className="upload-label"
              tabIndex={0}
            >
              Upload Recent Photo
              <input
                {...photoDropzone.getInputProps()}
                id="photoUpload"
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
              Accepted formats: JPG, PNG
            </p>
            {files.photo && (
              <img
                src={URL.createObjectURL(files.photo)}
                alt="Photo Preview"
                style={{ maxWidth: "150px", maxHeight: "100px" }}
              />
            )}
          </div> */}
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
            {files.photo && (
              <img
                src={URL.createObjectURL(files.photo)}
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
            {files.front && files.front.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(files.front)}
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
            {files.back && files.back.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(files.back)}
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
            className="submit-btn"
            onClick={handleSubmit(submitForm)}
            disabled={!files.photo || !files.front || !files.back}
          >
            Submit KYC
          </button>
        </>
      )}
    </div>
  );
}

export default KYCForm;
