import { useDropzone } from "react-dropzone";
import "./FileUpload.css";

function FileUpload({ register, setValue, error, name }: any) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setValue(name, acceptedFiles[0], { shouldValidate: true });
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""} ${
        error ? "error" : ""
      }`}
    >
      <input {...getInputProps()} {...register(name)} />
      <p>
        Drag & drop a profile picture (PNG/JPG, max 5MB), or click to select
      </p>
      {error && <div className="error">{error.message}</div>}
    </div>
  );
}

export default FileUpload;
