import ProcessSteps from './aboutUsComponents/AboutProcess'
import AboutHero from './aboutUsComponents/heroSection'
import ClientTalk from '../home/homeComponents/ClientTalk'
import CTABanner from '../home/homeComponents/CTABanner'
import PortfolioWork from '../home/homeComponents/PortfolioWork'

const AboutUs = () => {
  return (
   <>
   <div className='mt-40'>
   <AboutHero />
   <PortfolioWork />
   <ProcessSteps />
   <ClientTalk />
   <CTABanner />

   </div>
   </>
  )
}

export default AboutUs