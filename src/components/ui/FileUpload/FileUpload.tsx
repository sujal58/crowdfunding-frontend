import { useDropzone } from "react-dropzone";
import "./FileUpload.css";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

type fileData = {
  id: Number;
  name: string;
};

function FileUpload({ setValue, error, name, isMultiple }: any) {
  const [filename, setFilename] = useState<fileData[]>([]);

  const handleImageCancel = (index: Number) => {
    const updatedFile = filename.filter((value) => value.id != index);
    setFilename(updatedFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: isMultiple,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setValue(name, acceptedFiles, { shouldValidate: true });
        setFilename((prev) => [
          ...prev,
          ...acceptedFiles.map((file, index) => ({
            id: index,
            name: file.name,
          })),
        ]);
      }
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""} ${
          error ? "error" : ""
        }`}
      >
        <input {...getInputProps()} />
        <p>
          Drag & drop a Campaign picture (PNG/JPG, max 5MB), or click to select
        </p>
        {error && <div className="error">{error.message}</div>}
      </div>
      {filename.length > 0 && (
        <div className="gap-1 w-full flex">
          {filename.map((value) => (
            <p
              style={{
                margin: "1rem",
                border: "1px solid gray",
                display: "flex",
                padding: "0.5rem",
                borderRadius: "1rem",
                width: "auto",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
              key={value.name}
            >
              {value.name}{" "}
              <RxCross2
                className="cursor-pointer"
                onClick={() => handleImageCancel(value.id)}
              />
            </p>
          ))}
        </div>
      )}
    </>
  );
}

export default FileUpload;
