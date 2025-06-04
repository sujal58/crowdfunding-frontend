import Carousel from "../../ui/Carousel/Carousel";
import CampaignTabs from "../../common/Campaign/CampignTabs/CampaignTabs";
import CampaignDescription from "../../common/Campaign/CampaignDescription/CampaignDescription";
import DonationFeed from "../../ui/Donation/DonationFeed";
import TransparencyTable from "../../ui/Donation/TransparencyTable";
import Comments from "../../ui/Donation/Comment";
import CampaignCard from "../../ui/CampaignCard/CampaignCard";

function CampaignDetailsPage() {
  const tabs = [
    { id: "details", label: "Details", content: <CampaignDescription /> },
    { id: "donationFeed", label: "Donations", content: <DonationFeed /> },
    {
      id: "transparency",
      label: "Transparency",
      content: <TransparencyTable />,
    },
    { id: "comments", label: "Comments", content: <Comments /> },
  ];

  const campaign = {
    title: "Clean Water for All",
    description: "Providing clean drinking water to rural communities in need.",
    creator: "WaterHope NGO",
    goal: 10000,
    progress: 78,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  };

  return (
    <main className="flex justify-center items-center h-auto">
      <div className="max-w-[900px]" style={{ margin: "2rem auto" }}>
        <CampaignCard
          title={campaign.title}
          description={campaign.description}
          creator={campaign.creator}
          goal={campaign.goal}
          progress={campaign.progress}
          image={campaign.image}
        />
        <Carousel />
        <CampaignTabs tabs={tabs} />
      </div>
    </main>
  );
}

export default CampaignDetailsPage;
