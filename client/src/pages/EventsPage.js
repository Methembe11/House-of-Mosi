import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PageHero, Container, SectionHeading } from '../components/ui';
import { events } from '../data/data';

const Toolbar = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin: 2.5rem 0 2rem;
`;

const FilterBtn = styled.button`
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

  &:hover { border-color: ${props => props.theme.colors.identity}; color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.identity}; }
`;

const Feature = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  background: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors.cream};
  margin-bottom: 3rem;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureMedia = styled.div`
  min-height: 420px;
  position: relative;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .badge {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.45rem 0.9rem;
  }
`;

const FeatureBody = styled.div`
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .date {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.accent};
    margin-bottom: 1.25rem;
  }

  h2 {
    font-size: 2.4rem;
    line-height: 1.1;
    margin-bottom: 1.1rem;

    em { color: ${props => props.theme.colors.accent}; }
  }

  p {
    color: ${props => props.theme.colors.textLight};
    line-height: 1.7;
    margin-bottom: 1.75rem;
  }

  .foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-top: 1px solid rgba(203, 184, 157, 0.25);
    padding-top: 1.5rem;

    .price {
      font-family: ${props => props.theme.fonts.mono};
      font-size: 1rem;
      color: ${props => props.theme.colors.accent};
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: 130px 200px 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 1.9rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
  transition: all ${props => props.theme.transitions.fast};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.white};
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    box-shadow: ${props => props.theme.shadows.sm};
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 110px 1fr auto;
    .loc { display: none; }
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    .cat, .price { display: none; }
  }
`;

const DateBlock = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accentDeep};
  line-height: 1.7;
`;

const RowCat = styled.span`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.textLight};
  padding: 0.4rem 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  justify-self: start;
`;

const RowName = styled.h3`
  font-size: 1.5rem;
  transition: all ${props => props.theme.transitions.fast};

  ${Row}:hover & { color: ${props => props.theme.colors.identity}; }
`;

const RowPrice = styled.span`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 12px;
  color: ${props => props.theme.colors.text};
`;

const CTA = styled.div`
  background: ${props => props.theme.colors.identity};
  color: ${props => props.theme.colors.cream};
  padding: 3.5rem;
  text-align: center;
  margin-bottom: 5rem;

  h3 { font-size: 1.9rem; margin-bottom: 0.6rem; }
  p { color: rgba(250, 248, 243, 0.75); margin-bottom: 1.5rem; }
`;

const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.04 } } };

export default function EventsPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(events.map(e => e.category))];

  const featured = events.find(e => e.featured) || events[0];
  const filtered = useMemo(
    () => (filter === 'All' ? events : events.filter(e => e.category === filter)).filter(e => e.id !== featured.id),
    [filter, featured.id]
  );

  return (
    <>
      <PageHero
        eyebrow="Module 06 — The Calendar Layer"
        title={<>The town has a <em>rhythm.</em></>}
        subtitle="Carnivals, conferences, drum shows, and festivals — the live calendar of Victoria Falls."
        image={featured.image}
      />
      <Container>
        <SectionHeading eyebrow="What's on" title={<>The live <em>calendar.</em></>} align="left" />
        <Toolbar>
          {categories.map(cat => (
            <FilterBtn key={cat} $active={filter === cat} onClick={() => setFilter(cat)}>{cat}</FilterBtn>
          ))}
        </Toolbar>

        <Feature
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <FeatureMedia>
            <img src={featured.image} alt={featured.name} />
            <span className="badge">Featured · {featured.category}</span>
          </FeatureMedia>
          <FeatureBody>
            <div className="date">{featured.date}</div>
            <h2>{featured.name}</h2>
            <p>{featured.longDescription || featured.description}</p>
            <div className="foot">
              <span className="price">
                {featured.price > 0 ? `$${featured.price} ${featured.priceUnit}` : featured.priceUnit}
              </span>
              <Link to={`/events/${featured.slug}`} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CBB89D' }}>
                View event →
              </Link>
            </div>
          </FeatureBody>
        </Feature>

        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <List>
            {filtered.map(evt => (
              <Link key={evt.id} to={`/events/${evt.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Row variants={fadeUp}>
                  <DateBlock>{evt.date}</DateBlock>
                  <span className="cat"><RowCat>{evt.category}</RowCat></span>
                  <RowName>{evt.name}</RowName>
                  <RowPrice className="price">{evt.price > 0 ? `$${evt.price}` : 'Free'}</RowPrice>
                </Row>
              </Link>
            ))}
          </List>
        </motion.div>

        <CTA>
          <h3>Hosting an event?</h3>
          <p>The Business Portal connects organizers with venues, vendors, and the regional calendar.</p>
          <a href="#/business" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CBB89D' }}>
            Open the Business Portal →
          </a>
        </CTA>
      </Container>
    </>
  );
}
