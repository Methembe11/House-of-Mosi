import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PageHero, Container, Btn } from '../components/ui';

const Count = styled.p`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.textLight};
  margin: 2.5rem 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .reset {
    background: none;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    padding: 0 0 0.2rem;
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.textLight};
    cursor: pointer;
    transition: all ${props => props.theme.transitions.fast};

    &:hover { color: ${props => props.theme.colors.identity}; border-color: ${props => props.theme.colors.identity}; }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
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

const CardImg = styled.div`
  aspect-ratio: 4 / 3;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ${props => props.theme.transitions.cubic};
  }
`;

const CardBody = styled.div`
  padding: 1.5rem 1.75rem 1.75rem;

  .type {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.accentDeep};
    margin-bottom: 0.5rem;
  }

  h3 { font-size: 1.4rem; margin-bottom: 1rem; }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${props => props.theme.colors.borderLight};
    padding-top: 1rem;

    .price {
      font-family: ${props => props.theme.fonts.mono};
      font-size: 0.95rem;
      color: ${props => props.theme.colors.identity};
    }

    .loc {
      font-family: ${props => props.theme.fonts.mono};
      font-size: 9px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${props => props.theme.colors.textLight};
    }
  }
`;

const RemoveBtn = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textLight};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.45rem 0.9rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  width: 100%;
  margin-top: 1.1rem;

  &:hover {
    border-color: ${props => props.theme.colors.identity};
    color: ${props => props.theme.colors.identity};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  border: 1px dashed ${props => props.theme.colors.border};
  margin-bottom: 5rem;

  .mark {
    font-family: ${props => props.theme.fonts.serif};
    font-size: 3.5rem;
    color: ${props => props.theme.colors.accent};
    line-height: 1;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2.1rem;
    font-weight: 300;
    margin-bottom: 0.75rem;

    em { color: ${props => props.theme.colors.identity}; }
  }

  p {
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 2rem;
  }
`;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

const TYPE_LABELS = {
  accommodation: 'The Stay Layer',
  experience: 'The Experience Layer',
  restaurant: 'The Dining Layer',
  dining: 'The Dining Layer',
};

export default function CollectionPage({ count = 0, toggleCollection, collection = [] }) {
  return (
    <>
      <PageHero
        eyebrow="The Personal Layer"
        title={<>Your <em>collection.</em></>}
        subtitle="Everything you've saved across the operating system — held in one quiet place."
        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2000&q=85"
      />
      <Container>
        {collection.length === 0 ? (
          <EmptyState>
            <div className="mark">♥</div>
            <h2>Your collection is <em>empty.</em></h2>
            <p>As you browse stays, experiences, and tables, save what speaks to you — it will gather here.</p>
            <Btn to="/discover" $variant="solid" $size="md">Begin exploring</Btn>
          </EmptyState>
        ) : (
          <>
            <Count>
              <span>{collection.length} {collection.length === 1 ? 'item' : 'items'} saved</span>
              <button className="reset" onClick={() => collection.forEach(toggleCollection)}>Clear all</button>
            </Count>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <Grid>
                {collection.map(item => (
                  <Card key={`${item.type}-${item.id}`} variants={fadeUp}>
                    <CardImg>
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </CardImg>
                    <CardBody>
                      <div className="type">{TYPE_LABELS[item.type] || item.type}</div>
                      <h3>{item.name}</h3>
                      <div className="meta">
                        <span className="price">{item.price ? `$${item.price}` : ''}</span>
                        <span className="loc">{item.location || ''}</span>
                      </div>
                      <RemoveBtn onClick={() => toggleCollection(item)}>Remove</RemoveBtn>
                    </CardBody>
                  </Card>
                ))}
              </Grid>
            </motion.div>
          </>
        )}
      </Container>
    </>
  );
}
