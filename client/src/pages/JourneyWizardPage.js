import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { seasons, tracks } from '../data/seasonalData';
import { useJourney } from '../hooks/useJourney';
import Icon from '../components/Icon';

const PageWrapper = styled.div`
  padding-top: 90px;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const WizardHeader = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 3rem 2rem 2rem;
  text-align: center;
`;

const WizardTitle = styled.h1`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: ${props => props.theme.colors.white};
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const WizardSub = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: rgba(255,255,255,0.7);
  margin-bottom: 2rem;
`;

const StepDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$active ? props.theme.colors.champagne : 'rgba(255,255,255,0.25)'};
  transition: all 0.3s ease;
`;

const StepLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.$active ? props.theme.colors.champagne : 'rgba(255,255,255,0.5)'};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-left: 0.75rem;
  font-weight: ${props => props.$active ? 600 : 400};
`;

const StepRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
`;

const WizardBody = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const StepTitle = styled.h2`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const StepDesc = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.md};
  margin-bottom: 2.5rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const OptionCard = styled(motion.button)`
  padding: 1.5rem;
  background: ${props => props.$selected ? props.theme.colors.primary : props.theme.colors.white};
  border: 2px solid ${props => props.$selected ? props.theme.colors.primary : props.theme.colors.border};
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const OptionIcon = styled.div`
  margin-bottom: 0.75rem;
  color: ${props => props.$selected ? props.theme.colors.white : props.theme.colors.primary};
`;

const OptionName = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
  margin-bottom: 0.35rem;
  color: ${props => props.$selected ? props.theme.colors.white : props.theme.colors.text};
`;

const OptionDesc = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.$selected ? 'rgba(255,255,255,0.8)' : props.theme.colors.textLight};
  line-height: 1.5;
`;

const OptionMeta = styled.div`
  margin-top: 0.75rem;
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.$selected ? 'rgba(255,255,255,0.6)' : props.theme.colors.textMuted};
`;

const BudgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const BudgetCard = styled(motion.button)`
  padding: 1.5rem;
  background: ${props => props.$selected ? props.theme.colors.primary : props.theme.colors.white};
  border: 2px solid ${props => props.$selected ? props.theme.colors.primary : props.theme.colors.border};
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;

  &:hover { border-color: ${props => props.theme.colors.primary}; }
`;

const BudgetName = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${props => props.$selected ? props.theme.colors.white : props.theme.colors.text};
`;

const BudgetRange = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.$selected ? 'rgba(255,255,255,0.8)' : props.theme.colors.textLight};
`;

const BudgetDesc = styled.p`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.$selected ? 'rgba(255,255,255,0.6)' : props.theme.colors.textMuted};
  margin-top: 0.5rem;
`;

const NavRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const BackBtn = styled.button`
  padding: 0.85rem 2rem;
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 0.3s ease;

  &:hover { border-color: ${props => props.theme.colors.primary}; }
`;

const NextBtn = styled.button`
  padding: 0.85rem 2.5rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: none;
  transition: all 0.3s ease;

  &:hover { background: ${props => props.theme.colors.primaryDark}; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const BUDGETS = [
  { id: 'smart', name: 'Smart', range: '$150 – $300 / night', desc: 'Excellent value without compromising on experience' },
  { id: 'premium', name: 'Premium', range: '$300 – $600 / night', desc: 'Superior comfort and curated touches' },
  { id: 'luxury', name: 'Luxury', range: '$600 – $1,000 / night', desc: 'Exceptional properties with world-class service' },
  { id: 'ultra', name: 'Ultra Luxury', range: '$1,000+ / night', desc: 'The finest Victoria Falls has to offer, with no compromise' },
];

const fade = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25 } },
};

export default function JourneyWizardPage() {
  const [step, setStep] = useState(1);
  const { selections, setSelections } = useJourney();
  const navigate = useNavigate();

  const toggleTrack = (trackId) => {
    setSelections(prev => ({
      ...prev,
      tracks: prev.tracks.includes(trackId)
        ? prev.tracks.filter(t => t !== trackId)
        : [...prev.tracks, trackId],
    }));
  };

  const canNext = () => {
    if (step === 1) return !!selections.season;
    if (step === 2) return selections.tracks.length > 0;
    if (step === 3) return !!selections.budget;
    return false;
  };

  const handleGenerate = () => {
    navigate('/plan/results');
  };

  return (
    <PageWrapper>
      <WizardHeader>
        <WizardTitle>Plan Your Journey</WizardTitle>
        <WizardSub>Answer three questions and we'll craft your perfect Victoria Falls journey</WizardSub>
        <StepRow>
          <StepDot $active={step >= 1} />
          <StepLabel $active={step === 1}>Season</StepLabel>
          <StepDot $active={step >= 2} />
          <StepLabel $active={step === 2}>Interests</StepLabel>
          <StepDot $active={step >= 3} />
          <StepLabel $active={step === 3}>Budget</StepLabel>
        </StepRow>
      </WizardHeader>

      <WizardBody>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={fade} initial="enter" animate="center" exit="exit">
              <StepTitle>When are you visiting?</StepTitle>
              <StepDesc>Each season offers a unique experience in Victoria Falls</StepDesc>
              <CardGrid>
                {seasons.map(s => (
                  <OptionCard
                    key={s.id}
                    $selected={selections.season === s.id}
                    onClick={() => setSelections(prev => ({ ...prev, season: s.id }))}
                  >
                    <OptionIcon $selected={selections.season === s.id}><Icon name={s.icon} size={32} /></OptionIcon>
                    <OptionName $selected={selections.season === s.id}>{s.name}</OptionName>
                    <OptionDesc>{s.description}</OptionDesc>
                    <OptionMeta>{s.months.join(' · ')} · {s.temperature}</OptionMeta>
                  </OptionCard>
                ))}
              </CardGrid>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={fade} initial="enter" animate="center" exit="exit">
              <StepTitle>What excites you most?</StepTitle>
              <StepDesc>Select one or more interests — we'll personalise your itinerary</StepDesc>
              <CardGrid>
                {tracks.map(t => (
                  <OptionCard
                    key={t.id}
                    $selected={selections.tracks.includes(t.id)}
                    onClick={() => toggleTrack(t.id)}
                  >
                    <OptionIcon $selected={selections.tracks.includes(t.id)}><Icon name={t.icon} size={32} /></OptionIcon>
                    <OptionName $selected={selections.tracks.includes(t.id)}>{t.name}</OptionName>
                    <OptionDesc>{t.description}</OptionDesc>
                    <OptionMeta>{t.activities.slice(0, 3).join(' · ')}</OptionMeta>
                  </OptionCard>
                ))}
              </CardGrid>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={fade} initial="enter" animate="center" exit="exit">
              <StepTitle>What's your budget?</StepTitle>
              <StepDesc>This helps us match the right accommodations and experiences</StepDesc>
              <BudgetGrid>
                {BUDGETS.map(b => (
                  <BudgetCard
                    key={b.id}
                    $selected={selections.budget === b.id}
                    onClick={() => setSelections(prev => ({ ...prev, budget: b.id }))}
                  >
                    <BudgetName $selected={selections.budget === b.id}>{b.name}</BudgetName>
                    <BudgetRange>{b.range}</BudgetRange>
                    <BudgetDesc>{b.desc}</BudgetDesc>
                  </BudgetCard>
                ))}
              </BudgetGrid>
            </motion.div>
          )}
        </AnimatePresence>

        <NavRow>
          {step > 1 && <BackBtn onClick={() => setStep(s => s - 1)}>Back</BackBtn>}
          {step < 3 ? (
            <NextBtn disabled={!canNext()} onClick={() => setStep(s => s + 1)}>Continue</NextBtn>
          ) : (
            <NextBtn disabled={!canNext()} onClick={handleGenerate}>Generate My Journey</NextBtn>
          )}
        </NavRow>
      </WizardBody>
    </PageWrapper>
  );
}
