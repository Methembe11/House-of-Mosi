import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageWrapper = styled.div`padding-top: 90px;`;

const HeroSection = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 4rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${props => props.theme.colors.white};
  font-weight: 400;
  margin-bottom: 0.75rem;
`;

const HeroSub = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: rgba(255,255,255,0.7);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: ${props => props.theme.colors.text};
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const SectionSub = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CardIcon = styled.div`
  width: 56px;
  height: 56px;
  background: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
`;

const CardName = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const CardDesc = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
`;

const CardRoute = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span { color: ${props => props.theme.colors.champagne}; }
`;

const CardPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  margin-bottom: 1.25rem;

  strong {
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }

  span {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textMuted};
  }
`;

const BookBtn = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  font-family: ${props => props.theme.fonts.sans};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover { background: ${props => props.theme.colors.primaryDark}; }
`;

const StepsSection = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 3rem 2rem;
  margin: 0 -2rem -3rem;
`;

const StepsInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const StepsTitle = styled.h2`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: ${props => props.theme.colors.text};
  font-weight: 400;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled(motion.div)`
  text-align: center;
`;

const StepNum = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  margin: 0 auto 1rem;
`;

const StepName = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StepDesc = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
`;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const SERVICES = [
  {
    icon: '✈',
    name: 'Airport Transfer',
    desc: 'Direct transfer from Victoria Falls Airport to your hotel. Comfortable, air-conditioned vehicles with professional drivers.',
    route: 'Airport → Hotel',
    duration: '20 min',
    price: '$35',
    unit: '/ trip',
  },
  {
    icon: '🚐',
    name: 'Hotel Transfer',
    desc: 'Seamless transfer from your hotel to any activity or attraction in Victoria Falls.',
    route: 'Hotel → Activity',
    duration: '15 min',
    price: '$25',
    unit: '/ trip',
  },
  {
    icon: '🚗',
    name: 'Private Driver',
    desc: 'Your own driver for the day. Perfect for sightseeing, shopping, and exploring at your own pace.',
    route: 'Flexible route',
    duration: 'Hourly',
    price: '$50',
    unit: '/ hr',
  },
  {
    icon: '🚌',
    name: 'Shuttle Service',
    desc: 'Shared transport running regular routes between key locations in Victoria Falls.',
    route: 'Fixed routes',
    duration: 'Scheduled',
    price: '$15',
    unit: '/ person',
  },
];

const STEPS = [
  { num: '1', name: 'Choose Your Route', desc: 'Select your pickup and drop-off locations from our available routes.' },
  { num: '2', name: 'Select Vehicle', desc: 'Choose the vehicle type that best suits your group size and comfort needs.' },
  { num: '3', name: 'Confirm Booking', desc: 'Review your details and confirm. Receive instant confirmation via email.' },
];

export default function TransportPage() {
  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Transport Hub</HeroTitle>
        <HeroSub>Seamless travel across Victoria Falls</HeroSub>
      </HeroSection>

      <Content>
        <SectionTitle>Our Services</SectionTitle>
        <SectionSub>Reliable transport for every occasion</SectionSub>

        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <Grid>
            {SERVICES.map(svc => (
              <Card key={svc.name} variants={fadeUp}>
                <CardIcon>{svc.icon}</CardIcon>
                <CardName>{svc.name}</CardName>
                <CardDesc>{svc.desc}</CardDesc>
                <CardRoute>
                  {svc.route} <span>·</span> {svc.duration}
                </CardRoute>
                <CardPrice>
                  <strong>{svc.price}</strong>
                  <span>{svc.unit}</span>
                </CardPrice>
                <BookBtn>Book Now</BookBtn>
              </Card>
            ))}
          </Grid>
        </motion.div>
      </Content>

      <StepsSection>
        <StepsInner>
          <StepsTitle>How It Works</StepsTitle>
          <StepsGrid>
            {STEPS.map(step => (
              <Step key={step.num} variants={fadeUp} initial="hidden" animate="visible">
                <StepNum>{step.num}</StepNum>
                <StepName>{step.name}</StepName>
                <StepDesc>{step.desc}</StepDesc>
              </Step>
            ))}
          </StepsGrid>
        </StepsInner>
      </StepsSection>
    </PageWrapper>
  );
}
