import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { accommodations, experiences } from '../data/data';
import Icon from '../components/Icon';
import ReviewsSection from '../components/ReviewsSection';

const PageWrapper = styled.div`padding-top: 90px;`;

const Gallery = styled.section`
  position: relative;
  height: 65vh;
  min-height: 450px;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 50vh;
    min-height: 350px;
  }
`;

const GalleryMain = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GalleryNav = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  gap: 0.5rem;
`;

const GalleryBtn = styled.button`
  width: 44px;
  height: 44px;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &:hover { background: white; }
`;

const GalleryThumbs = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  display: flex;
  gap: 0.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) { display: none; }
`;

const Thumb = styled.button`
  width: 70px;
  height: 50px;
  overflow: hidden;
  border: 2px solid ${props => props.$active ? 'white' : 'transparent'};
  opacity: ${props => props.$active ? 1 : 0.7};
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
  background: none;

  img { width: 100%; height: 100%; object-fit: cover; }
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover { background: white; }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainContent = styled.div``;

const Breadcrumb = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 1rem;

  a { color: ${props => props.theme.colors.cocoa}; &:hover { text-decoration: underline; } }
  span { margin: 0 0.5rem; }
`;

const PropertyCategory = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${props => props.theme.colors.cocoa};
  font-weight: 500;
`;

const PropertyTitle = styled.h1`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  margin: 0.75rem 0;
  line-height: 1.2;
`;

const PropertyTagline = styled.p`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-style: italic;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 1.5rem;
`;

const PropertyMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.md};
  }

  .dot { width: 3px; height: 3px; border-radius: 50%; background: ${props => props.theme.colors.stone}; }
  .reviews { font-size: ${props => props.theme.fontSizes.sm}; color: ${props => props.theme.colors.textLight}; }
  .location { font-size: ${props => props.theme.fontSizes.sm}; color: ${props => props.theme.colors.textMuted}; }
`;

const Description = styled.div`
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

const Highlights = styled.div`
  margin-bottom: 3rem;

  h2 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: ${props => props.theme.fontSizes.xxl};
    font-weight: 400;
    margin-bottom: 1rem;
  }

  ul { list-style: none; }

  li {
    padding: 0.6rem 0;
    font-size: ${props => props.theme.fontSizes.md};
    color: ${props => props.theme.colors.textLight};
    border-bottom: 1px solid ${props => props.theme.colors.borderLight};
    display: flex;
    align-items: center;
    gap: 0.75rem;

    &::before {
      content: '✓';
      color: ${props => props.theme.colors.cocoa};
      font-weight: 600;
    }
  }
`;

const AmenitiesSection = styled.div`
  margin-bottom: 3rem;

  h2 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: ${props => props.theme.fontSizes.xxl};
    font-weight: 400;
    margin-bottom: 1.5rem;
  }
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.colors.backgroundAlt};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const AmenityIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.cocoa};
`;

const RoomsSection = styled.div`
  margin-bottom: 3rem;

  h2 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: ${props => props.theme.fontSizes.xxl};
    font-weight: 400;
    margin-bottom: 1.5rem;
  }
`;

const RoomCard = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  padding: 2rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover { border-color: ${props => props.theme.colors.primary}; }
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;

  h3 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 500;
  }

  .room-price {
    text-align: right;
    .amount {
      font-size: ${props => props.theme.fontSizes.xl};
      font-weight: 600;
      color: ${props => props.theme.colors.primary};
    }
    .per { font-size: ${props => props.theme.fontSizes.xs}; color: ${props => props.theme.colors.textMuted}; }
  }
`;

const RoomDesc = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const RoomMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 1rem;
`;

const RoomAmenities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    padding: 0.3rem 0.7rem;
    background: ${props => props.theme.colors.backgroundAlt};
    font-size: ${props => props.theme.fontSizes.xs};
    color: ${props => props.theme.colors.textLight};
  }
`;

const Sidebar = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    order: -1;
  }
`;

const BookingCard = styled.div`
  position: sticky;
  top: 110px;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 2rem;
`;

const BookingPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  strong {
    font-size: ${props => props.theme.fontSizes.xxl};
    font-weight: 600;
  }

  span {
    font-size: ${props => props.theme.fontSizes.md};
    color: ${props => props.theme.colors.textMuted};
  }
`;

const BookingInput = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    font-size: ${props => props.theme.fontSizes.xs};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
  }

  input, select {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid ${props => props.theme.colors.border};
    background: ${props => props.theme.colors.background};
    font-size: ${props => props.theme.fontSizes.md};
    font-family: ${props => props.theme.fonts.sans};
    color: ${props => props.theme.colors.text};

    &:focus { border-color: ${props => props.theme.colors.primary}; }
  }
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
  margin-top: 0.5rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover { background: ${props => props.theme.colors.primaryDark}; }
`;

const CollectionBtn = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  margin-top: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover { border-color: ${props => props.theme.colors.primary}; color: ${props => props.theme.colors.primary}; }
`;

const NearbySection = styled.div`
  margin-bottom: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};

  h3 {
    font-size: ${props => props.theme.fontSizes.sm};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
  }

  a {
    display: block;
    padding: 0.5rem 0;
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.cocoa};
    border-bottom: 1px solid ${props => props.theme.colors.borderLight};

    &:hover { color: ${props => props.theme.colors.primary}; }
  }
`;

export default function AccommodationDetailPage({ isInCollection, toggleCollection }) {
  const { slug } = useParams();
  const [imgIndex, setImgIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const acc = accommodations.find(a => a.slug === slug);

  if (!acc) {
    return (
      <PageWrapper>
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', marginBottom: '1rem' }}>Property not found</h1>
          <Link to="/discover" style={{ color: '#6B4F3A', textDecoration: 'underline' }}>Back to Discover</Link>
        </div>
      </PageWrapper>
    );
  }

  const nearbyExps = experiences.filter(e => acc.nearbyExperiences?.includes(e.id));

  const nextImg = () => setImgIndex((imgIndex + 1) % acc.images.length);
  const prevImg = () => setImgIndex((imgIndex - 1 + acc.images.length) % acc.images.length);

  return (
    <PageWrapper>
      <Gallery>
        <BackLink to="/discover">← Back</BackLink>
        <GalleryMain>
          <motion.img
            key={imgIndex}
            src={acc.images[imgIndex]}
            alt={acc.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </GalleryMain>
        <GalleryThumbs>
          {acc.images.map((img, i) => (
            <Thumb key={i} $active={i === imgIndex} onClick={() => setImgIndex(i)}>
              <img src={img} alt="" />
            </Thumb>
          ))}
        </GalleryThumbs>
        <GalleryNav>
          <GalleryBtn onClick={prevImg} aria-label="Previous image">←</GalleryBtn>
          <GalleryBtn onClick={nextImg} aria-label="Next image">→</GalleryBtn>
        </GalleryNav>
      </Gallery>

      <Content>
        <MainContent>
          <Breadcrumb>
            <Link to="/discover">Discover</Link>
            <span>·</span>
            <Link to="/stays">Stays</Link>
            <span>·</span>
            {acc.name}
          </Breadcrumb>

          <PropertyCategory>{acc.category}</PropertyCategory>
          <PropertyTitle>{acc.name}</PropertyTitle>
          <PropertyTagline>{acc.tagline}</PropertyTagline>

          <PropertyMeta>
            <span className="rating">★ {acc.rating}</span>
            <div className="dot" />
            <span className="reviews">{acc.reviewCount} reviews</span>
            <div className="dot" />
            <span className="location">{acc.location}</span>
          </PropertyMeta>

          <Description>
            <h2>About This Property</h2>
            {acc.longDescription.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
          </Description>

          <Highlights>
            <h2>Highlights</h2>
            <ul>
              {acc.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </Highlights>

          <AmenitiesSection>
            <h2>Amenities</h2>
            <AmenitiesGrid>
              {acc.amenities.map((a, i) => (
                <AmenityItem key={i}>
                  <AmenityIcon><Icon name={a.icon} size={18} /></AmenityIcon>
                  {a.name}
                </AmenityItem>
              ))}
            </AmenitiesGrid>
          </AmenitiesSection>

          <RoomsSection>
            <h2>Rooms & Suites</h2>
            {acc.rooms.map(room => (
              <RoomCard key={room.id}>
                <RoomHeader>
                  <div>
                    <h3>{room.name}</h3>
                  </div>
                  <div className="room-price">
                    <div className="amount">${room.priceFrom}</div>
                    <div className="per">per night</div>
                  </div>
                </RoomHeader>
                <RoomDesc>{room.description}</RoomDesc>
                <RoomMeta>
                  <span>{room.size}</span>
                  <span>·</span>
                  <span>{room.bedType}</span>
                  <span>·</span>
                  <span>Up to {room.capacity} guests</span>
                </RoomMeta>
                <RoomAmenities>
                  {room.amenities.map((a, i) => <span key={i}>{a}</span>)}
                </RoomAmenities>
              </RoomCard>
            ))}
          </RoomsSection>

          {nearbyExps.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 400, marginBottom: '1.5rem' }}>
                Experiences Nearby
              </h2>
              {nearbyExps.map(exp => (
                <Link key={exp.id} to={`/experiences/${exp.slug}`} style={{ display: 'block', padding: '1rem', border: '1px solid #E5DDD0', marginBottom: '0.75rem', transition: 'all 0.3s ease' }}>
                  <div style={{ fontWeight: 500, fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}>{exp.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6B6259' }}>{exp.type} · {exp.duration} · From ${exp.priceFrom}</div>
                </Link>
              ))}
            </div>
          )}
        </MainContent>

        <Sidebar>
          <BookingCard>
            <BookingPrice>
              <strong>${acc.priceFrom}</strong>
              <span>/ night</span>
            </BookingPrice>

            <BookingInput>
              <label>Check In</label>
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </BookingInput>

            <BookingInput>
              <label>Check Out</label>
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </BookingInput>

            <BookingInput>
              <label>Guests</label>
              <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
              </select>
            </BookingInput>

            <BookBtn>Check Availability</BookBtn>
            <CollectionBtn onClick={() => toggleCollection({ id: acc.id, type: 'accommodation', name: acc.name, image: acc.images[0], price: acc.priceFrom, location: acc.location })}>
              {isInCollection(acc.id) ? '♥ Saved to Collection' : '♡ Save to Collection'}
            </CollectionBtn>

            <NearbySection>
              <h3>You May Also Like</h3>
              {accommodations.filter(a => a.id !== acc.id).slice(0, 3).map(a => (
                <Link key={a.id} to={`/stays/${a.slug}`}>{a.name}</Link>
              ))}
            </NearbySection>
          </BookingCard>
        </Sidebar>
      </Content>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 3rem' }}>
        <ReviewsSection />
      </div>
    </PageWrapper>
  );
}
