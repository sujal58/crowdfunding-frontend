import { useState } from "react";
import "./CampignCard.css";
import DonationCard from "@/components/common/modal/DonationCard";

type cardProps = {
  campaignId: number;
  title: string;
  description: string;
  creator?: string;
  goal: number;
  progress: number;
  image?: string;
  onDonate: (amount: number, customAmount?: number) => void;
};

function CampaignCard({
  campaignId,
  title,
  description,
  creator,
  goal,
  progress,
  image,
  onDonate,
}: cardProps) {
  const [showAmountModal, setShowAmountModal] = useState(false);

  const handleDonateClick = () => {
    setShowAmountModal(true);
  };

  const handleCloseModal = () => {
    setShowAmountModal(false);
  };

  return (
    <article className="campaign-card">
      <img src={image} alt={`Image of ${title}`} className="campaign-image" />
      <div className="campaign-content">
        <h2 className="campaign-title">{title}</h2>
        <p className="campaign-description">{description}</p>
        <p className="campaign-creator">By: {creator}</p>
        <p className="campaign-goal">${goal}</p>
        <div className="progress-bar-bg">
          <div
            style={{ width: `${progress}%` }}
            className="progress-bar-fill"
          ></div>
        </div>
        <button className="donate-btn" onClick={handleDonateClick}>
          Donate
        </button>
      </div>
      {showAmountModal && (
        <DonationCard
          campaignId={campaignId}
          campaignName={title}
          isOpen={showAmountModal}
          onClose={handleCloseModal}
          onDonate={onDonate}
        />
      )}
    </article>
  );
}

export default CampaignCard;
