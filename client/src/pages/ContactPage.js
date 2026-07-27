import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageWrapper = styled.div` padding-top: 90px; min-height: 100vh; background: ${p => p.theme.colors.background}; `;

const Hero = styled.div` background: ${p => p.theme.colors.primary}; padding: 3rem 2rem; text-align: center; color: ${p => p.theme.colors.white}; `;
const HeroTitle = styled.h1` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 400; margin-bottom: 0.5rem; `;
const HeroSub = styled.p` font-size: ${p => p.theme.fontSizes.md}; opacity: 0.7; max-width: 500px; margin: 0 auto; `;

const Content = styled.div` max-width: 900px; margin: 0 auto; padding: 3rem 2rem; `;

const FormCard = styled.div` background: ${p => p.theme.colors.white}; padding: 2.5rem; border: 1px solid ${p => p.theme.colors.border}; margin-bottom: 2rem; `;
const FormTitle = styled.h2` font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.xl}; font-weight: 500; margin-bottom: 1.5rem; color: ${p => p.theme.colors.text}; `;

const Row = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; @media(max-width: ${p => p.theme.breakpoints.mobile}) { grid-template-columns: 1fr; } `;
const FullRow = styled.div` margin-bottom: 1rem; `;
const Label = styled.label` display: block; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 500; color: ${p => p.theme.colors.text}; margin-bottom: 0.35rem; `;
const Input = styled.input` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; background: ${p => p.theme.colors.white}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; color: ${p => p.theme.colors.text}; transition: border-color 0.2s; &:focus { outline: none; border-color: ${p => p.theme.colors.primary}; } `;
const Select = styled.select` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; background: ${p => p.theme.colors.white}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; color: ${p => p.theme.colors.text}; cursor: pointer; &:focus { outline: none; border-color: ${p => p.theme.colors.primary}; } `;
const Textarea = styled.textarea` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; background: ${p => p.theme.colors.white}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; color: ${p => p.theme.colors.text}; resize: vertical; min-height: 100px; &:focus { outline: none; border-color: ${p => p.theme.colors.primary}; } `;
const Btn = styled.button` padding: 0.85rem 2rem; background: ${p => p.theme.colors.primary}; color: ${p => p.theme.colors.white}; border: none; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; transition: all 0.3s; width: ${p => p.$full ? '100%' : 'auto'}; &:hover { background: ${p => p.theme.colors.primaryDark}; } `;

const InfoCard = styled.div` background: ${p => p.theme.colors.white}; padding: 2rem; border: 1px solid ${p => p.theme.colors.border}; margin-bottom: 1.5rem; `;
const InfoTitle = styled.h3` font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.lg}; font-weight: 500; margin-bottom: 1rem; color: ${p => p.theme.colors.text}; `;
const InfoItem = styled.div` display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; `;
const InfoIcon = styled.span` width: 36px; height: 36px; background: ${p => p.theme.colors.primary}; color: ${p => p.theme.colors.white}; display: flex; align-items: center; justify-content: center; border-radius: 50%; flex-shrink: 0; font-size: 14px; `;

const Accordion = styled.div` border: 1px solid ${p => p.theme.colors.border}; margin-bottom: 0.75rem; background: ${p => p.theme.colors.white}; `;
const AccordionHeader = styled.button` width: 100%; padding: 1rem 1.25rem; background: none; border: none; text-align: left; font-size: ${p => p.theme.fontSizes.md}; font-weight: 500; color: ${p => p.theme.colors.text}; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-family: ${p => p.theme.fonts.sans}; `;
const AccordionBody = styled.div` padding: 0 1.25rem 1rem; font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; line-height: 1.7; `;

const SuccessMsg = styled(motion.div)` padding: 1rem 1.5rem; background: #e8f5e9; color: ${p => p.theme.colors.success}; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 500; border-radius: 4px; margin-top: 1rem; `;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const FAQ_DATA = [
  { q: 'How do I book an experience?', a: 'Browse our experiences, select your preferred date and number of guests, then proceed to checkout. You\'ll receive a confirmation email immediately.' },
  { q: 'Can I cancel or modify my booking?', a: 'Yes, you can cancel or modify up to 48 hours before your booking date for a full refund.' },
  { q: 'How do I become a listed business?', a: 'Visit our Business Portal page and submit an application. Our team will review and get back to you within 48 hours.' },
  { q: 'Is my payment information secure?', a: 'Yes, we use industry-standard SSL encryption. We never store your full card details.' },
  { q: 'Do you offer group discounts?', a: 'Yes, groups of 8+ qualify for discounted rates. Contact us for a custom quote.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <PageWrapper>
      <Hero>
        <HeroTitle>Contact Us</HeroTitle>
        <HeroSub>We're here to help with anything you need</HeroSub>
      </Hero>
      <Content>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            <FormCard>
              <FormTitle>Send us a Message</FormTitle>
              <form onSubmit={handleSubmit}>
                <Row>
                  <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                  <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
                </Row>
                <FullRow><Label>Subject</Label>
                  <Select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required>
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option><option>Booking Support</option><option>Technical Issue</option><option>Business Partnership</option><option>Other</option>
                  </Select>
                </FullRow>
                <FullRow><Label>Message</Label><Textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required /></FullRow>
                <Btn type="submit" $full>Send Message</Btn>
                {sent && <SuccessMsg initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Message sent! We'll get back to you within 24 hours.</SuccessMsg>}
              </form>
            </FormCard>
            <div>
              <InfoCard>
                <InfoTitle>Get in Touch</InfoTitle>
                <InfoItem><InfoIcon>✉</InfoIcon><div><strong>Email</strong><br />support@vicfallsone.com</div></InfoItem>
                <InfoItem><InfoIcon>☎</InfoIcon><div><strong>Phone</strong><br />+263 (0) 83 123 4567</div></InfoItem>
                <InfoItem><InfoIcon>◉</InfoIcon><div><strong>Address</strong><br />Victoria Falls, Zimbabwe</div></InfoItem>
                <InfoItem><InfoIcon>◷</InfoIcon><div><strong>Hours</strong><br />Mon-Fri 8AM-5PM · Sat 9AM-1PM</div></InfoItem>
              </InfoCard>
            </div>
          </div>
        </motion.div>

        <FormTitle>Frequently Asked Questions</FormTitle>
        {FAQ_DATA.map((faq, i) => (
          <Accordion key={i}>
            <AccordionHeader onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              {faq.q}
              <span>{openFaq === i ? '−' : '+'}</span>
            </AccordionHeader>
            {openFaq === i && <AccordionBody>{faq.a}</AccordionBody>}
          </Accordion>
        ))}
      </Content>
    </PageWrapper>
  );
}
