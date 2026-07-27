import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { signatureJourneys } from '../data/data';

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
const HeroTitle = styled(motion.h1)` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2.5rem,6vw,4.5rem); font-weight:300; color:${p=>p.theme.colors.white}; line-height:1.15; margin-bottom:1.5rem; `;
const HeroSub = styled(motion.p)` font-size:${p=>p.theme.fontSizes.lg}; color:rgba(255,255,255,0.7); max-width:650px; margin:0 auto 3rem; line-height:1.7; font-weight:300; `;
const HeroCTAs = styled(motion.div)` display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; `;
const BtnPrimary = styled(Link)` padding:1rem 2.5rem; background:${p=>p.theme.colors.champagne}; color:${p=>p.theme.colors.text}; font-size:${p=>p.theme.fontSizes.sm}; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; transition:all 0.3s; &:hover{ background:${p=>p.theme.colors.white}; transform:translateY(-2px); } `;
const BtnOutline = styled(Link)` padding:1rem 2.5rem; background:transparent; color:${p=>p.theme.colors.white}; border:1px solid rgba(255,255,255,0.35); font-size:${p=>p.theme.fontSizes.sm}; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; transition:all 0.3s; &:hover{ background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.6); transform:translateY(-2px); } `;

/* ─── SHARED ─── */
const Section = styled.section` padding:${p=>p.theme.spacing.section} 2rem; max-width:1400px; margin:0 auto; `;
const FullBleed = styled.section` padding:${p=>p.theme.spacing.section} 0; overflow:hidden; `;
const SectionHeader = styled.div` text-align:center; margin-bottom:3.5rem; `;
const SectionLabel = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.25em; color:${p=>p.theme.colors.cocoa}; font-weight:500; display:block; margin-bottom:0.75rem; `;
const SectionTitle = styled.h2` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,4vw,3rem); font-weight:400; color:${p=>p.theme.colors.text}; margin-bottom:1rem; `;
const SectionDesc = styled.p` font-size:${p=>p.theme.fontSizes.md}; color:${p=>p.theme.colors.textLight}; max-width:550px; margin:0 auto; line-height:1.7; `;

/* ─── 2. WHAT IS VFCALLS ONE ─── */
const ValueGrid = styled.div` display:grid; grid-template-columns:repeat(4,1fr); gap:2rem; @media(max-width:${p=>p.theme.breakpoints.desktop}){ grid-template-columns:repeat(2,1fr); } @media(max-width:${p=>p.theme.breakpoints.mobile}){ grid-template-columns:1fr; } `;
const ValueCard = styled.div` text-align:center; padding:2.5rem 1.5rem; background:${p=>p.theme.colors.white}; border:1px solid ${p=>p.theme.colors.border}; transition:all 0.3s; &:hover{ box-shadow:${p=>p.theme.shadows.lg}; transform:translateY(-4px); } `;
const ValueIcon = styled.div` width:64px; height:64px; background:${p=>p.theme.colors.primary}; color:${p=>p.theme.colors.white}; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem; border-radius:50%; `;
const ValueTitle = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:${p=>p.theme.fontSizes.xl}; font-weight:500; color:${p=>p.theme.colors.text}; margin-bottom:0.75rem; `;
const ValueText = styled.p` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textLight}; line-height:1.7; `;

/* ─── 3. ECOSYSTEM ─── */
const EcoGrid = styled.div` display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:repeat(2,1fr); } @media(max-width:${p=>p.theme.breakpoints.mobile}){ grid-template-columns:1fr; } `;
const EcoCard = styled.div` padding:2rem; background:${p=>p.theme.colors.white}; border:1px solid ${p=>p.theme.colors.border}; display:flex; align-items:flex-start; gap:1.25rem; transition:all 0.3s; &:hover{ border-color:${p=>p.theme.colors.primary}; box-shadow:${p=>p.theme.shadows.md}; } `;
const EcoIcon = styled.div` flex-shrink:0; width:48px; height:48px; background:${p=>p.theme.colors.primary}; color:${p=>p.theme.colors.white}; display:flex; align-items:center; justify-content:center; border-radius:50%; `;
const EcoTitle = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:${p=>p.theme.fontSizes.xl}; font-weight:500; color:${p=>p.theme.colors.text}; margin-bottom:0.35rem; `;
const EcoTags = styled.p` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textMuted}; line-height:1.6; `;

/* ─── 4. VISITOR PLATFORM NAV ─── */
const PlatformSection = styled.section` background:${p=>p.theme.colors.primary}; padding:5rem 2rem; color:${p=>p.theme.colors.white}; `;
const PlatformGrid = styled.div` display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; max-width:1200px; margin:0 auto; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:repeat(2,1fr); } @media(max-width:${p=>p.theme.breakpoints.mobile}){ grid-template-columns:1fr; } `;
const PlatformCard = styled(Link)` display:flex; align-items:center; gap:1rem; padding:1.25rem 1.5rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); transition:all 0.3s; text-decoration:none; &:hover{ background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.25); transform:translateY(-2px); } `;
const PlatformIcon = styled.div` color:${p=>p.theme.colors.champagne}; `;
const PlatformLabel = styled.span` font-size:${p=>p.theme.fontSizes.md}; font-weight:500; color:${p=>p.theme.colors.white}; `;

/* ─── 5. SIGNATURE JOURNEYS ─── */
const JourneyScroll = styled.div` display:flex; gap:1.5rem; padding:0 2rem; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scrollbar-width:none; &::-webkit-scrollbar{display:none;} `;
const JourneyCard = styled(Link)` flex:0 0 340px; scroll-snap-align:start; position:relative; height:440px; overflow:hidden; display:block; border-radius:2px; &:hover .jimg img{transform:scale(1.06);} &:hover .joverlay{opacity:1;} `;
const JImg = styled.div` position:absolute; inset:0; background:${p=>p.theme.colors.primary}; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.6s; } `;
const JOverlay = styled.div` position:absolute; inset:0; background:linear-gradient(transparent 40%, rgba(31,58,50,0.92)); display:flex; flex-direction:column; justify-content:flex-end; padding:2rem; transition:opacity 0.3s; `;
const JTag = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.2em; color:${p=>p.theme.colors.champagne}; margin-bottom:0.5rem; font-weight:500; `;
const JName = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:1.6rem; color:${p=>p.theme.colors.white}; font-weight:400; margin-bottom:0.75rem; line-height:1.25; `;
const JMeta = styled.div` display:flex; align-items:center; gap:1rem; font-size:${p=>p.theme.fontSizes.sm}; color:rgba(255,255,255,0.7); `;
const JPrice = styled.span` color:${p=>p.theme.colors.champagne}; font-weight:600; `;

/* ─── 6. GUIDES ─── */
const GuidesGrid = styled.div` display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:repeat(2,1fr); } @media(max-width:${p=>p.theme.breakpoints.mobile}){ grid-template-columns:1fr; } `;
const GuideCard = styled(Link)` display:block; background:${p=>p.theme.colors.white}; overflow:hidden; transition:all 0.4s; &:hover{ box-shadow:${p=>p.theme.shadows.md}; .gimg img{transform:scale(1.03);} } `;
const GCardImg = styled.div` height:200px; overflow:hidden; background:${p=>p.theme.colors.backgroundAlt}; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.5s; } `;
const GCardBody = styled.div` padding:1.25rem; .cat{ font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.15em; color:${p=>p.theme.colors.cocoa}; font-weight:500; margin-bottom:0.5rem; } h3{ font-family:${p=>p.theme.fonts.serif}; font-size:1.1rem; font-weight:500; margin-bottom:0.5rem; line-height:1.3; color:${p=>p.theme.colors.text}; } p{ font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textLight}; line-height:1.6; } `;

/* ─── 7. SOCIAL PROOF ─── */
const ProofSection = styled.div` background:${p=>p.theme.colors.cream}; padding:${p=>p.theme.spacing.section} 0; `;
const ProofInner = styled.div` max-width:1400px; margin:0 auto; padding:0 2rem; `;
const ProofGrid = styled.div` display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:1fr; } `;
const ProofCard = styled.div` background:${p=>p.theme.colors.white}; padding:2.5rem; border-left:3px solid ${p=>p.theme.colors.primary}; `;
const ProofQuote = styled.p` font-size:${p=>p.theme.fontSizes.md}; color:${p=>p.theme.colors.text}; line-height:1.7; font-style:italic; margin-bottom:1.5rem; `;
const ProofAuthor = styled.div` .name{ font-weight:600; color:${p=>p.theme.colors.text}; font-size:${p=>p.theme.fontSizes.md}; } .trip{ font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textMuted}; margin-top:0.25rem; } `;

/* ─── 8. FINAL CTA ─── */
const FinalCTA = styled.section` position:relative; height:60vh; min-height:450px; display:flex; align-items:center; justify-content:center; text-align:center; overflow:hidden; background:linear-gradient(135deg, ${p=>p.theme.colors.primaryDark}, ${p=>p.theme.colors.primary}); `;
const FinalCTAContent = styled.div` position:relative; z-index:2; padding:2rem; `;
const FinalCTATitle = styled.h2` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,5vw,3.5rem); font-weight:300; color:${p=>p.theme.colors.white}; margin-bottom:2.5rem; line-height:1.2; `;
const FinalCTAButtons = styled.div` display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; `;

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

const NAV_PLATFORM = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/discover', label: 'Discover', icon: 'compass' },
  { to: '/experiences', label: 'Experiences', icon: 'sun' },
  { to: '/dining', label: 'Dining', icon: 'dining' },
  { to: '/transport', label: 'Transport', icon: 'car' },
  { to: '/events', label: 'Events', icon: 'ticket' },
  { to: '/plan', label: 'Trip Planner', icon: 'mapPin' },
  { to: '/collection', label: 'Collection', icon: 'heart' },
];

export default function HomePage() {
  return (
    <>
      {/* ─── 1. HERO ─── */}
      <Hero>
        <HeroContent>
          <HeroTitle initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.2}}>One Platform. Every Victoria Falls Experience.</HeroTitle>
          <HeroSub initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.5}}>
            Discover attractions, book tours, reserve restaurants, arrange transport,
            and plan your entire journey from a single platform.
          </HeroSub>
          <HeroCTAs initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.8}}>
            <BtnPrimary to="/discover">Start Exploring</BtnPrimary>
            <BtnOutline to="/plan">Plan My Trip</BtnOutline>
          </HeroCTAs>
        </HeroContent>
      </Hero>

      {/* ─── 2. WHAT IS VFCALLS ONE ─── */}
      <Section>
        <SectionHeader>
          <SectionLabel>What is VicFalls One?</SectionLabel>
          <SectionTitle>Everything You Need, One Platform</SectionTitle>
          <SectionDesc>The all-in-one platform connecting travelers with the best of Victoria Falls.</SectionDesc>
        </SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}} variants={stagger}>
          <ValueGrid>
            {[
              { icon: 'compass', title: 'Discover', text: 'Find attractions, events, restaurants, and hidden gems.' },
              { icon: 'calendar', title: 'Book', text: 'Secure experiences, transport, dining, and accommodations.' },
              { icon: 'mountain', title: 'Plan', text: 'Build personalized itineraries powered by AI.' },
              { icon: 'binoculars', title: 'Experience', text: 'Navigate Victoria Falls with everything in one place.' },
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
          <SectionTitle>More Than a Tourism Site</SectionTitle>
          <SectionDesc>We connect every part of the Victoria Falls experience into one platform.</SectionDesc>
        </SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}} variants={stagger}>
          <EcoGrid>
            {[
              { icon: 'sun', title: 'Experiences', tags: 'Safari · Helicopter flights · Rafting · Cruises' },
              { icon: 'dining', title: 'Dining', tags: 'Restaurants · Cafes · Fine dining' },
              { icon: 'shuttle', title: 'Transport', tags: 'Airport transfers · Private drivers · Shuttles' },
              { icon: 'pool', title: 'Stays', tags: 'Hotels · Lodges · Guest houses' },
              { icon: 'calendar', title: 'Events', tags: 'Festivals · Conferences · Live entertainment' },
              { icon: 'camera', title: 'Local Services', tags: 'Photography · Guides · Shopping' },
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

      {/* ─── 4. VISITOR PLATFORM NAV ─── */}
      <PlatformSection>
        <SectionHeader style={{padding:'0 2rem'}}>
          <SectionLabel style={{color:'rgba(255,255,255,0.4)'}}>Visitor Platform</SectionLabel>
          <SectionTitle style={{color:p=>p.theme.colors.white}}>Your Victoria Falls Companion</SectionTitle>
        </SectionHeader>
        <PlatformGrid>
          {NAV_PLATFORM.map((item, i) => (
            <PlatformCard key={i} to={item.to}>
              <PlatformIcon><Icon name={item.icon} size={20} /></PlatformIcon>
              <PlatformLabel>{item.label}</PlatformLabel>
            </PlatformCard>
          ))}
        </PlatformGrid>
      </PlatformSection>

      {/* ─── 5. SIGNATURE JOURNEYS ─── */}
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

      {/* ─── 6. GUIDES & STORIES ─── */}
      <Section>
        <SectionHeader>
          <SectionLabel>Guides & Stories</SectionLabel>
          <SectionTitle>Plan Your Perfect Trip</SectionTitle>
          <SectionDesc>Insider knowledge from the heart of Victoria Falls</SectionDesc>
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
          <FinalCTATitle>Your Victoria Falls Journey Starts Here</FinalCTATitle>
          <FinalCTAButtons>
            <BtnPrimary to="/plan">Plan My Trip</BtnPrimary>
            <BtnOutline to="/discover">Explore Victoria Falls</BtnOutline>
          </FinalCTAButtons>
        </FinalCTAContent>
      </FinalCTA>
    </>
  );
}
