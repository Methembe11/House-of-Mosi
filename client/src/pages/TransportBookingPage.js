import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PageWrapper = styled.div` padding-top: 90px; min-height: 100vh; background: ${p => p.theme.colors.background}; `;
const Hero = styled.div` background: ${p => p.theme.colors.primary}; padding: 3rem 2rem; text-align: center; color: ${p => p.theme.colors.white}; `;
const HeroTitle = styled.h1` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 400; margin-bottom: 0.5rem; `;
const HeroSub = styled.p` font-size: ${p => p.theme.fontSizes.md}; opacity: 0.7; `;
const Content = styled.div` max-width: 1100px; margin: 0 auto; padding: 3rem 2rem; display: grid; grid-template-columns: 1.4fr 1fr; gap: 2.5rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: 1fr; } `;
const FormCard = styled.div` background: ${p => p.theme.colors.white}; padding: 2rem; border: 1px solid ${p => p.theme.colors.border}; `;
const FormTitle = styled.h2` font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.xl}; font-weight: 500; margin-bottom: 1.5rem; color: ${p => p.theme.colors.text}; `;
const Label = styled.label` display: block; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 500; color: ${p => p.theme.colors.text}; margin-bottom: 0.35rem; margin-top: 1rem; `;
const Input = styled.input` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; color: ${p => p.theme.colors.text}; &:focus { outline: none; border-color: ${p => p.theme.colors.primary}; } `;
const Row = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; `;
const Textarea = styled.textarea` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; resize: vertical; min-height: 80px; `;

const VehicleGrid = styled.div` display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 0.5rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: 1fr; } `;
const VehicleCard = styled.button` padding: 1.25rem; border: 2px solid ${p => p.$active ? p.theme.colors.primary : p.theme.colors.border}; background: ${p => p.$active ? 'rgba(31,58,50,0.04)' : p.theme.colors.white}; cursor: pointer; text-align: left; transition: all 0.2s; position: relative; font-family: ${p => p.theme.fonts.sans}; &:hover { border-color: ${p => p.theme.colors.primary}; } `;
const VehicleName = styled.div` font-size: ${p => p.theme.fontSizes.md}; font-weight: 600; color: ${p => p.theme.colors.text}; margin-bottom: 0.25rem; `;
const VehicleDesc = styled.div` font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textMuted}; margin-bottom: 0.5rem; `;
const VehiclePrice = styled.div` font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; color: ${p => p.theme.colors.primary}; `;
const CheckMark = styled.div` position: absolute; top: 0.75rem; right: 0.75rem; width: 22px; height: 22px; border-radius: 50%; background: ${p => p.theme.colors.primary}; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; `;

const PassengerRow = styled.div` display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; `;
const StepperBtn = styled.button` width: 40px; height: 40px; border: 1px solid ${p => p.theme.colors.border}; background: ${p => p.theme.colors.white}; color: ${p => p.theme.colors.text}; font-size: 1.25rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; &:hover { border-color: ${p => p.theme.colors.primary}; } `;
const StepperVal = styled.span` font-size: ${p => p.theme.fontSizes.lg}; font-weight: 600; min-width: 30px; text-align: center; `;

const Btn = styled.button` padding: 0.85rem 2rem; background: ${p => p.theme.colors.primary}; color: ${p => p.theme.colors.white}; border: none; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; width: 100%; margin-top: 1.5rem; transition: all 0.3s; &:hover { background: ${p => p.theme.colors.primaryDark}; } `;
const SummaryCard = styled.div` background: ${p => p.theme.colors.white}; padding: 2rem; border: 1px solid ${p => p.theme.colors.border}; height: fit-content; position: sticky; top: 110px; `;
const SummaryRow = styled.div` display: flex; justify-content: space-between; padding: 0.5rem 0; font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; border-bottom: 1px solid ${p => p.theme.colors.borderLight}; &:last-child { border-bottom: none; } .label { font-weight: 500; color: ${p => p.theme.colors.text}; } `;
const SummaryTotal = styled.div` display: flex; justify-content: space-between; padding-top: 0.75rem; margin-top: 0.5rem; border-top: 2px solid ${p => p.theme.colors.border}; font-weight: 600; font-size: ${p => p.theme.fontSizes.md}; color: ${p => p.theme.colors.text}; `;

const ConfirmOverlay = styled(motion.div)` position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; `;
const ConfirmCard = styled(motion.div)` background: ${p => p.theme.colors.white}; padding: 3rem; max-width: 450px; width: 90%; text-align: center; `;
const CheckCircle = styled.div` width: 72px; height: 72px; border-radius: 50%; background: ${p => p.theme.colors.success}; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; `;
const ConfirmTitle = styled.h2` font-family: ${p => p.theme.fonts.serif}; font-size: 1.75rem; font-weight: 400; margin-bottom: 0.5rem; `;
const ConfirmRef = styled.p` font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textMuted}; margin-bottom: 1.5rem; `;
const ConfirmDetail = styled.div` text-align: left; padding: 1rem; background: ${p => p.theme.colors.background}; margin-bottom: 1.5rem; font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; line-height: 1.8; `;
const ConfirmBtns = styled.div` display: flex; gap: 1rem; justify-content: center; `;
const ConfirmBtn = styled(Link)` padding: 0.75rem 1.5rem; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; border: 1px solid ${p => p.theme.colors.primary}; color: ${p => p.$primary ? p.theme.colors.white : p.theme.colors.primary}; background: ${p => p.$primary ? p.theme.colors.primary : 'transparent'}; transition: all 0.3s; &:hover { background: ${p => p.theme.colors.primaryDark}; color: white; border-color: ${p => p.theme.colors.primaryDark}; } `;

const VEHICLES = [
  { id: 'sedan', name: 'Sedan', desc: '3 passengers · Air conditioning', price: 35 },
  { id: 'suv', name: 'SUV', desc: '4 passengers · Extra luggage space', price: 50 },
  { id: 'minibus', name: 'Minibus', desc: '14 passengers · Shared service', price: 15 },
];

export default function TransportBookingPage() {
  const [form, setForm] = useState({ from: '', to: '', date: '', time: '', vehicle: 'sedan', passengers: 1, name: '', phone: '', flight: '', meetGreet: false, requests: '' });
  const [confirmed, setConfirmed] = useState(false);
  const ref = 'TR-' + Math.random().toString(36).substring(2, 7).toUpperCase();
  const vehicle = VEHICLES.find(v => v.id === form.vehicle);
  const total = vehicle ? vehicle.price * (form.vehicle === 'minibus' ? form.passengers : 1) : 0;

  const handleSubmit = (e) => { e.preventDefault(); setConfirmed(true); };

  return (
    <PageWrapper>
      <Hero>
        <HeroTitle>Book Your Transport</HeroTitle>
        <HeroSub>Seamless travel across Victoria Falls</HeroSub>
      </Hero>
      <Content>
        <FormCard>
          <form onSubmit={handleSubmit}>
            <FormTitle>Route Details</FormTitle>
            <Label>From</Label>
            <Input placeholder="e.g. Victoria Falls Airport" value={form.from} onChange={e => setForm({...form, from: e.target.value})} required />
            <Label>To</Label>
            <Input placeholder="e.g. The Victoria Falls Hotel" value={form.to} onChange={e => setForm({...form, to: e.target.value})} required />

            <Row>
              <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required /></div>
              <div><Label>Time</Label><Input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} required /></div>
            </Row>

            <FormTitle style={{ marginTop: '2rem' }}>Select Vehicle</FormTitle>
            <VehicleGrid>
              {VEHICLES.map(v => (
                <VehicleCard key={v.id} type="button" $active={form.vehicle === v.id} onClick={() => setForm({...form, vehicle: v.id})}>
                  {form.vehicle === v.id && <CheckMark>✓</CheckMark>}
                  <VehicleName>{v.name}</VehicleName>
                  <VehicleDesc>{v.desc}</VehicleDesc>
                  <VehiclePrice>From ${v.price}{v.id === 'minibus' ? '/person' : ''}</VehiclePrice>
                </VehicleCard>
              ))}
            </VehicleGrid>

            <FormTitle style={{ marginTop: '2rem' }}>Passenger Details</FormTitle>
            <Label>Passengers</Label>
            <PassengerRow>
              <StepperBtn type="button" onClick={() => setForm({...form, passengers: Math.max(1, form.passengers - 1)})}>−</StepperBtn>
              <StepperVal>{form.passengers}</StepperVal>
              <StepperBtn type="button" onClick={() => setForm({...form, passengers: Math.min(14, form.passengers + 1)})}>+</StepperBtn>
            </PassengerRow>

            <Row>
              <div><Label>Full Name</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required /></div>
            </Row>
            <div><Label>Flight Number (optional)</Label><Input value={form.flight} onChange={e => setForm({...form, flight: e.target.value})} placeholder="e.g. BA 234" /></div>
            <Label>Special Requests</Label>
            <Textarea value={form.requests} onChange={e => setForm({...form, requests: e.target.value})} placeholder="Child seats, extra luggage, etc." />
            <Btn type="submit">Confirm Booking</Btn>
          </form>
        </FormCard>

        <SummaryCard>
          <FormTitle>Booking Summary</FormTitle>
          <SummaryRow><span className="label">Route</span><span>{form.from || '—'} → {form.to || '—'}</span></SummaryRow>
          <SummaryRow><span className="label">Date</span><span>{form.date || '—'}</span></SummaryRow>
          <SummaryRow><span className="label">Time</span><span>{form.time || '—'}</span></SummaryRow>
          <SummaryRow><span className="label">Vehicle</span><span>{vehicle?.name}</span></SummaryRow>
          <SummaryRow><span className="label">Passengers</span><span>{form.passengers}</span></SummaryRow>
          <SummaryRow><span className="label">Price</span><span>${vehicle?.price}{form.vehicle === 'minibus' ? ' × ' + form.passengers : ''}</span></SummaryRow>
          <SummaryTotal><span>Total</span><span>${total}</span></SummaryTotal>
        </SummaryCard>
      </Content>

      <AnimatePresence>
        {confirmed && (
          <ConfirmOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ConfirmCard initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <CheckCircle>✓</CheckCircle>
              <ConfirmTitle>Transport Booked!</ConfirmTitle>
              <ConfirmRef>Reference: {ref}</ConfirmRef>
              <ConfirmDetail>
                {form.from} → {form.to}<br />
                {form.date} at {form.time}<br />
                {vehicle?.name} · {form.passengers} passenger{form.passengers > 1 ? 's' : ''}
              </ConfirmDetail>
              <ConfirmBtns>
                <ConfirmBtn to="/transport">View Transport</ConfirmBtn>
                <ConfirmBtn to="/" $primary>Home</ConfirmBtn>
              </ConfirmBtns>
            </ConfirmCard>
          </ConfirmOverlay>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
