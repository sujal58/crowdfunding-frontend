import Header from "../common/Header/Header";
import Hero from "../common/Hero/Hero";
import SearchFilter from "../common/SearchFilter/SearchFilter";
import CampaignGrid from "../common/CampaignGrid/CampaignGrid";
import WhyRiseEasy from "../common/WhyRiseEasy/WhyRiseEasy";
import StartCampaign from "../common/StartCampign/StartCampign";
import Footer from "../common/Footer/Footer";

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
