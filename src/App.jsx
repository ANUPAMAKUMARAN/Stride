
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
import Sidebar from './components/Sidebar';
import { ActioncardData } from './data/ActioncardData';
import { ImpactAchievementData } from './data/impactsAchievementData';
import { SaudiPccTableData } from './data/SaudiPccTableData';
import { SidebarData } from './data/SidebarData';




function App() {
  

  return (
    <>
    <div>

      
     <Sidebar attributes={SidebarData}/>
       <ActionCard attributes={ActioncardData}/>
     <ImpactsAcheivements attributes={ImpactAchievementData} />
      <ComparisonTable attributes={SaudiPccTableData}/>
      
      <SaudiPccCarousel/>
      <SaudiPccSection/>
      
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
