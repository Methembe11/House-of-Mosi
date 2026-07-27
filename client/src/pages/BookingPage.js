import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const EXPERIENCE = {
  name: 'Flight of Angels',
  tagline: 'Victoria Falls from the sky',
  duration: '15-25 minutes',
  priceFrom: 205,
  includes: ['Scenic helicopter flight', 'Experienced pilot commentary', 'Guaranteed window seat', 'Digital photo package'],
  meetingPoint: 'Helipad, Victoria Falls Airport Road',
};

const PageWrapper = styled.div`
  padding-top: 90px;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const HeroBar = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 2rem 2rem 1.5rem;
  text-align: center;
`;

const ExperienceTitle = styled.h1`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  color: ${props => props.theme.colors.white};
  font-weight: 400;
  margin-bottom: 0.25rem;
`;

const ExperienceTagline = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: rgba(255,255,255,0.6);
`;

const Layout = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 2rem 4rem;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2.5rem;
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 1.5rem 1rem 3rem;
    gap: 1.5rem;
  }
`;

const MainCol = styled.div`
  min-width: 0;
`;

const SidebarCol = styled.div`
  position: sticky;
  top: 110px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: static;
    order: -1;
  }
`;

const StepCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  flex-shrink: 0;
  background: ${props =>
    props.$done ? props.theme.colors.primary :
    props.$active ? props.theme.colors.primary :
    props.theme.colors.backgroundAlt};
  color: ${props =>
    props.$done ? props.theme.colors.white :
    props.$active ? props.theme.colors.white :
    props.theme.colors.textMuted};
  border: 2px solid ${props =>
    props.$done ? props.theme.colors.primary :
    props.$active ? props.theme.colors.primary :
    props.theme.colors.border};
  transition: all 0.4s ease;
`;

const StepLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${props => props.$done ? props.theme.colors.primary : props.theme.colors.border};
  transition: background 0.4s ease;
  margin: 0 0.5rem;
`;

const StepLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: ${props => props.$active ? 600 : 400};
  position: absolute;
  top: 44px;
  white-space: nowrap;
`;

const StepItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  position: relative;

  ${StepItem}:not(:last-child) {
    flex: 1;
  }
`;

const FormCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem 1.25rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.cream};
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(31, 58, 50, 0.08);
    background: ${props => props.theme.colors.white};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.cream};
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.text};
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(31, 58, 50, 0.08);
    background: ${props => props.theme.colors.white};
  }
`;

const DateInput = styled(Input).attrs({ type: 'date' })`
  &::-webkit-calendar-picker-indicator {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const GuestRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};

  &:last-child {
    border-bottom: none;
  }
`;

const GuestLabel = styled.div`
  div:first-child {
    font-size: ${props => props.theme.fontSizes.md};
    font-weight: 500;
    color: ${props => props.theme.colors.text};
  }
  div:last-child {
    font-size: ${props => props.theme.fontSizes.xs};
    color: ${props => props.theme.colors.textMuted};
    margin-top: 0.1rem;
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

const CounterBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const CounterVal = styled.span`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 600;
  min-width: 24px;
  text-align: center;
`;

const PriceLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};

  &.total {
    border-top: 2px solid ${props => props.theme.colors.border};
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    font-size: ${props => props.theme.fontSizes.md};
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }
`;

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const BackBtn = styled.button`
  padding: 0.65rem 1.5rem;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${props => props.theme.colors.textLight};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.white};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.textLight};
    color: ${props => props.theme.colors.text};
  }
`;

const ContinueBtn = styled.button`
  padding: 0.7rem 2rem;
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: 600;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const OrderCard = styled.div`
  background: ${props => props.theme.colors.white};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const OrderTitle = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 500;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const OrderItem = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

const OrderItemStrong = styled(OrderItem)`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  cursor: pointer;
  margin-top: 0.5rem;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${props => props.theme.colors.primary};
    cursor: pointer;
  }
`;

const SuccessWrapper = styled(motion.div)`
  text-align: center;
  padding: 3rem 2rem;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const SuccessCheck = styled.div`
  color: white;
  font-size: 2.25rem;
  line-height: 1;
`;

const SuccessTitle = styled.h2`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const BookingRef = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 2rem;
`;

const BookingRefCode = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const SummaryBox = styled.div`
  background: ${props => props.theme.colors.cream};
  padding: 1.5rem;
  text-align: left;
  margin-bottom: 2rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};

  &.divider {
    border-top: 1px solid ${props => props.theme.colors.border};
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }
`;

const ConfirmActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ConfirmBtn = styled(Link)`
  padding: 0.7rem 2rem;
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};

    &:hover { background: ${props => props.theme.colors.primaryDark}; }
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.colors.textLight};
    border: 1px solid ${props => props.theme.colors.border};

    &:hover { border-color: ${props => props.theme.colors.textLight}; color: ${props => props.theme.colors.text}; }
  }
`;

const IncludesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
`;

const IncludesItem = styled.li`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  padding: 0.25rem 0;
  padding-left: 1.25rem;
  position: relative;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${props => props.theme.colors.success};
    font-weight: 600;
  }
`;

const stepVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingRef] = useState(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let ref = '';
    for (let i = 0; i < 5; i++) ref += chars[Math.floor(Math.random() * chars.length)];
    return `VF-${ref}`;
  });

  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [contact, setContact] = useState({ name: '', email: '', phone: '', requests: '' });

  const [payment, setPayment] = useState({
    cardNumber: '', expiry: '', cvv: '', cardName: '', saveCard: false,
  });

  const totalGuests = adults + children;
  const pricePerAdult = EXPERIENCE.priceFrom;
  const pricePerChild = Math.round(EXPERIENCE.priceFrom * 0.6);
  const subtotal = (adults * pricePerAdult) + (children * pricePerChild);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'cardNumber') {
      const raw = value.replace(/\D/g, '').slice(0, 16);
      const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
      setPayment(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'expiry') {
      let raw = value.replace(/\D/g, '').slice(0, 4);
      if (raw.length >= 3) raw = raw.slice(0, 2) + '/' + raw.slice(2);
      setPayment(prev => ({ ...prev, [name]: raw }));
    } else if (name === 'cvv') {
      setPayment(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 4) }));
    } else {
      setPayment(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const canContinue = () => {
    if (step === 1) return !!date && totalGuests > 0;
    if (step === 2) return contact.name && contact.email;
    if (step === 3) return payment.cardNumber.replace(/\s/g, '').length === 16 && payment.expiry && payment.cvv && payment.cardName;
    return true;
  };

  const labels = ['Date & Guests', 'Contact', 'Payment', 'Confirmation'];

  return (
    <PageWrapper>
      <HeroBar>
        <ExperienceTitle>{EXPERIENCE.name}</ExperienceTitle>
        <ExperienceTagline>{EXPERIENCE.tagline}</ExperienceTagline>
      </HeroBar>

      <Layout>
        <MainCol>
          <StepWrapper>
            {labels.map((label, i) => {
              const num = i + 1;
              const isDone = step > num;
              const isActive = step === num;
              return (
                <StepItem key={num}>
                  <StepCircle $done={isDone} $active={isActive}>
                    {isDone ? '✓' : num}
                  </StepCircle>
                  <StepLabel $active={isActive}>{label}</StepLabel>
                  {i < labels.length - 1 && <StepLine $done={isDone} style={{ position: 'absolute', top: 18, left: '50%', width: '100%' }} />}
                </StepItem>
              );
            })}
          </StepWrapper>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <FormCard key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <SectionTitle>Select Date & Guests</SectionTitle>

                <InputGroup>
                  <Label>Preferred Date</Label>
                  <DateInput
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </InputGroup>

                <GuestRow>
                  <GuestLabel>
                    <div>Adults</div>
                    <div>Age 13+</div>
                  </GuestLabel>
                  <Counter>
                    <CounterBtn onClick={() => setAdults(a => Math.max(1, a - 1))} disabled={adults <= 1}>−</CounterBtn>
                    <CounterVal>{adults}</CounterVal>
                    <CounterBtn onClick={() => setAdults(a => Math.min(4, a + 1))} disabled={adults >= 4}>+</CounterBtn>
                  </Counter>
                </GuestRow>

                <GuestRow>
                  <GuestLabel>
                    <div>Children</div>
                    <div>Age 2–12</div>
                  </GuestLabel>
                  <Counter>
                    <CounterBtn onClick={() => setChildren(c => Math.max(0, c - 1))} disabled={children <= 0}>−</CounterBtn>
                    <CounterVal>{children}</CounterVal>
                    <CounterBtn onClick={() => setChildren(c => Math.min(4, c + 1))} disabled={children >= 4}>+</CounterBtn>
                  </Counter>
                </GuestRow>

                <NavRow>
                  <div />
                  <ContinueBtn onClick={() => setStep(2)} disabled={!canContinue()}>Continue</ContinueBtn>
                </NavRow>
              </FormCard>
            )}

            {step === 2 && (
              <FormCard key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <SectionTitle>Contact Details</SectionTitle>

                <InputGroup>
                  <Label>Full Name</Label>
                  <Input name="name" placeholder="John Smith" value={contact.name} onChange={handleContactChange} />
                </InputGroup>

                <InputGroup>
                  <Label>Email Address</Label>
                  <Input name="email" type="email" placeholder="you@example.com" value={contact.email} onChange={handleContactChange} />
                </InputGroup>

                <InputGroup>
                  <Label>Phone Number</Label>
                  <Input name="phone" type="tel" placeholder="+1 (555) 000-0000" value={contact.phone} onChange={handleContactChange} />
                </InputGroup>

                <InputGroup>
                  <Label>Special Requests</Label>
                  <TextArea name="requests" placeholder="Dietary needs, accessibility requirements, celebrations..." value={contact.requests} onChange={handleContactChange} />
                </InputGroup>

                <NavRow>
                  <BackBtn onClick={() => setStep(1)}>Back</BackBtn>
                  <ContinueBtn onClick={() => setStep(3)} disabled={!canContinue()}>Continue</ContinueBtn>
                </NavRow>
              </FormCard>
            )}

            {step === 3 && (
              <FormCard key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <SectionTitle>Payment</SectionTitle>

                <InputGroup>
                  <Label>Card Number</Label>
                  <Input
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={payment.cardNumber}
                    onChange={handlePaymentChange}
                    maxLength={19}
                  />
                </InputGroup>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <InputGroup>
                    <Label>Expiry Date</Label>
                    <Input
                      name="expiry"
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={handlePaymentChange}
                      maxLength={5}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>CVV</Label>
                    <Input
                      name="cvv"
                      placeholder="•••"
                      type="password"
                      value={payment.cvv}
                      onChange={handlePaymentChange}
                      maxLength={4}
                    />
                  </InputGroup>
                </div>

                <InputGroup>
                  <Label>Cardholder Name</Label>
                  <Input
                    name="cardName"
                    placeholder="Name on card"
                    value={payment.cardName}
                    onChange={handlePaymentChange}
                  />
                </InputGroup>

                <CheckboxRow>
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={payment.saveCard}
                    onChange={handlePaymentChange}
                  />
                  Save card for future bookings
                </CheckboxRow>

                <NavRow>
                  <BackBtn onClick={() => setStep(2)}>Back</BackBtn>
                  <ContinueBtn onClick={() => setStep(4)} disabled={!canContinue()}>Confirm & Pay ${total.toLocaleString()}</ContinueBtn>
                </NavRow>
              </FormCard>
            )}

            {step === 4 && (
              <FormCard key="step4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <SuccessWrapper
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <SuccessIcon>
                    <SuccessCheck>✓</SuccessCheck>
                  </SuccessIcon>

                  <SuccessTitle>Booking Confirmed!</SuccessTitle>
                  <BookingRef>
                    Reference: <BookingRefCode>{bookingRef}</BookingRefCode>
                  </BookingRef>

                  <SummaryBox>
                    <SummaryRow><span>{EXPERIENCE.name}</span><span>{date}</span></SummaryRow>
                    <SummaryRow><span>{adults} adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} child${children > 1 ? 'ren' : ''}` : ''}</span><span>{EXPERIENCE.duration}</span></SummaryRow>
                    <SummaryRow><span>{EXPERIENCE.meetingPoint}</span><span /></SummaryRow>
                    <SummaryRow className="divider"><span>Total Paid</span><span>${total.toLocaleString()}</span></SummaryRow>
                  </SummaryBox>

                  <ConfirmActions>
                    <ConfirmBtn to="/profile" className="primary">View My Bookings</ConfirmBtn>
                    <ConfirmBtn to="/" className="secondary">Back to Home</ConfirmBtn>
                  </ConfirmActions>
                </SuccessWrapper>
              </FormCard>
            )}
          </AnimatePresence>
        </MainCol>

        {step < 4 && (
          <SidebarCol>
            <OrderCard>
              <OrderTitle>Order Summary</OrderTitle>
              <OrderItemStrong>{EXPERIENCE.name}</OrderItemStrong>
              <OrderItem>{EXPERIENCE.duration}</OrderItem>
              <OrderItem>{date || 'Select a date'}</OrderItem>
              <OrderItem style={{ marginTop: '1rem' }}>
                {adults} adult{adults > 1 ? 's' : ''} × ${pricePerAdult.toLocaleString()}
              </OrderItem>
              {children > 0 && (
                <OrderItem>
                  {children} child{children > 1 ? 'ren' : ''} × ${pricePerChild.toLocaleString()}
                </OrderItem>
              )}
              <IncludesList>
                {EXPERIENCE.includes.map((item, i) => (
                  <IncludesItem key={i}>{item}</IncludesItem>
                ))}
              </IncludesList>
              <div style={{ marginTop: '1.25rem' }}>
                <PriceLine><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></PriceLine>
                <PriceLine><span>Service fee</span><span>${serviceFee.toLocaleString()}</span></PriceLine>
                <PriceLine className="total"><span>Total</span><span>${total.toLocaleString()}</span></PriceLine>
              </div>
            </OrderCard>
          </SidebarCol>
        )}
      </Layout>
    </PageWrapper>
  );
}
