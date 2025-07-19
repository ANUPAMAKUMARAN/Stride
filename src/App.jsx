
import './App.css'
import Carousel from './components/Carousel';
import CleanKeralaLanding from './components/CleanKeralaLanding';
import DirectorsCarousel from './components/DirectorsCarousel';
import LeaderCard from './components/LeaderCard';
import LeadersCarousel from './components/LeadersCarousel';
import WhyChooseUs from './components/WhyChooseUs';

function App() {
  

  return (
    <>
    <div>
      <WhyChooseUs />
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
