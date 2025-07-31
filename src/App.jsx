

import './App.css'
import ActionCard from './components/ActionCard';
import Carousel from './components/Carousel';
import CleanKeralaLanding from './components/CleanKeralaLanding';
import DirectorsCarousel from './components/DirectorsCarousel';
import LeaderCard from './components/LeaderCard';
import LeadersCarousel from './components/LeadersCarousel';
import SaudiPccServices from './components/SaudiPccServices';
// import { Attributes, Sample } from './components/Sample';
// import WhyChooseUs from './components/WhyChooseUs';

function App() {
  

  return (
    <>
    <div>
      {/* <Sample attributes={Attributes}/> */}
      <SaudiPccServices/>
      <CleanKeralaLanding/>
      {/* <SaudiPccServices/> */}
      <ActionCard/>
      <LeaderCard/>
      <LeadersCarousel/>
      <DirectorsCarousel/>
      <Carousel/>
      
    </div>
     
    </>
  )
}

export default App
