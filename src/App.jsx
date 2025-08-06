
import './App.css'

import ActionCard from './components/ActionCard';
import Carousel from './components/Carousel';
import CleanKeralaLanding from './components/CleanKeralaLanding';
import DirectorsCarousel from './components/DirectorsCarousel';
import ImpactsAcheivements from './components/ImpactsAcheivements';

import LeaderCard from './components/LeaderCard';
import LeadersCarousel from './components/LeadersCarousel';
import SaudiPccCarousel from './components/saudiPccCarousel';
import SaudiPccSection from './components/SaudiPccSection';
import SaudiPccServices from './components/SaudiPccServices';
import ComparisonTable from './components/SaudiPccTable';




function App() {
  

  return (
    <>
    <div>
      {/* <ImpactsAcheivements attributes={impactsAchievementData} /> */}
     <ImpactsAcheivements/>/
      <ComparisonTable/>
      <SaudiPccCarousel/>
      <SaudiPccSection/>
      <ActionCard/>
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
