
import './App.css'
import Carousel from './components/Carousel';

import Directors from './components/Directors';
import Gradient from './components/Gradient';
import LeaderCard from './components/LeaderCard';
import LeadersCarousel from './components/LeadersCarousel';
import WhyChooseUs from './components/WhyChooseUs';

function App() {
  

  return (
    <>
    <div>
      <LeaderCard/>
      <LeadersCarousel/>
      <Gradient/>
 
      <Directors/>
      <Carousel/>
      {/* <WhyChooseUs /> */}
    </div>
     
    </>
  )
}

export default App
