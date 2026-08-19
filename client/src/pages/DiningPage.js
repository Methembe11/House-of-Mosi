import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PageHero, Container } from '../components/ui';
import { restaurants } from '../data/data';

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2.5rem 0 1.25rem;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: 1.5rem;
`;

const Filters = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
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

const Sort = styled.select`
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

const Count = styled.p`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.textLight};
  margin: 0 0 2rem;
`;

const Grid = styled.div`
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

const Card = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.borderLight};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ${props => props.theme.transitions.cubic};
  }

  ${Card}:hover & img { transform: scale(1.07); }

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

const Heart = styled.button`
  position: absolute;
  bottom: 1rem;
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

const Body = styled.div`
  padding: 1.75rem;

  h3 { font-size: 1.5rem; margin-bottom: 0.35rem; }

  .cuisine {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.accentDeep};
    margin-bottom: 0.8rem;
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
    padding-top: 1rem;

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
  }
`;

const Empty = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  border: 1px dashed ${props => props.theme.colors.border};
`;

const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

export default function DiningPage({ isInCollection, toggleCollection }) {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('recommended');
  const cuisines = ['All', ...new Set(restaurants.map(r => r.cuisine))];

  const filtered = useMemo(() => {
    let results = filter === 'All' ? restaurants : restaurants.filter(r => r.cuisine === filter);
    switch (sort) {
      case 'rating': results = [...results].sort((a, b) => b.rating - a.rating); break;
      case 'price-low': results = [...results].sort((a, b) => a.pricePerPerson - b.pricePerPerson); break;
      case 'price-high': results = [...results].sort((a, b) => b.pricePerPerson - a.pricePerPerson); break;
      case 'reviews': results = [...results].sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: break;
    }
    return results;
  }, [filter, sort]);

  return (
    <>
      <PageHero
        eyebrow="Module 04 — The Dining Layer"
        title={<>Dine over the <em>gorge.</em></>}
        subtitle="From bush breakfasts to candlelit river dinners — the restaurants and kitchens of Victoria Falls."
        image={restaurants[0].images[0]}
      />
      <Container>
        <Toolbar>
          <Filters>
            {cuisines.map(c => (
              <FilterBtn key={c} $active={filter === c} onClick={() => setFilter(c)}>{c}</FilterBtn>
            ))}
          </Filters>
          <Sort value={sort} onChange={e => setSort(e.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="reviews">Most Reviewed</option>
          </Sort>
        </Toolbar>

        <Count>{filtered.length} {filtered.length === 1 ? 'table' : 'tables'} available tonight</Count>

        {filtered.length === 0 ? (
          <Empty><h3>No restaurants found</h3><p>Try another cuisine.</p></Empty>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <Grid>
              {filtered.map(rest => (
                <Card key={rest.id} variants={fadeUp}>
                  <Link to={`/dining/${rest.slug}`}>
                    <Media>
                      <img src={rest.images[0]} alt={rest.name} loading="lazy" />
                      <span className="badge">{rest.category}</span>
                      {rest.featured && <span className="featured">Featured</span>}
                    </Media>
                  </Link>
                  <Heart
                    $saved={isInCollection(rest.id)}
                    onClick={e => { e.preventDefault(); toggleCollection({ id: rest.id, type: 'restaurant', name: rest.name, image: rest.images[0], price: rest.pricePerPerson }); }}
                    aria-label={isInCollection(rest.id) ? 'Remove from collection' : 'Save to collection'}
                  >
                    {isInCollection(rest.id) ? '♥' : '♡'}
                  </Heart>
                  <Link to={`/dining/${rest.slug}`}>
                    <Body>
                      <h3>{rest.name}</h3>
                      <div className="cuisine">{rest.cuisine}</div>
                      <p className="desc">{rest.description}</p>
                      <div className="foot">
                        <span className="meta">★ {rest.rating} · {rest.reviewCount} reviews</span>
                        <span className="price">${rest.pricePerPerson} <span>/ person</span></span>
                      </div>
                    </Body>
                  </Link>
                </Card>
              ))}
            </Grid>
          </motion.div>
        )}
      </Container>
    </>
  );
}
