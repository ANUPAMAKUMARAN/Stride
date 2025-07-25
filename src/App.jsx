
import './App.css'
import ActionCard from './components/ActionCard';
import Carousel from './components/Carousel';
import CleanKeralaLanding from './components/CleanKeralaLanding';
import DirectorsCarousel from './components/DirectorsCarousel';
import LeaderCard from './components/LeaderCard';
import LeadersCarousel from './components/LeadersCarousel';
import SaudiPccServices from './components/SaudiPccServices';
import WhyChooseUs from './components/WhyChooseUs';

function App() {
  

  return (
    <>
    <div>
      <SaudiPccServices/>
      <ActionCard/>
      {/* <WhyChooseUs /> */}
      
      <CleanKeralaLanding/>
      <LeaderCard/>
      <LeadersCarousel/>
      
 
      <DirectorsCarousel/>
      <Carousel/>
      {/* <WhyChooseUs /> */}
    </div>
     
    </>
  )
}

export default App
