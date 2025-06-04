import Header from "../common/Header/Header";
import Hero from "../common/Hero/Hero";
import SearchFilter from "../common/SearchFilter/SearchFilter";
import WhyRiseEasy from "../common/WhyRiseEasy/WhyRiseEasy";
import StartCampaign from "../common/StartCampign/StartCampign";
import Footer from "../common/Footer/Footer";
import CampaignGrid from "../common/Campaign/CampaignGrid/CampaignGrid";

function Homepage() {
  return (
    <>
      <Header />
      <Hero />
      <SearchFilter />
      <CampaignGrid />
      <WhyRiseEasy />
      <StartCampaign />
      <Footer />
    </>
  );
}

export default Homepage;
