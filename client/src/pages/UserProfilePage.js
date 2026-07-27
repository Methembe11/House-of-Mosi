import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../components/Icon';

const PageWrapper = styled.div` padding-top: 90px; min-height: 100vh; background: ${p => p.theme.colors.background}; `;
const Hero = styled.div` background: ${p => p.theme.colors.primary}; padding: 3rem 2rem; display: flex; align-items: center; gap: 2rem; max-width: 1400px; margin: 0 auto; @media(max-width: ${p => p.theme.breakpoints.mobile}) { flex-direction: column; text-align: center; } `;
const Avatar = styled.div` width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; flex-shrink: 0; `;
const HeroInfo = styled.div` color: ${p => p.theme.colors.white}; h1 { font-family: ${p => p.theme.fonts.serif}; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 400; margin-bottom: 0.25rem; } p { font-size: ${p => p.theme.fontSizes.sm}; opacity: 0.8; } `;
const Tabs = styled.div` display: flex; gap: 0; border-bottom: 1px solid ${p => p.theme.colors.border}; max-width: 1400px; margin: 0 auto; background: ${p => p.theme.colors.white}; overflow-x: auto; `;
const Tab = styled.button` padding: 1rem 1.5rem; border: none; background: ${p => p.$active ? p.theme.colors.background : p.theme.colors.white}; color: ${p => p.$active ? p.theme.colors.primary : p.theme.colors.textMuted}; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; cursor: pointer; border-bottom: 2px solid ${p => p.$active ? p.theme.colors.primary : 'transparent'}; transition: all 0.2s; white-space: nowrap; display: flex; align-items: center; gap: 0.5rem; &:hover { color: ${p => p.theme.colors.primary}; } `;

const Content = styled.div` max-width: 1400px; margin: 0 auto; padding: 2rem; `;
const Grid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: 1fr; } `;
const FullGrid = styled(Grid)` grid-template-columns: 1fr; `;
const Card = styled.div` background: ${p => p.theme.colors.white}; border: 1px solid ${p => p.theme.colors.border}; padding: 1.5rem; `;
const CardTitle = styled.h3` font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.lg}; font-weight: 500; margin-bottom: 1rem; color: ${p => p.theme.colors.text}; `;
const Label = styled.label` display: block; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 500; color: ${p => p.theme.colors.text}; margin-bottom: 0.35rem; margin-top: 1rem; `;
const Input = styled.input` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; color: ${p => p.theme.colors.text}; &:focus { outline: none; border-color: ${p => p.theme.colors.primary}; } `;
const Select = styled.select` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; color: ${p => p.theme.colors.text}; background: white; &:focus { outline: none; border-color: ${p => p.theme.colors.primary}; } `;
const Row = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; `;
const Btn = styled.button` padding: 0.75rem 1.5rem; background: ${p => p.theme.colors.primary}; color: ${p => p.theme.colors.white}; border: none; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; margin-top: 1rem; transition: all 0.3s; &:hover { background: ${p => p.theme.colors.primaryDark}; } `;
const DangerBtn = styled(Btn)` background: ${p => p.theme.colors.danger}; &:hover { background: ${p => p.theme.colors.dangerDark}; } `;

const BookingRow = styled(Link)` display: flex; gap: 1.5rem; padding: 1.25rem 0; border-bottom: 1px solid ${p => p.theme.colors.border}; text-decoration: none; color: inherit; transition: background 0.2s; &:hover { background: rgba(31,58,50,0.02); } &:last-child { border-bottom: none; } @media(max-width: ${p => p.theme.breakpoints.mobile}) { flex-direction: column; } `;
const BookingImage = styled.div` width: 100px; height: 80px; background: ${p => p.bg || p.theme.colors.borderLight}; background-size: cover; background-position: center; flex-shrink: 0; `;
const BookingInfo = styled.div` flex: 1; h4 { font-size: ${p => p.theme.fontSizes.md}; font-weight: 600; color: ${p => p.theme.colors.text}; margin-bottom: 0.25rem; } p { font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textMuted}; } `;
const BookingStatus = styled.span` display: inline-block; padding: 0.25rem 0.75rem; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 2px; background: ${p => p.$status === 'confirmed' ? 'rgba(40,167,69,0.1)' : p.$status === 'pending' ? 'rgba(255,193,7,0.1)' : 'rgba(108,117,125,0.1)'}; color: ${p => p.$status === 'confirmed' ? '#28a745' : p.$status === 'pending' ? '#d4a017' : '#6c757d'}; `;

const SavedCard = styled.div` display: flex; gap: 1.5rem; padding: 1.25rem 0; border-bottom: 1px solid ${p => p.theme.colors.border}; &:last-child { border-bottom: none; } `;
const SavedImage = styled.div` width: 80px; height: 80px; background: ${p => p.bg || p.theme.colors.borderLight}; background-size: cover; background-position: center; flex-shrink: 0; `;
const SavedInfo = styled.div` flex: 1; h4 { font-size: ${p => p.theme.fontSizes.md}; font-weight: 600; } p { font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textMuted}; } `;
const RemoveBtn = styled.button` background: none; border: none; color: ${p => p.theme.colors.textMuted}; cursor: pointer; font-size: ${p => p.theme.fontSizes.sm}; padding: 0.25rem; &:hover { color: ${p => p.theme.colors.danger}; } `;

const NotifRow = styled.div` display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid ${p => p.theme.colors.border}; &:last-child { border-bottom: none; } `;
const NotifDot = styled.div` width: 8px; height: 8px; border-radius: 50%; background: ${p => p.$read ? 'transparent' : p.theme.colors.primary}; flex-shrink: 0; margin-top: 0.4rem; `;
const NotifText = styled.div` flex: 1; p { font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.text}; } span { font-size: ${p => p.theme.fontSizes.xs}; color: ${p => p.theme.colors.textMuted}; } `;

const MOCK_BOOKINGS = [
  { id: 1, title: 'The Victoria Falls Hotel', date: 'Jul 15-18, 2026', status: 'confirmed', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80', type: 'accommodation' },
  { id: 2, title: 'Sunset Cruise', date: 'Jul 16, 2026', status: 'confirmed', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&q=80', type: 'experience' },
  { id: 3, title: 'Airport Transfer', date: 'Jul 15, 2026', status: 'pending', img: null, type: 'transport' },
];
const MOCK_SAVED = [
  { id: 1, title: 'Ilala Lodge Hotel', desc: 'From $180/night', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&q=80' },
  { id: 2, title: 'Boma Dinner & Drum Show', desc: 'From $65/person', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80' },
];
const MOCK_NOTIFS = [
  { id: 1, text: 'Your booking at The Victoria Falls Hotel is confirmed.', time: '2 hours ago', read: false },
  { id: 2, text: 'Sunset Cruise departs tomorrow at 5:00 PM.', time: '1 day ago', read: false },
  { id: 3, text: 'Welcome to VicFalls One! Complete your profile to get started.', time: '3 days ago', read: true },
];

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [profile, setProfile] = useState({ firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', phone: '+1 234 567 8900', country: 'United States' });
  const [notifications, setNotifications] = useState(MOCK_NOTIFS);
  const [saved, setSaved] = useState(MOCK_SAVED);

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: 'map-pin' },
    { id: 'saved', label: 'Saved', icon: 'heart' },
    { id: 'notifications', label: 'Notifications', icon: 'star' },
    { id: 'settings', label: 'Profile Settings', icon: 'user' },
  ];

  const renderBookings = () => (
    <FullGrid>
      <Card>
        <CardTitle>Upcoming Bookings</CardTitle>
        {MOCK_BOOKINGS.map(b => (
          <BookingRow key={b.id} to={b.type === 'accommodation' ? `/accommodation/${b.id}` : b.type === 'experience' ? `/experience/${b.id}` : '/transport'}>
            {b.img ? <BookingImage bg={`url(${b.img})`} /> : <BookingImage style={{ background: '#e8e2d8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B4F3A' }}><Icon name="car" /></BookingImage>}
            <BookingInfo>
              <h4>{b.title}</h4>
              <p>{b.date}</p>
            </BookingInfo>
            <BookingStatus $status={b.status}>{b.status}</BookingStatus>
          </BookingRow>
        ))}
      </Card>
    </FullGrid>
  );

  const renderSaved = () => (
    <FullGrid>
      <Card>
        <CardTitle>Saved Items</CardTitle>
        {saved.map(s => (
          <SavedCard key={s.id}>
            <SavedImage bg={`url(${s.img})`} />
            <SavedInfo>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </SavedInfo>
            <RemoveBtn onClick={() => setSaved(prev => prev.filter(x => x.id !== s.id))}>Remove</RemoveBtn>
          </SavedCard>
        ))}
        {saved.length === 0 && <p style={{ color: '#6B6259', fontSize: '0.9rem' }}>No saved items yet.</p>}
      </Card>
    </FullGrid>
  );

  const renderNotifications = () => (
    <FullGrid>
      <Card>
        <CardTitle>Notifications</CardTitle>
        {notifications.map(n => (
          <NotifRow key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? {...x, read: true} : x))} style={{ cursor: 'pointer' }}>
            <NotifDot $read={n.read} />
            <NotifText>
              <p>{n.text}</p>
              <span>{n.time}</span>
            </NotifText>
          </NotifRow>
        ))}
      </Card>
    </FullGrid>
  );

  const renderSettings = () => (
    <Grid>
      <Card>
        <CardTitle>Personal Information</CardTitle>
        <Row>
          <div><Label>First Name</Label><Input value={profile.firstName} onChange={e => setProfile({...profile, firstName: e.target.value})} /></div>
          <div><Label>Last Name</Label><Input value={profile.lastName} onChange={e => setProfile({...profile, lastName: e.target.value})} /></div>
        </Row>
        <div><Label>Email</Label><Input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} /></div>
        <div><Label>Phone</Label><Input value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} /></div>
        <div><Label>Country</Label><Select value={profile.country} onChange={e => setProfile({...profile, country: e.target.value})}><option>United States</option><option>United Kingdom</option><option>South Africa</option><option>Australia</option><option>Germany</option><option>Other</option></Select></div>
        <Btn>Save Changes</Btn>
      </Card>
      <Card>
        <CardTitle>Password & Security</CardTitle>
        <div><Label>Current Password</Label><Input type="password" /></div>
        <div><Label>New Password</Label><Input type="password" /></div>
        <div><Label>Confirm New Password</Label><Input type="password" /></div>
        <Btn>Update Password</Btn>
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E8E2D8' }}>
          <CardTitle>Danger Zone</CardTitle>
          <DangerBtn>Delete Account</DangerBtn>
        </div>
      </Card>
    </Grid>
  );

  const content = { bookings: renderBookings, saved: renderSaved, notifications: renderNotifications, settings: renderSettings };

  return (
    <PageWrapper>
      <Hero>
        <Avatar>👤</Avatar>
        <HeroInfo>
          <h1>{profile.firstName} {profile.lastName}</h1>
          <p>{profile.email}</p>
        </HeroInfo>
      </Hero>
      <Tabs>
        {tabs.map(t => (
          <Tab key={t.id} $active={activeTab === t.id} onClick={() => setActiveTab(t.id)}>
            <Icon name={t.icon} /> {t.label}
            {t.id === 'notifications' && notifications.filter(n => !n.read).length > 0 && <span style={{ background: '#892F21', color: 'white', fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>{notifications.filter(n => !n.read).length}</span>}
          </Tab>
        ))}
      </Tabs>
      <Content>{content[activeTab]?.()}</Content>
    </PageWrapper>
  );
}
