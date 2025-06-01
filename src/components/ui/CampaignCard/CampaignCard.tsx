import "./CampignCard.css";

type cardProps = {
  title: string;
  description: string;
  creator: string;
  goal: number;
  progress: number;
  image: string;
};

function CampaignCard({
  title,
  description,
  creator,
  goal,
  progress,
  image,
}: cardProps) {
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
        <button className="donate-btn">Donate</button>
      </div>
    </article>
  );
}

export default CampaignCard;
