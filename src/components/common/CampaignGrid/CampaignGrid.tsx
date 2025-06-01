import CampaignCard from "../../ui/CampaignCard/CampaignCard";
import "./CampaignGrid.css";

function CampaignGrid() {
  const campaigns = [
    {
      title: "Clean Water for All",
      description:
        "Providing clean drinking water to rural communities in need.",
      creator: "WaterHope NGO",
      goal: 10000,
      progress: 78,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Education for Every Child",
      description:
        "Funding school supplies and scholarships for underprivileged kids.",
      creator: "LearnBright Foundation",
      goal: 15000,
      progress: 36,
      image:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Medical Aid in Remote Areas",
      description: "Supplying medical equipment to underserved regions.",
      creator: "HealthReach Org",
      goal: 12000,
      progress: 72,
      image:
        "https://images.unsplash.com/photo-1533553502768-f7ad9f9ccfe8?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Reforestation Project",
      description: "Planting trees to combat deforestation and climate change.",
      creator: "GreenFuture Initiative",
      goal: 20000,
      progress: 69,
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div>
      <h2 className="campaign-grid-heading">Trending Campigns</h2>
      <section className="campaign-grid" aria-label="Featured Campign">
        {campaigns.map((value) => {
          return (
            <CampaignCard
              key={value.title}
              title={value.title}
              description={value.description}
              creator={value.creator}
              goal={value.goal}
              progress={value.progress}
              image={value.image}
            />
          );
        })}
      </section>
    </div>
  );
}

export default CampaignGrid;
