import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

const Section = styled.div` margin: 2rem 0; `;
const SectionHeader = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; `;
const SectionTitle = styled.h3` font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.xl}; font-weight: 500; color: ${p => p.theme.colors.text}; `;
const WriteBtn = styled.button` padding: 0.6rem 1.25rem; background: ${p => p.theme.colors.white}; border: 1px solid ${p => p.theme.colors.primary}; color: ${p => p.theme.colors.primary}; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; cursor: pointer; transition: all 0.3s; &:hover { background: ${p => p.theme.colors.primary}; color: ${p => p.theme.colors.white}; } `;

const ReviewsSummary = styled.div` display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem; padding: 1.5rem; background: ${p => p.theme.colors.white}; border: 1px solid ${p => p.theme.colors.border}; @media(max-width: ${p => p.theme.breakpoints.mobile}) { flex-direction: column; text-align: center; } `;
const AvgScore = styled.div` text-align: center; min-width: 100px; `;
const AvgNum = styled.div` font-family: ${p => p.theme.fonts.serif}; font-size: 2.5rem; font-weight: 400; color: ${p => p.theme.colors.text}; `;
const AvgStars = styled.div` color: ${p => p.theme.colors.champagne}; font-size: 0.9rem; margin-top: 0.25rem; `;
const AvgCount = styled.div` font-size: ${p => p.theme.fontSizes.xs}; color: ${p => p.theme.colors.textMuted}; margin-top: 0.25rem; `;
const Breakdown = styled.div` flex: 1; `;
const BreakdownRow = styled.div` display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.35rem; font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; `;
const Bar = styled.div` flex: 1; height: 6px; background: ${p => p.theme.colors.borderLight}; border-radius: 3px; overflow: hidden; `;
const BarFill = styled.div` height: 100%; background: ${p => p.theme.colors.champagne}; border-radius: 3px; width: ${p => p.$pct}%; `;

const ReviewCard = styled(motion.div)` padding: 1.5rem; background: ${p => p.theme.colors.white}; border: 1px solid ${p => p.theme.colors.border}; margin-bottom: 1rem; `;
const ReviewHeader = styled.div` display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; `;
const ReviewerInfo = styled.div` display: flex; gap: 0.75rem; align-items: center; `;
const Avatar = styled.div` width: 40px; height: 40px; border-radius: 50%; background: ${p => p.theme.colors.borderLight}; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: ${p => p.theme.colors.textMuted}; font-weight: 600; background-size: cover; background-position: center; `;
const ReviewerName = styled.div` font-weight: 600; font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.text}; `;
const ReviewerMeta = styled.div` font-size: ${p => p.theme.fontSizes.xs}; color: ${p => p.theme.colors.textMuted}; `;
const ReviewStars = styled.div` color: ${p => p.theme.colors.champagne}; font-size: 0.85rem; `;
const ReviewText = styled.p` font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; line-height: 1.7; margin-top: 0.5rem; `;
const HelpfulRow = styled.div` display: flex; gap: 1rem; margin-top: 0.75rem; font-size: ${p => p.theme.fontSizes.xs}; color: ${p => p.theme.colors.textMuted}; `;
const HelpfulBtn = styled.button` background: none; border: none; font-size: ${p => p.theme.fontSizes.xs}; color: ${p => p.theme.colors.textMuted}; cursor: pointer; display: flex; align-items: center; gap: 0.25rem; &:hover { color: ${p => p.theme.colors.primary}; } `;

const ModalOverlay = styled(motion.div)` position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; `;
const Modal = styled(motion.div)` background: ${p => p.theme.colors.white}; padding: 2rem; max-width: 500px; width: 90%; `;
const ModalTitle = styled.h3` font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.xl}; font-weight: 500; margin-bottom: 1.5rem; `;
const Label = styled.label` display: block; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 500; margin-bottom: 0.35rem; margin-top: 1rem; `;
const Input = styled.textarea` width: 100%; padding: 0.75rem 1rem; border: 1px solid ${p => p.theme.colors.border}; font-size: ${p => p.theme.fontSizes.md}; font-family: ${p => p.theme.fonts.sans}; min-height: 100px; resize: vertical; &:focus { outline: none; border-color: ${p => p.theme.colors.primary}; } `;
const StarPicker = styled.div` display: flex; gap: 0.5rem; margin-top: 0.5rem; `;
const StarBtn = styled.button` background: none; border: none; font-size: 1.5rem; cursor: pointer; color: ${p => p.$active ? p.theme.colors.champagne : p.theme.colors.border}; transition: color 0.2s; `;
const BtnRow = styled.div` display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: flex-end; `;
const CancelBtn = styled.button` padding: 0.6rem 1.25rem; background: transparent; border: 1px solid ${p => p.theme.colors.border}; color: ${p => p.theme.colors.textMuted}; font-size: ${p => p.theme.fontSizes.sm}; cursor: pointer; `;
const SubmitBtn = styled.button` padding: 0.6rem 1.5rem; background: ${p => p.theme.colors.primary}; border: none; color: ${p => p.theme.colors.white}; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; cursor: pointer; `;

const REVIEWS = [
  { id: 1, name: 'Emily S.', avatar: 'ES', date: 'June 2026', rating: 5, text: 'Absolutely magical experience. The sunset cruise was breathtaking and our guide Tendai made the trip unforgettable. The booking process on VicFalls One was seamless.', helpful: 12 },
  { id: 2, name: 'James K.', avatar: 'JK', date: 'May 2026', rating: 5, text: 'Used the platform to plan our entire honeymoon — accommodation, activities, dining, even airport transfers. Everything was perfectly organised. Highly recommend!', helpful: 8 },
  { id: 3, name: 'Maria L.', avatar: 'ML', date: 'April 2026', rating: 4, text: 'Great selection of experiences and the AI concierge was surprisingly helpful for planning our itinerary. The only improvement would be more budget accommodation options.', helpful: 5 },
  { id: 4, name: 'David C.', avatar: 'DC', date: 'March 2026', rating: 5, text: 'The bungee jump booking was instant and the check-in process at the site was smooth. Love having everything in one place.', helpful: 3 },
];

const RATINGS = [5, 4, 3, 2, 1];
const MOCK_BREAKDOWN = { 5: 68, 4: 22, 3: 7, 2: 2, 1: 1 };

export default function ReviewsSection({ avgRating = 4.9, totalReviews = 127 }) {
  const [showModal, setShowModal] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [reviews] = useState(REVIEWS);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    setNewRating(0);
  };

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Reviews & Ratings</SectionTitle>
        <WriteBtn onClick={() => setShowModal(true)}>Write a Review</WriteBtn>
      </SectionHeader>

      <ReviewsSummary>
        <AvgScore>
          <AvgNum>{avgRating}</AvgNum>
          <AvgStars>{'★'.repeat(Math.round(avgRating))}</AvgStars>
          <AvgCount>{totalReviews} reviews</AvgCount>
        </AvgScore>
        <Breakdown>
          {RATINGS.map(r => (
            <BreakdownRow key={r}>
              <span style={{ minWidth: 12 }}>{r}★</span>
              <Bar><BarFill $pct={MOCK_BREAKDOWN[r]} /></Bar>
              <span style={{ minWidth: 30, textAlign: 'right' }}>{MOCK_BREAKDOWN[r]}%</span>
            </BreakdownRow>
          ))}
        </Breakdown>
      </ReviewsSummary>

      {reviews.map(r => (
        <ReviewCard key={r.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <ReviewHeader>
            <ReviewerInfo>
              <Avatar>{r.avatar}</Avatar>
              <div>
                <ReviewerName>{r.name}</ReviewerName>
                <ReviewerMeta>{r.date}</ReviewerMeta>
              </div>
            </ReviewerInfo>
            <ReviewStars>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</ReviewStars>
          </ReviewHeader>
          <ReviewText>{r.text}</ReviewText>
          <HelpfulRow>
            <HelpfulBtn><Icon name="star" /> Helpful ({r.helpful})</HelpfulBtn>
          </HelpfulRow>
        </ReviewCard>
      ))}

      <AnimatePresence>
        {showModal && (
          <ModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
            <Modal initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()}>
              <ModalTitle>Write a Review</ModalTitle>
              <Label>Your Rating</Label>
              <StarPicker>
                {[1, 2, 3, 4, 5].map(s => (
                  <StarBtn key={s} $active={s <= newRating} onClick={() => setNewRating(s)}>★</StarBtn>
                ))}
              </StarPicker>
              <Label>Your Review</Label>
              <Input placeholder="Share your experience..." />
              <BtnRow>
                <CancelBtn onClick={() => setShowModal(false)}>Cancel</CancelBtn>
                <SubmitBtn onClick={handleSubmit}>Submit Review</SubmitBtn>
              </BtnRow>
            </Modal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
}
