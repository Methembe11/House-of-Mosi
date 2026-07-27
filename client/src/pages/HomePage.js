import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { accommodations, experiences, restaurants, journalArticles, signatureJourneys, mapLocations } from '../data/data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/* ─── HERO ─── */
const Hero = styled.section`
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, ${p => p.theme.colors.primaryDark} 0%, ${p => p.theme.colors.primary} 40%, #2a4a3f 100%);
  overflow: hidden;
  &::before { content:''; position:absolute; inset:0; background: radial-gradient(ellipse at 20% 50%, rgba(216,195,165,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(107,79,58,0.1) 0%, transparent 50%); }
  &::after { content:''; position:absolute; bottom:0; left:0; right:0; height:200px; background: linear-gradient(transparent, ${p => p.theme.colors.background}); }
`;
const HeroContent = styled.div` text-align:center; position:relative; z-index:2; padding:0 2rem; max-width:900px; `;
const HeroLabel = styled(motion.div)` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.3em; color:${p=>p.theme.colors.champagne}; margin-bottom:2rem; font-weight:500; `;
const HeroTitle = styled(motion.h1)` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2.5rem,6vw,4.5rem); font-weight:300; color:${p=>p.theme.colors.white}; line-height:1.15; margin-bottom:1.5rem; `;
const HeroSub = styled(motion.p)` font-size:${p=>p.theme.fontSizes.lg}; color:rgba(255,255,255,0.7); max-width:600px; margin:0 auto 3rem; line-height:1.7; font-weight:300; `;
const HeroCTAs = styled(motion.div)` display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; `;
const BtnPrimary = styled(Link)` padding:1rem 2.5rem; background:${p=>p.theme.colors.champagne}; color:${p=>p.theme.colors.text}; font-size:${p=>p.theme.fontSizes.sm}; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; transition:all 0.3s; &:hover{ background:${p=>p.theme.colors.white}; transform:translateY(-2px); } `;
const BtnOutline = styled(Link)` padding:1rem 2.5rem; background:transparent; color:${p=>p.theme.colors.white}; border:1px solid rgba(255,255,255,0.35); font-size:${p=>p.theme.fontSizes.sm}; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; transition:all 0.3s; &:hover{ background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.6); transform:translateY(-2px); } `;

/* ─── SHARED SECTION ─── */
const Section = styled.section` padding:${p=>p.theme.spacing.section} 2rem; max-width:1400px; margin:0 auto; `;
const FullBleed = styled.section` padding:${p=>p.theme.spacing.section} 0; overflow:hidden; `;
const SectionHeader = styled.div` text-align:center; margin-bottom:3.5rem; `;
const SectionLabel = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.25em; color:${p=>p.theme.colors.cocoa}; font-weight:500; display:block; margin-bottom:0.75rem; `;
const SectionTitle = styled.h2` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,4vw,3rem); font-weight:400; color:${p=>p.theme.colors.text}; margin-bottom:1rem; `;
const SectionDesc = styled.p` font-size:${p=>p.theme.fontSizes.md}; color:${p=>p.theme.colors.textLight}; max-width:550px; margin:0 auto; line-height:1.7; `;

/* ─── 2. SIGNATURE JOURNEYS ─── */
const JourneyScroll = styled.div` display:flex; gap:1.5rem; padding:0 2rem; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scrollbar-width:none; &::-webkit-scrollbar{display:none;} `;
const JourneyCard = styled(Link)` flex:0 0 340px; scroll-snap-align:start; position:relative; height:440px; overflow:hidden; display:block; border-radius:2px; &:hover .jimg img{transform:scale(1.06);} &:hover .joverlay{opacity:1;} `;
const JImg = styled.div` position:absolute; inset:0; background:${p=>p.theme.colors.primary}; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.6s; } `;
const JOverlay = styled.div` position:absolute; inset:0; background:linear-gradient(transparent 40%, rgba(31,58,50,0.92)); display:flex; flex-direction:column; justify-content:flex-end; padding:2rem; transition:opacity 0.3s; `;
const JTag = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.2em; color:${p=>p.theme.colors.champagne}; margin-bottom:0.5rem; font-weight:500; `;
const JName = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:1.6rem; color:${p=>p.theme.colors.white}; font-weight:400; margin-bottom:0.75rem; line-height:1.25; `;
const JMeta = styled.div` display:flex; align-items:center; gap:1rem; font-size:${p=>p.theme.fontSizes.sm}; color:rgba(255,255,255,0.7); `;
const JPrice = styled.span` color:${p=>p.theme.colors.champagne}; font-weight:600; `;

/* ─── 3. WHY VICTORIA FALLS ─── */
const SplitSection = styled.div` display:grid; grid-template-columns:1fr 1fr; max-width:1400px; margin:0 auto; padding:0 2rem; gap:4rem; align-items:center; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:1fr; gap:2rem; } `;
const SplitImage = styled.div` height:550px; overflow:hidden; background:${p=>p.theme.colors.primary}; img{ width:100%; height:100%; object-fit:cover; } @media(max-width:${p=>p.theme.breakpoints.tablet}){ height:350px; } `;
const SplitContent = styled.div` padding:2rem 0; `;
const SplitTitle = styled.h2` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,4vw,3rem); font-weight:400; color:${p=>p.theme.colors.text}; margin-bottom:2rem; line-height:1.2; `;
const SplitText = styled.p` font-size:${p=>p.theme.fontSizes.md}; color:${p=>p.theme.colors.textLight}; line-height:1.8; margin-bottom:2.5rem; `;
const HighlightList = styled.ul` list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:1.25rem; `;
const HighlightItem = styled.li` display:flex; align-items:flex-start; gap:1rem; font-size:${p=>p.theme.fontSizes.md}; color:${p=>p.theme.colors.text}; line-height:1.6; `;
const HighlightIcon = styled.span` flex-shrink:0; width:40px; height:40px; background:${p=>p.theme.colors.primary}; color:${p=>p.theme.colors.white}; display:flex; align-items:center; justify-content:center; border-radius:50%; `;

/* ─── 4. EXCEPTIONAL STAYS ─── */
const StaysGrid = styled.div` display:grid; grid-template-columns:repeat(2,1fr); gap:2rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:1fr; } `;
const StayCard = styled(Link)` display:grid; grid-template-columns:1fr 1fr; background:${p=>p.theme.colors.white}; overflow:hidden; transition:all 0.4s; &:hover{ box-shadow:${p=>p.theme.shadows.lg}; .stay-img img{transform:scale(1.04);} } @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:1fr; } `;
const StayImg = styled.div` height:280px; overflow:hidden; background:${p=>p.theme.colors.backgroundAlt}; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.6s; } `;
const StayBody = styled.div` padding:2rem; display:flex; flex-direction:column; justify-content:center; `;
const StayCategory = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.2em; color:${p=>p.theme.colors.cocoa}; font-weight:500; margin-bottom:0.5rem; `;
const StayName = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:1.5rem; font-weight:400; color:${p=>p.theme.colors.text}; margin-bottom:0.5rem; `;
const StayRating = styled.div` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textMuted}; margin-bottom:0.75rem; span{ color:${p=>p.theme.colors.text}; font-weight:600; } `;
const StayPrice = styled.div` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textLight}; strong{ font-size:1.25rem; font-weight:600; color:${p=>p.theme.colors.text}; } `;
const StayBtn = styled.span` display:inline-flex; align-items:center; gap:0.5rem; margin-top:1rem; font-size:${p=>p.theme.fontSizes.sm}; font-weight:600; color:${p=>p.theme.colors.primary}; text-transform:uppercase; letter-spacing:0.1em; `;

/* ─── 5. EXPERIENCES ─── */
const ExpScroll = styled.div` display:flex; gap:1.5rem; padding:0 2rem; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scrollbar-width:none; &::-webkit-scrollbar{display:none;} `;
const ExpCard = styled(Link)` flex:0 0 300px; scroll-snap-align:start; position:relative; height:420px; overflow:hidden; border-radius:2px; display:block; &:hover .expimg img{transform:scale(1.06);} `;
const ExpImg = styled.div` position:absolute; inset:0; background:${p=>p.theme.colors.primary}; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.6s; } `;
const ExpOverlay = styled.div` position:absolute; inset:0; background:linear-gradient(transparent 40%, rgba(0,0,0,0.75)); display:flex; flex-direction:column; justify-content:flex-end; padding:1.75rem; `;
const ExpType = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.2em; color:${p=>p.theme.colors.champagne}; margin-bottom:0.5rem; `;
const ExpName = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:1.4rem; color:${p=>p.theme.colors.white}; font-weight:400; margin-bottom:0.5rem; line-height:1.25; `;
const ExpMeta = styled.div` display:flex; align-items:center; gap:1rem; font-size:${p=>p.theme.fontSizes.sm}; color:rgba(255,255,255,0.7); `;

/* ─── 6. MAP ─── */
const MapSection = styled.div` max-width:1200px; margin:0 auto; padding:0 2rem; `;
const MapContainer = styled.div` position:relative; width:100%; height:500px; background:linear-gradient(135deg, #1a3329, #2a4a3f); border-radius:4px; overflow:hidden; @media(max-width:${p=>p.theme.breakpoints.tablet}){ height:350px; } `;
const MapLabel = styled.div` position:absolute; top:2rem; left:2rem; z-index:3; `;
const MapPin = styled.div` position:absolute; width:${p=>p.$size||32}px; height:${p=>p.$size||32}px; border-radius:50%; background:${p=>p.$color||p.theme.colors.champagne}; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.3s; z-index:2; box-shadow:0 2px 8px rgba(0,0,0,0.3); transform:translate(-50%,-50%); &:hover{ transform:translate(-50%,-50%) scale(1.2); z-index:5; } svg{ width:14px; height:14px; fill:${p=>p.$iconColor||'#fff'}; } `;
const MapDot = styled.div` position:absolute; width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,0.2); transform:translate(-50%,-50%); `;

const MapLegend = styled.div` display:flex; gap:2rem; margin-top:1.5rem; flex-wrap:wrap; `;
const LegendItem = styled.div` display:flex; align-items:center; gap:0.5rem; font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textMuted}; `;
const LegendDot = styled.span` width:10px; height:10px; border-radius:50%; background:${p=>p.$color}; `;

/* ─── 7. JOURNEY PLANNER ─── */
const PlannerSection = styled.div` background:${p=>p.theme.colors.primary}; padding:6rem 2rem; text-align:center; color:${p=>p.theme.colors.white}; `;
const PlannerInner = styled.div` max-width:1000px; margin:0 auto; `;
const PlannerTitle = styled.h2` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,4vw,3rem); font-weight:300; color:${p=>p.theme.colors.white}; margin-bottom:1rem; `;
const PlannerDesc = styled.p` font-size:${p=>p.theme.fontSizes.md}; opacity:0.7; max-width:600px; margin:0 auto 3rem; line-height:1.7; `;
const StepsRow = styled.div` display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; margin-bottom:3rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:1fr; } `;
const StepCard = styled.div` background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); padding:2.5rem 1.5rem; text-align:center; `;
const StepNum = styled.div` font-family:${p=>p.theme.fonts.serif}; font-size:2rem; color:${p=>p.theme.colors.champagne}; margin-bottom:1rem; `;
const StepTitle = styled.h3` font-size:${p=>p.theme.fontSizes.lg}; font-weight:500; margin-bottom:0.75rem; `;
const StepText = styled.p` font-size:${p=>p.theme.fontSizes.sm}; opacity:0.6; line-height:1.6; `;
const PlannerBtn = styled(Link)` display:inline-block; padding:1rem 3rem; border:1px solid ${p=>p.theme.colors.champagne}; color:${p=>p.theme.colors.champagne}; font-size:${p=>p.theme.fontSizes.sm}; text-transform:uppercase; letter-spacing:0.15em; font-weight:500; transition:all 0.3s; &:hover{ background:${p=>p.theme.colors.champagne}; color:${p=>p.theme.colors.primary}; } `;

/* ─── 8. DINING ─── */
const DiningGrid = styled.div` display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:1fr; } `;
const DiningCard = styled(Link)` position:relative; height:400px; overflow:hidden; display:block; border-radius:2px; &:hover .dimg img{transform:scale(1.06);} `;
const DImg = styled.div` position:absolute; inset:0; background:${p=>p.theme.colors.primary}; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.6s; } `;
const DOverlay = styled.div` position:absolute; inset:0; background:linear-gradient(transparent 50%, rgba(0,0,0,0.8)); display:flex; flex-direction:column; justify-content:flex-end; padding:2rem; `;
const DCuisine = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.2em; color:${p=>p.theme.colors.champagne}; margin-bottom:0.5rem; `;
const DName = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:1.5rem; color:${p=>p.theme.colors.white}; font-weight:400; margin-bottom:0.5rem; `;
const DMeta = styled.div` font-size:${p=>p.theme.fontSizes.sm}; color:rgba(255,255,255,0.7); display:flex; align-items:center; gap:1rem; `;

/* ─── 9. JOURNAL ─── */
const JournalGrid = styled.div` display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:repeat(2,1fr); } @media(max-width:${p=>p.theme.breakpoints.mobile}){ grid-template-columns:1fr; } `;
const JournalCard = styled(Link)` display:block; background:${p=>p.theme.colors.white}; overflow:hidden; transition:all 0.4s; &:hover{ box-shadow:${p=>p.theme.shadows.md}; .jimg img{transform:scale(1.03);} } `;
const JCardImg = styled.div` height:200px; overflow:hidden; background:${p=>p.theme.colors.backgroundAlt}; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.5s; } `;
const JCardBody = styled.div` padding:1.25rem; .cat{ font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.15em; color:${p=>p.theme.colors.cocoa}; font-weight:500; margin-bottom:0.5rem; } h3{ font-family:${p=>p.theme.fonts.serif}; font-size:1.1rem; font-weight:500; margin-bottom:0.5rem; line-height:1.3; color:${p=>p.theme.colors.text}; } p{ font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textLight}; line-height:1.6; } `;

/* ─── 10. SOCIAL PROOF ─── */
const ProofSection = styled.div` background:${p=>p.theme.colors.cream}; padding:${p=>p.theme.spacing.section} 0; `;
const ProofInner = styled.div` max-width:1400px; margin:0 auto; padding:0 2rem; `;
const ProofGrid = styled.div` display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:1fr; } `;
const ProofCard = styled.div` background:${p=>p.theme.colors.white}; padding:2.5rem; border-left:3px solid ${p=>p.theme.colors.primary}; `;
const ProofQuote = styled.p` font-size:${p=>p.theme.fontSizes.md}; color:${p=>p.theme.colors.text}; line-height:1.7; font-style:italic; margin-bottom:1.5rem; `;
const ProofAuthor = styled.div` .name{ font-weight:600; color:${p=>p.theme.colors.text}; font-size:${p=>p.theme.fontSizes.md}; } .trip{ font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textMuted}; margin-top:0.25rem; } `;

/* ─── 11. PROMISE ─── */
const PromiseSection = styled.div` padding:${p=>p.theme.spacing.section} 0; `;
const PromiseGrid = styled.div` display:grid; grid-template-columns:repeat(4,1fr); gap:3rem; max-width:1200px; margin:0 auto; padding:0 2rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:repeat(2,1fr); } @media(max-width:${p=>p.theme.breakpoints.mobile}){ grid-template-columns:1fr; } `;
const PromiseItem = styled.div` text-align:center; `;
const PromiseIcon = styled.div` width:64px; height:64px; background:${p=>p.theme.colors.primary}; color:${p=>p.theme.colors.white}; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem; border-radius:50%; `;
const PromiseTitle = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:${p=>p.theme.fontSizes.xl}; font-weight:400; color:${p=>p.theme.colors.text}; margin-bottom:0.75rem; `;
const PromiseText = styled.p` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textLight}; line-height:1.7; `;

/* ─── 12. FINAL CTA ─── */
const FinalCTA = styled.section` position:relative; height:60vh; min-height:450px; display:flex; align-items:center; justify-content:center; text-align:center; overflow:hidden; background:linear-gradient(135deg, ${p=>p.theme.colors.primaryDark}, ${p=>p.theme.colors.primary}); `;
const FinalCTAContent = styled.div` position:relative; z-index:2; padding:2rem; `;
const FinalCTATitle = styled.h2` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,5vw,3.5rem); font-weight:300; color:${p=>p.theme.colors.white}; margin-bottom:2.5rem; line-height:1.2; `;
const FinalCTAButtons = styled.div` display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; `;

/* ─── MAP SECTION PINS ─── */
const MAP_PINS = [
  { id:'acc', x:38, y:42, color:'#D8C3A5', size:28, icon:'dining', label:'Hotels & Lodges' },
  { id:'rest', x:52, y:55, color:'#B8B0A5', size:22, icon:'dining', label:'Restaurants' },
  { id:'exp', x:62, y:35, color:'#6B4F3A', size:24, icon:'sun', label:'Activities' },
  { id:'falls', x:48, y:30, color:'#F7F3EA', size:34, icon:'waterfall', label:'Victoria Falls' },
];

const HIGHLIGHTS = [
  { icon: 'sun', text: 'UNESCO World Heritage Site — one of the Seven Natural Wonders of the World' },
  { icon: 'elephant', text: 'Wildlife corridors connecting Zambezi National Park and beyond' },
  { icon: 'helicopter', text: 'Adventure capital — bungee, rafting, helicopter flights, and more' },
  { icon: 'spa', text: 'Luxury meets wilderness — world-class lodges in pristine settings' },
];

const PROOF_DATA = [
  { quote: 'House of Mosi made our honeymoon effortless. The helicopter flight over the falls at sunrise was the highlight of our lives.', name: 'Sarah & James', trip: '5-Day Honeymoon Journey' },
  { quote: 'We had no idea Victoria Falls had this level of luxury. The Victoria Falls Hotel exceeded every expectation.', name: 'The Chen Family', trip: '4-Day Family Discovery' },
  { quote: 'From the sunset cruise to the bush dinner under the stars — every moment was perfectly curated.', name: 'Amara & Kofi', trip: '3-Day Romantic Retreat' },
];

const PROMISES = [
  { icon: 'spa', title: 'Hand-Selected', text: 'Every stay is carefully chosen for quality, character, and authenticity.' },
  { icon: 'sun', title: 'Curated Experiences', text: 'Only the most extraordinary adventures make it onto our platform.' },
  { icon: 'elephant', title: 'Local Expertise', text: 'Built by people who know Victoria Falls intimately.' },
  { icon: 'wifi', title: 'Seamless Planning', text: 'Browse, plan, and book — everything in one place.' },
];

export default function HomePage() {
  const featuredStays = accommodations.filter(a => a.featured).slice(0, 4);
  const featuredExps = experiences.filter(e => e.featured);
  const featuredRests = restaurants.filter(r => r.featured);

  const expScrollRef = useRef(null);

  return (
    <>
      {/* ─── 1. HERO ─── */}
      <Hero>
        <HeroContent>
          <HeroLabel initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.2}}>House of Mosi</HeroLabel>
          <HeroTitle initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.4}}>Discover Victoria Falls, Beautifully Curated</HeroTitle>
          <HeroSub initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.6}}>
            Extraordinary journeys beyond the ordinary. Luxury stays, curated experiences,
            and the magic of Victoria Falls await.
          </HeroSub>
          <HeroCTAs initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.8}}>
            <BtnPrimary to="/discover">Explore Victoria Falls</BtnPrimary>
            <BtnOutline to="/plan">Plan My Journey</BtnOutline>
          </HeroCTAs>
        </HeroContent>
      </Hero>

      {/* ─── 2. SIGNATURE JOURNEYS ─── */}
      <FullBleed>
        <SectionHeader style={{padding:'0 2rem'}}>
          <SectionLabel>Signature Journeys</SectionLabel>
          <SectionTitle>Trips You'll Dream About</SectionTitle>
          <SectionDesc>Curated multi-day experiences — each one a complete Victoria Falls story</SectionDesc>
        </SectionHeader>
        <JourneyScroll>
          {signatureJourneys.map(j => (
              <JourneyCard key={j.id} to="/plan">
                <JImg className="jimg"><img src={j.images[0]} alt={j.name} loading="lazy" /></JImg>
                <JOverlay className="joverlay">
                  <JTag>{j.duration}</JTag>
                  <JName>{j.name}</JName>
                  <JMeta>
                    <JPrice>From ${j.priceFrom.toLocaleString()}</JPrice>
                    <span>{j.priceUnit}</span>
                  </JMeta>
                </JOverlay>
              </JourneyCard>
          ))}
        </JourneyScroll>
      </FullBleed>

      {/* ─── 3. WHY VICTORIA FALLS ─── */}
      <Section>
        <SplitSection>
          <SplitImage>
            <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80" alt="Victoria Falls aerial" loading="lazy" />
          </SplitImage>
          <SplitContent>
            <SectionLabel>Why Victoria Falls</SectionLabel>
            <SplitTitle>A Wonder of the World, A Playground for the Soul</SplitTitle>
            <SplitText>
              Victoria Falls is not just a destination — it's an experience that transforms you.
              Where the mighty Zambezi plunges into the Batoka Gorge, nature reveals its most
              dramatic spectacle. This is where luxury meets wilderness.
            </SplitText>
            <HighlightList>
              {HIGHLIGHTS.map((h, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
                  <HighlightItem>
                    <HighlightIcon><Icon name={h.icon} size={18} /></HighlightIcon>
                    <span>{h.text}</span>
                  </HighlightItem>
                </motion.div>
              ))}
            </HighlightList>
          </SplitContent>
        </SplitSection>
      </Section>

      {/* ─── 4. EXCEPTIONAL STAYS ─── */}
      <Section>
        <SectionHeader>
          <SectionLabel>Exceptional Places to Stay</SectionLabel>
          <SectionTitle>Handpicked Properties</SectionTitle>
          <SectionDesc>Where you rest matters. These are the stays we'd choose ourselves.</SectionDesc>
        </SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}} variants={stagger}>
          <StaysGrid>
            {featuredStays.map(acc => (
              <motion.div key={acc.id} variants={fadeUp}>
                <StayCard to={`/stays/${acc.slug}`}>
                  <StayImg className="stay-img"><img src={acc.images[0]} alt={acc.name} loading="lazy" /></StayImg>
                  <StayBody>
                    <StayCategory>{acc.category}</StayCategory>
                    <StayName>{acc.name}</StayName>
                    <StayRating>★ <span>{acc.rating}</span> · {acc.reviewCount.toLocaleString()} reviews</StayRating>
                    <StayPrice>From <strong>${acc.priceFrom}</strong> / night</StayPrice>
                    <StayBtn>Explore Stay <Icon name="arrow" size={14} /></StayBtn>
                  </StayBody>
                </StayCard>
              </motion.div>
            ))}
          </StaysGrid>
        </motion.div>
      </Section>

      {/* ─── 5. EXPERIENCES ─── */}
      <FullBleed>
        <SectionHeader style={{padding:'0 2rem'}}>
          <SectionLabel>Experiences Worth Traveling For</SectionLabel>
          <SectionTitle>Adventures That Define Victoria Falls</SectionTitle>
          <SectionDesc>From helicopter flights over the falls to sunset cruises on the Zambezi</SectionDesc>
        </SectionHeader>
        <ExpScroll ref={expScrollRef}>
          {featuredExps.map(exp => (
              <ExpCard key={exp.id} to={`/experiences/${exp.slug}`}>
                <ExpImg className="expimg"><img src={exp.images[0]} alt={exp.name} loading="lazy" /></ExpImg>
                <ExpOverlay>
                  <ExpType>{exp.type}</ExpType>
                  <ExpName>{exp.name}</ExpName>
                  <ExpMeta>
                    <span>{exp.duration}</span>
                    <span>★ {exp.rating}</span>
                    <span>${exp.priceFrom}/person</span>
                  </ExpMeta>
                </ExpOverlay>
              </ExpCard>
          ))}
        </ExpScroll>
      </FullBleed>

      {/* ─── 6. INTERACTIVE MAP ─── */}
      <Section>
        <SectionHeader>
          <SectionLabel>Interactive Map</SectionLabel>
          <SectionTitle>Explore Victoria Falls</SectionTitle>
          <SectionDesc>Hotels, restaurants, and activities — all in one view</SectionDesc>
        </SectionHeader>
        <MapSection>
          <MapContainer>
            <MapLabel>
              <SectionLabel style={{color:'rgba(255,255,255,0.5)',marginBottom:'0.25rem'}}>Victoria Falls</SectionLabel>
              <div style={{color:'rgba(255,255,255,0.3)',fontSize:'0.75rem'}}>Zimbabwe · Zambezi River</div>
            </MapLabel>
            {/* Map background pattern */}
            <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.08}} xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {/* River path */}
            <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:1}} viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 10,20 Q 30,25 45,28 Q 60,32 75,50 Q 85,65 95,80" fill="none" stroke="rgba(100,160,200,0.25)" strokeWidth="0.8" />
              <path d="M 15,18 Q 35,22 48,26 Q 58,30 70,45 Q 82,60 92,78" fill="none" stroke="rgba(100,160,200,0.15)" strokeWidth="1.5" />
            </svg>
            {/* Pins */}
            {MAP_PINS.map(pin => (
              <MapPin key={pin.id} style={{left:`${pin.x}%`,top:`${pin.y}%`}} $size={pin.size} $color={pin.color} $iconColor={pin.id==='falls'?'#1F3A32':'#fff'} title={pin.label}>
                <Icon name={pin.icon} size={12} />
              </MapPin>
            ))}
            {/* Extra location dots */}
            {mapLocations.filter(l=>l.type!=='accommodation').map(loc => (
              <MapDot key={loc.id} style={{left:`${(loc.lng-25.80)*400+20}%`,top:`${(-17.90-loc.lat)*400+30}%`}} />
            ))}
          </MapContainer>
          <MapLegend>
            <LegendItem><LegendDot $color="#D8C3A5" /> Hotels & Lodges</LegendItem>
            <LegendItem><LegendDot $color="#B8B0A5" /> Restaurants</LegendItem>
            <LegendItem><LegendDot $color="#6B4F3A" /> Activities</LegendItem>
            <LegendItem><LegendDot $color="#F7F3EA" /> Victoria Falls</LegendItem>
          </MapLegend>
        </MapSection>
      </Section>

      {/* ─── 7. JOURNEY PLANNER ─── */}
      <PlannerSection>
        <PlannerInner>
          <SectionLabel style={{color:'rgba(255,255,255,0.4)'}}>Plan Your Journey</SectionLabel>
          <PlannerTitle>Build Your Perfect Victoria Falls Trip</PlannerTitle>
          <PlannerDesc>Answer three simple questions and we'll craft a personalised itinerary just for you.</PlannerDesc>
          <StepsRow>
            <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
              <StepCard>
                <StepNum>01</StepNum>
                <StepTitle>Choose Your Style</StepTitle>
                <StepText>Romantic, adventure, family, or luxury — tell us what excites you.</StepText>
              </StepCard>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
              <StepCard>
                <StepNum>02</StepNum>
                <StepTitle>Set Your Budget</StepTitle>
                <StepText>From smart value to ultra luxury — we'll match the perfect stays.</StepText>
              </StepCard>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
              <StepCard>
                <StepNum>03</StepNum>
                <StepTitle>See Your Itinerary</StepTitle>
                <StepText>Get a day-by-day plan with linked bookings, ready to reserve.</StepText>
              </StepCard>
            </motion.div>
          </StepsRow>
          <PlannerBtn to="/plan">Start Planning</PlannerBtn>
        </PlannerInner>
      </PlannerSection>

      {/* ─── 8. DINING ─── */}
      <Section>
        <SectionHeader>
          <SectionLabel>Dining & Culinary</SectionLabel>
          <SectionTitle>Taste Victoria Falls</SectionTitle>
          <SectionDesc>From traditional Zimbabwean feasts to riverside fine dining</SectionDesc>
        </SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}} variants={stagger}>
          <DiningGrid>
            {featuredRests.map(rest => (
              <motion.div key={rest.id} variants={fadeUp}>
                <DiningCard to={`/dining/${rest.slug}`}>
                  <DImg className="dimg"><img src={rest.images[0]} alt={rest.name} loading="lazy" /></DImg>
                  <DOverlay>
                    <DCuisine>{rest.cuisine}</DCuisine>
                    <DName>{rest.name}</DName>
                    <DMeta>
                      <span>★ {rest.rating}</span>
                      <span>${rest.pricePerPerson}/person</span>
                    </DMeta>
                  </DOverlay>
                </DiningCard>
              </motion.div>
            ))}
          </DiningGrid>
        </motion.div>
      </Section>

      {/* ─── 9. JOURNAL ─── */}
      <Section>
        <SectionHeader>
          <SectionLabel>The Mosi Journal</SectionLabel>
          <SectionTitle>Stories & Guides</SectionTitle>
          <SectionDesc>Insider knowledge from the heart of Victoria Falls</SectionDesc>
        </SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}} variants={stagger}>
          <JournalGrid>
            {journalArticles.slice(0, 4).map(article => (
              <motion.div key={article.id} variants={fadeUp}>
                <JournalCard to={`/journal/${article.slug}`}>
                  <JCardImg className="jimg"><img src={article.image} alt={article.title} loading="lazy" /></JCardImg>
                  <JCardBody>
                    <div className="cat">{article.category}</div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                  </JCardBody>
                </JournalCard>
              </motion.div>
            ))}
          </JournalGrid>
        </motion.div>
      </Section>

      {/* ─── 10. SOCIAL PROOF ─── */}
      <ProofSection>
        <ProofInner>
          <SectionHeader>
            <SectionLabel>Recent Journeys</SectionLabel>
            <SectionTitle>Guest Experiences</SectionTitle>
          </SectionHeader>
          <ProofGrid>
            {PROOF_DATA.map((p, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
                <ProofCard>
                  <ProofQuote>"{p.quote}"</ProofQuote>
                  <ProofAuthor>
                    <div className="name">{p.name}</div>
                    <div className="trip">{p.trip}</div>
                  </ProofAuthor>
                </ProofCard>
              </motion.div>
            ))}
          </ProofGrid>
        </ProofInner>
      </ProofSection>

      {/* ─── 11. HOUSE OF MOSI PROMISE ─── */}
      <PromiseSection>
        <SectionHeader>
          <SectionLabel>Our Promise</SectionLabel>
          <SectionTitle>The House of Mosi Standard</SectionTitle>
        </SectionHeader>
        <PromiseGrid>
          {PROMISES.map((p, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
              <PromiseItem>
                <PromiseIcon><Icon name={p.icon} size={24} /></PromiseIcon>
                <PromiseTitle>{p.title}</PromiseTitle>
                <PromiseText>{p.text}</PromiseText>
              </PromiseItem>
            </motion.div>
          ))}
        </PromiseGrid>
      </PromiseSection>

      {/* ─── 12. FINAL CTA ─── */}
      <FinalCTA>
        <FinalCTAContent>
          <FinalCTATitle>Your Victoria Falls Journey Starts Here</FinalCTATitle>
          <FinalCTAButtons>
            <BtnPrimary to="/plan">Plan My Journey</BtnPrimary>
            <BtnOutline to="/discover">Explore Victoria Falls</BtnOutline>
          </FinalCTAButtons>
        </FinalCTAContent>
      </FinalCTA>
    </>
  );
}
