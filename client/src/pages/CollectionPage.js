import React from 'react';
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: ${props => props.theme.colors.white};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover { box-shadow: ${props => props.theme.shadows.md}; }
`;

const CardImg = styled.div`
  height: 200px;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }
`;

const CardBody = styled.div`
  padding: 1.25rem;

  .type {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${props => props.theme.colors.cocoa};
    font-weight: 500;
    margin-bottom: 0.35rem;
  }

  h3 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .meta {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textMuted};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const RemoveBtn = styled.button`
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textMuted};
  font-size: 11px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover { border-color: ${props => props.theme.colors.error}; color: ${props => props.theme.colors.error}; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 2rem;

  h2 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: ${props => props.theme.fontSizes.xxl};
    font-weight: 400;
    margin-bottom: 1rem;
  }

  p {
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: 2rem;
  }
`;

const ExploreBtn = styled(Link)`
  display: inline-block;
  padding: 0.85rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 0.3s ease;

  &:hover { background: ${props => props.theme.colors.primaryDark}; }
`;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

export default function CollectionPage({ count = 0, toggleCollection, collection = [] }) {
  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Your Collection</HeroTitle>
        <HeroSub>Saved stays, experiences, and dining venues</HeroSub>
      </HeroSection>

      <Content>
        {collection.length === 0 ? (
          <EmptyState>
            <h2>Your Collection is Empty</h2>
            <p>Start exploring and save your favorite places to your personal collection.</p>
            <ExploreBtn to="/discover">Explore Now</ExploreBtn>
          </EmptyState>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <Grid>
              {collection.map(item => (
                <motion.div key={`${item.type}-${item.id}`} variants={fadeUp}>
                  <Card>
                    <CardImg>
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </CardImg>
                    <CardBody>
                      <div className="type">{item.type}</div>
                      <h3>{item.name}</h3>
                      <div className="meta">
                        <span>{item.price ? `$${item.price}` : ''} {item.location || ''}</span>
                        <RemoveBtn onClick={() => toggleCollection(item)}>Remove</RemoveBtn>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        )}
      </Content>
    </PageWrapper>
  );
}
