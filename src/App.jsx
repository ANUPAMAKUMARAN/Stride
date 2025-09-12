
import './App.css'

import ActionCard from './components/ActionCard';
import Carousel from './components/Carousel';
import CleanKeralaLanding from './components/CleanKeralaLanding';
import DirectorsCarousel from './components/DirectorsCarousel';
import FaqCarousel from './components/FaqCarousel';
import ImpactsAcheivements from './components/ImpactsAcheivements';

import LeaderCard from './components/LeaderCard';
import LeadersCarousel from './components/LeadersCarousel';
import RecoveryHero from './components/RecoveryHero';
import SaudiPccCarousel from './components/saudiPccCarousel';
import SaudiPccLandingpage from './components/SaudiPccLandingpage';
import SaudiPCCpage from './components/SaudiPCCpage';
import SaudiPccSection from './components/SaudiPccSection';
import SaudiPccServices from './components/SaudiPccServices';
import ComparisonTable from './components/SaudiPccTable';
import Sidebar from './components/Sidebar';
import StoryCraftCarousel from './components/StoryCraftCarousel';
import VideoCarousel from './components/VideoCarousel';
import { ActioncardData } from './data/ActioncardData';
import { FaqCarouselData } from './data/FaqCarouselData';
import { ImpactAchievementData } from './data/impactsAchievementData';
import { RecoveryHeroData } from './data/RecoveryHeroData';
import { SaudiPccLandingpageData } from './data/SaudiPccLandingpageData';
import { SaudiPccSectionData } from './data/SaudiPccSectionData';
import { SaudiPccTableData } from './data/SaudiPccTableData';
import { SidebarData } from './data/SidebarData';
import { StoryCraftCarouselData } from './data/StoryCraftCarouselData';
import { VideoCarouselData } from './data/VideoCarouselData';




function App() {
  

  return (
    <>
    <div>
            <FaqCarousel attributes={FaqCarouselData}/>
      <RecoveryHero attributes={RecoveryHeroData}/>
      <StoryCraftCarousel attributes={StoryCraftCarouselData} />
     
       <SaudiPccSection attributes={SaudiPccSectionData}/>   
      {/* <FaqCarousel attributes={FaqCarouselData}/> */}
       
      {/* <SaudiPccLandingpage attributes={SaudiPccLandingpageData}/> */}
      <VideoCarousel attributes={VideoCarouselData}/>
       {/* <SaudiPccLandingpage attributes={SaudiPccLandingpageData}/> */}
      <Sidebar attributes={SidebarData}/>
      <ActionCard attributes={ActioncardData}/>
      <ImpactsAcheivements attributes={ImpactAchievementData} />
      <ComparisonTable attributes={SaudiPccTableData}/>      
      <SaudiPccCarousel/>
       <SaudiPCCpage/>
         
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
