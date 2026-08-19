import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PageHero, Container } from '../components/ui';
import { accommodations, experiences, restaurants } from '../data/data';

const SearchBar = styled.div`
  max-width: 560px;
  margin: 2.25rem auto 0;
  position: relative;

  input {
    width: 100%;
    padding: 1.1rem 1.6rem;
    background: rgba(250, 248, 243, 0.12);
    border: 1px solid rgba(250, 248, 243, 0.28);
    color: ${props => props.theme.colors.white};
    font-size: 1rem;
    font-family: ${props => props.theme.fonts.sans};
    backdrop-filter: blur(6px);

    &::placeholder { color: rgba(250, 248, 243, 0.55); font-style: italic; }
    &:focus { outline: none; border-color: ${props => props.theme.colors.accent}; background: rgba(250, 248, 243, 0.16); }
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 0;
  margin: 2.75rem 0 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Tab = styled.button`
  padding: 0.85rem 1.6rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? props.theme.colors.identity : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.identity : props.theme.colors.textLight};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover { color: ${props => props.theme.colors.identity}; }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.75rem;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  padding: 0.5rem 1.1rem;
  background: ${props => props.$active ? props.theme.colors.identity : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.textLight};
  border: 1px solid ${props => props.$active ? props.theme.colors.identity : props.theme.colors.border};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover { border-color: ${props => props.theme.colors.identity}; color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.identity}; }
`;

const SortSelect = styled.select`
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
  margin: 0 0 1.75rem;
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

const Card = styled(Link)`
  display: block;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.borderLight};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${props => props.theme.shadows.lg};
    img { transform: scale(1.07); }
  }
`;

const CardImg = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ${props => props.theme.transitions.cubic};
  }

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

  .heart {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 38px;
    height: 38px;
    background: ${props => props.theme.colors.white};
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.05rem;
    color: ${props => props.$saved ? props.theme.colors.identity : props.theme.colors.textLight};
    cursor: pointer;
    z-index: 2;
    transition: all ${props => props.theme.transitions.fast};
    &:hover { transform: scale(1.12); }
  }
`;

const CardBody = styled.div`
  padding: 1.5rem 1.75rem 1.9rem;
`;

const CardName = styled.h3`
  font-size: 1.45rem;
  margin-bottom: 0.35rem;
`;

const CardSub = styled.p`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accentDeep};
  margin-bottom: 0.9rem;
`;

const CardPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  border-top: 1px solid ${props => props.theme.colors.borderLight};
  padding-top: 1rem;

  strong {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 1rem;
    font-weight: 400;
    color: ${props => props.theme.colors.identity};
  }

  span {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.textLight};
  }
`;

const Empty = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  border: 1px dashed ${props => props.theme.colors.border};

  h3 { font-size: 1.8rem; margin-bottom: 0.4rem; }
  p { color: ${props => props.theme.colors.textLight}; }
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
const STAY_FILTERS = ['All', ...new Set(accommodations.map(a => a.category))];
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
      if (tab === 'stay' || tab === 'experience') results = results.filter(i => i.badge === subFilter);
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
    <>
      <PageHero
        eyebrow="Module 08 — The Discovery Layer"
        title={<>Search the <em>whole system.</em></>}
        subtitle="One search across every stay, experience, and table in Victoria Falls."
        image={accommodations[0].images[0]}
      >
        <SearchBar>
          <input
            placeholder="Search stays, experiences, restaurants..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search stays, experiences, and restaurants"
          />
        </SearchBar>
      </PageHero>
      <Container>
        <Tabs>
          {TABS.map(t => (
            <Tab key={t.key} $active={tab === t.key} onClick={() => { setTab(t.key); setSubFilter('All'); }}>
              {t.label}
            </Tab>
          ))}
        </Tabs>

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

        <Count>{filtered.length} {filtered.length === 1 ? 'result' : 'results'} found</Count>

        {filtered.length === 0 ? (
          <Empty>
            <h3>No results found</h3>
            <p>Try adjusting your search or filters</p>
          </Empty>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <Grid>
              {filtered.map(item => (
                <motion.div key={`${item._type}-${item.id}`} variants={fadeUp}>
                  <Card to={item.slug}>
                    <CardImg $saved={isInCollection(item.id)}>
                      <img src={item.image} alt={item.name} loading="lazy" />
                      <span className="badge">{item.badge}</span>
                      <span className="rating">★ {item.rating}</span>
                      <button className="heart" onClick={e => handleHeart(e, item)} aria-label={isInCollection(item.id) ? 'Remove from collection' : 'Save to collection'}>
                        {isInCollection(item.id) ? '♥' : '♡'}
                      </button>
                    </CardImg>
                    <CardBody>
                      <CardName>{item.name}</CardName>
                      <CardSub>{item.subtitle}</CardSub>
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
      </Container>
    </>
  );
}
