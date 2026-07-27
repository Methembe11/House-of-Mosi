import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PageWrapper = styled.div` padding-top: 90px; min-height: 100vh; background: ${p => p.theme.colors.background}; `;

const Hero = styled.div`
  height: 280px; position: relative; display: flex; align-items: flex-end; overflow: hidden;
  background: linear-gradient(135deg, ${p => p.theme.colors.primaryDark}, ${p => p.theme.colors.primary});
  &::before { content: ''; position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80') center/cover; opacity: 0.3; }
`;
const HeroContent = styled.div` position: relative; z-index: 2; padding: 2rem; width: 100%; max-width: 1400px; margin: 0 auto; `;
const HeroName = styled.h1` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(1.75rem, 4vw, 2.5rem); color: ${p => p.theme.colors.white}; font-weight: 400; margin-bottom: 0.5rem; `;
const HeroMeta = styled.div` display: flex; gap: 1.5rem; font-size: ${p => p.theme.fontSizes.sm}; color: rgba(255,255,255,0.8); `;

const Content = styled.div` max-width: 1100px; margin: 0 auto; padding: 3rem 2rem; display: grid; grid-template-columns: 1.3fr 1fr; gap: 2.5rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: 1fr; } `;

const FormCard = styled.div` background: ${p => p.theme.colors.white}; padding: 2rem; border: 1px solid ${p => p.theme.colors.border}; `;
const FormTitle = styled.h2` font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.xl}; font-weight: 500; margin-bottom: 1.5rem; color: ${p => p.theme.colors.text}; `;
const Label = styled.label` display: block; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 500; color: ${p => p.theme.colors.text}; margin-bottom: 0.35rem; margin-top: 1rem; `;
const Input = styled.input` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; color: ${p => p.theme.colors.text}; &:focus { outline: none; border-color: ${p => p.theme.colors.primary}; } `;
const Select = styled.select` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; color: ${p => p.theme.colors.text}; background: white; cursor: pointer; `;
const Textarea = styled.textarea` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; resize: vertical; min-height: 80px; `;
const Row = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; `;
const TimeGrid = styled.div` display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-top: 0.5rem; @media(max-width: ${p => p.theme.breakpoints.mobile}) { grid-template-columns: repeat(3, 1fr); } `;
const TimeSlot = styled.button` padding: 0.6rem; border: 1px solid ${p => p.$active ? p.theme.colors.primary : p.theme.colors.border}; background: ${p => p.$active ? p.theme.colors.primary : 'transparent'}; color: ${p => p.$active ? p.theme.colors.white : p.theme.colors.text}; font-size: ${p => p.theme.fontSizes.sm}; cursor: pointer; transition: all 0.2s; font-family: ${p => p.theme.fonts.sans}; &:hover { border-color: ${p => p.theme.colors.primary}; } `;
const PartyGrid = styled.div` display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem; `;
const PartyBtn = styled.button` width: 48px; height: 48px; border: 1px solid ${p => p.$active ? p.theme.colors.primary : p.theme.colors.border}; background: ${p => p.$active ? p.theme.colors.primary : 'transparent'}; color: ${p => p.$active ? p.theme.colors.white : p.theme.colors.text}; font-size: ${p => p.theme.fontSizes.md}; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: ${p => p.theme.fonts.sans}; `;
const Btn = styled.button` padding: 0.85rem 2rem; background: ${p => p.theme.colors.primary}; color: ${p => p.theme.colors.white}; border: none; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; width: 100%; margin-top: 1.5rem; transition: all 0.3s; &:hover { background: ${p => p.theme.colors.primaryDark}; } `;

const InfoCard = styled.div` background: ${p => p.theme.colors.white}; padding: 2rem; border: 1px solid ${p => p.theme.colors.border}; height: fit-content; position: sticky; top: 110px; `;
const InfoItem = styled.div` margin-bottom: 1rem; .label { font-size: ${p => p.theme.fontSizes.xs}; text-transform: uppercase; letter-spacing: 0.1em; color: ${p => p.theme.colors.textMuted}; margin-bottom: 0.25rem; } .value { font-size: ${p => p.theme.fontSizes.md}; color: ${p => p.theme.colors.text}; font-weight: 500; } `;

const ConfirmOverlay = styled(motion.div)` position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; `;
const ConfirmCard = styled(motion.div)` background: ${p => p.theme.colors.white}; padding: 3rem; max-width: 450px; width: 90%; text-align: center; `;
const CheckCircle = styled.div` width: 72px; height: 72px; border-radius: 50%; background: ${p => p.theme.colors.success}; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; `;
const ConfirmTitle = styled.h2` font-family: ${p => p.theme.fonts.serif}; font-size: 1.75rem; font-weight: 400; margin-bottom: 0.5rem; `;
const ConfirmRef = styled.p` font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textMuted}; margin-bottom: 1.5rem; `;
const ConfirmDetail = styled.div` text-align: left; padding: 1rem; background: ${p => p.theme.colors.background}; margin-bottom: 1.5rem; font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; line-height: 1.8; `;
const ConfirmBtns = styled.div` display: flex; gap: 1rem; justify-content: center; `;
const ConfirmBtn = styled(Link)` padding: 0.75rem 1.5rem; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; transition: all 0.3s; border: 1px solid ${p => p.theme.colors.primary}; color: ${p => p.$primary ? p.theme.colors.white : p.theme.colors.primary}; background: ${p => p.$primary ? p.theme.colors.primary : 'transparent'}; &:hover { background: ${p => p.theme.colors.primaryDark}; color: white; border-color: ${p => p.theme.colors.primaryDark}; } `;

const TIMES = ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];

export default function RestaurantReservationPage() {
  const [form, setForm] = useState({ date: '', time: '', party: 2, occasion: '', name: '', email: '', phone: '', requests: '' });
  const [confirmed, setConfirmed] = useState(false);
  const ref = 'RD-' + Math.random().toString(36).substring(2, 7).toUpperCase();

  const handleSubmit = (e) => { e.preventDefault(); setConfirmed(true); };

  return (
    <PageWrapper>
      <Hero>
        <HeroContent>
          <HeroName>The Boma — Dinner & Drum Show</HeroName>
          <HeroMeta>
            <span>Traditional Zimbabwean</span><span>★ 4.7</span><span>Victoria Falls Safari Lodge</span>
          </HeroMeta>
        </HeroContent>
      </Hero>

      <Content>
        <FormCard>
          <FormTitle>Make a Reservation</FormTitle>
          <form onSubmit={handleSubmit}>
            <Row>
              <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required /></div>
              <div><Label>Occasion</Label>
                <Select value={form.occasion} onChange={e => setForm({...form, occasion: e.target.value})}>
                  <option value="">None</option><option>Birthday</option><option>Anniversary</option><option>Date Night</option><option>Business</option><option>Other</option>
                </Select>
              </div>
            </Row>
            <Label>Party Size</Label>
            <PartyGrid>
              {[1,2,3,4,5,6,7].map(n => (
                <PartyBtn key={n} type="button" $active={form.party === n} onClick={() => setForm({...form, party: n})}>{n}</PartyBtn>
              ))}
              <PartyBtn type="button" $active={form.party === 8} onClick={() => setForm({...form, party: 8})} style={{ width: 'auto', padding: '0 1rem' }}>8+</PartyBtn>
            </PartyGrid>
            {form.party >= 8 && <p style={{ fontSize: '0.8rem', color: '#6B6259', marginTop: '0.5rem' }}>For parties of 8+, please call +263 (0) 83 123 4567</p>}

            <Label>Available Times</Label>
            <TimeGrid>
              {TIMES.map(t => (
                <TimeSlot key={t} type="button" $active={form.time === t} onClick={() => setForm({...form, time: t})}>{t}</TimeSlot>
              ))}
            </TimeGrid>

            <Row>
              <div><Label>Full Name</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required /></div>
            </Row>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
            <div><Label>Special Requests</Label><Textarea value={form.requests} onChange={e => setForm({...form, requests: e.target.value})} placeholder="Dietary requirements, seating preferences..." /></div>
            <Btn type="submit">Confirm Reservation</Btn>
          </form>
        </FormCard>

        <InfoCard>
          <FormTitle>Restaurant Info</FormTitle>
          <InfoItem><div className="label">Hours</div><div className="value">Mon-Sun, 6:30 PM - 10:00 PM</div></InfoItem>
          <InfoItem><div className="label">Address</div><div className="value">Victoria Falls Safari Lodge, Custom Road</div></InfoItem>
          <InfoItem><div className="label">Cuisine</div><div className="value">Traditional Zimbabwean</div></InfoItem>
          <InfoItem><div className="label">Price Range</div><div className="value">$$$ · ~$85/person</div></InfoItem>
          <InfoItem><div className="label">Rating</div><div className="value">★ 4.7 · 567 reviews</div></InfoItem>
        </InfoCard>
      </Content>

      <AnimatePresence>
        {confirmed && (
          <ConfirmOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ConfirmCard initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <CheckCircle>✓</CheckCircle>
              <ConfirmTitle>Reservation Confirmed!</ConfirmTitle>
              <ConfirmRef>Reference: {ref}</ConfirmRef>
              <ConfirmDetail>
                The Boma — Dinner & Drum Show<br />
                {form.date} at {form.time}<br />
                Party of {form.party} · {form.occasion || 'No occasion'}
              </ConfirmDetail>
              <ConfirmBtns>
                <ConfirmBtn to="/dining">View Restaurants</ConfirmBtn>
                <ConfirmBtn to="/" $primary>Home</ConfirmBtn>
              </ConfirmBtns>
            </ConfirmCard>
          </ConfirmOverlay>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
