
import './App.css'
import Carousel from './components/Carousel';
import DirectorsCarousel from './components/DirectorsCarousel';
import LeaderCard from './components/LeaderCard';
import LeadersCarousel from './components/LeadersCarousel';
// import WhyChooseUs from './components/WhyChooseUs';

function App() {
  

  return (
    <>
    <div>
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
