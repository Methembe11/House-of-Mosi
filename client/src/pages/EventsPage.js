import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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

const TabRow = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  overflow-x: auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-wrap: nowrap;
  }
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.text : props.theme.colors.textMuted};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.$active ? 600 : 400};
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;

  &:hover { color: ${props => props.theme.colors.text}; }
`;

const ResultsCount = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardDate = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.cocoa};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const CardBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const CardBody = styled.div`
  padding: 1rem 1.5rem 1.5rem;
`;

const CardName = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const CardDesc = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const CardLocation = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
`;

const CardPrice = styled.span`
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.text};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.textMuted};

  h3 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: ${props => props.theme.fontSizes.xxl};
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 0.5rem;
  }
`;

const CTASection = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 4rem 2rem;
  text-align: center;
  margin: 3rem -2rem -3rem;
`;

const CTAInner = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: ${props => props.theme.colors.text};
  font-weight: 400;
  margin-bottom: 0.75rem;
`;

const CTAText = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 1.5rem;
`;

const CTALink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  font-family: ${props => props.theme.fonts.sans};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover { background: ${props => props.theme.colors.primaryDark}; }
`;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const EVENTS = [
  {
    id: 1,
    name: 'Victoria Falls Carnival',
    category: 'Festivals',
    date: 'Dec 28–31',
    price: '$120',
    description: 'Three days of music, culture, and celebration at the world\'s greatest natural wonder.',
    location: 'Victoria Falls',
  },
  {
    id: 2,
    name: 'Africa Travel Week',
    category: 'Conferences',
    date: 'Mar 10–12',
    price: 'Free',
    description: 'The continent\'s premier travel industry event connecting buyers, media, and tourism brands.',
    location: 'Victoria Falls Conference Centre',
  },
  {
    id: 3,
    name: 'Boma Drum Show',
    category: 'Live Entertainment',
    date: 'Nightly',
    price: '$85',
    description: 'Traditional drumming and cultural performances in an immersive boma setting.',
    location: 'The Boma',
  },
  {
    id: 4,
    name: 'Zambezi Music Festival',
    category: 'Festivals',
    date: 'Jun 15–16',
    price: '$75',
    description: 'Two days of African music by the river, featuring local and international artists.',
    location: 'Zambezi Riverbank',
  },
  {
    id: 5,
    name: 'Wildlife Photography Workshop',
    category: 'Conferences',
    date: 'Sep 5–7',
    price: '$250',
    description: 'Learn from award-winning wildlife photographers in the heart of Zimbabwe.',
    location: 'National Park Education Centre',
  },
  {
    id: 6,
    name: 'Zimbabwe Independence Celebrations',
    category: 'Cultural',
    date: 'Apr 18',
    price: 'Free',
    description: 'National celebrations with traditional performances, food, and cultural exhibitions.',
    location: 'Town Centre',
  },
];

const TABS = ['All', 'Festivals', 'Conferences', 'Live Entertainment', 'Cultural'];

export default function EventsPage() {
  const [tab, setTab] = useState('All');

  const filtered = useMemo(() => {
    if (tab === 'All') return EVENTS;
    return EVENTS.filter(e => e.category === tab);
  }, [tab]);

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Events in Victoria Falls</HeroTitle>
        <HeroSub>Festivals, conferences, and live entertainment</HeroSub>
      </HeroSection>

      <Content>
        <TabRow>
          {TABS.map(t => (
            <Tab key={t} $active={tab === t} onClick={() => setTab(t)}>
              {t}
            </Tab>
          ))}
        </TabRow>

        <ResultsCount>{filtered.length} {filtered.length === 1 ? 'event' : 'events'} found</ResultsCount>

        {filtered.length === 0 ? (
          <EmptyState>
            <h3>No events found</h3>
            <p>Check back soon for upcoming events</p>
          </EmptyState>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <Grid>
              {filtered.map(event => (
                <Card key={event.id} variants={fadeUp}>
                  <CardHeader>
                    <CardDate>{event.date}</CardDate>
                    <CardBadge>{event.category}</CardBadge>
                  </CardHeader>
                  <CardBody>
                    <CardName>{event.name}</CardName>
                    <CardDesc>{event.description}</CardDesc>
                  </CardBody>
                  <CardFooter>
                    <CardLocation>{event.location}</CardLocation>
                    <CardPrice>{event.price}</CardPrice>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </motion.div>
        )}
      </Content>

      <CTASection>
        <CTAInner>
          <CTATitle>Hosting an event?</CTATitle>
          <CTAText>List your event on VicFalls One and reach thousands of visitors and locals.</CTAText>
          <CTALink to="/contact">Get in Touch</CTALink>
        </CTAInner>
      </CTASection>
    </PageWrapper>
  );
}
