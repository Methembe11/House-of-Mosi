import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { restaurants, accommodations, experiences } from '../data/data';

const PageWrapper = styled.div`padding-top: 90px;`;

const Gallery = styled.div`
  height: 50vh;
  min-height: 350px;
  position: relative;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const BackLink = styled(Link)`
  position: absolute; top: 1.5rem; left: 1.5rem; z-index: 5;
  background: rgba(255,255,255,0.9); padding: 0.5rem 1.2rem;
  font-size: ${props => props.theme.fontSizes.sm}; font-weight: 500;
  &:hover { background: white; }
`;

const Content = styled.div`max-width: 900px; margin: 0 auto; padding: 3rem 2rem;`;

const Category = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase; letter-spacing: 0.2em;
  color: ${props => props.theme.colors.cocoa}; font-weight: 500;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; margin: 0.75rem 0;
`;

const MetaRow = styled.div`
  display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem;
  padding-bottom: 2rem; border-bottom: 1px solid ${props => props.theme.colors.border};
  .item { font-size: ${props => props.theme.fontSizes.sm}; color: ${props => props.theme.colors.textMuted};
    strong { display: block; font-size: ${props => props.theme.fontSizes.md}; color: ${props => props.theme.colors.text}; font-weight: 600; margin-bottom: 0.15rem; }
  }
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
  h2 { font-family: ${props => props.theme.fonts.serif}; font-size: ${props => props.theme.fontSizes.xxl}; font-weight: 400; margin-bottom: 1rem; }
  p { font-size: ${props => props.theme.fontSizes.md}; color: ${props => props.theme.colors.textLight}; line-height: 1.8; }
`;

const SigList = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) { grid-template-columns: 1fr; }
`;

const SigItem = styled.div`
  padding: 1rem; background: ${props => props.theme.colors.backgroundAlt};
  font-size: ${props => props.theme.fontSizes.sm}; color: ${props => props.theme.colors.textLight};
  &::before { content: '★ '; color: ${props => props.theme.colors.cocoa}; }
`;

export default function RestaurantDetailPage({ isInCollection, toggleCollection }) {
  const { slug } = useParams();
  const rest = restaurants.find(r => r.slug === slug);
  if (!rest) return <PageWrapper><div style={{ textAlign: 'center', padding: '6rem 2rem' }}><h1 style={{ fontFamily: 'Cormorant Garamond, serif' }}>Not found</h1><Link to="/dining" style={{ color: '#6B4F3A' }}>Back to Dining</Link></div></PageWrapper>;

  const saved = isInCollection && isInCollection(rest.id);

  return (
    <PageWrapper>
      <Gallery>
        <BackLink to="/dining">← Back</BackLink>
        {isInCollection && toggleCollection && (
          <button
            onClick={() => toggleCollection(rest.id)}
            aria-label={saved ? 'Remove from collection' : 'Save to collection'}
            style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 5,
              background: 'rgba(255,255,255,0.9)', border: 'none', padding: '0.5rem 1rem',
              cursor: 'pointer', fontSize: '1.2rem', transition: 'background 0.3s'
            }}
          >
            {saved ? '♥' : '♡'}
          </button>
        )}
        <img src={rest.images[0]} alt={rest.name} />
      </Gallery>
      <Content>
        <Category>{rest.category}</Category>
        <Title>{rest.name}</Title>
        <MetaRow>
          <div className="item"><strong>★ {rest.rating}</strong>{rest.reviewCount} reviews</div>
          <div className="item"><strong>${rest.pricePerPerson}</strong>per person</div>
          <div className="item"><strong>{rest.hours}</strong>Hours</div>
          <div className="item"><strong>{rest.ambiance}</strong>Ambiance</div>
        </MetaRow>
        <Section><h2>About</h2><p>{rest.description}</p></Section>
        <Section><h2>Signature Dishes</h2><SigList>{rest.signature.map((s, i) => <SigItem key={i}>{s}</SigItem>)}</SigList></Section>

        <Section>
          <h2>Nearby Stays</h2>
          <p style={{ marginBottom: '1.5rem' }}>Extend your evening with a stay just moments away.</p>
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
          <h2>Experiences to Pair With</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {experiences.slice(0, 3).map(e => (
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
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', marginBottom: '1rem', color: '#6B6259' }}>Let us plan the perfect evening — and the journey around it.</p>
          <Link to="/plan" style={{ display: 'inline-block', padding: '0.9rem 2.5rem', background: '#1F3A32', color: '#fff', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>Plan My Journey</Link>
        </div>
      </Content>
    </PageWrapper>
  );
}
