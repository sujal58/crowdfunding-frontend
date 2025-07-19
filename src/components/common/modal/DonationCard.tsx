import React, { useState, useEffect } from "react";
import "./DonationCard.css";
import { toast } from "react-toastify";
import type { IPaymentIntentRequest } from "@/interfaces/payment.interface";
import { InitiatePayment } from "@/apis/payment.api";
import { useNavigate } from "react-router-dom";

interface DonationCardProps {
  campaignId: number;
  campaignName: string;
  isOpen: boolean;
  onClose: () => void;
  onDonate: (amount: number, customAmount?: number) => void;
  // setClientSecret: (secret: string) => void;
  // showPaymentModal: () => void;
}

const DonationCard: React.FC<DonationCardProps> = ({
  campaignId,
  campaignName,
  isOpen,
  onClose,
  // onDonate,
  // setClientSecret,
  // showPaymentModal,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const { username } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      setSelectedAmount(null);
      setCustomAmount("");
    }
  }, [isOpen]);

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setCustomAmount(value);
    if (value !== "") setSelectedAmount(null);
  };

  const handleDonate = async () => {
    setError(null);
    setLoading(true);

    const amountToDonate = customAmount !== "" ? customAmount : selectedAmount;

    if (!amountToDonate || isNaN(amountToDonate) || amountToDonate <= 0) {
      alert("Please select or enter a valid amount.");
      setLoading(false);
      return;
    }

    try {
      const payload: IPaymentIntentRequest = {
        email: "pandeysujal258@gmail.com",
        campaignId: campaignId,
        amount: amountToDonate,
      };

      const response = await InitiatePayment(payload);

      console.log(response);

      handleAmountSubmit(response.data.data.clientSecret);
      // onDonate(
      //   Number(amountToDonate),
      //   customAmount !== "" ? customAmount : undefined
      // );
      // onClose();
    } catch (err) {
      console.log(err);
      console.error("Error fetching clientSecret:", err);
      setError("Failed to initiate payment");
      toast.error("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  const handleAmountSubmit = (clientSecret: string) => {
    // setClientSecret(clientSecret);
    // showPaymentModal();
    onClose();
    navigate("/user-dashboard/payment", {
      state: {
        clientSecret,
        campaignName: campaignName,
        userEmail: "pandeysujal258@gmail.com",
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="donateModalTitle"
      aria-hidden={!isOpen}
    >
      <div className="modal" tabIndex={0}>
        <h2 id="donateModalTitle">Donate to {campaignName}</h2>
        <div
          className="presetAmounts"
          role="radiogroup"
          aria-label="Select donation amount"
        >
          {[10, 50, 100].map((amount) => (
            <button
              key={amount}
              type="button"
              className={`presetButton ${
                selectedAmount === amount ? "selected" : ""
              }`}
              data-value={amount}
              aria-pressed={selectedAmount === amount}
              onClick={() => handlePresetClick(amount)}
            >
              ${amount}
            </button>
          ))}
        </div>
        <label htmlFor="customAmount" className="customLabel">
          Custom amount
        </label>
        <input
          type="number"
          id="customAmount"
          min="1"
          aria-describedby="customAmountDesc"
          placeholder="Enter amount"
          value={customAmount === "" ? "" : customAmount}
          onChange={handleCustomChange}
          className="customAmount"
        />
        <div className="modalFooter">
          <button className="btnCancel" id="cancelModalBtn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btnSubmit"
            id="submitDonationBtn"
            onClick={handleDonate}
          >
            {loading ? "Processing..." : "Donate"}
          </button>
        </div>
      </div>
      {error && <label>{error}</label>}
    </div>
  );
};

export default DonationCard;
