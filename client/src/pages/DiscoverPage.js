import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { accommodations, experiences, restaurants } from '../data/data';

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

const TabRow = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.text : props.theme.colors.textMuted};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.$active ? 600 : 400};
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  &:hover { color: ${props => props.theme.colors.text}; }
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
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

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
    font-weight: 500;
  }

  .rating-badge {
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
  padding: 1.25rem;
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

function buildItems() {
  const stays = accommodations.map(a => ({
    _type: 'stay',
    id: a.id,
    slug: `/stays/${a.slug}`,
    name: a.name,
    subtitle: a.location,
    image: a.images[0],
    badge: a.category,
    rating: a.rating,
    price: `$${a.priceFrom}`,
    priceUnit: '/ night',
    sortPrice: a.priceFrom,
    sortRating: a.rating,
    sortReviews: a.reviewCount,
    _raw: a,
  }));
  const exps = experiences.map(e => ({
    _type: 'experience',
    id: e.id,
    slug: `/experiences/${e.slug}`,
    name: e.name,
    subtitle: `${e.duration} · ${e.difficulty}`,
    image: e.images[0],
    badge: e.type,
    rating: e.rating,
    price: `$${e.priceFrom}`,
    priceUnit: '/ person',
    sortPrice: e.priceFrom,
    sortRating: e.rating,
    sortReviews: e.reviewCount,
    _raw: e,
  }));
  const rest = restaurants.map(r => ({
    _type: 'dining',
    id: r.id,
    slug: `/dining/${r.slug}`,
    name: r.name,
    subtitle: r.cuisine,
    image: r.images[0],
    badge: r.category,
    rating: r.rating,
    price: `$${r.pricePerPerson}`,
    priceUnit: '/ person',
    sortPrice: r.pricePerPerson,
    sortRating: r.rating,
    sortReviews: r.reviewCount,
    _raw: r,
  }));
  return [...stays, ...exps, ...rest];
}

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'stay', label: 'Stays' },
  { key: 'experience', label: 'Experiences' },
  { key: 'dining', label: 'Dining' },
];

const TRIP_FILTERS = ['All', 'Family Friendly', 'Adventure', 'Luxury', 'Budget', 'Romantic', 'Business Travel'];

const STAY_FILTERS = ['All', 'Heritage Hotel', 'Safari Lodge', 'Boutique Hotel', 'Resort', 'Guest Lodge', 'Hotel'];
const EXP_FILTERS = ['All', ...new Set(experiences.map(e => e.type))];

export default function DiscoverPage({ isInCollection, toggleCollection }) {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [subFilter, setSubFilter] = useState('All');
  const [sort, setSort] = useState('recommended');

  const allItems = useMemo(buildItems, []);

  const filtered = useMemo(() => {
    let results = allItems;

    if (tab !== 'all') results = results.filter(i => i._type === tab);

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.subtitle.toLowerCase().includes(q) ||
        i.badge.toLowerCase().includes(q)
      );
    }

    if (subFilter !== 'All') {
      if (tab === 'stay') results = results.filter(i => i.badge === subFilter);
      else if (tab === 'experience') results = results.filter(i => i.badge === subFilter);
      else if (tab === 'all') {
        switch (subFilter) {
          case 'Luxury': results = results.filter(i => i.sortPrice > 300); break;
          case 'Budget': results = results.filter(i => i.sortPrice < 100); break;
          case 'Adventure': results = results.filter(i => i._type === 'experience'); break;
          case 'Romantic': results = results.filter(i => i._type === 'experience' || i.sortPrice > 400); break;
          case 'Family Friendly': results = results.filter(i => i._type === 'stay' || (i._type === 'experience' && i.sortPrice < 150)); break;
          case 'Business Travel': results = results.filter(i => i._type === 'stay'); break;
          default: break;
        }
      }
    }

    switch (sort) {
      case 'rating': results = [...results].sort((a, b) => b.sortRating - a.sortRating); break;
      case 'price-low': results = [...results].sort((a, b) => a.sortPrice - b.sortPrice); break;
      case 'price-high': results = [...results].sort((a, b) => b.sortPrice - a.sortPrice); break;
      case 'reviews': results = [...results].sort((a, b) => b.sortReviews - a.sortReviews); break;
      default: break;
    }

    return results;
  }, [allItems, tab, search, subFilter, sort]);

  const subFilters = tab === 'all' ? TRIP_FILTERS : tab === 'stay' ? STAY_FILTERS : tab === 'experience' ? EXP_FILTERS : [];

  const handleHeart = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCollection({
      id: item.id,
      type: item._type === 'stay' ? 'accommodation' : item._type,
      name: item.name,
      image: item.image,
      price: item.sortPrice,
    });
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Discover Victoria Falls</HeroTitle>
        <HeroSub>Attractions, restaurants, hotels, activities, and events — all in one place</HeroSub>
        <SearchContainer>
          <SearchInput
            placeholder="Search stays, experiences, restaurants..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search stays, experiences, and restaurants"
          />
        </SearchContainer>
      </HeroSection>

      <Content>
        <TabRow>
          {TABS.map(t => (
            <Tab key={t.key} $active={tab === t.key} onClick={() => { setTab(t.key); setSubFilter('All'); }}>
              {t.label}
            </Tab>
          ))}
        </TabRow>

        <Toolbar>
          <FilterRow>
            {subFilters.map(f => (
              <FilterBtn key={f} $active={subFilter === f} onClick={() => setSubFilter(f)}>{f}</FilterBtn>
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

        <ResultsCount>{filtered.length} {filtered.length === 1 ? 'result' : 'results'} found</ResultsCount>

        {filtered.length === 0 ? (
          <EmptyState>
            <h3>No results found</h3>
            <p>Try adjusting your search or filters</p>
          </EmptyState>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <Grid>
              {filtered.map(item => (
                <motion.div key={`${item._type}-${item.id}`} variants={fadeUp}>
                  <Card to={item.slug}>
                    <CardImg>
                      <img src={item.image} alt={item.name} loading="lazy" />
                      <span className="type-badge">{item.badge}</span>
                      <span className="rating-badge">★ {item.rating}</span>
                      <button className="heart" onClick={e => handleHeart(e, item)} aria-label={isInCollection(item.id) ? 'Remove from collection' : 'Save to collection'}>
                        {isInCollection(item.id) ? '♥' : '♡'}
                      </button>
                    </CardImg>
                    <CardBody>
                      <CardName>{item.name}</CardName>
                      <CardLoc>{item.subtitle}</CardLoc>
                      <CardPrice>
                        <strong>{item.price}</strong>
                        <span>{item.priceUnit}</span>
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
