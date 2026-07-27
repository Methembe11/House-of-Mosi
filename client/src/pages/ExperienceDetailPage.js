import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { experiences, accommodations, restaurants } from '../data/data';

const PageWrapper = styled.div`padding-top: 90px;`;

const Gallery = styled.div`
  height: 55vh;
  min-height: 400px;
  position: relative;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) { height: 40vh; min-height: 300px; }
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 5;
  background: rgba(255,255,255,0.9);
  padding: 0.5rem 1.2rem;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;

  &:hover { background: white; }
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const Category = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${props => props.theme.colors.cocoa};
  font-weight: 500;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  margin: 0.75rem 0;
`;

const Tagline = styled.p`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-style: italic;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 2rem;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  .item {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textMuted};

    strong {
      display: block;
      font-size: ${props => props.theme.fontSizes.md};
      color: ${props => props.theme.colors.text};
      font-weight: 600;
      margin-bottom: 0.15rem;
    }
  }
`;

const Section = styled.div`
  margin-bottom: 3rem;

  h2 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: ${props => props.theme.fontSizes.xxl};
    font-weight: 400;
    margin-bottom: 1rem;
  }

  p {
    font-size: ${props => props.theme.fontSizes.md};
    color: ${props => props.theme.colors.textLight};
    line-height: 1.8;
    white-space: pre-line;
  }
`;

const IncludesList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) { grid-template-columns: 1fr; }

  li {
    padding: 0.75rem 1rem;
    background: ${props => props.theme.colors.backgroundAlt};
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textLight};
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '✓';
      color: ${props => props.theme.colors.cocoa};
      font-weight: 600;
    }
  }
`;

const BookingCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 2rem;
  margin-top: 2rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  .price {
    strong { font-size: ${props => props.theme.fontSizes.xxl}; font-weight: 600; }
    span { color: ${props => props.theme.colors.textMuted}; }
  }

  .rating { font-size: ${props => props.theme.fontSizes.sm}; color: ${props => props.theme.colors.textMuted}; }
`;

const BookBtn = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;

  &:hover { background: ${props => props.theme.colors.primaryDark}; }
`;

const SaveBtn = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover { border-color: ${props => props.theme.colors.primary}; color: ${props => props.theme.colors.primary}; }
`;

export default function ExperienceDetailPage({ isInCollection, toggleCollection }) {
  const { slug } = useParams();
  const exp = experiences.find(e => e.slug === slug);

  if (!exp) {
    return (
      <PageWrapper>
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem' }}>Experience not found</h1>
          <Link to="/experiences" style={{ color: '#6B4F3A', textDecoration: 'underline' }}>Back to Experiences</Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Gallery>
        <BackLink to="/experiences">← Back</BackLink>
        <motion.img key={slug} src={exp.images[0]} alt={exp.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />
      </Gallery>

      <Content>
        <Category>{exp.category} · {exp.type}</Category>
        <Title>{exp.name}</Title>
        <Tagline>{exp.tagline}</Tagline>

        <MetaRow>
          <div className="item"><strong>{exp.duration}</strong>Duration</div>
          <div className="item"><strong>★ {exp.rating}</strong>{exp.reviewCount} reviews</div>
          <div className="item"><strong>{exp.difficulty}</strong>Difficulty</div>
          <div className="item"><strong>Max {exp.maxCapacity}</strong>Group size</div>
        </MetaRow>

        <Section>
          <h2>About This Experience</h2>
          {exp.longDescription.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </Section>

        <Section>
          <h2>What's Included</h2>
          <IncludesList>
            {exp.includes.map((item, i) => <li key={i}>{item}</li>)}
          </IncludesList>
        </Section>

        <Section>
          <h2>Details</h2>
          <p><strong>Meeting Point:</strong> {exp.meetingPoint}</p>
          <p style={{ marginTop: '0.5rem' }}><strong>Best Season:</strong> {exp.bestSeason}</p>
        </Section>

        <BookingCard>
          <PriceRow>
            <div className="price"><strong>${exp.priceFrom}</strong> <span>/ person</span></div>
            <div className="rating">★ {exp.rating} · {exp.reviewCount} reviews</div>
          </PriceRow>
          <BookBtn>Book Experience</BookBtn>
          <SaveBtn onClick={() => toggleCollection({ id: exp.id, type: 'experience', name: exp.name, image: exp.images[0], price: exp.priceFrom })}>
            {isInCollection(exp.id) ? '♥ Saved to Collection' : '♡ Save to Collection'}
          </SaveBtn>
        </BookingCard>

        <Section style={{ marginTop: '3rem' }}>
          <h2>Where to Stay</h2>
          <p style={{ marginBottom: '1.5rem' }}>Complete your experience with a hand-picked place to stay.</p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {accommodations.slice(0, 3).map(a => (
              <Link key={a.id} to={`/stays/${a.slug}`} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #E5DDD0', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.3s' }}>
                <img src={a.images[0]} alt={a.name} style={{ width: 80, height: 60, objectFit: 'cover' }} />
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.2rem' }}>{a.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B6259' }}>{a.location} · From ${a.priceFrom}/night</div>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <Section>
          <h2>Dine Nearby</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {restaurants.slice(0, 2).map(r => (
              <Link key={r.id} to={`/dining/${r.slug}`} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #E5DDD0', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.3s' }}>
                <img src={r.images[0]} alt={r.name} style={{ width: 80, height: 60, objectFit: 'cover' }} />
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.2rem' }}>{r.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B6259' }}>{r.cuisine} · ★ {r.rating}</div>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <Section>
          <h2>Similar Experiences</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {experiences.filter(e => e.id !== exp.id && e.type === exp.type).slice(0, 2).map(e => (
              <Link key={e.id} to={`/experiences/${e.slug}`} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #E5DDD0', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.3s' }}>
                <img src={e.images[0]} alt={e.name} style={{ width: 80, height: 60, objectFit: 'cover' }} />
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.2rem' }}>{e.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B6259' }}>{e.duration} · From ${e.priceFrom}/person</div>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <div style={{ textAlign: 'center', padding: '2rem 0', borderTop: '1px solid #E5DDD0', marginTop: '2rem' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', marginBottom: '1rem', color: '#6B6259' }}>Want us to build a full itinerary around this experience?</p>
          <Link to="/plan" style={{ display: 'inline-block', padding: '0.9rem 2.5rem', background: '#1F3A32', color: '#fff', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>Plan My Journey</Link>
        </div>
      </Content>
    </PageWrapper>
  );
}
