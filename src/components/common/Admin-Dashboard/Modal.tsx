import React, { useState, useEffect } from "react";

interface ModalProps {
  type: string;
  data?: any;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ type, data, onClose }) => {
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState(data?.status || "Pending");

  useEffect(() => {
    setReason("");
    setStatus(data?.status || "Pending");
  }, [data]);

  const handleSubmit = () => {
    if (
      (type === "reject" ||
        (type === "kyc" && status === "Rejected") ||
        (type === "payment" && (status === "Held" || status === "Canceled"))) &&
      !reason.trim()
    ) {
      alert("Please provide a reason.");
      return;
    }
    console.log(`Submitting ${type} with status: ${status}, reason: ${reason}`);
    alert(
      `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`
    );
    onClose();
  };

  const renderContent = () => {
    switch (type) {
      case "reject":
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Reject Campaign</h3>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              placeholder="Enter reason for rejection"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />
          </>
        );
      case "kyc":
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">KYC Details</h3>
            {["fullName", "dob", "address", "phone", "email"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block font-semibold mb-1 capitalize">
                  {field.replace("dob", "date of birth")}
                </label>
                <input
                  type="text"
                  value={data[field]}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Recent Photo</label>
              <img
                src={data.photo}
                alt="Recent Photo"
                className="max-w-[150px] max-h-[100px] border border-gray-300 rounded-lg mb-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">ID Front</label>
              <img
                src={data.front}
                alt="ID Front"
                className="max-w-[150px] max-h-[100px] border border-gray-300 rounded-lg mb-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">ID Back</label>
              <img
                src={data.back}
                alt="ID Back"
                className="max-w-[150px] max-h-[100px] border border-gray-300 rounded-lg mb-2"
              />
            </div>
            {["deepFace", "ocrFront", "ocrBack"].map((field) => (
              <p key={field} className="text-sm text-gray-600 mb-2">
                {field
                  .replace("deepFace", "DeepFace Confidence")
                  .replace("ocr", "OCR ")
                  .replace(/([A-Z])/g, " $1")
                  .trim()}
                : <span>{data[field]}</span>
              </p>
            ))}
            <div className="mb-4">
              <label className="block font-semibold mb-1">KYC Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            {status === "Rejected" && (
              <div className="mb-4">
                <label className="block font-semibold mb-1">
                  Rejection Reason
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="Enter reason for rejection"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            )}
          </>
        );
      case "payment":
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            {[
              "campaign",
              "campaigner",
              "amount",
              "scheduledDate",
              "currentStatus",
            ].map((field) => (
              <div key={field} className="mb-4">
                <label className="block font-semibold mb-1 capitalize">
                  {field.replace("currentStatus", "status")}
                </label>
                <input
                  type="text"
                  value={data[field]}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Payment History
              </label>
              <table className="w-full border-collapse mb-2">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Amount</th>
                    <th className="border border-gray-300 p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.history.map(
                    (
                      h: { date: string; amount: string; status: string },
                      i: number
                    ) => (
                      <tr key={i}>
                        <td className="border border-gray-300 p-2">{h.date}</td>
                        <td className="border border-gray-300 p-2">
                          {h.amount}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {h.status}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Update Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="Pending">Pending</option>
                <option value="Released">Released</option>
                <option value="Held">Held</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
            {(status === "Held" || status === "Canceled") && (
              <div className="mb-4">
                <label className="block font-semibold mb-1">
                  Reason for Hold/Cancel
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="Enter reason for hold or cancel"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 ${
        data ? "flex" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl p-6 max-w-xl w-11/12">
        {renderContent()}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
