
import './App.css'

import ActionCard from './components/ActionCard';
import Carousel from './components/Carousel';
import CleanKeralaLanding from './components/CleanKeralaLanding';
import CountryScroll from './components/CountryScroll';
import CountryyChart from './components/CountryyChart';
import DirectorsCarousel from './components/DirectorsCarousel';
import FaqCarousel from './components/FaqCarousel';
import FlippedSlides from './components/FlippedSlides';
import ImpactsAcheivements from './components/ImpactsAcheivements';
import KlarnaBrands from './components/KlarnaBrands';
import LeaderCard from './components/LeaderCard';
import LeadersCarousel from './components/LeadersCarousel';
import MacCarousel from './components/MacCarousel';
// import PhyshealCarousel from './components/PhyshealCarousel';
import RecoveryHero from './components/RecoveryHero';
import RecoveryJourney from './components/RecoveryJourney';
import RecoveryPage from './components/RecoveryPage';
import SaudiPccCarousel from './components/saudiPccCarousel';
// import SaudiPccLandingpage from './components/SaudiPccLandingpage';
import SaudiPCCpage from './components/SaudiPCCpage';
import SaudiPccSection from './components/SaudiPccSection';
import SaudiPccServices from './components/SaudiPccServices';
import ComparisonTable from './components/SaudiPccTable';

import Sidebar from './components/Sidebar';
import StoryCraftCarousel from './components/StoryCraftCarousel';
import VideoCarousel from './components/VideoCarousel';


import { ActioncardData } from './data/ActioncardData';
import { CountryScrollData } from './data/CountryScrollData';
import { CountryyChartData } from './data/CountryyChartData';
import { FaqCarouselData } from './data/FaqCarouselData';
import { FlippedSlidesData } from './data/FlippedSlidesData';
import { ImpactAchievementData } from './data/impactsAchievementData';
import { KlarnaBrandsData } from './data/KlarnaBrandsData';
import { MacCarouselData } from './data/MacCarouselData';
import { RecoveryHeroData } from './data/RecoveryHeroData';
import { RecoveryJourneyData } from './data/RecoveryJourneyData';
import { RecoveryPageData } from './data/RecoveryPageData';
// import { PhyshealCarouselData, RecoveryJourneyData } from './data/Sampledata';
// import { SaudiPccLandingpageData } from './data/SaudiPccLandingpageData';
import { SaudiPccSectionData } from './data/SaudiPccSectionData';
import { SaudiPccTableData } from './data/SaudiPccTableData';
import { SidebarData } from './data/SidebarData';
import { StoryCraftCarouselData } from './data/StoryCraftCarouselData';
import { VideoCarouselData } from './data/VideoCarouselData';




function App() {


  return (
    <>
      <div>
        <FlippedSlides attributes={FlippedSlidesData}/>
        <KlarnaBrands attributes={KlarnaBrandsData}/>
        <MacCarousel attributes={MacCarouselData}/>
        <CountryScroll attributes={CountryScrollData} />


        <CountryyChart attributes={CountryyChartData} />



        <RecoveryJourney attributes={RecoveryJourneyData} />
        {/* <PhyshealCarousel attributes={PhyshealCarouselData}/> */}
        <RecoveryPage attributes={RecoveryPageData} />

        <RecoveryHero attributes={RecoveryHeroData} />
        <FaqCarousel attributes={FaqCarouselData} />
        <StoryCraftCarousel attributes={StoryCraftCarouselData} />

        <SaudiPccSection attributes={SaudiPccSectionData} />
        {/* <SaudiPccLandingpage attributes={SaudiPccLandingpageData}/> */}
        <VideoCarousel attributes={VideoCarouselData} />
        {/* <SaudiPccLandingpage attributes={SaudiPccLandingpageData}/> */}
        <Sidebar attributes={SidebarData} />
        <ActionCard attributes={ActioncardData} />
        <ImpactsAcheivements attributes={ImpactAchievementData} />
        <ComparisonTable attributes={SaudiPccTableData} />
        <SaudiPccCarousel />
        <SaudiPCCpage />

        <SaudiPccServices />
        <CleanKeralaLanding />
        <LeaderCard />
        <LeadersCarousel />
        <DirectorsCarousel />
        <Carousel />

      </div>

    </>
  )
}

export default App
