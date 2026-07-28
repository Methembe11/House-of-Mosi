import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { signatureJourneys } from '../data/data';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ─── HERO ─── */
const Hero = styled.section`
  height: 100vh;
  min-height: 750px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, ${p => p.theme.colors.primaryDark} 0%, ${p => p.theme.colors.primary} 40%, #1a3830 100%);
  overflow: hidden;
  &::before {
    content:''; position:absolute; inset:0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(216,195,165,0.07) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(107,79,58,0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 80%, rgba(216,195,165,0.05) 0%, transparent 40%);
  }
  &::after {
    content:''; position:absolute; bottom:0; left:0; right:0; height:250px;
    background: linear-gradient(transparent, ${p => p.theme.colors.background});
  }
`;
const HeroContent = styled.div` text-align:center; position:relative; z-index:2; padding:0 2rem; max-width:880px; `;
const HeroLabel = styled(motion.div)` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.35em; color:${p=>p.theme.colors.champagne}; font-weight:500; margin-bottom:1.5rem; `;
const HeroTitle = styled(motion.h1)` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2.8rem,6.5vw,5rem); font-weight:300; color:${p=>p.theme.colors.white}; line-height:1.1; margin-bottom:1.75rem; letter-spacing:-0.01em; `;
const HeroSub = styled(motion.p)` font-size:${p=>p.theme.fontSizes.lg}; color:rgba(255,255,255,0.6); max-width:600px; margin:0 auto 3.5rem; line-height:1.8; font-weight:300; `;
const HeroCTAs = styled(motion.div)` display:flex; gap:1.25rem; justify-content:center; flex-wrap:wrap; `;
const BtnPrimary = styled(Link)` padding:1rem 3rem; background:${p=>p.theme.colors.champagne}; color:${p=>p.theme.colors.primaryDark}; font-size:${p=>p.theme.fontSizes.sm}; font-weight:600; text-transform:uppercase; letter-spacing:0.12em; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); &:hover{ background:${p=>p.theme.colors.white}; transform:translateY(-2px); box-shadow:0 8px 30px rgba(0,0,0,0.15); } `;
const BtnOutline = styled(Link)` padding:1rem 3rem; background:transparent; color:${p=>p.theme.colors.white}; border:1px solid rgba(255,255,255,0.3); font-size:${p=>p.theme.fontSizes.sm}; font-weight:500; text-transform:uppercase; letter-spacing:0.12em; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); &:hover{ background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.5); transform:translateY(-2px); } `;
const HeroScroll = styled(motion.div)` position:absolute; bottom:3rem; left:50%; transform:translateX(-50%); z-index:3; color:rgba(255,255,255,0.4); font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.2em; display:flex; flex-direction:column; align-items:center; gap:0.75rem; `;
const ScrollLine = styled.div` width:1px; height:40px; background:linear-gradient(transparent, rgba(255,255,255,0.4)); `;

/* ─── SHARED ─── */
const Section = styled.section` padding:${p=>p.theme.spacing.section} 2rem; max-width:1400px; margin:0 auto; `;
const FullBleed = styled.section` padding:${p=>p.theme.spacing.section} 0; overflow:hidden; `;
const SectionHeader = styled.div` text-align:center; margin-bottom:4rem; `;
const SectionLabel = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.3em; color:${p=>p.theme.colors.cocoa}; font-weight:500; display:block; margin-bottom:1rem; `;
const SectionTitle = styled.h2` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,4vw,3.25rem); font-weight:300; color:${p=>p.theme.colors.text}; margin-bottom:1.25rem; letter-spacing:-0.01em; `;
const SectionDesc = styled.p` font-size:${p=>p.theme.fontSizes.md}; color:${p=>p.theme.colors.textLight}; max-width:520px; margin:0 auto; line-height:1.8; `;
const Divider = styled.div` width:60px; height:1px; background:${p=>p.theme.colors.champagne}; margin:0 auto 2rem; `;

/* ─── 2. WHAT IS VFCALLS ONE ─── */
const ValueGrid = styled.div` display:grid; grid-template-columns:repeat(4,1fr); gap:2rem; @media(max-width:${p=>p.theme.breakpoints.desktop}){ grid-template-columns:repeat(2,1fr); } @media(max-width:${p=>p.theme.breakpoints.mobile}){ grid-template-columns:1fr; } `;
const ValueCard = styled.div` text-align:center; padding:3rem 2rem; background:${p=>p.theme.colors.white}; border:1px solid ${p=>p.theme.colors.borderLight}; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); &:hover{ box-shadow:${p=>p.theme.shadows.xl}; transform:translateY(-6px); border-color:transparent; } `;
const ValueIcon = styled.div` width:72px; height:72px; background:${p=>p.theme.colors.primary}; color:${p=>p.theme.colors.white}; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem; border-radius:50%; transition:all 0.4s; ${ValueCard}:hover &{ background:${p=>p.theme.colors.cocoa}; } `;
const ValueTitle = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:${p=>p.theme.fontSizes.xxl}; font-weight:500; color:${p=>p.theme.colors.text}; margin-bottom:0.75rem; `;
const ValueText = styled.p` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textLight}; line-height:1.8; `;

/* ─── 3. ECOSYSTEM ─── */
const EcoGrid = styled.div` display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:repeat(2,1fr); } @media(max-width:${p=>p.theme.breakpoints.mobile}){ grid-template-columns:1fr; } `;
const EcoCard = styled.div` padding:2.25rem; background:${p=>p.theme.colors.white}; border:1px solid ${p=>p.theme.colors.borderLight}; display:flex; align-items:flex-start; gap:1.25rem; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); &:hover{ border-color:${p=>p.theme.colors.champagne}; box-shadow:${p=>p.theme.shadows.md}; transform:translateY(-3px); } `;
const EcoIcon = styled.div` flex-shrink:0; width:50px; height:50px; background:rgba(31,58,50,0.06); color:${p=>p.theme.colors.primary}; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:all 0.3s; ${EcoCard}:hover &{ background:${p=>p.theme.colors.primary}; color:${p=>p.theme.colors.white}; } `;
const EcoTitle = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:${p=>p.theme.fontSizes.xl}; font-weight:500; color:${p=>p.theme.colors.text}; margin-bottom:0.35rem; `;
const EcoTags = styled.p` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textMuted}; line-height:1.6; `;

/* ─── 4. VISITOR PLATFORM BANNER ─── */
const BannerSection = styled.section` position:relative; height:75vh; min-height:550px; overflow:hidden; background:${p=>p.theme.colors.primaryDark}; `;
const BannerSlide = styled.div` position:absolute; inset:0; opacity:${p=>p.$active?1:0}; transition:opacity 1.2s cubic-bezier(0.4,0,0.2,1); pointer-events:${p=>p.$active?'auto':'none'}; `;
const BannerImg = styled.div` position:absolute; inset:0; img{ width:100%; height:100%; object-fit:cover; transition:transform 8s linear; ${p=>p.$active && css`img{ transform:scale(1.08); }`} } `;
const BannerOverlay = styled.div` position:absolute; inset:0; background:linear-gradient(135deg, rgba(21,42,36,0.82) 0%, rgba(31,58,50,0.55) 50%, rgba(21,42,36,0.75) 100%); `;
const BannerContent = styled.div` position:relative; z-index:2; height:100%; display:flex; flex-direction:column; justify-content:center; padding:0 8%; max-width:1400px; margin:0 auto; `;
const BannerTag = styled(motion.div)` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.35em; color:${p=>p.theme.colors.champagne}; font-weight:500; margin-bottom:1.25rem; display:flex; align-items:center; gap:1rem; &::before{ content:''; width:40px; height:1px; background:${p=>p.theme.colors.champagne}; } `;
const BannerTitle = styled(motion.h2)` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,4.5vw,3.75rem); font-weight:300; color:${p=>p.theme.colors.white}; line-height:1.15; margin-bottom:1.25rem; max-width:600px; `;
const BannerDesc = styled(motion.p)` font-size:${p=>p.theme.fontSizes.md}; color:rgba(255,255,255,0.7); max-width:480px; line-height:1.8; margin-bottom:2.5rem; `;
const BannerCTA = styled(motion(Link))` display:inline-flex; align-items:center; gap:0.75rem; padding:1rem 2.5rem; background:transparent; border:1px solid rgba(255,255,255,0.3); color:${p=>p.theme.colors.white}; font-size:${p=>p.theme.fontSizes.sm}; font-weight:500; text-transform:uppercase; letter-spacing:0.1em; transition:all 0.4s; width:fit-content; &:hover{ background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.5); } `;
const BannerControls = styled.div` position:absolute; bottom:3rem; left:50%; transform:translateX(-50%); z-index:5; display:flex; align-items:center; gap:1.5rem; `;
const BannerDot = styled.button` width:${p=>p.$active?'32px':'8px'}; height:8px; border-radius:4px; background:${p=>p.$active?p.theme.colors.champagne:'rgba(255,255,255,0.3)'}; border:none; cursor:pointer; transition:all 0.4s; padding:0; &:hover{ background:rgba(255,255,255,0.6); } `;
const BannerCounter = styled.div` position:absolute; top:3rem; right:4rem; z-index:5; font-family:${p=>p.theme.fonts.serif}; font-size:${p=>p.theme.fontSizes.xl}; color:rgba(255,255,255,0.5); font-weight:300; `;
const BannerArrow = styled.button` position:absolute; top:50%; ${p=>p.$left?'left:2rem;':'right:2rem;'} transform:translateY(-50%); z-index:5; width:48px; height:48px; border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.2); backdrop-filter:blur(4px); color:white; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.3s; opacity:0; ${BannerSection}:hover &{ opacity:1; } &:hover{ background:rgba(255,255,255,0.15); border-color:rgba(255,255,255,0.4); } `;
const PlatformIconStrip = styled.div` position:absolute; bottom:6rem; left:0; right:0; z-index:5; display:flex; justify-content:center; gap:2.5rem; opacity:0.4; transition:opacity 0.3s; ${BannerSection}:hover &{ opacity:0.7; } `;
const PlatformIconItem = styled(Link)` display:flex; flex-direction:column; align-items:center; gap:0.5rem; color:rgba(255,255,255,0.8); text-decoration:none; font-size:0.65rem; text-transform:uppercase; letter-spacing:0.1em; transition:all 0.3s; &:hover{ color:${p=>p.theme.colors.champagne}; } ${p=>p.$active && css` color:${p=>p.theme.colors.champagne}; `} `;

/* ─── 5. SIGNATURE JOURNEYS ─── */
const JourneyScroll = styled.div` display:flex; gap:2rem; padding:0 2rem; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scrollbar-width:none; &::-webkit-scrollbar{display:none;} `;
const JourneyCard = styled(Link)` flex:0 0 360px; scroll-snap-align:start; position:relative; height:480px; overflow:hidden; display:block; border-radius:2px; &:hover .jimg img{transform:scale(1.06);} &:hover .joverlay{opacity:1;} `;
const JImg = styled.div` position:absolute; inset:0; background:${p=>p.theme.colors.primary}; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.7s cubic-bezier(0.22,1,0.36,1); } `;
const JOverlay = styled.div` position:absolute; inset:0; background:linear-gradient(transparent 35%, rgba(21,42,36,0.93)); display:flex; flex-direction:column; justify-content:flex-end; padding:2.5rem; transition:opacity 0.3s; `;
const JTag = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.25em; color:${p=>p.theme.colors.champagne}; margin-bottom:0.5rem; font-weight:500; `;
const JName = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:1.65rem; color:${p=>p.theme.colors.white}; font-weight:400; margin-bottom:0.75rem; line-height:1.25; `;
const JMeta = styled.div` display:flex; align-items:center; gap:1rem; font-size:${p=>p.theme.fontSizes.sm}; color:rgba(255,255,255,0.6); `;
const JPrice = styled.span` color:${p=>p.theme.colors.champagne}; font-weight:600; `;

/* ─── 6. GUIDES ─── */
const GuidesGrid = styled.div` display:grid; grid-template-columns:repeat(4,1fr); gap:1.75rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:repeat(2,1fr); } @media(max-width:${p=>p.theme.breakpoints.mobile}){ grid-template-columns:1fr; } `;
const GuideCard = styled(Link)` display:block; background:${p=>p.theme.colors.white}; overflow:hidden; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); &:hover{ box-shadow:${p=>p.theme.shadows.md}; .gimg img{transform:scale(1.04);} } `;
const GCardImg = styled.div` height:220px; overflow:hidden; background:${p=>p.theme.colors.backgroundAlt}; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.6s cubic-bezier(0.22,1,0.36,1); } `;
const GCardBody = styled.div` padding:1.5rem; .cat{ font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.15em; color:${p=>p.theme.colors.cocoa}; font-weight:500; margin-bottom:0.5rem; } h3{ font-family:${p=>p.theme.fonts.serif}; font-size:1.15rem; font-weight:500; margin-bottom:0.5rem; line-height:1.3; color:${p=>p.theme.colors.text}; } p{ font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textLight}; line-height:1.7; } `;

/* ─── 7. SOCIAL PROOF ─── */
const ProofSection = styled.div` background:${p=>p.theme.colors.cream}; padding:${p=>p.theme.spacing.section} 0; `;
const ProofInner = styled.div` max-width:1400px; margin:0 auto; padding:0 2rem; `;
const ProofGrid = styled.div` display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:1fr; } `;
const ProofCard = styled.div` background:${p=>p.theme.colors.white}; padding:2.75rem; border-left:3px solid ${p=>p.theme.colors.champagne}; `;
const ProofQuote = styled.p` font-family:${p=>p.theme.fonts.serif}; font-size:${p=>p.theme.fontSizes.xl}; color:${p=>p.theme.colors.text}; line-height:1.7; font-style:italic; margin-bottom:1.75rem; font-weight:400; `;
const ProofAuthor = styled.div` .name{ font-weight:600; color:${p=>p.theme.colors.text}; font-size:${p=>p.theme.fontSizes.md}; } .trip{ font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textMuted}; margin-top:0.25rem; } `;

/* ─── 8. FINAL CTA ─── */
const FinalCTA = styled.section` position:relative; height:60vh; min-height:450px; display:flex; align-items:center; justify-content:center; text-align:center; overflow:hidden; background:linear-gradient(135deg, ${p=>p.theme.colors.primaryDark}, ${p=>p.theme.colors.primary}); `;
const FinalCTAContent = styled.div` position:relative; z-index:2; padding:2rem; `;
const FinalCTATitle = styled.h2` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,5vw,3.5rem); font-weight:300; color:${p=>p.theme.colors.white}; margin-bottom:2.5rem; line-height:1.2; `;
const FinalCTAButtons = styled.div` display:flex; gap:1.25rem; justify-content:center; flex-wrap:wrap; `;

/* ─── DATA ─── */
const BANNER_SLIDES = [
  { title: 'Discover Victoria Falls', desc: 'Explore the Smoke That Thunders — from misty rainforests to the legendary Victoria Falls Bridge.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=80', to: '/discover', icon: 'compass' },
  { title: 'Curated Experiences', desc: 'Helicopter flights, sunset cruises, white-water rafting, and bush walks with world-class guides.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80', to: '/experiences', icon: 'sun' },
  { title: 'World-Class Dining', desc: 'Bush dinners under the stars, fine dining at historic hotels, and authentic local cuisine.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80', to: '/dining', icon: 'dining' },
  { title: 'Seamless Transport', desc: 'Airport transfers, private drivers, and guided transfers across Victoria Falls.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80', to: '/transport', icon: 'car' },
  { title: 'Unforgettable Events', desc: 'Live entertainment, cultural festivals, and exclusive private events throughout the year.', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80', to: '/events', icon: 'ticket' },
  { title: 'Build Your Journey', desc: 'AI-powered trip planning — tell us your style and we\'ll craft the perfect Victoria Falls itinerary.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80', to: '/plan', icon: 'mapPin' },
];

const GUIDE_DATA = [
  { title: 'First Time in Victoria Falls', slug: 'first-time', excerpt: 'Everything you need to know for your first visit to the Smoke That Thunders.', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80' },
  { title: '48 Hours in Victoria Falls', slug: '48-hours', excerpt: 'A perfectly packed two-day itinerary for the time-conscious traveler.', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80' },
  { title: 'Best Sunset Spots', slug: 'best-sunset-spots', excerpt: 'Where to watch the most spectacular sunsets in Victoria Falls.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80' },
  { title: 'Family Adventure Guide', slug: 'family-adventure', excerpt: 'The best family-friendly activities and stays for your Victoria Falls trip.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80' },
];

const PROOF_DATA = [
  { quote: 'VicFalls One made our honeymoon effortless. The helicopter flight over the falls at sunrise was the highlight of our lives.', name: 'Sarah & James', trip: '5-Day Honeymoon Journey' },
  { quote: 'We had no idea Victoria Falls had this level of luxury. Having everything in one platform saved us so much time.', name: 'The Chen Family', trip: '4-Day Family Discovery' },
  { quote: 'From the sunset cruise to the bush dinner under the stars — every moment was perfectly curated.', name: 'Amara & Kofi', trip: '3-Day Romantic Retreat' },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % BANNER_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <>
      {/* ─── 1. HERO ─── */}
      <Hero>
        <HeroContent>
          <HeroLabel initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.3}}>
            Victoria Falls, Zimbabwe
          </HeroLabel>
          <HeroTitle initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.5}}>
            One Platform.<br />Every Experience.
          </HeroTitle>
          <HeroSub initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.8}}>
            Discover, book, and experience the world's greatest natural wonder — all from a single, beautifully crafted platform.
          </HeroSub>
          <HeroCTAs initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:1.1}}>
            <BtnPrimary to="/discover">Begin Your Journey</BtnPrimary>
            <BtnOutline to="/plan">Plan My Trip</BtnOutline>
          </HeroCTAs>
        </HeroContent>
        <HeroScroll initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8,duration:0.8}}>
          Scroll
          <ScrollLine />
        </HeroScroll>
      </Hero>

      {/* ─── 2. WHAT IS VFCALLS ONE ─── */}
      <Section>
        <SectionHeader>
          <SectionLabel>What is VicFalls One?</SectionLabel>
          <Divider />
          <SectionTitle>Everything You Need, One Platform</SectionTitle>
          <SectionDesc>The all-in-one platform connecting travellers with the finest of Victoria Falls.</SectionDesc>
        </SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}} variants={stagger}>
          <ValueGrid>
            {[
              { icon: 'compass', title: 'Discover', text: 'Find attractions, events, restaurants, and hidden gems curated by locals.' },
              { icon: 'calendar', title: 'Book', text: 'Secure experiences, transport, dining, and accommodations instantly.' },
              { icon: 'mountain', title: 'Plan', text: 'Build personalized itineraries powered by AI and local expertise.' },
              { icon: 'binoculars', title: 'Experience', text: 'Navigate Victoria Falls with everything in one beautifully designed place.' },
            ].map((v, i) => (
              <motion.div key={i} variants={fadeUp}>
                <ValueCard>
                  <ValueIcon><Icon name={v.icon} size={28} /></ValueIcon>
                  <ValueTitle>{v.title}</ValueTitle>
                  <ValueText>{v.text}</ValueText>
                </ValueCard>
              </motion.div>
            ))}
          </ValueGrid>
        </motion.div>
      </Section>

      {/* ─── 3. THE ECOSYSTEM ─── */}
      <Section>
        <SectionHeader>
          <SectionLabel>The Ecosystem</SectionLabel>
          <Divider />
          <SectionTitle>More Than a Tourism Site</SectionTitle>
          <SectionDesc>Every part of the Victoria Falls experience, connected into one seamless platform.</SectionDesc>
        </SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}} variants={stagger}>
          <EcoGrid>
            {[
              { icon: 'sun', title: 'Experiences', tags: 'Safari · Helicopter · Rafting · Cruises' },
              { icon: 'dining', title: 'Dining', tags: 'Restaurants · Cafes · Fine dining · Bush dinners' },
              { icon: 'shuttle', title: 'Transport', tags: 'Airport transfers · Private drivers · Shuttles' },
              { icon: 'pool', title: 'Stays', tags: 'Hotels · Lodges · Guest houses · Villas' },
              { icon: 'calendar', title: 'Events', tags: 'Festivals · Conferences · Live entertainment' },
              { icon: 'camera', title: 'Local Services', tags: 'Photography · Guides · Shopping · Wellness' },
            ].map((e, i) => (
              <motion.div key={i} variants={fadeUp}>
                <EcoCard>
                  <EcoIcon><Icon name={e.icon} size={22} /></EcoIcon>
                  <div>
                    <EcoTitle>{e.title}</EcoTitle>
                    <EcoTags>{e.tags}</EcoTags>
                  </div>
                </EcoCard>
              </motion.div>
            ))}
          </EcoGrid>
        </motion.div>
      </Section>

      {/* ─── 4. VISITOR PLATFORM — AUTO-SCROLLING BANNER ─── */}
      <BannerSection
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {BANNER_SLIDES.map((slide, i) => (
          <BannerSlide key={i} $active={i === currentSlide}>
            <BannerImg $active={i === currentSlide}>
              <img src={slide.image} alt={slide.title} />
            </BannerImg>
            <BannerOverlay />
          </BannerSlide>
        ))}

        <BannerContent>
          <BannerTag key={`tag-${currentSlide}`} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.6,delay:0.2}}>
            Your Victoria Falls Companion
          </BannerTag>
          <BannerTitle key={`title-${currentSlide}`} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.3}}>
            {BANNER_SLIDES[currentSlide].title}
          </BannerTitle>
          <BannerDesc key={`desc-${currentSlide}`} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.5}}>
            {BANNER_SLIDES[currentSlide].desc}
          </BannerDesc>
          <BannerCTA key={`cta-${currentSlide}`} to={BANNER_SLIDES[currentSlide].to} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.7}}>
            Explore <Icon name="arrow" size={16} />
          </BannerCTA>
        </BannerContent>

        <BannerCounter>
          {String(currentSlide + 1).padStart(2, '0')} / {String(BANNER_SLIDES.length).padStart(2, '0')}
        </BannerCounter>

        <BannerArrow $left onClick={prevSlide}>&#8592;</BannerArrow>
        <BannerArrow onClick={nextSlide}>&#8594;</BannerArrow>

        <PlatformIconStrip>
          {BANNER_SLIDES.map((slide, i) => (
            <PlatformIconItem key={i} to={slide.to} $active={i === currentSlide}>
              <Icon name={slide.icon} size={16} />
              {slide.title.split(' ').pop()}
            </PlatformIconItem>
          ))}
        </PlatformIconStrip>

        <BannerControls>
          {BANNER_SLIDES.map((_, i) => (
            <BannerDot key={i} $active={i === currentSlide} onClick={() => setCurrentSlide(i)} />
          ))}
        </BannerControls>
      </BannerSection>

      {/* ─── 5. SIGNATURE JOURNEYS ─── */}
      <FullBleed>
        <SectionHeader style={{padding:'0 2rem'}}>
          <SectionLabel>Signature Journeys</SectionLabel>
          <Divider />
          <SectionTitle>Trips You'll Dream About</SectionTitle>
          <SectionDesc>Curated multi-day experiences — each one a complete Victoria Falls story.</SectionDesc>
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

      {/* ─── 6. GUIDES & STORIES ─── */}
      <Section>
        <SectionHeader>
          <SectionLabel>Guides & Stories</SectionLabel>
          <Divider />
          <SectionTitle>Plan Your Perfect Trip</SectionTitle>
          <SectionDesc>Insider knowledge from the heart of Victoria Falls.</SectionDesc>
        </SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}} variants={stagger}>
          <GuidesGrid>
            {GUIDE_DATA.map((g, i) => (
              <motion.div key={i} variants={fadeUp}>
                <GuideCard to={`/journal/${g.slug}`}>
                  <GCardImg className="gimg"><img src={g.image} alt={g.title} loading="lazy" /></GCardImg>
                  <GCardBody>
                    <div className="cat">Travel Guide</div>
                    <h3>{g.title}</h3>
                    <p>{g.excerpt}</p>
                  </GCardBody>
                </GuideCard>
              </motion.div>
            ))}
          </GuidesGrid>
        </motion.div>
      </Section>

      {/* ─── 7. SOCIAL PROOF ─── */}
      <ProofSection>
        <ProofInner>
          <SectionHeader>
            <SectionLabel>Recent Journeys</SectionLabel>
            <Divider />
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

      {/* ─── 8. FINAL CTA ─── */}
      <FinalCTA>
        <FinalCTAContent>
          <FinalCTATitle>Your Victoria Falls Journey<br/>Starts Here</FinalCTATitle>
          <FinalCTAButtons>
            <BtnPrimary to="/plan">Plan My Trip</BtnPrimary>
            <BtnOutline to="/discover">Explore Victoria Falls</BtnOutline>
          </FinalCTAButtons>
        </FinalCTAContent>
      </FinalCTA>
    </>
  );
}
