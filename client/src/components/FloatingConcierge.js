import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 50px;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(31, 58, 50, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(31, 58, 50, 0.4);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.6rem 1rem;
    font-size: 11px;
  }
`;

const Panel = styled(motion.div)`
  position: fixed;
  bottom: 5.5rem;
  right: 2rem;
  width: 380px;
  max-height: 520px;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  z-index: 900;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    right: 1rem;
    left: 1rem;
    bottom: 4.5rem;
    width: auto;
    max-height: 60vh;
  }
`;

const PanelHeader = styled.div`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PanelTitle = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 400;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.white};
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover { opacity: 1; }
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BotBubble = styled.div`
  background: ${props => props.theme.colors.ivory};
  padding: 0.75rem 1rem;
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  max-width: 90%;
`;

const InputRow = styled.div`
  display: flex;
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 0.75rem;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  border: 1px solid ${props => props.theme.colors.border};
  padding: 0.6rem 0.75rem;
  font-size: ${props => props.theme.fontSizes.sm};
  font-family: ${props => props.theme.fonts.sans};
  outline: none;
  transition: border-color 0.2s;

  &:focus { border-color: ${props => props.theme.colors.primary}; }
`;

const SendBtn = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 0.6rem 1rem;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: background 0.2s;

  &:hover { background: ${props => props.theme.colors.primaryDark}; }
`;

const QUICK_ACTIONS = [
  { label: 'Plan my trip', message: 'I\'d like help planning my Victoria Falls journey.' },
  { label: 'Best time to visit', message: 'When is the best time to visit Victoria Falls?' },
  { label: 'Where should I stay?', message: 'Can you recommend where to stay?' },
];

export default function FloatingConcierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot',         text: 'Welcome to House of Mosi. I can help you plan the perfect Victoria Falls experience. What would you like to know?' }
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
      setMessages(prev => [...prev, {
        from: 'bot',
        text: 'Thank you for your interest. Our travel team will be in touch shortly with a personalised recommendation.'
      }]);
    }, 800);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <Panel
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <PanelHeader>
              <PanelTitle>Mosi Concierge</PanelTitle>
              <CloseButton onClick={() => setOpen(false)} aria-label="Close concierge">&times;</CloseButton>
            </PanelHeader>
            <Messages>
              {messages.map((m, i) => (
                <BotBubble key={i} style={m.from === 'user' ? { alignSelf: 'flex-end', background: '#1F3A32', color: '#fff' } : {}}>
                  {m.text}
                </BotBubble>
              ))}
              <div ref={messagesEnd} />
            </Messages>
            {messages.length <= 1 && (
              <div style={{ padding: '0 1.25rem 0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {QUICK_ACTIONS.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => send(a.message)}
                    style={{
                      padding: '0.4rem 0.75rem',
                      border: '1px solid #D8C3A5',
                      background: 'transparent',
                      fontSize: 12,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B4F3A'
                    }}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}
            <InputRow>
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask about Victoria Falls..."
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {open ? 'Close' : 'Concierge'}
        </ToggleButton>
      </FloatBtn>
    </>
  );
}
