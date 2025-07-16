import React, { useState, useEffect } from "react";
import "./DonationCard.css";

interface DonationCardProps {
  campaignName: string; // Name of the campaign
  isOpen: boolean; // Controlled visibility
  onClose: () => void; // Callback to close the modal
  onDonate: (amount: number, customAmount?: number) => void; // Callback for donation submission
}

const DonationCard: React.FC<DonationCardProps> = ({
  campaignName,
  isOpen,
  onClose,
  onDonate,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number | "">("");

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

  const handleDonate = () => {
    const amountToDonate = customAmount !== "" ? customAmount : selectedAmount;
    if (amountToDonate && amountToDonate > 0) {
      onDonate(amountToDonate, customAmount !== "" ? customAmount : undefined);
      onClose();
    } else {
      alert("Please select or enter a valid amount.");
    }
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
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
