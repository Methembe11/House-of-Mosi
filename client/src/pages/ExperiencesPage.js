import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { experiences } from '../data/data';

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
  max-width: 600px;
  margin: 0 auto;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  padding: 0.5rem 1.2rem;
  background: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.textLight};
  border: 1px solid ${props => props.$active ? props.theme.colors.primary : props.theme.colors.border};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover { border-color: ${props => props.theme.colors.primary}; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) { grid-template-columns: 1fr; }
`;

const Card = styled(Link)`
  display: block;
  background: ${props => props.theme.colors.white};
  overflow: hidden;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    img { transform: scale(1.05); }
  }
`;

const CardImg = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;

  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }

  .type-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(31,58,50,0.9);
    color: white;
    padding: 0.3rem 0.75rem;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .diff-badge {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    padding: 0.3rem 0.75rem;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    background: white;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const CardName = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const CardDesc = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.borderLight};

  .meta-left {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textMuted};
  }

  .price {
    strong { font-size: ${props => props.theme.fontSizes.lg}; font-weight: 600; color: ${props => props.theme.colors.text}; }
    span { font-size: ${props => props.theme.fontSizes.xs}; color: ${props => props.theme.colors.textMuted}; }
  }
`;

const HeartBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  border: none;
  z-index: 2;
  transition: all 0.3s ease;
  &:hover { transform: scale(1.1); }
`;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

export default function ExperiencesPage({ isInCollection, toggleCollection }) {
  const [filter, setFilter] = useState('All');
  const types = ['All', ...new Set(experiences.map(e => e.type))];

  const filtered = filter === 'All' ? experiences : experiences.filter(e => e.type === filter);

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Experiences</HeroTitle>
        <HeroSub>Extraordinary adventures curated for the discerning traveler</HeroSub>
      </HeroSection>

      <Content>
        <FilterRow>
          {types.map(t => (
            <FilterBtn key={t} $active={filter === t} onClick={() => setFilter(t)}>{t}</FilterBtn>
          ))}
        </FilterRow>

        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <Grid>
            {filtered.map(exp => (
              <motion.div key={exp.id} variants={fadeUp}>
                <Card to={`/experiences/${exp.slug}`}>
                  <CardImg>
                    <img src={exp.images[0]} alt={exp.name} loading="lazy" />
                    <span className="type-badge">{exp.type}</span>
                    <span className="diff-badge">{exp.difficulty}</span>
                    <HeartBtn onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCollection({ id: exp.id, type: 'experience', name: exp.name, image: exp.images[0], price: exp.priceFrom }); }} aria-label={isInCollection(exp.id) ? 'Remove from collection' : 'Save to collection'}>
                      {isInCollection(exp.id) ? '♥' : '♡'}
                    </HeartBtn>
                  </CardImg>
                  <CardBody>
                    <CardName>{exp.name}</CardName>
                    <CardDesc>{exp.description}</CardDesc>
                    <CardMeta>
                      <span className="meta-left">{exp.duration} · ★ {exp.rating} ({exp.reviewCount})</span>
                      <div className="price"><strong>${exp.priceFrom}</strong> <span>/ person</span></div>
                    </CardMeta>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      </Content>
    </PageWrapper>
  );
}
