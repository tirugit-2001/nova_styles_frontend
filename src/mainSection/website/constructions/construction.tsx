import ConsClientTalk from "./constructionsComponents/ConsClientTalk"
import ConsHeroSection from "./constructionsComponents/ConsHeroSection"
import ConsInteriorScroll from "./constructionsComponents/ConsInteriorScroll"
import ConsPortfolioWork from "./constructionsComponents/ConsPortfolioWork"
import ConsProcessSteps from "./constructionsComponents/ConstructionAboutProcess"

const construction = () => {
  return (
    <>
    <ConsHeroSection />
    <ConsPortfolioWork />
    <ConsClientTalk />
    <ConsProcessSteps />
    <ConsInteriorScroll />
    </>
  )
}

export default construction