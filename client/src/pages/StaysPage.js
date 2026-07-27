import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { accommodations } from '../data/data';

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
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.md};
  font-family: ${props => props.theme.fonts.sans};

  &::placeholder { color: rgba(255,255,255,0.5); }
  &:focus { outline: none; border-color: rgba(255,255,255,0.5); }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  padding: 0.45rem 1rem;
  background: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.textLight};
  border: 1px solid ${props => props.$active ? props.theme.colors.primary : props.theme.colors.border};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover { border-color: ${props => props.theme.colors.primary}; }
`;

const SortSelect = styled.select`
  padding: 0.45rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.sm};
  font-family: ${props => props.theme.fonts.sans};
  cursor: pointer;
`;

const ResultsCount = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
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
  position: relative;
  height: 210px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(31,58,50,0.9);
    color: white;
    padding: 0.3rem 0.75rem;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 500;
  }

  .rating {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: white;
    padding: 0.25rem 0.6rem;
    font-size: 13px;
    font-weight: 600;
  }

  .heart {
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
    transition: all 0.3s ease;
    z-index: 2;
    border: none;
    &:hover { transform: scale(1.1); }
  }
`;

const CardBody = styled.div`
  padding: 1.25rem 1.5rem;
`;

const CardName = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
  margin-bottom: 0.35rem;
  color: ${props => props.theme.colors.text};
`;

const CardLoc = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 0.75rem;
`;

const CardPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.3rem;

  strong {
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }

  span {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textMuted};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.textMuted};

  h3 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: ${props => props.theme.fontSizes.xxl};
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 0.5rem;
  }
`;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

const CATEGORIES = ['All', 'Heritage Hotel', 'Safari Lodge', 'Boutique Hotel', 'Resort', 'Guest Lodge', 'Hotel'];

export default function StaysPage({ isInCollection, toggleCollection }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('recommended');

  const filtered = useMemo(() => {
    let results = accommodations;

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    }

    if (category !== 'All') results = results.filter(a => a.category === category);

    switch (sort) {
      case 'rating': results = [...results].sort((a, b) => b.rating - a.rating); break;
      case 'price-low': results = [...results].sort((a, b) => a.priceFrom - b.priceFrom); break;
      case 'price-high': results = [...results].sort((a, b) => b.priceFrom - a.priceFrom); break;
      case 'reviews': results = [...results].sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: break;
    }

    return results;
  }, [search, category, sort]);

  const handleHeart = (e, acc) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCollection({ id: acc.id, type: 'accommodation', name: acc.name, image: acc.images[0], price: acc.priceFrom, location: acc.location });
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Stays</HeroTitle>
        <HeroSub>Luxury accommodations hand-selected for the discerning traveller</HeroSub>
        <SearchContainer>
          <SearchInput placeholder="Search by name, location, or type..." value={search} onChange={e => setSearch(e.target.value)} aria-label="Search stays" />
        </SearchContainer>
      </HeroSection>

      <Content>
        <Toolbar>
          <FilterRow>
            {CATEGORIES.map(cat => (
              <FilterBtn key={cat} $active={category === cat} onClick={() => setCategory(cat)}>{cat}</FilterBtn>
            ))}
          </FilterRow>
          <SortSelect value={sort} onChange={e => setSort(e.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="reviews">Most Reviewed</option>
          </SortSelect>
        </Toolbar>

        <ResultsCount>{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found</ResultsCount>

        {filtered.length === 0 ? (
          <EmptyState>
            <h3>No properties found</h3>
            <p>Try adjusting your search or filters</p>
          </EmptyState>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <Grid>
              {filtered.map(acc => (
                <motion.div key={acc.id} variants={fadeUp}>
                  <Card to={`/stays/${acc.slug}`}>
                    <CardImg>
                      <img src={acc.images[0]} alt={acc.name} loading="lazy" />
                      <span className="badge">{acc.category}</span>
                      <span className="rating">★ {acc.rating}</span>
                      <button className="heart" onClick={e => handleHeart(e, acc)} aria-label={isInCollection(acc.id) ? 'Remove from collection' : 'Save to collection'}>
                        {isInCollection(acc.id) ? '♥' : '♡'}
                      </button>
                    </CardImg>
                    <CardBody>
                      <CardName>{acc.name}</CardName>
                      <CardLoc>{acc.location}</CardLoc>
                      <CardPrice>
                        <strong>${acc.priceFrom}</strong>
                        <span>/ night</span>
                      </CardPrice>
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
