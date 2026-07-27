import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { restaurants } from '../data/data';

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
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
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

  .cat-badge {
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

const CardCuisine = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.cocoa};
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

const CardSig = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;

  span {
    padding: 0.25rem 0.6rem;
    background: ${props => props.theme.colors.backgroundAlt};
    font-size: ${props => props.theme.fontSizes.xs};
    color: ${props => props.theme.colors.textLight};
  }
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.borderLight};

  .rating { font-size: ${props => props.theme.fontSizes.sm}; color: ${props => props.theme.colors.textMuted}; }
  .price { font-weight: 600; color: ${props => props.theme.colors.text}; }
`;

const HeartBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.9);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; cursor: pointer; border: none; z-index: 2;
  &:hover { transform: scale(1.1); }
`;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function DiningPage({ isInCollection, toggleCollection }) {
  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Dining</HeroTitle>
        <HeroSub>From traditional Zimbabwean feasts to contemporary fine dining</HeroSub>
      </HeroSection>

      <Content>
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <Grid>
            {restaurants.map(rest => (
              <motion.div key={rest.id} variants={fadeUp}>
                <Card to={`/dining/${rest.slug}`}>
                  <CardImg>
                    <img src={rest.images[0]} alt={rest.name} loading="lazy" />
                    <span className="cat-badge">{rest.category}</span>
                    <HeartBtn onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCollection({ id: rest.id, type: 'restaurant', name: rest.name, image: rest.images[0], price: rest.pricePerPerson }); }} aria-label={isInCollection(rest.id) ? 'Remove from collection' : 'Save to collection'}>
                      {isInCollection(rest.id) ? '♥' : '♡'}
                    </HeartBtn>
                  </CardImg>
                  <CardBody>
                    <CardName>{rest.name}</CardName>
                    <CardCuisine>{rest.cuisine}</CardCuisine>
                    <CardDesc>{rest.description}</CardDesc>
                    <CardSig>
                      {rest.signature.slice(0, 3).map((s, i) => <span key={i}>{s}</span>)}
                    </CardSig>
                    <CardMeta>
                      <span className="rating">★ {rest.rating} · {rest.reviewCount} reviews</span>
                      <span className="price">${rest.pricePerPerson} / person</span>
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
