import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { Container, Section, SectionHeading, Eyebrow, Btn, PageHero } from '../components/ui';
import { destinations } from '../data/data';

const HERO = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=2000&q=85';

const QuickNav = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.cream};
  position: sticky;
  top: 64px;
  z-index: 50;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    top: 0;
    position: static;
  }
`;

const QuickNavInner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.gutter};
  display: flex;
  gap: 2.25rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }

  a {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.textLight};
    padding: 1.1rem 0;
    white-space: nowrap;
    border-bottom: 2px solid transparent;
    transition: all ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.identity};
      border-bottom-color: ${props => props.theme.colors.accent};
    }
  }
`;

const SeasonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const SeasonCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.borderLight};
  padding: 2rem;
  transition: all ${props => props.theme.transitions.normal};

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    .icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: ${props => props.theme.colors.ivory};
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${props => props.theme.colors.identity};
    }

    span {
      font-family: ${props => props.theme.fonts.mono};
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${props => props.theme.colors.accentDeep};
    }
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.6rem;
  }

  .temp {
    font-family: ${props => props.theme.fonts.serif};
    font-size: 1.05rem;
    font-style: italic;
    color: ${props => props.theme.colors.identity};
    margin-bottom: 0.9rem;
  }

  ul {
    list-style: none;

    li {
      font-size: ${props => props.theme.fontSizes.sm};
      color: ${props => props.theme.colors.textLight};
      padding: 0.35rem 0;
      display: flex;
      gap: 0.6rem;
      align-items: flex-start;

      &::before {
        content: '—';
        color: ${props => props.theme.colors.accent};
        flex-shrink: 0;
      }
    }
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const InfoSplit = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: ${props => props.theme.colors.cream};
  border: 1px solid ${props => props.theme.colors.borderLight};
  padding: 2.25rem;

  .icon {
    width: 48px;
    height: 48px;
    border: 1px solid ${props => props.theme.colors.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.identity};
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;

    li {
      font-size: ${props => props.theme.fontSizes.sm};
      color: ${props => props.theme.colors.textLight};
      padding: 0.5rem 0;
      border-bottom: 1px dashed ${props => props.theme.colors.border};

      &:last-child { border-bottom: none; }

      strong {
        display: block;
        font-weight: 600;
        color: ${props => props.theme.colors.text};
        font-size: 0.9rem;
        margin-bottom: 0.15rem;
      }
    }
  }
`;

const EmergencyPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: ${props => props.theme.colors.backgroundDark};
  border: 1px solid ${props => props.theme.colors.backgroundDark};

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const EmergencyCard = styled.div`
  background: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors.white};
  padding: 2.5rem 2rem;
  text-align: center;

  .num {
    font-family: ${props => props.theme.fonts.serif};
    font-size: clamp(2.4rem, 4vw, 3.4rem);
    font-weight: 300;
    color: ${props => props.theme.colors.accent};
    margin-bottom: 0.5rem;
    letter-spacing: 0.02em;
  }

  .label {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(250, 248, 243, 0.6);
  }
`;

const MapSection = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 2rem;
  align-items: stretch;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MapCanvas = styled.div`
  position: relative;
  background: ${props => props.theme.colors.backgroundDark};
  min-height: 420px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.backgroundDark};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.55;
    position: absolute;
    inset: 0;
  }

  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(203,184,157,0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(203,184,157,0.12) 1px, transparent 1px);
    background-size: 56px 56px;
    z-index: 1;
  }
`;

const MapPin = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  transform: translate(-50%, -100%);

  .dot {
    width: ${props => props.$major ? '22px' : '14px'};
    height: ${props => props.$major ? '22px' : '14px'};
    border-radius: 50%;
    background: ${props => props.$major ? props.theme.colors.accent : props.theme.colors.identityLight};
    border: 3px solid ${props => props.theme.colors.white};
    box-shadow: 0 2px 10px rgba(0,0,0,0.4);
    animation: pulse 2.5s ease infinite;
  }

  .label {
    margin-top: 0.5rem;
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.text};
    font-size: 11px;
    font-weight: 600;
    padding: 0.3rem 0.7rem;
    white-space: nowrap;
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const AreaList = styled.div`
  display: flex;
  flex-direction: column;
`;

const AreaItem = styled(Link)`
  display: flex;
  gap: 1.25rem;
  align-items: center;
  padding: 1.1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};

  img {
    width: 84px;
    height: 64px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .info {
    flex: 1;

    h4 {
      font-size: 1.15rem;
      margin-bottom: 0.2rem;
      font-weight: 500;
    }

    p {
      font-size: ${props => props.theme.fontSizes.sm};
    }
  }

  .count {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 11px;
    color: ${props => props.theme.colors.identity};
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  &:hover h4 { color: ${props => props.theme.colors.identity}; }
`;

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const DealCard = styled(Link)`
  display: block;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.backgroundDark};
  aspect-ratio: 4 / 3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
    transition: transform 0.8s ${props => props.theme.transitions.cubic};
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(41,39,34,0.85), rgba(41,39,34,0.1));
  }

  .content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.75rem;
    color: ${props => props.theme.colors.white};
    z-index: 2;

    .save {
      display: inline-block;
      background: ${props => props.theme.colors.accent};
      color: ${props => props.theme.colors.text};
      font-family: ${props => props.theme.fonts.mono};
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      padding: 0.35rem 0.8rem;
      margin-bottom: 0.9rem;
    }

    h3 {
      color: ${props => props.theme.colors.white};
      font-size: 1.45rem;
      margin-bottom: 0.35rem;
    }

    p {
      color: rgba(250, 248, 243, 0.75);
      font-size: ${props => props.theme.fontSizes.sm};
    }
  }

  &:hover img { transform: scale(1.07); }
`;

const ItineraryCta = styled(Section)`
  background: ${props => props.theme.colors.identity};
  color: ${props => props.theme.colors.white};
  text-align: center;

  h2 { color: ${props => props.theme.colors.white}; }
  p { color: rgba(250, 248, 243, 0.75); }
`;

const SEASONS = [
  {
    icon: 'sun',
    name: 'Dry Season',
    when: 'May – October',
    temp: '18°C – 32°C',
    points: ['Best wildlife viewing', 'Low water — Devil\'s Pool open', 'Peak season & premium rates', 'Clear skies, cool evenings'],
  },
  {
    icon: 'waterfall',
    name: 'High Water',
    when: 'February – April',
    temp: '20°C – 30°C',
    points: ['Falls at full thundering force', 'Rafting closed below the bridge', 'Lush rainforest, heavy spray', 'Fewer crowds, lower rates'],
  },
  {
    icon: 'rain',
    name: 'Green Season',
    when: 'November – January',
    temp: '22°C – 35°C',
    points: ['Afternoon thunderstorms', 'Emerald landscapes & birds', 'Best-value rates', 'Falls building to full flow'],
  },
  {
    icon: 'compass',
    name: 'Sweet Spot',
    when: 'August – September',
    temp: '18°C – 31°C',
    points: ['Full falls + rafting season', 'Ideal adventure window', 'Great game viewing', 'Book early'],
  },
];

const INFO = [
  {
    icon: 'ticket',
    title: 'Visas & Entry',
    items: [
      { k: 'Nationals of 60+ countries', v: 'Visa on arrival at Victoria Falls Airport or e-visa before travel.' },
      { k: 'Zambia / Zimbabwe', v: 'Most visits valid up to 30 days; Kaza Uni-Visa covers both sides.' },
      { k: 'Passport validity', v: 'Minimum 6 months from date of arrival.' },
    ],
  },
  {
    icon: 'chart',
    title: 'Money & Tipping',
    items: [
      { k: 'Currency', v: 'USD is king. Cards widely accepted; carry small cash for markets.' },
      { k: 'Tipping', v: '10–15% at restaurants; guides and drivers appreciated.' },
      { k: 'ATMs', v: 'Available in town; carry USD cash for remote activities.' },
    ],
  },
  {
    icon: 'check',
    title: 'Safety & Health',
    items: [
      { k: 'Malaria', v: 'Prophylaxis recommended; mosquito protection essential.' },
      { k: 'Water', v: 'Drink bottled water; avoid swimming in the Zambezi (crocodiles!).' },
      { k: 'Wildlife', v: 'Keep distance — elephants and hippos roam freely.' },
    ],
  },
];

const EMERGENCY = [
  { num: '993', label: 'Ambulance' },
  { num: '995', label: 'Police' },
  { num: '999', label: 'Fire & Rescue' },
  { num: '+263 213 284 000', label: 'Victoria Falls Hospital' },
];

const DEALS = [
  {
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    save: 'Save 20%',
    title: 'Family Falls Package',
    desc: '5 days, 4 nights with cruise, safari, and helicopter.',
    to: '/plan',
  },
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    save: 'Free transfer',
    title: 'Safari Lodge Escape',
    desc: 'Two nights at a waterhole lodge — airport transfer included.',
    to: '/stays',
  },
  {
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    save: '15% off',
    title: 'Dinner & Drum Duo',
    desc: 'Boma dinner show for two with champagne sundowner.',
    to: '/dining',
  },
];

const MAP_POSITIONS = [
  { name: 'Victoria Falls', lat: 34, lng: 62, major: true },
  { name: 'Falls Bridge', lat: 30, lng: 70, major: false },
  { name: 'Safari Lodge', lat: 14, lng: 30, major: false },
  { name: 'Town Centre', lat: 52, lng: 78, major: false },
  { name: 'Helipad', lat: 12, lng: 55, major: false },
];

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 01 — Visitor OS"
        title={<>Visit Victoria Falls, <em>properly.</em></>}
        subtitle="Weather, seasons, visas, money, maps, deals, and who to call in an emergency. Everything a visitor needs, in one operating layer."
        image={HERO}
      />

      <QuickNav>
        <QuickNavInner>
          <a href="#seasons">Seasons & Weather</a>
          <a href="#practical">Practical Intel</a>
          <a href="#emergency">Emergency</a>
          <a href="#maps">Maps & Areas</a>
          <a href="#deals">Local Deals</a>
          <a href="/plan">Plan an Itinerary</a>
        </QuickNavInner>
      </QuickNav>

      <Section id="seasons">
        <Container>
          <SectionHeading>
            <Eyebrow className="eyebrow">Seasons & Weather</Eyebrow>
            <h2>Four seasons, one wonder</h2>
            <p>Victoria Falls never closes — it transforms. Here's when to go for the thundering spray, the wildlife, the adventure, or the best rates.</p>
          </SectionHeading>
          <SeasonGrid>
            {SEASONS.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, y: 24 }} whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                <SeasonCard>
                  <div className="top">
                    <div className="icon"><Icon name={s.icon} size={20} /></div>
                    <span>{s.when}</span>
                  </div>
                  <h3>{s.name}</h3>
                  <div className="temp">{s.temp}</div>
                  <ul>{s.points.map(p => <li key={p}>{p}</li>)}</ul>
                </SeasonCard>
              </motion.div>
            ))}
          </SeasonGrid>
        </Container>
      </Section>

      <Section $bg={props => props.theme.colors.cream} id="practical">
        <Container>
          <SectionHeading>
            <Eyebrow className="eyebrow">Practical Intel</Eyebrow>
            <h2>Arrive knowing</h2>
            <p>The details most guides forget to mention.</p>
          </SectionHeading>
          <InfoSplit>
            {INFO.map(card => (
              <InfoCard key={card.title}>
                <div className="icon"><Icon name={card.icon} size={22} /></div>
                <h3>{card.title}</h3>
                <ul>
                  {card.items.map(item => (
                    <li key={item.k}><strong>{item.k}</strong>{item.v}</li>
                  ))}
                </ul>
              </InfoCard>
            ))}
          </InfoSplit>
        </Container>
      </Section>

      <Section id="emergency">
        <Container>
          <SectionHeading $center>
            <Eyebrow className="eyebrow">Emergency Contacts</Eyebrow>
            <h2>Who to call</h2>
            <p>Numbers worth saving before you land.</p>
          </SectionHeading>
          <EmergencyPanel>
            {EMERGENCY.map(e => (
              <EmergencyCard key={e.label}>
                <div className="num">{e.num}</div>
                <div className="label">{e.label}</div>
              </EmergencyCard>
            ))}
          </EmergencyPanel>
        </Container>
      </Section>

      <Section $bg={props => props.theme.colors.cream} id="maps">
        <Container>
          <SectionHeading>
            <Eyebrow className="eyebrow">Maps & Areas</Eyebrow>
            <h2>Know your neighbourhood</h2>
            <p>The destination is small — these six areas cover everything worth knowing.</p>
          </SectionHeading>
          <MapSection>
            <MapCanvas>
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" alt="Victoria Falls landscape" />
              <div className="grid-overlay" />
              {MAP_POSITIONS.map(p => (
                <div key={p.name} style={{ left: `${p.lng}%`, top: `${p.lat}%`, position: 'absolute' }}>
                  <MapPin $major={p.major}>
                    <div className="dot" />
                    <div className="label">{p.name}</div>
                  </MapPin>
                </div>
              ))}
            </MapCanvas>
            <AreaList>
              {destinations.map(d => (
                <AreaItem key={d.id} to="/destinations">
                  <img src={d.image} alt={d.name} loading="lazy" />
                  <div className="info">
                    <h4>{d.name}</h4>
                    <p>{d.description}</p>
                  </div>
                  <span className="count">{d.propertyCount} stays</span>
                </AreaItem>
              ))}
            </AreaList>
          </MapSection>
        </Container>
      </Section>

      <Section id="deals">
        <Container>
          <SectionHeading>
            <Eyebrow className="eyebrow">Local Deals</Eyebrow>
            <h2>Deals worth packing for</h2>
            <p>Curated packages negotiated across the ecosystem — stay, play, dine, move.</p>
          </SectionHeading>
          <DealsGrid>
            {DEALS.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, y: 24 }} whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                <DealCard to={d.to}>
                  <img src={d.image} alt={d.title} loading="lazy" />
                  <div className="content">
                    <span className="save">{d.save}</span>
                    <h3>{d.title}</h3>
                    <p>{d.desc}</p>
                  </div>
                </DealCard>
              </motion.div>
            ))}
          </DealsGrid>
        </Container>
      </Section>

      <ItineraryCta>
        <Container>
          <Eyebrow className="eyebrow" $light>Next Step</Eyebrow>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', margin: '1rem auto' }}>Turn intel into a journey.</h2>
          <p style={{ maxWidth: 520, margin: '0 auto 2.25rem' }}>
            Describe your dates, budget, and style — the AI concierge builds your itinerary across the whole ecosystem.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn to="/plan" $variant="gold">Build My Itinerary</Btn>
            <Btn to="/events" $variant="ghost-light">See What's On</Btn>
          </div>
        </Container>
      </ItineraryCta>
    </>
  );
}
