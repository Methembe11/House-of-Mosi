import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useJourney } from '../hooks/useJourney';
import { accommodations, experiences, restaurants } from '../data/data';
import { seasons, tracks, seasonalBonuses } from '../data/seasonalData';

const PageWrapper = styled.div`padding-top: 90px;`;

const Header = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 3rem 2rem 2rem;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: ${props => props.theme.colors.white};
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const HeaderSub = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: rgba(255,255,255,0.7);
  margin-bottom: 1.5rem;
`;

const SummaryPills = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Pill = styled.span`
  padding: 0.4rem 1rem;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.white};
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const CostBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 2.5rem;
`;

const CostLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
`;

const CostAmount = styled.div`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const DayCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const DayHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DayNumber = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${props => props.theme.colors.cocoa};
  font-weight: 600;
`;

const DayTitle = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
`;

const DayCost = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
`;

const Slot = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};

  &:last-child { border-bottom: none; }
`;

const SlotTime = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${props => props.theme.colors.cocoa};
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
`;

const SlotCard = styled(Link)`
  display: flex;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: 1px solid ${props => props.theme.colors.borderLight};
  transition: all 0.3s ease;

  &:hover { border-color: ${props => props.theme.colors.primary}; }
`;

const SlotImg = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  flex-shrink: 0;
`;

const SlotInfo = styled.div`flex: 1;`;

const SlotName = styled.div`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: 500;
  margin-bottom: 0.2rem;
`;

const SlotMeta = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textMuted};
`;

const SlotPrice = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  white-space: nowrap;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const ActionBtn = styled(Link)`
  padding: 0.85rem 2rem;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
  transition: all 0.3s ease;
`;

const PrimaryBtn = styled(ActionBtn)`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;

  &:hover { background: ${props => props.theme.colors.primaryDark}; }
`;

const SecondaryBtn = styled(ActionBtn)`
  background: transparent;
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};

  &:hover { border-color: ${props => props.theme.colors.primary}; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 6rem 2rem;

  h2 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p { color: ${props => props.theme.colors.textLight}; margin-bottom: 2rem; }
`;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const BUDGET_MAP = {
  smart: { maxPrice: 350, label: 'Smart' },
  premium: { maxPrice: 700, label: 'Premium' },
  luxury: { maxPrice: 1100, label: 'Luxury' },
  ultra: { maxPrice: Infinity, label: 'Ultra Luxury' },
};

const DAY_THEMES = [
      ['Arrival & First Impressions', 'Welcome to Victoria Falls'],
  ['The Falls Up Close', 'Discover the Smoke That Thunders'],
  ['Wildlife & Adventure', 'Encounters with the Zambezi Bush'],
  ['Adrenaline & Culture', 'Thrills and Traditions'],
  ['Hidden Gems & Farewell', 'Last Moments in Paradise'],
];

function generateItinerary(selections) {
  const { season, tracks: selectedTracks, budget } = selections;
  const budgetInfo = BUDGET_MAP[budget] || BUDGET_MAP.premium;
  const seasonData = seasons.find(s => s.id === season);
  const bonuses = seasonalBonuses[season] || {};

  const numDays = budget === 'smart' ? 3 : budget === 'premium' ? 4 : 5;

  const suitableStays = accommodations
    .filter(a => a.priceFrom <= budgetInfo.maxPrice)
    .sort((a, b) => b.rating - a.rating);

  const scoredExps = experiences.map(exp => {
    let score = exp.rating;
    const trackMatch = selectedTracks.some(t => {
      const track = tracks.find(tr => tr.id === t);
      return track && (
        exp.type.toLowerCase().includes(t) ||
        exp.category.toLowerCase().includes(t) ||
        (t === 'adventure' && ['Adventure', 'Water'].includes(exp.category)) ||
        (t === 'wildlife' && ['Wildlife', 'Safari'].includes(exp.type)) ||
        (t === 'culture' && ['Cultural', 'Heritage'].includes(exp.type)) ||
        (t === 'relaxation' && ['Nature', 'Boat Cruise'].includes(exp.type)) ||
        (t === 'photography' && ['Aerial', 'Helicopter'].includes(exp.type))
      );
    });
    if (trackMatch) score += 2;
    const seasonBonus = Object.entries(bonuses).reduce((acc, [key, mult]) => {
      if (selectedTracks.includes(key)) return acc * mult;
      return acc;
    }, 1);
    score *= seasonBonus;
    return { ...exp, score };
  }).sort((a, b) => b.score - a.score);

  const suitableDining = [...restaurants].sort((a, b) => b.rating - a.rating);

  const itinerary = [];

  for (let d = 0; d < numDays; d++) {
    const dayStay = suitableStays[d % suitableStays.length];
    const dayExps = scoredExps.slice(d * 2, d * 2 + 2);
    const dayDining = suitableDining[d % suitableDining.length];

    const theme = DAY_THEMES[d] || ['Exploration Day', 'Another Great Day'];
    const dayCost = (dayStay?.priceFrom || 300) +
      dayExps.reduce((sum, e) => sum + (e.priceFrom || 0), 0) +
      (dayDining?.pricePerPerson || 50);

    itinerary.push({
      day: d + 1,
      title: theme[0],
      subtitle: theme[1],
      stay: dayStay,
      experiences: dayExps,
      dining: dayDining,
      estimatedCost: dayCost,
    });
  }

  return { itinerary, seasonData, numDays };
}

export default function JourneyResultsPage() {
  const { selections } = useJourney();

  const result = useMemo(() => {
    if (!selections.season || selections.tracks.length === 0 || !selections.budget) return null;
    return generateItinerary(selections);
  }, [selections]);

  if (!result) {
    return (
      <PageWrapper>
        <EmptyState>
          <h2>No journey generated yet</h2>
          <p>Complete the planning wizard first to see your personalised itinerary.</p>
          <PrimaryBtn to="/plan">Start Planning</PrimaryBtn>
        </EmptyState>
      </PageWrapper>
    );
  }

  const { itinerary, seasonData, numDays } = result;
  const totalCost = itinerary.reduce((sum, d) => sum + d.estimatedCost, 0);
  const selectedTrackNames = selections.tracks.map(t => tracks.find(tr => tr.id === t)?.name).filter(Boolean);

  return (
    <PageWrapper>
      <Header>
        <HeaderTitle>Your {numDays}-Day Victoria Falls Journey</HeaderTitle>
        <HeaderSub>A personalised itinerary crafted around your interests</HeaderSub>
        <SummaryPills>
          <Pill>{seasonData?.icon} {seasonData?.name}</Pill>
          {selectedTrackNames.map(n => <Pill key={n}>{n}</Pill>)}
          <Pill>{BUDGET_MAP[selections.budget]?.label}</Pill>
        </SummaryPills>
      </Header>

      <Content>
        <CostBar>
          <CostLabel>Estimated total for {numDays} days</CostLabel>
          <CostAmount>${totalCost.toLocaleString()}</CostAmount>
        </CostBar>

        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {itinerary.map(day => (
            <motion.div key={day.day} variants={fadeUp}>
              <DayCard>
                <DayHeader>
                  <div>
                    <DayNumber>Day {day.day}</DayNumber>
                    <DayTitle>{day.title}</DayTitle>
                  </div>
                  <DayCost>~${day.estimatedCost.toLocaleString()}</DayCost>
                </DayHeader>

                {day.stay && (
                  <Slot>
                    <SlotTime>Check-in</SlotTime>
                    <SlotCard to={`/stays/${day.stay.slug}`}>
                      <SlotImg src={day.stay.images[0]} alt={day.stay.name} />
                      <SlotInfo>
                        <SlotName>{day.stay.name}</SlotName>
                        <SlotMeta>{day.stay.category} · ★ {day.stay.rating}</SlotMeta>
                      </SlotInfo>
                      <SlotPrice>${day.stay.priceFrom}/night</SlotPrice>
                    </SlotCard>
                  </Slot>
                )}

                {day.experiences.map((exp, i) => (
                  <Slot key={exp.id}>
                    <SlotTime>{i === 0 ? 'Morning' : 'Afternoon'}</SlotTime>
                    <SlotCard to={`/experiences/${exp.slug}`}>
                      <SlotImg src={exp.images[0]} alt={exp.name} />
                      <SlotInfo>
                        <SlotName>{exp.name}</SlotName>
                        <SlotMeta>{exp.type} · {exp.duration} · ★ {exp.rating}</SlotMeta>
                      </SlotInfo>
                      <SlotPrice>${exp.priceFrom}/person</SlotPrice>
                    </SlotCard>
                  </Slot>
                ))}

                {day.dining && (
                  <Slot>
                    <SlotTime>Evening</SlotTime>
                    <SlotCard to={`/dining/${day.dining.slug}`}>
                      <SlotImg src={day.dining.images[0]} alt={day.dining.name} />
                      <SlotInfo>
                        <SlotName>{day.dining.name}</SlotName>
                        <SlotMeta>{day.dining.cuisine} · ★ {day.dining.rating}</SlotMeta>
                      </SlotInfo>
                      <SlotPrice>${day.dining.pricePerPerson}/person</SlotPrice>
                    </SlotCard>
                  </Slot>
                )}
              </DayCard>
            </motion.div>
          ))}
        </motion.div>

        <ActionBar>
          <SecondaryBtn to="/plan">Replan</SecondaryBtn>
          <PrimaryBtn to="/collection">Save to Collection</PrimaryBtn>
        </ActionBar>
      </Content>
    </PageWrapper>
  );
}
