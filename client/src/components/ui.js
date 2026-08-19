import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.gutter};
`;

export const Section = styled.section`
  padding: ${props => props.theme.spacing.section} 0;
  background: ${props => {
    if (!props.$bg) return 'transparent';
    return typeof props.$bg === 'function' ? props.$bg(props) : props.$bg;
  }};
  position: relative;
`;

export const SectionHeading = styled.div`
  max-width: 720px;
  margin-bottom: ${props => props.$center ? '3rem' : '2.5rem'};
  text-align: ${props => props.$center ? 'center' : 'left'};

  ${props => props.$center && 'margin-left: auto; margin-right: auto;'}

  .eyebrow {
    display: block;
    margin-bottom: 1rem;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: clamp(1.9rem, 3.5vw, 2.9rem);
  }

  p {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

export const Eyebrow = styled.span`
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 400;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: ${props => props.$light ? 'rgba(203,184,157,0.9)' : props.theme.colors.identity};
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: '';
    width: 2.25rem;
    height: 1px;
    background: currentColor;
    opacity: 0.6;
  }
`;

export const Btn = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.95rem 2.25rem;
  font-family: ${props => props.theme.fonts.sans};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  ${props => props.$variant === 'solid' && `
    background: ${props.theme.colors.identity};
    color: ${props.theme.colors.white};
    &:hover {
      background: ${props.theme.colors.text};
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.md};
    }
  `}

  ${props => props.$variant === 'gold' && `
    background: ${props.theme.colors.accent};
    color: ${props.theme.colors.text};
    &:hover {
      background: ${props.theme.colors.accentDeep};
      transform: translateY(-2px);
    }
  `}

  ${props => props.$variant === 'dark' && `
    background: ${props.theme.colors.text};
    color: ${props.theme.colors.white};
    &:hover {
      background: ${props.theme.colors.identity};
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.md};
    }
  `}

  ${props => props.$variant === 'ghost-light' && `
    background: transparent;
    color: ${props.theme.colors.white};
    border-color: rgba(255,255,255,0.35);
    &:hover {
      background: ${props.theme.colors.white};
      color: ${props.theme.colors.text};
      border-color: ${props.theme.colors.white};
    }
  `}

  ${props => props.$variant === 'ghost-dark' && `
    background: transparent;
    color: ${props.theme.colors.text};
    border-color: ${props.theme.colors.text};
    &:hover {
      background: ${props.theme.colors.text};
      color: ${props.theme.colors.white};
    }
  `}

  ${props => props.$size === 'sm' && `padding: 0.7rem 1.5rem; font-size: 12px;`}

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const HeroWrap = styled.header`
  position: relative;
  min-height: 62vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: ${props => props.theme.colors.backgroundDark};
  padding-top: 90px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(41,39,34,0.92) 0%,
      rgba(41,39,34,0.55) 35%,
      rgba(41,39,34,0.15) 70%
    );
    z-index: 1;
  }
`;

const HeroImg = styled.div`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 6rem) ${props => props.theme.spacing.gutter} clamp(3.5rem, 7vw, 5rem);
  color: ${props => props.theme.colors.white};
`;

const HeroEyebrow = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.xs};
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accent};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;

  &::before {
    content: '';
    width: 3rem;
    height: 1px;
    background: ${props => props.theme.colors.accent};
    opacity: 0.7;
  }
`;

const HeroTitle = styled.h1`
  color: ${props => props.theme.colors.white};
  font-size: clamp(2.6rem, 6vw, 4.75rem);
  font-weight: 300;
  line-height: 1.06;
  margin-bottom: 1.25rem;
  max-width: 900px;

  em {
    font-style: italic;
    color: ${props => props.theme.colors.accent};
  }
`;

const HeroSub = styled.p`
  color: rgba(250, 248, 243, 0.85);
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  max-width: 640px;
  line-height: 1.7;
  margin-bottom: 0;
`;

export function PageHero({ eyebrow, title, subtitle, image, children }) {
  return (
    <HeroWrap>
      <HeroImg>
        <img src={image} alt="" />
      </HeroImg>
      <HeroContent>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroEyebrow>{eyebrow}</HeroEyebrow>
          <HeroTitle>{title}</HeroTitle>
          {subtitle && <HeroSub>{subtitle}</HeroSub>}
          {children}
        </motion.div>
      </HeroContent>
    </HeroWrap>
  );
}

export const Card = styled(Link)`
  display: block;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.borderLight};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${props => props.theme.shadows.lg};
    img { transform: scale(1.06); }
  }
`;

export const CardMedia = styled.div`
  position: relative;
  aspect-ratio: ${props => props.$ratio || '16 / 10'};
  overflow: hidden;
  background: ${props => props.theme.colors.ivory};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ${props => props.theme.transitions.cubic};
  }

  .card-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(41, 39, 34, 0.88);
    color: ${props => props.theme.colors.white};
    padding: 0.3rem 0.8rem;
    font-family: ${props => props.theme.fonts.mono};
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .card-price {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.text};
    padding: 0.35rem 0.85rem;
    font-weight: 700;
    font-size: ${props => props.theme.fontSizes.sm};
    box-shadow: ${props => props.theme.shadows.sm};
  }
`;

export const CardBody = styled.div`
  padding: 1.5rem 1.75rem 1.75rem;

  h3 {
    font-size: 1.45rem;
    margin-bottom: 0.4rem;
    letter-spacing: 0;
  }

  p {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textLight};
  }
`;

export const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.borderLight};

  span {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textLight};
    font-family: ${props => props.theme.fonts.mono};
    letter-spacing: 0.04em;
  }

  .arrow {
    color: ${props => props.theme.colors.identity};
    transition: transform ${props => props.theme.transitions.fast};
  }

  ${Card}:hover & .arrow {
    transform: translateX(4px);
  }
`;

export const Stat = styled.div`
  .value {
    font-family: ${props => props.theme.fonts.serif};
    font-size: clamp(2.2rem, 4vw, 3.4rem);
    font-weight: 300;
    line-height: 1;
    color: ${props => props.$light ? props.theme.colors.white : props.theme.colors.text};
    margin-bottom: 0.6rem;

    em {
      font-style: normal;
      color: ${props => props.theme.colors.accent};
    }
  }

  .label {
    font-family: ${props => props.theme.fonts.mono};
    font-size: ${props => props.theme.fontSizes.xs};
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${props => props.$light ? 'rgba(250,248,243,0.6)' : props.theme.colors.textLight};
  }
`;

export const FilterChips = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button`
  padding: 0.55rem 1.2rem;
  background: ${props => props.$active ? props.theme.colors.identity : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.textLight};
  border: 1px solid ${props => props.$active ? props.theme.colors.identity : props.theme.colors.border};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    border-color: ${props => props.theme.colors.identity};
    color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.identity};
  }
`;

export const SortSelect = styled.select`
  padding: 0.55rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.cream};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;

  &:focus { outline: none; border-color: ${props => props.theme.colors.identity}; }
`;

export const MonoLink = styled.span`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  color: ${props => props.theme.colors.cocoa};
  letter-spacing: 0.05em;
`;

export const GoldMonoLink = styled(Link)`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

export const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const ResultCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.borderLight};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};
  position: relative;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

export const ResultCardMedia = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: ${props => props.theme.colors.ivory};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ${props => props.theme.transitions.cubic};
  }

  ${ResultCard}:hover & img { transform: scale(1.07); }

  .badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(41, 39, 34, 0.88);
    color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.4rem 0.85rem;
  }

  .rating {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.text};
    font-size: 12px;
    font-weight: 700;
    padding: 0.3rem 0.7rem;
    box-shadow: ${props => props.theme.shadows.sm};
  }

  .featured {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.35rem 0.7rem;
  }
`;

export const ResultCardBody = styled.div`
  padding: 1.75rem 1.75rem 2rem;

  h3 {
    font-size: 1.55rem;
    margin-bottom: 0.35rem;
  }

  .loc, .cuisine {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.accentDeep};
    margin-bottom: 1rem;
  }

  .desc {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textLight};
    line-height: 1.65;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 1.1rem;
  }

  .foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${props => props.theme.colors.borderLight};
    padding-top: 1.1rem;

    .meta {
      font-family: ${props => props.theme.fonts.mono};
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: ${props => props.theme.colors.textLight};
    }

    .price {
      font-family: ${props => props.theme.fonts.mono};
      font-size: 0.95rem;
      color: ${props => props.theme.colors.identity};

      span { color: ${props => props.theme.colors.textLight}; font-size: 11px; }
    }

    .view {
      font-family: ${props => props.theme.fonts.mono};
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${props => props.theme.colors.textLight};
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: all ${props => props.theme.transitions.fast};
    }

    ${ResultCard}:hover & .view { color: ${props => props.theme.colors.identity}; gap: 0.75rem; }
  }
`;

export const SaveHeart = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  color: ${props => props.$saved ? props.theme.colors.identity : props.theme.colors.textLight};
  cursor: pointer;
  z-index: 3;
  transition: all ${props => props.theme.transitions.fast};

  &:hover { transform: scale(1.12); }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  border: 1px dashed ${props => props.theme.colors.border};

  h3 { font-size: 1.8rem; }
  p { margin-bottom: 1.5rem; }
`;

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.05 } }
};
