import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';

const PageWrapper = styled.div` padding-top: 90px; min-height: 100vh; background: ${p => p.theme.colors.background}; `;

const Hero = styled.div`
  height: 400px; position: relative; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden;
  background: linear-gradient(135deg, ${p => p.theme.colors.primaryDark}, ${p => p.theme.colors.primary});
  &::before { content: ''; position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=80') center/cover; opacity: 0.2; }
`;
const HeroContent = styled.div` position: relative; z-index: 2; max-width: 700px; padding: 0 2rem; `;
const HeroTitle = styled(motion.h1)` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(2rem, 5vw, 3rem); color: ${p => p.theme.colors.white}; font-weight: 400; margin-bottom: 1rem; `;
const HeroSub = styled(motion.p)` font-size: ${p => p.theme.fontSizes.lg}; color: rgba(255,255,255,0.85); line-height: 1.6; `;

const Content = styled.div` max-width: 1100px; margin: 0 auto; padding: 4rem 2rem; `;
const Section = styled(motion.section)` margin-bottom: 4rem; `;
const SectionTitle = styled.h2` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 400; color: ${p => p.theme.colors.text}; margin-bottom: 1.5rem; `;
const SectionText = styled.p` font-size: ${p => p.theme.fontSizes.md}; color: ${p => p.theme.colors.textLight}; line-height: 1.8; max-width: 800px; `;

const MissionGrid = styled.div` display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 2rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: 1fr; } `;
const MissionCard = styled(motion.div)` background: ${p => p.theme.colors.white}; padding: 2rem; border: 1px solid ${p => p.theme.colors.border}; text-align: center; `;
const MissionIcon = styled.div` width: 56px; height: 56px; border-radius: 50%; background: rgba(31,58,50,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: ${p => p.theme.colors.primary}; `;
const MissionTitle = styled.h3` font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.lg}; font-weight: 500; margin-bottom: 0.75rem; color: ${p => p.theme.colors.text}; `;
const MissionText = styled.p` font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; line-height: 1.7; `;

const TeamGrid = styled.div` display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 2rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: repeat(2, 1fr); } @media(max-width: ${p => p.theme.breakpoints.mobile}) { grid-template-columns: 1fr; } `;
const TeamCard = styled(motion.div)` text-align: center; `;
const TeamAvatar = styled.div` width: 120px; height: 120px; border-radius: 50%; background: ${p => p.bg || p.theme.colors.borderLight}; margin: 0 auto 1rem; background-size: cover; background-position: center; `;
const TeamName = styled.h4` font-size: ${p => p.theme.fontSizes.md}; font-weight: 600; color: ${p => p.theme.colors.text}; margin-bottom: 0.25rem; `;
const TeamRole = styled.p` font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textMuted}; `;

const StatsRow = styled.div` display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; padding: 3rem 0; border-top: 1px solid ${p => p.theme.colors.border}; border-bottom: 1px solid ${p => p.theme.colors.border}; margin: 3rem 0; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: repeat(2, 1fr); } `;
const StatItem = styled.div` text-align: center; `;
const StatNum = styled.div` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; color: ${p => p.theme.colors.primary}; margin-bottom: 0.25rem; `;
const StatLabel = styled.div` font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textMuted}; `;

const PartnerLogos = styled.div` display: flex; gap: 3rem; align-items: center; justify-content: center; flex-wrap: wrap; margin-top: 2rem; `;
const PartnerLogo = styled.div` font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.xl}; color: ${p => p.theme.colors.textMuted}; opacity: 0.5; `;

const CTASection = styled.div` background: ${p => p.theme.colors.primary}; padding: 4rem 2rem; text-align: center; margin-top: 3rem; `;
const CTATitle = styled.h2` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(1.5rem, 3vw, 2rem); color: ${p => p.theme.colors.white}; font-weight: 400; margin-bottom: 1rem; `;
const CTAText = styled.p` color: rgba(255,255,255,0.8); margin-bottom: 2rem; font-size: ${p => p.theme.fontSizes.md}; `;
const CTAButtons = styled.div` display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; `;
const CTABtn = styled(Link)` padding: 0.85rem 2rem; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none; border: 1px solid ${p => p.theme.colors.white}; color: ${p => p.$primary ? p.theme.colors.primary : p.theme.colors.white}; background: ${p => p.$primary ? p.theme.colors.white : 'transparent'}; transition: all 0.3s; &:hover { background: ${p => p.$primary ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)'}; } `;

const TEAM = [
  { name: 'Tendai Moyo', role: 'Founder & CEO', bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Sarah Mitchell', role: 'Head of Partnerships', bg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'David Nkomo', role: 'CTO', bg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { name: 'Amara Chen', role: 'Head of Design', bg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      <Hero>
        <HeroContent>
          <HeroTitle initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>One Platform. Every Victoria Falls Experience.</HeroTitle>
          <HeroSub initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>We connect travellers, guides, and local businesses through a single, beautifully designed platform — making Victoria Falls accessible to the world.</HeroSub>
        </HeroContent>
      </Hero>

      <Content>
        <Section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionTitle>Our Mission</SectionTitle>
          <SectionText>VicFalls One was born from a simple observation: Victoria Falls is one of the world's most extraordinary destinations, yet planning a trip here requires navigating dozens of disconnected websites, agents, and word-of-mouth recommendations. We're changing that — building a single platform that brings together accommodations, experiences, dining, transport, events, and local guides.</SectionText>
        </Section>

        <StatsRow>
          <StatItem><StatNum>2,500+</StatNum><StatLabel>Travellers Served</StatLabel></StatItem>
          <StatItem><StatNum>120+</StatNum><StatLabel>Verified Partners</StatLabel></StatItem>
          <StatItem><StatNum>85+</StatNum><StatLabel>Unique Experiences</StatLabel></StatItem>
          <StatItem><StatNum>4.9</StatNum><StatLabel>Average Rating</StatLabel></StatItem>
        </StatsRow>

        <Section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionTitle>What We Believe</SectionTitle>
          <MissionGrid>
            <MissionCard initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <MissionIcon><Icon name="star" /></MissionIcon>
              <MissionTitle>Quality Over Quantity</MissionTitle>
              <MissionText>Every listing is verified. Every partner is vetted. We don't flood you with options — we curate the best.</MissionText>
            </MissionCard>
            <MissionCard initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <MissionIcon><Icon name="map-pin" /></MissionIcon>
              <MissionTitle>Local First</MissionTitle>
              <MissionText>We partner with local businesses, employ local guides, and ensure tourism benefits the Victoria Falls community directly.</MissionText>
            </MissionCard>
            <MissionCard initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <MissionIcon><Icon name="calendar" /></MissionIcon>
              <MissionTitle>Effortless Planning</MissionTitle>
              <MissionText>From booking to check-out, every step should feel seamless. Our AI concierge and one-click booking make it happen.</MissionText>
            </MissionCard>
          </MissionGrid>
        </Section>

        <Section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionTitle>Meet the Team</SectionTitle>
          <TeamGrid>
            {TEAM.map((t, i) => (
              <TeamCard key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <TeamAvatar bg={`url(${t.bg})`} />
                <TeamName>{t.name}</TeamName>
                <TeamRole>{t.role}</TeamRole>
              </TeamCard>
            ))}
          </TeamGrid>
        </Section>

        <Section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionTitle>Trusted Partners</SectionTitle>
          <SectionText>We work with leading hospitality brands, local operators, and tourism boards to deliver exceptional experiences.</SectionText>
          <PartnerLogos>
            <PartnerLogo>Wilderness Safaris</PartnerLogo>
            <PartnerLogo>Beating Heart</PartnerLogo>
            <PartnerLogo>Shearwater</PartnerLogo>
            <PartnerLogo>Victoria Falls Tourism</PartnerLogo>
          </PartnerLogos>
        </Section>
      </Content>

      <CTASection>
        <CTATitle>Ready to Experience Victoria Falls?</CTATitle>
        <CTAText>Whether you're planning your first trip or your fiftieth, we're here to make it extraordinary.</CTAText>
        <CTAButtons>
          <CTABtn to="/discover" $primary>Explore Now</CTABtn>
          <CTABtn to="/contact">Contact Us</CTABtn>
        </CTAButtons>
      </CTASection>
    </PageWrapper>
  );
}
