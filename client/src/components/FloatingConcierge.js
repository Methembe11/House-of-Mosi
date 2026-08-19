import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

const FloatBtn = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 900;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: 1.25rem;
    right: 1.25rem;
  }
`;

const ToggleButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.5rem;
  background: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};

  &:hover {
    background: ${props => props.theme.colors.identity};
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.75rem 1.1rem;
    font-size: 10px;
  }
`;

const Panel = styled(motion.div)`
  position: fixed;
  bottom: 5.5rem;
  right: 2rem;
  width: 390px;
  max-height: 540px;
  background: ${props => props.theme.colors.backgroundDark};
  border: 1px solid rgba(203, 184, 157, 0.3);
  box-shadow: 0 16px 48px rgba(0,0,0,0.35);
  display: flex;
  flex-direction: column;
  z-index: 900;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 85%;
    height: 1px;
    background: ${props => props.theme.colors.accent};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    right: 1rem;
    left: 1rem;
    bottom: 4.5rem;
    width: auto;
    max-height: 60vh;
  }
`;

const PanelHeader = styled.div`
  padding: 1.1rem 1.35rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(203, 184, 157, 0.18);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .orb {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.accent};

    svg { width: 17px; height: 17px; }
  }
`;

const BrandName = styled.div`
  .name {
    font-family: ${props => props.theme.fonts.serif};
    font-size: 1.15rem;
    color: ${props => props.theme.colors.white};
    line-height: 1.1;

    em { color: ${props => props.theme.colors.accent}; }
  }

  .status {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.textLight};
    display: flex;
    align-items: center;
    gap: 0.4rem;

    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #7DB59A;
      animation: pulse 2s infinite;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: 1px solid rgba(203, 184, 157, 0.35);
  color: ${props => props.theme.colors.accent};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover { background: ${props => props.theme.colors.accent}; color: ${props => props.theme.colors.text}; }
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-thumb { background: rgba(203,184,157,0.35); }
`;

const BotBubble = styled.div`
  background: rgba(250, 248, 243, 0.07);
  border-left: 2px solid ${props => props.theme.colors.accent};
  padding: 0.85rem 1rem;
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.65;
  color: ${props => props.theme.colors.cream};
  max-width: 92%;
  white-space: pre-line;
`;

const UserBubble = styled(BotBubble)`
  align-self: flex-end;
  background: ${props => props.theme.colors.identity};
  border-left: none;
  border-bottom-right-radius: 2px;
  color: ${props => props.theme.colors.white};
`;

const QuickRow = styled.div`
  padding: 0 1.25rem 0.9rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const QuickBtn = styled.button`
  padding: 0.45rem 0.85rem;
  border: 1px solid rgba(203, 184, 157, 0.4);
  background: transparent;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accent};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.text};
  }
`;

const InputRow = styled.div`
  display: flex;
  border-top: 1px solid rgba(203, 184, 157, 0.2);
  padding: 0.85rem;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: 1px solid rgba(203, 184, 157, 0.3);
  padding: 0.7rem 0.9rem;
  font-size: ${props => props.theme.fontSizes.sm};
  font-family: ${props => props.theme.fonts.sans};
  color: ${props => props.theme.colors.cream};
  outline: none;
  transition: border-color ${props => props.theme.transitions.fast};

  &::placeholder { color: rgba(250, 248, 243, 0.4); font-style: italic; }
  &:focus { border-color: ${props => props.theme.colors.accent}; }
`;

const SendBtn = styled.button`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: 0 1.35rem;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover { background: ${props => props.theme.colors.accentDeep}; }
`;

const QUICK_ACTIONS = [
  { label: 'Plan my trip', message: 'I\'d like help planning my Victoria Falls journey.' },
  { label: 'Best time to visit', message: 'When is the best time to visit Victoria Falls?' },
  { label: 'Where should I stay?', message: 'Can you recommend where to stay?' },
  { label: 'Airport transfer', message: 'I need an airport transfer. What are my options?' },
];

function generateAIResponse(msg) {
  const lower = msg.toLowerCase();

  if (lower.includes('plan') || lower.includes('trip') || lower.includes('itinerary')) {
    return `I'd love to help you plan your Victoria Falls trip. Here's a suggested itinerary:

Day 1 — Arrive and settle in. Afternoon sunset cruise on the Zambezi.
Day 2 — Morning guided tour of Victoria Falls. Afternoon helicopter "Flight of Angels."
Day 3 — Choose your adventure: white-water rafting, bungee, or a game safari.

Shall I customize this around your dates and interests?`;
  }

  if (lower.includes('best time') || lower.includes('when') || lower.includes('season')) {
    return `Victoria Falls is magnificent year-round, but the experience changes:

Peak (Jun–Oct) — Dry season, lower water levels, prime wildlife viewing.
Green (Nov–Mar) — Full thunder of the falls, lush bush, fewer crowds.

For balance, aim for May–September: the falls are powerful and the weather is dry and mild.`;
  }

  if (lower.includes('stay') || lower.includes('hotel') || lower.includes('lodge')) {
    return `A few favourites, depending on your style:

Heritage — The Victoria Falls Hotel, Edwardian elegance above the gorge.
Safari — Victoria Falls Safari Lodge, elephants at your waterhole.
Exclusive — Anantara Stanley & Livingstone, sixteen private suites.
Value — Savanna68 Hotel, modern and central.

Want me to check availability for specific dates?`;
  }

  if (lower.includes('transport') || lower.includes('transfer') || lower.includes('airport')) {
    return `Movement is handled by the transport layer:

Airport transfer — $35 per vehicle, about 20 minutes.
Hotel transfer — $25 between hotel and any activity.
Private driver — $50 per hour for the whole day.
Shuttle — $15 per person, shared routes.

Pre-book your airport transfer for a smooth arrival.`;
  }

  if (lower.includes('friday') || lower.includes('saturday') || lower.includes('sunday') || lower.includes('arrive') || lower.includes('leave')) {
    return `A weekend at the Falls:

Friday — Pickup, check-in, sunset cruise on the Zambezi.
Saturday — Helicopter at dawn, bungee at the gorge, Boma drum show at night.
Sunday — Guided walk through the rain forest, lunch at The Lookout Cafe, departure.

Shall I adjust this or add activities?`;
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hello — welcome to VicFalls One. I'm your AI concierge for Victoria Falls. I can plan itineraries, recommend stays, book activities and transfers, and point you to the best tables in town. What shall we design?`;
  }

  return `I can help you with:

• Trip planning and itineraries
• Accommodation recommendations
• Activity and experience bookings
• Transport arrangements
• Restaurant suggestions
• The best time to visit

Ask me anything about Victoria Falls.`;
}

export default function FloatingConcierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to VicFalls One. I can help you plan the perfect Victoria Falls experience. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { from: 'user', text: msg }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: generateAIResponse(msg) }]);
    }, 800);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <Panel
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <PanelHeader>
              <Brand>
                <span className="orb"><Icon name="chat" /></span>
                <BrandName>
                  <div className="name">VicFalls <em>Concierge</em></div>
                  <div className="status">AI Online</div>
                </BrandName>
              </Brand>
              <CloseButton onClick={() => setOpen(false)} aria-label="Close concierge">&times;</CloseButton>
            </PanelHeader>
            <Messages>
              {messages.map((m, i) => (
                m.from === 'user'
                  ? <UserBubble key={i}>{m.text}</UserBubble>
                  : <BotBubble key={i}>{m.text}</BotBubble>
              ))}
              <div ref={messagesEnd} />
            </Messages>
            {messages.length <= 1 && (
              <QuickRow>
                {QUICK_ACTIONS.map((a, i) => (
                  <QuickBtn key={i} onClick={() => send(a.message)}>{a.label}</QuickBtn>
                ))}
              </QuickRow>
            )}
            <InputRow>
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask about Victoria Falls..."
                aria-label="Message the concierge"
              />
              <SendBtn onClick={() => send()}>Send</SendBtn>
            </InputRow>
          </Panel>
        )}
      </AnimatePresence>

      <FloatBtn
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <ToggleButton onClick={() => setOpen(prev => !prev)} aria-label={open ? 'Close concierge' : 'Open concierge'}>
          <Icon name="chat" />
          {open ? 'Close' : 'Concierge'}
        </ToggleButton>
      </FloatBtn>
    </>
  );
}
