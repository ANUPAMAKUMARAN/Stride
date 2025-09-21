
import './App.css'

import ActionCard from './components/ActionCard';
import Carousel from './components/Carousel';
import CleanKeralaLanding from './components/CleanKeralaLanding';
// import CountryChart from './components/CountryChart';
import CountryyChart from './components/CountryyChart';
import DirectorsCarousel from './components/DirectorsCarousel';
import FaqCarousel from './components/FaqCarousel';
import ImpactsAcheivements from './components/ImpactsAcheivements';

import LeaderCard from './components/LeaderCard';
import LeadersCarousel from './components/LeadersCarousel';
// import PhyshealCarousel from './components/PhyshealCarousel';
import RecoveryHero from './components/RecoveryHero';
import RecoveryJourney from './components/RecoveryJourney';
import RecoveryPage from './components/RecoveryPage';
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
import { CountryyChartData } from './data/CountryyChartData';
import { FaqCarouselData } from './data/FaqCarouselData';
import { ImpactAchievementData } from './data/impactsAchievementData';
import { RecoveryHeroData } from './data/RecoveryHeroData';
import { RecoveryJourneyData } from './data/RecoveryJourneyData';
import { RecoveryPageData } from './data/RecoveryPageData';
// import { CountryChartData } from './data/Sampledata';
// import { PhyshealCarouselData, RecoveryJourneyData } from './data/Sampledata';
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
      <CountryyChart attributes={CountryyChartData}/>
      
      {/* <CountryChart attributes={CountryChartData}/> */}
      <RecoveryJourney attributes={RecoveryJourneyData}/>
      {/* <PhyshealCarousel attributes={PhyshealCarouselData}/> */}
      <RecoveryPage attributes={RecoveryPageData}/>
           
      <RecoveryHero attributes={RecoveryHeroData}/>
      <FaqCarousel attributes={FaqCarouselData}/>
      <StoryCraftCarousel attributes={StoryCraftCarouselData} />
     
       <SaudiPccSection attributes={SaudiPccSectionData}/>          
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
