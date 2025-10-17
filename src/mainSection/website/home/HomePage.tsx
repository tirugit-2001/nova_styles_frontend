import ClientTalk from "./homeComponents/ClientTalk"
import CTABanner from "./homeComponents/CTABanner"
import CustomProduct from "./homeComponents/CustomProduct"
import HeroSection from "./homeComponents/HeroSection"
import InteriorScroll from "./homeComponents/InteriorScroll"
import NovaProductDemo from "./homeComponents/NovaProduct"
import PortfolioWork from "./homeComponents/PortfolioWork"
import ServiceSection from "./homeComponents/ServiceSection"

const HomePage = () => {

  return (
    <>
     <HeroSection />
     <ServiceSection />
     <ClientTalk />
     <PortfolioWork />
     <InteriorScroll />
      <NovaProductDemo /> 
      <CustomProduct />
      <ClientTalk />
      <CTABanner />
    </>
  )
}

export default HomePage