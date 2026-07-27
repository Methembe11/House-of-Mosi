import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageWrapper = styled.div` padding-top: 90px; min-height: 100vh; background: ${p => p.theme.colors.background}; display: flex; align-items: center; justify-content: center; `;
const Container = styled(motion.div)` text-align: center; padding: 4rem 2rem; max-width: 500px; `;
const ErrorCode = styled.div` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(5rem, 15vw, 10rem); font-weight: 400; color: ${p => p.theme.colors.primary}; line-height: 1; margin-bottom: 1rem; opacity: 0.3; `;
const Title = styled.h1` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 400; color: ${p => p.theme.colors.text}; margin-bottom: 0.75rem; `;
const Text = styled.p` font-size: ${p => p.theme.fontSizes.md}; color: ${p => p.theme.colors.textMuted}; line-height: 1.6; margin-bottom: 2rem; `;
const HomeBtn = styled(Link)` display: inline-block; padding: 0.85rem 2.5rem; background: ${p => p.theme.colors.primary}; color: ${p => p.theme.colors.white}; text-decoration: none; font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; transition: all 0.3s; &:hover { background: ${p => p.theme.colors.primaryDark}; } `;

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <Container initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Text>The page you're looking for doesn't exist or has been moved. Let's get you back on track.</Text>
        <HomeBtn to="/">Back to Home</HomeBtn>
      </Container>
    </PageWrapper>
  );
}
