import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { Container, Section, SectionHeading, Eyebrow, Btn } from '../components/ui';
import { accommodations, experiences, restaurants, events, transportServices, guides } from '../data/data';

const HERO_IMG = 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=2000&q=85';

const Hero = styled.section`
  position: relative;
  height: 100vh;
  min-height: 720px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: ${props => props.theme.colors.backgroundDark};
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.72;
    animation: heroZoom 20s ${props => props.theme.transitions.cubic} forwards;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(41,39,34,0.94) 0%,
      rgba(41,39,34,0.5) 45%,
      rgba(41,39,34,0.18) 100%
    );
  }

  @keyframes heroZoom {
    from { transform: scale(1.08); }
    to { transform: scale(1); }
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  width: 100%;
  padding: 0 ${props => props.theme.spacing.gutter} 0;
  color: ${props => props.theme.colors.white};
`;

const HeroSystem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;

  .sys-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${props => props.theme.colors.accent};
    animation: pulse 2s ease infinite;
  }
`;

const HeroSysText = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accent};
`;

const HeroTitle = styled.h1`
  color: ${props => props.theme.colors.white};
  font-size: clamp(2.9rem, 7vw, 5.75rem);
  font-weight: 300;
  line-height: 1.02;
  margin-bottom: 1.5rem;
  max-width: 950px;

  em {
    font-style: italic;
    color: ${props => props.theme.colors.accent};
  }
`;

const HeroSub = styled.p`
  color: rgba(250, 248, 243, 0.82);
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  max-width: 620px;
  line-height: 1.7;
  margin-bottom: 2.5rem;
`;

const CommandBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(250, 248, 243, 0.08);
  border: 1px solid rgba(203, 184, 157, 0.4);
  backdrop-filter: blur(12px);
  padding: 0.35rem 0.35rem 0.35rem 1.5rem;
  max-width: 780px;
  transition: border-color ${props => props.theme.transitions.fast};

  &:hover, &:focus-within {
    border-color: ${props => props.theme.colors.accent};
  }

  svg {
    color: ${props => props.theme.colors.accent};
    flex-shrink: 0;
  }

  .cmd-text {
    font-family: ${props => props.theme.fonts.serif};
    font-size: 1.05rem;
    font-style: italic;
    color: rgba(250, 248, 243, 0.55);
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    .cmd-text { font-size: 0.9rem; }
  }
`;

const CommandBtn = styled(Link)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  padding: 0.95rem 1.9rem;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 500;
  white-space: nowrap;
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    background: ${props => props.theme.colors.white};
    transform: translateY(-2px);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.85rem 1.2rem;
    font-size: 10px;
  }
`;

const QuickChips = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1.25rem;

  a {
    font-size: 12px;
    color: rgba(250, 248, 243, 0.55);
    border: 1px solid rgba(250, 248, 243, 0.2);
    padding: 0.4rem 1rem;
    font-family: ${props => props.theme.fonts.mono};
    letter-spacing: 0.08em;
    transition: all ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.white};
      border-color: ${props => props.theme.colors.accent};
    }
  }
`;

const HeroStats = styled.div`
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(203, 184, 157, 0.25);
  margin-top: clamp(2.5rem, 6vh, 4rem);
  background: rgba(41, 39, 34, 0.25);
  backdrop-filter: blur(10px);
`;

const HeroStatsInner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 1.4rem ${props => props.theme.spacing.gutter};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
`;

const HStat = styled.div`
  .v {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 1.05rem;
    letter-spacing: 0.05em;
    color: ${props => props.theme.colors.white};
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${props => props.theme.colors.identityLight};
      animation: pulse 2.4s ease infinite;
    }
  }

  .l {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 9px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(250, 248, 243, 0.45);
  }
`;

const SystemSection = styled(Section)`
  background: ${props => props.theme.colors.background};
`;

const PillarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: ${props => props.theme.colors.border};
  border: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Pillar = styled(Link)`
  background: ${props => props.theme.colors.cream};
  padding: 2.75rem 2rem;
  position: relative;
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};
  display: block;

  .num {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 11px;
    letter-spacing: 0.3em;
    color: ${props => props.theme.colors.accentDeep};
    margin-bottom: 1.5rem;
    display: block;
  }

  h3 {
    font-size: 1.7rem;
    margin-bottom: 0.6rem;
    transition: color ${props => props.theme.transitions.fast};
  }

  p {
    font-size: ${props => props.theme.fontSizes.sm};
    line-height: 1.65;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.theme.colors.identity};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};
  }

  &:hover {
    background: ${props => props.theme.colors.white};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.lg};

    h3 { color: ${props => props.theme.colors.identity}; }
    &::after { transform: scaleX(1); }
  }
`;

const FeaturedRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const StayCard = styled(Link)`
  position: relative;
  display: block;
  overflow: hidden;
  background: ${props => props.theme.colors.backgroundDark};
  aspect-ratio: 3 / 4;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.9s ${props => props.theme.transitions.cubic};
    opacity: 0.92;
  }

  .shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(41,39,34,0.88) 0%, rgba(41,39,34,0.1) 55%, rgba(41,39,34,0.15) 100%);
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2rem;
    color: ${props => props.theme.colors.white};

    .tag {
      font-family: ${props => props.theme.fonts.mono};
      font-size: 10px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: ${props => props.theme.colors.accent};
      margin-bottom: 0.75rem;
      display: block;
    }

    h3 {
      color: ${props => props.theme.colors.white};
      font-size: 1.75rem;
      margin-bottom: 0.4rem;
    }

    .meta {
      font-family: ${props => props.theme.fonts.mono};
      font-size: 11px;
      color: rgba(250,248,243,0.7);
      display: flex;
      justify-content: space-between;
      letter-spacing: 0.06em;
    }
  }

  &:hover {
    img { transform: scale(1.07); }
    .content h3 { color: ${props => props.theme.colors.accent}; }
  }
`;

const Split = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3.5rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const SplitMedia = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 100%;
    min-height: 460px;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1.25rem -1.25rem -1.25rem 1.25rem;
    border: 1px solid ${props => props.theme.colors.accent};
    opacity: 0.5;
    pointer-events: none;
  }
`;

const ExpList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExpItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: padding-left ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};

  .idx {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 11px;
    color: ${props => props.theme.colors.accentDeep};
    letter-spacing: 0.15em;
    flex-shrink: 0;
    width: 3rem;
  }

  .body {
    flex: 1;

    h4 {
      font-size: 1.35rem;
      margin-bottom: 0.25rem;
      font-weight: 500;
    }

    p {
      font-size: ${props => props.theme.fontSizes.sm};
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;

      span {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-family: ${props => props.theme.fonts.mono};
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: ${props => props.theme.colors.textLight};
      }
    }
  }

  .price {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 0.9rem;
    color: ${props => props.theme.colors.identity};
    flex-shrink: 0;
  }

  &:hover {
    padding-left: 1rem;
    border-bottom-color: ${props => props.theme.colors.accent};

    h4 { color: ${props => props.theme.colors.identity}; }
  }

  &:last-child { border-bottom: none; }
`;

const DarkSection = styled(Section)`
  background: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors.white};
`;

const EventTicker = styled.div`
  overflow: hidden;
  background: ${props => props.theme.colors.identity};
  padding: 1rem 0;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 80px;
    z-index: 2;
  }

  &::before { left: 0; background: linear-gradient(90deg, ${props => props.theme.colors.identity}, transparent); }
  &::after { right: 0; background: linear-gradient(-90deg, ${props => props.theme.colors.identity}, transparent); }
`;

const TickerTrack = styled.div`
  display: flex;
  gap: 4rem;
  width: max-content;
  animation: ticker 45s linear infinite;

  &:hover { animation-play-state: paused; }
`;

const TickerItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${props => props.theme.colors.white};
  white-space: nowrap;

  .date {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.18em;
    color: rgba(250,248,243,0.6);
  }

  .name {
    font-family: ${props => props.theme.fonts.serif};
    font-size: 1.2rem;
    font-style: italic;
  }

  .sep {
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.accent};
  }

  &:hover .name { color: ${props => props.theme.colors.accent}; }
`;

const DiningGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const DiningCard = styled(Link)`
  display: block;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.borderLight};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};

  .media {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s ${props => props.theme.transitions.cubic};
    }

    span {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: ${props => props.theme.colors.text};
      color: ${props => props.theme.colors.white};
      font-family: ${props => props.theme.fonts.mono};
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 0.35rem 0.8rem;
    }
  }

  .body {
    padding: 1.5rem 1.75rem 1.75rem;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.35rem;
    }

    .cuisine {
      font-family: ${props => props.theme.fonts.mono};
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: ${props => props.theme.colors.accentDeep};
      margin-bottom: 0.75rem;
    }

    p {
      font-size: ${props => props.theme.fontSizes.sm};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
    .media img { transform: scale(1.06); }
  }
`;

const MoveStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: ${props => props.theme.colors.border};
  border: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const MoveCard = styled(Link)`
  background: ${props => props.theme.colors.cream};
  padding: 2rem;
  text-align: center;
  transition: all ${props => props.theme.transitions.normal};

  .ico {
    width: 52px;
    height: 52px;
    margin: 0 auto 1.25rem;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.identity};
    transition: all ${props => props.theme.transitions.normal};
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.35rem;
    font-weight: 500;
  }

  p {
    font-size: ${props => props.theme.fontSizes.sm};
  }

  .price {
    margin-top: 0.9rem;
    font-family: ${props => props.theme.fonts.mono};
    font-size: 0.85rem;
    color: ${props => props.theme.colors.identity};
  }

  &:hover {
    background: ${props => props.theme.colors.white};
    transform: translateY(-3px);

    .ico { background: ${props => props.theme.colors.identity}; color: ${props => props.theme.colors.white}; }
  }
`;

const AiPanel = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const AiWindow = styled.div`
  background: rgba(250, 248, 243, 0.04);
  border: 1px solid rgba(203, 184, 157, 0.25);
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.xl};
`;

const AiWindowBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid rgba(203, 184, 157, 0.2);

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${props => props.theme.colors.accentDeep};
    opacity: 0.7;
  }

  span {
    flex: 1;
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.2em;
    color: rgba(250, 248, 243, 0.5);
    text-transform: uppercase;
    text-align: center;
  }
`;

const AiBody = styled.div`
  padding: 2rem;

  .q {
    font-family: ${props => props.theme.fonts.serif};
    font-size: 1.25rem;
    font-style: italic;
    color: ${props => props.theme.colors.white};
    margin-bottom: 1.5rem;
  }

  .trip {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
`;

const TripLine = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .d {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.2em;
    color: ${props => props.theme.colors.accent};
    width: 2.4rem;
    flex-shrink: 0;
  }

  .line {
    flex: 1;
    height: 1px;
    background: rgba(203, 184, 157, 0.3);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: -2px;
      top: -3px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${props => props.theme.colors.accent};
    }
  }

  .t {
    flex: 3;
    font-size: 0.95rem;
    color: rgba(250, 248, 243, 0.85);
  }

  .c {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    color: rgba(250, 248, 243, 0.45);
  }
`;

const GuidesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const GuideCard = styled(Link)`
  display: block;
  border: 1px solid ${props => props.theme.colors.borderLight};
  background: ${props => props.theme.colors.cream};
  padding: 2.25rem;
  transition: all ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};

  .cat {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.accentDeep};
    margin-bottom: 1rem;
    display: block;
  }

  h3 {
    font-size: 1.55rem;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: ${props => props.theme.fontSizes.sm};
    margin-bottom: 1.5rem;
  }

  .read {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.identity};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: gap ${props => props.theme.transitions.fast};
  }

  &:hover {
    background: ${props => props.theme.colors.white};
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.accent};

    .read { gap: 1rem; }
    h3 { color: ${props => props.theme.colors.identity}; }
  }
`;

const FinalCta = styled(Section)`
  background: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors.white};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, transparent, rgba(203,184,157,0.4), transparent);
  }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const PILLARS = [
  { to: '/visit', label: 'Visit', desc: 'Weather, maps, visas, emergencies, and practical intel for arriving well.' },
  { to: '/stays', label: 'Stay', desc: 'Hotels, lodges, resorts, guest houses, safari camps, and villas.' },
  { to: '/experiences', label: 'Experience', desc: 'Activities across the falls, the gorge, the river, and the bush.' },
  { to: '/dining', label: 'Eat', desc: 'Restaurants from riverside fine dining to the Boma drum show.' },
  { to: '/transport', label: 'Move', desc: 'Airport transfers, car hire, private drivers, and shared shuttles.' },
  { to: '/events', label: 'Events', desc: 'Festivals, conferences, concerts, and cultural calendars.' },
  { to: '/business', label: 'Business', desc: 'Claim listings, manage availability, and view analytics.' },
  { to: '/discover', label: 'Discover', desc: 'History, seasons, wildlife, culture, and neighbourhoods.' },
];

const TRIP_LINES = [
  { d: 'DAY 1', t: 'Arrive — private airport transfer', c: 'Move' },
  { d: 'DAY 2', t: 'Sunset Zambezi cruise + Boma drum dinner', c: 'Experience / Eat' },
  { d: 'DAY 3', t: 'Flight of Angels helicopter + Falls walk', c: 'Experience' },
  { d: 'DAY 4', t: 'Big Five safari in Chobe National Park', c: 'Experience' },
  { d: 'DAY 5', t: 'Departure — shuttle to the airport', c: 'Move' },
];

const STATS = [
  { v: '35°C', l: 'Today in Victoria Falls', live: true },
  { v: '12', l: 'Events on this month', live: false },
  { v: '9.4', l: 'Avg. visitor rating', live: false },
  { v: '1.7km', l: 'The width of the falls', live: false },
];

const QUICK = [
  { label: '5 days · family · $3,000', to: '/plan' },
  { label: 'What\'s on this weekend?', to: '/events' },
  { label: 'Where should I stay?', to: '/stays' },
];

export default function HomePage() {
  const [prompt, setPrompt] = useState(0);
  const featuredStays = accommodations.filter(a => a.featured).slice(0, 3);
  const featuredExps = experiences.filter(e => e.featured).slice(0, 4);
  const featuredDining = restaurants.filter(r => r.featured).slice(0, 3);
  const upcomingEvents = events.slice(0, 8);
  const moveServices = transportServices.slice(0, 4);
  const featuredGuides = guides.slice(0, 3);

  useEffect(() => {
    const t = setInterval(() => setPrompt(p => (p + 1) % QUICK.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Hero>
        <HeroBg><img src={HERO_IMG} alt="Victoria Falls" /></HeroBg>
        <HeroInner>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <HeroSystem>
              <span className="sys-dot" />
              <HeroSysText>VF-ONE // Digital Operating System</HeroSysText>
            </HeroSystem>
            <HeroTitle>
              One destination.<br />One <em>system.</em>
            </HeroTitle>
            <HeroSub>
              Victoria Falls — where to stay, what to do, what's on, how to move, and who to call.
              The entire destination, wired into a single digital front door.
            </HeroSub>
<CommandBar>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span className="cmd-text">"{QUICK[prompt].label}"</span>
              <CommandBtn
                to={QUICK[prompt].to}
                onClick={() => setPrompt(Math.floor(Math.random() * QUICK.length))}
              >
                Build My Journey
              </CommandBtn>
            </CommandBar>
            <QuickChips>
              {QUICK.map((q, i) => (
                <Link key={q.label} to={q.to} onClick={() => i !== 0 && setPrompt(i)}>{q.label}</Link>
              ))}
            </QuickChips>
          </motion.div>
        </HeroInner>

        <HeroStats>
          <HeroStatsInner>
            {STATS.map(s => (
              <HStat key={s.l}>
                <div className="v">{s.live && <span className="dot" />}{s.v}</div>
                <div className="l">{s.l}</div>
              </HStat>
            ))}
          </HeroStatsInner>
        </HeroStats>
      </Hero>

      <SystemSection>
        <Container>
          <SectionHeading $center>
            <Eyebrow className="eyebrow">System Modules</Eyebrow>
            <h2>Eight modules. One destination.</h2>
            <p>VicFalls One is not a booking website. It is the operating system for the world's greatest curtain of falling water — every layer of the destination, wired together.</p>
          </SectionHeading>
          <PillarGrid>
            {PILLARS.map((p, i) => (
              <Pillar key={p.label} to={p.to}>
                <span className="num">MODULE_{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.label}</h3>
                <p>{p.desc}</p>
              </Pillar>
            ))}
          </PillarGrid>
        </Container>
      </SystemSection>

      <Section $bg={props => props.theme.colors.cream}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', gap: '1rem', flexWrap: 'wrap' }}>
            <SectionHeading style={{ marginBottom: 0 }}>
              <Eyebrow className="eyebrow">The Stay Layer</Eyebrow>
              <h2>Signature stays</h2>
            </SectionHeading>
            <Btn to="/stays" $variant="ghost-dark" $size="sm">View all stays →</Btn>
          </div>
          <FeaturedRow>
            {featuredStays.map((s, i) => (
              <motion.div key={s.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
                <StayCard to={`/stays/${s.slug}`}>
                  <img src={s.images[0]} alt={s.name} loading="lazy" />
                  <div className="shade" />
                  <div className="content">
                    <span className="tag">{String(i + 1).padStart(2, '0')} — {s.category}</span>
                    <h3>{s.name}</h3>
                    <div className="meta">
                      <span>{s.location}</span>
                      <span>From ${s.priceFrom}/night</span>
                    </div>
                  </div>
                </StayCard>
              </motion.div>
            ))}
          </FeaturedRow>
        </Container>
      </Section>

      <Section>
        <Container>
          <Split>
            <SplitMedia>
              <motion.img
                src={experiences[0].images[0]}
                alt={experiences[0].name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeUp}
              />
            </SplitMedia>
            <div>
              <SectionHeading>
                <Eyebrow className="eyebrow">The Experience Layer</Eyebrow>
                <h2>Choose your adventure</h2>
                <p>Helicopters over the falls, elephants at the waterhole, rapids in the gorge. Every experience, rated and ready to book.</p>
              </SectionHeading>
              <ExpList>
                {featuredExps.map((e, i) => (
                  <ExpItem key={e.id} to={`/experiences/${e.slug}`}>
                    <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                    <div className="body">
                      <h4>{e.name}</h4>
                      <p>
                        <span>{e.duration}</span>
                        <span>{e.type}</span>
                        <span>★ {e.rating}</span>
                      </p>
                    </div>
                    <div className="price">${e.priceFrom}</div>
                  </ExpItem>
                ))}
              </ExpList>
              <Btn to="/experiences" $variant="solid" style={{ marginTop: '2rem' }}>Explore all experiences</Btn>
            </div>
          </Split>
        </Container>
      </Section>

      <DarkSection>
        <Container>
          <SectionHeading $center>
            <Eyebrow className="eyebrow" $light>What's On</Eyebrow>
            <h2 style={{ color: 'white' }}>The pulse of Victoria Falls</h2>
            <p style={{ color: 'rgba(250,248,243,0.7)' }}>Festivals, conferences, concerts, and cultural evenings — everything happening while you're here.</p>
          </SectionHeading>
        </Container>
      </DarkSection>

      <EventTicker>
        <TickerTrack>
          {[...upcomingEvents, ...upcomingEvents].map((e, i) => (
            <TickerItem key={`${e.id}-${i}`} to="/events">
              <span className="date">{e.date}</span>
              <span className="name">{e.name}</span>
              <span className="sep">·</span>
            </TickerItem>
          ))}
        </TickerTrack>
      </EventTicker>

      <Section>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', gap: '1rem', flexWrap: 'wrap' }}>
            <SectionHeading style={{ marginBottom: 0 }}>
              <Eyebrow className="eyebrow">The Eat Layer</Eyebrow>
              <h2>Dine around the falls</h2>
            </SectionHeading>
            <Btn to="/dining" $variant="ghost-dark" $size="sm">View all dining →</Btn>
          </div>
          <DiningGrid>
            {featuredDining.map((r, i) => (
              <motion.div key={r.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
                <DiningCard to={`/dining/${r.slug}`}>
                  <div className="media">
                    <img src={r.images[0]} alt={r.name} loading="lazy" />
                    <span>{r.category}</span>
                  </div>
                  <div className="body">
                    <h3>{r.name}</h3>
                    <div className="cuisine">{r.cuisine}</div>
                    <p>{r.description}</p>
                    <p style={{ marginTop: '1rem' }}>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#46584A', letterSpacing: '0.05em' }}>
                        ★ {r.rating} · from ${r.pricePerPerson}/person
                      </span>
                    </p>
                  </div>
                </DiningCard>
              </motion.div>
            ))}
          </DiningGrid>
        </Container>
      </Section>

      <Section $bg={props => props.theme.colors.cream}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', gap: '1rem', flexWrap: 'wrap' }}>
            <SectionHeading style={{ marginBottom: 0 }}>
              <Eyebrow className="eyebrow">The Move Layer</Eyebrow>
              <h2>Getting around, solved</h2>
            </SectionHeading>
            <Btn to="/transport" $variant="ghost-dark" $size="sm">View all transport →</Btn>
          </div>
          <MoveStrip>
            {moveServices.map((m, i) => (
              <MoveCard key={m.id} to="/transport">
                <div className="ico">
                  <Icon name={['plane', 'building', 'car', 'bus'][i]} size={22} />
                </div>
                <h4>{m.name}</h4>
                <p>{m.vehicleType} · {m.capacity}</p>
                <div className="price">From ${m.priceFrom} {m.priceUnit}</div>
              </MoveCard>
            ))}
          </MoveStrip>
        </Container>
      </Section>

      <DarkSection>
        <Container>
          <AiPanel>
            <div>
              <SectionHeading>
                <Eyebrow className="eyebrow" $light>The AI Layer</Eyebrow>
                <h2 style={{ color: 'white' }}>Describe your trip. We build it.</h2>
                <p style={{ color: 'rgba(250,248,243,0.7)' }}>
                  No more searching hotels, then tours, then restaurants, then transfers.
                  Tell the concierge who you are, and VicFalls One assembles the whole journey
                  from across the ecosystem — in one pass.
                </p>
                <Btn to="/plan" $variant="gold" style={{ marginTop: '0.5rem' }}>Open the AI Concierge</Btn>
              </SectionHeading>
            </div>
            <AiWindow>
              <AiWindowBar>
                <span className="dot" /><span>vc-one // itinerary-engine</span><span className="dot" />
              </AiWindowBar>
              <AiBody>
                <div className="q">“I'm visiting for 5 days with my family and $3,000.”</div>
                <div className="trip">
                  {TRIP_LINES.map(line => (
                    <TripLine key={line.d}>
                      <span className="d">{line.d}</span>
                      <span className="line" />
                      <span className="t">{line.t}</span>
                      <span className="c">{line.c}</span>
                    </TripLine>
                  ))}
                </div>
              </AiBody>
            </AiWindow>
          </AiPanel>
        </Container>
      </DarkSection>

      <Section>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', gap: '1rem', flexWrap: 'wrap' }}>
            <SectionHeading style={{ marginBottom: 0 }}>
              <Eyebrow className="eyebrow">Field Notes</Eyebrow>
              <h2>Guides from the destination</h2>
            </SectionHeading>
            <Btn to="/journal" $variant="ghost-dark" $size="sm">All guides →</Btn>
          </div>
          <GuidesRow>
            {featuredGuides.map((g, i) => (
              <motion.div key={g.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
                <GuideCard to={`/journal/${g.slug}`}>
                  <span className="cat">{g.category}</span>
                  <h3>{g.title}</h3>
                  <p>{g.excerpt}</p>
                  <span className="read">{g.readTime} →</span>
                </GuideCard>
              </motion.div>
            ))}
          </GuidesRow>
        </Container>
      </Section>

      <FinalCta>
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Eyebrow className="eyebrow" $light>The Big VicFalls One</Eyebrow>
            <h2 style={{ color: 'white', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', maxWidth: 800, margin: '1rem auto 1.25rem' }}>
              If Victoria Falls had one official digital platform, this is it.
            </h2>
            <p style={{ color: 'rgba(250,248,243,0.65)', maxWidth: 560, margin: '0 auto 2.5rem' }}>
              Make VicFalls One your front door. Ask it anything — the destination answers as one system.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn to="/plan" $variant="gold">Plan Your Journey</Btn>
              <Btn to="/discover" $variant="ghost-light">Discover the Destination</Btn>
            </div>
          </motion.div>
        </Container>
      </FinalCta>
    </>
  );
}
