import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PageWrapper = styled.div` padding-top: 90px; min-height: 100vh; background: ${p => p.theme.colors.background}; `;

const Hero = styled.div`
  height: 280px; position: relative; display: flex; align-items: flex-end; overflow: hidden;
  background: linear-gradient(135deg, ${p => p.theme.colors.primaryDark}, ${p => p.theme.colors.primary});
  &::before { content: ''; position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80') center/cover; opacity: 0.3; }
`;
const HeroContent = styled.div` position: relative; z-index: 2; padding: 2rem; width: 100%; max-width: 1400px; margin: 0 auto; `;
const HeroName = styled.h1` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(1.75rem, 4vw, 2.5rem); color: ${p => p.theme.colors.white}; font-weight: 400; margin-bottom: 0.5rem; `;
const HeroMeta = styled.div` display: flex; gap: 1.5rem; font-size: ${p => p.theme.fontSizes.sm}; color: rgba(255,255,255,0.8); `;

const Content = styled.div` max-width: 1100px; margin: 0 auto; padding: 3rem 2rem; display: grid; grid-template-columns: 1.4fr 1fr; gap: 2.5rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: 1fr; } `;
const FormCard = styled.div` background: ${p => p.theme.colors.white}; padding: 2rem; border: 1px solid ${p => p.theme.colors.border}; `;
const FormTitle = styled.h2` font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.xl}; font-weight: 500; margin-bottom: 1.5rem; color: ${p => p.theme.colors.text}; `;
const Label = styled.label` display: block; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 500; color: ${p => p.theme.colors.text}; margin-bottom: 0.35rem; margin-top: 1rem; `;
const Input = styled.input` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; color: ${p => p.theme.colors.text}; &:focus { outline: none; border-color: ${p => p.theme.colors.primary}; } `;
const Row = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; `;
const Btn = styled.button` padding: 0.85rem 2rem; background: ${p => p.theme.colors.primary}; color: ${p => p.theme.colors.white}; border: none; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; width: 100%; margin-top: 1.5rem; transition: all 0.3s; &:hover { background: ${p => p.theme.colors.primaryDark}; } `;

const TicketCard = styled.div` padding: 1.25rem; border: 2px solid ${p => p.$active ? p.theme.colors.primary : p.theme.colors.border}; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; background: ${p => p.$active ? 'rgba(31,58,50,0.03)' : 'transparent'}; cursor: pointer; &:hover { border-color: ${p => p.theme.colors.primary}; } `;
const TicketInfo = styled.div` h3 { font-size: ${p => p.theme.fontSizes.md}; font-weight: 600; color: ${p => p.theme.colors.text}; } p { font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textMuted}; margin-top: 0.25rem; } `;
const TicketPrice = styled.div` font-size: ${p => p.theme.fontSizes.xl}; font-weight: 600; color: ${p => p.theme.colors.primary}; `;
const QtyRow = styled.div` display: flex; align-items: center; gap: 0.75rem; margin-top: 0.75rem; `;
const QtyBtn = styled.button` width: 32px; height: 32px; border: 1px solid ${p => p.theme.colors.border}; background: white; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; &:hover { border-color: ${p => p.theme.colors.primary}; } `;
const QtyVal = styled.span` font-size: ${p => p.theme.fontSizes.md}; font-weight: 600; min-width: 24px; text-align: center; `;

const SummaryCard = styled.div` background: ${p => p.theme.colors.white}; padding: 2rem; border: 1px solid ${p => p.theme.colors.border}; height: fit-content; position: sticky; top: 110px; `;
const SummaryRow = styled.div` display: flex; justify-content: space-between; padding: 0.5rem 0; font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; border-bottom: 1px solid ${p => p.theme.colors.borderLight}; .label { font-weight: 500; color: ${p => p.theme.colors.text}; } `;
const SummaryTotal = styled.div` display: flex; justify-content: space-between; padding-top: 0.75rem; margin-top: 0.5rem; border-top: 2px solid ${p => p.theme.colors.border}; font-weight: 600; font-size: ${p => p.theme.fontSizes.md}; color: ${p => p.theme.colors.text}; `;

const ConfirmOverlay = styled(motion.div)` position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; `;
const ConfirmCard = styled(motion.div)` background: ${p => p.theme.colors.white}; padding: 3rem; max-width: 450px; width: 90%; text-align: center; `;
const CheckCircle = styled.div` width: 72px; height: 72px; border-radius: 50%; background: ${p => p.theme.colors.success}; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; `;
const ConfirmTitle = styled.h2` font-family: ${p => p.theme.fonts.serif}; font-size: 1.75rem; font-weight: 400; margin-bottom: 0.5rem; `;
const ConfirmRef = styled.p` font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textMuted}; margin-bottom: 1.5rem; `;
const ConfirmDetail = styled.div` text-align: left; padding: 1rem; background: ${p => p.theme.colors.background}; margin-bottom: 1.5rem; font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; line-height: 1.8; `;
const ConfirmBtns = styled.div` display: flex; gap: 1rem; justify-content: center; `;
const ConfirmBtn = styled(Link)` padding: 0.75rem 1.5rem; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; border: 1px solid ${p => p.theme.colors.primary}; color: ${p => p.$primary ? p.theme.colors.white : p.theme.colors.primary}; background: ${p => p.$primary ? p.theme.colors.primary : 'transparent'}; transition: all 0.3s; &:hover { background: ${p => p.theme.colors.primaryDark}; color: white; border-color: ${p => p.theme.colors.primaryDark}; } `;

const TICKETS = [
  { id: 'general', name: 'General Admission', price: 75, desc: 'Access to all main stages and areas' },
  { id: 'vip', name: 'VIP', price: 150, desc: 'Premium viewing areas, complimentary drinks, VIP lounge' },
  { id: 'weekend', name: 'Weekend Pass', price: 120, desc: 'Full access for all three days' },
];

export default function EventTicketPage() {
  const [tickets, setTickets] = useState({ general: 0, vip: 0, weekend: 0 });
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [confirmed, setConfirmed] = useState(false);
  const ref = 'EV-' + Math.random().toString(36).substring(2, 7).toUpperCase();

  const updateQty = (id, delta) => setTickets(prev => ({ ...prev, [id]: Math.max(0, Math.min(10, prev[id] + delta)) }));
  const total = TICKETS.reduce((sum, t) => sum + tickets[t.id] * t.price, 0);
  const totalTickets = Object.values(tickets).reduce((a, b) => a + b, 0);

  const handleSubmit = (e) => { e.preventDefault(); if (totalTickets === 0) return; setConfirmed(true); };

  return (
    <PageWrapper>
      <Hero>
        <HeroContent>
          <HeroName>Victoria Falls Carnival</HeroName>
          <HeroMeta><span>Dec 28-31, 2026</span><span>Victoria Falls Town</span><span>Festivals</span></HeroMeta>
        </HeroContent>
      </Hero>

      <Content>
        <FormCard>
          <form onSubmit={handleSubmit}>
            <FormTitle>Select Tickets</FormTitle>
            {TICKETS.map(t => (
              <TicketCard key={t.id} $active={tickets[t.id] > 0} onClick={() => updateQty(t.id, 1)}>
                <TicketInfo>
                  <h3>{t.name}</h3>
                  <p>{t.desc}</p>
                  <QtyRow onClick={e => e.stopPropagation()}>
                    <QtyBtn type="button" onClick={() => updateQty(t.id, -1)}>−</QtyBtn>
                    <QtyVal>{tickets[t.id]}</QtyVal>
                    <QtyBtn type="button" onClick={() => updateQty(t.id, 1)}>+</QtyBtn>
                    <span style={{ fontSize: '0.8rem', color: '#6B6259' }}>${t.price}/ticket</span>
                  </QtyRow>
                </TicketInfo>
                <TicketPrice>${tickets[t.id] * t.price}</TicketPrice>
              </TicketCard>
            ))}

            {totalTickets > 0 && (
              <>
                <FormTitle style={{ marginTop: '2rem' }}>Attendee Details</FormTitle>
                <Row>
                  <div><Label>Full Name</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                  <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required /></div>
                </Row>
                <div><Label>Email (for e-tickets)</Label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>

                <FormTitle style={{ marginTop: '2rem' }}>Payment</FormTitle>
                <div><Label>Card Number</Label><Input placeholder="1234 5678 9012 3456" required /></div>
                <Row>
                  <div><Label>Expiry</Label><Input placeholder="MM/YY" required /></div>
                  <div><Label>CVV</Label><Input placeholder="123" required /></div>
                </Row>
                <div><Label>Cardholder Name</Label><Input required /></div>

                <Btn type="submit">Purchase Tickets</Btn>
              </>
            )}
          </form>
        </FormCard>

        <SummaryCard>
          <FormTitle>Order Summary</FormTitle>
          <SummaryRow><span className="label">Event</span><span>Victoria Falls Carnival</span></SummaryRow>
          <SummaryRow><span className="label">Date</span><span>Dec 28-31, 2026</span></SummaryRow>
          {TICKETS.filter(t => tickets[t.id] > 0).map(t => (
            <SummaryRow key={t.id}><span>{t.name} × {tickets[t.id]}</span><span>${tickets[t.id] * t.price}</span></SummaryRow>
          ))}
          <SummaryRow><span className="label">Service Fee</span><span>${Math.round(total * 0.05)}</span></SummaryRow>
          <SummaryTotal><span>Total</span><span>${total + Math.round(total * 0.05)}</span></SummaryTotal>
        </SummaryCard>
      </Content>

      <AnimatePresence>
        {confirmed && (
          <ConfirmOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ConfirmCard initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <CheckCircle>✓</CheckCircle>
              <ConfirmTitle>Tickets Confirmed!</ConfirmTitle>
              <ConfirmRef>Reference: {ref}</ConfirmRef>
              <ConfirmDetail>
                Victoria Falls Carnival<br />
                Dec 28-31, 2026<br />
                {TICKETS.filter(t => tickets[t.id] > 0).map(t => `${t.name}: ${tickets[t.id]}`).join(' · ')}
              </ConfirmDetail>
              <ConfirmBtns>
                <ConfirmBtn to="/events">View Events</ConfirmBtn>
                <ConfirmBtn to="/" $primary>Home</ConfirmBtn>
              </ConfirmBtns>
            </ConfirmCard>
          </ConfirmOverlay>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
