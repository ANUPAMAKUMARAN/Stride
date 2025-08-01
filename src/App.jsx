

// import { SampleData } from '../data/SampleData';
import './App.css'
import ActionCard from './components/ActionCard';
import Carousel from './components/Carousel';
import CleanKeralaLanding from './components/CleanKeralaLanding';
import DirectorsCarousel from './components/DirectorsCarousel';
import LeaderCard from './components/LeaderCard';
import LeadersCarousel from './components/LeadersCarousel';
// import SampleComponent from './components/SampleComponent';
import SaudiPccServices from './components/SaudiPccServices';
// import WhyChooseUs from './components/WhyChooseUs';

function App() {
  

  return (
    <>
    <div>
      <ActionCard/>
      {/* <SampleComponent attributes={SampleData}/> */}
      <SaudiPccServices/>
      <CleanKeralaLanding/>
     
     
      <LeaderCard/>
      <LeadersCarousel/>
      <DirectorsCarousel/>
      <Carousel/>
      
    </div>
     
    </>
  )
}

export default App
