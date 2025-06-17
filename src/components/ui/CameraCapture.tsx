import { useState, useEffect } from "react";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  onCancel,
}) => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      const video = document.getElementById(
        "cameraPreview"
      ) as HTMLVideoElement;
      video.srcObject = mediaStream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const capturePhoto = () => {
    const video = document.getElementById("cameraPreview") as HTMLVideoElement;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "captured_photo.jpg", {
          type: "image/jpeg",
        });
        onCapture(file);
        stopCamera();
      }
    }, "image/jpeg");
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      onCancel();
    }
  };

  return (
    <div className="camera-capture">
      <button
        type="button"
        onClick={startCamera}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Take Photo
      </button>
      {stream && (
        <div className="mt-4">
          <video
            id="cameraPreview"
            autoPlay
            style={{ maxWidth: "300px", maxHeight: "200px" }}
          />
          <div className="mt-2">
            <button
              type="button"
              onClick={capturePhoto}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Capture
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
