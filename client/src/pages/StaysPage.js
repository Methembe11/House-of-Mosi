import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PageHero, Container, Btn } from '../components/ui';
import { accommodations } from '../data/data';

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

  &:hover {
    border-color: ${props => props.theme.colors.identity};
    color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.identity};
  }
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
  position: relative;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const Media = styled.div`
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
`;

const Heart = styled.button`
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

const Body = styled.div`
  padding: 1.75rem 1.75rem 2rem;

  h3 {
    font-size: 1.55rem;
    margin-bottom: 0.35rem;
  }

  .loc {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.accentDeep};
    margin-bottom: 1rem;
  }

  .foot {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-top: 1px solid ${props => props.theme.colors.borderLight};
    padding-top: 1.1rem;

    .price {
      font-family: ${props => props.theme.fonts.mono};
      font-size: 0.95rem;
      color: ${props => props.theme.colors.identity};

      span {
        color: ${props => props.theme.colors.textLight};
        font-size: 11px;
      }
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

    ${Card}:hover & .view { color: ${props => props.theme.colors.identity}; gap: 0.75rem; }
  }
`;

const Empty = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  border: 1px dashed ${props => props.theme.colors.border};

  h3 { font-size: 1.8rem; }
  p { margin-bottom: 1.5rem; }
`;

const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

export default function StaysPage({ isInCollection, toggleCollection }) {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('recommended');
  const categories = ['All', ...new Set(accommodations.map(a => a.category))];

  const filtered = useMemo(() => {
    let results = category === 'All' ? accommodations : accommodations.filter(a => a.category === category);
    switch (sort) {
      case 'rating': results = [...results].sort((a, b) => b.rating - a.rating); break;
      case 'price-low': results = [...results].sort((a, b) => a.priceFrom - b.priceFrom); break;
      case 'price-high': results = [...results].sort((a, b) => b.priceFrom - a.priceFrom); break;
      case 'reviews': results = [...results].sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: break;
    }
    return results;
  }, [category, sort]);

  return (
    <>
      <PageHero
        eyebrow="Module 02 — The Stay Layer"
        title={<>Where Victoria Falls <em>sleeps.</em></>}
        subtitle="Heritage hotels, safari lodges, boutique resorts, guest houses, and villas — hand-selected and ready to book."
        image={accommodations[0].images[0]}
      />
      <Container>
        <Toolbar>
          <Filters>
            {categories.map(cat => (
              <FilterBtn key={cat} $active={category === cat} onClick={() => setCategory(cat)}>{cat}</FilterBtn>
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

        <Count>{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} online</Count>

        {filtered.length === 0 ? (
          <Empty>
            <h3>No properties found</h3>
            <p>Try adjusting your filters.</p>
            <Btn to="/plan" $variant="solid" $size="sm">Ask the Concierge instead</Btn>
          </Empty>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <Grid>
              {filtered.map(acc => (
                <Card key={acc.id} variants={fadeUp}>
                  <Heart
                    $saved={isInCollection(acc.id)}
                    onClick={e => { e.preventDefault(); toggleCollection({ id: acc.id, type: 'accommodation', name: acc.name, image: acc.images[0], price: acc.priceFrom, location: acc.location }); }}
                    aria-label={isInCollection(acc.id) ? 'Remove from collection' : 'Save to collection'}
                  >
                    {isInCollection(acc.id) ? '♥' : '♡'}
                  </Heart>
                  <Link to={`/stays/${acc.slug}`}>
                    <Media>
                      <img src={acc.images[0]} alt={acc.name} loading="lazy" />
                      <span className="badge">{acc.category}</span>
                      <span className="rating">★ {acc.rating}</span>
                    </Media>
                    <Body>
                      <h3>{acc.name}</h3>
                      <div className="loc">{acc.location}</div>
                      <div className="foot">
                        <div className="price">${acc.priceFrom} <span>/ night</span></div>
                        <span className="view">View stay →</span>
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
