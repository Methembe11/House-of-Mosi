import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { destinations } from '../data/data';

const PageWrapper = styled.div`padding-top: 90px;`;

const HeroSection = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 4rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${props => props.theme.colors.white};
  font-weight: 400;
  margin-bottom: 0.75rem;
`;

const HeroSub = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: rgba(255,255,255,0.7);
  max-width: 600px;
  margin: 0 auto;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 4px;

  &:hover img { transform: scale(1.05); }
  &:hover .dest-overlay { background: rgba(31, 58, 50, 0.55); }
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(31, 58, 50, 0.7) 0%, rgba(31, 58, 50, 0.15) 50%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  transition: background 0.4s ease;
`;

const Name = styled.h2`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: ${props => props.theme.colors.white};
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 0.75rem;
`;

const PropertyCount = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function DestinationsPage() {
  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Victoria Falls Areas</HeroTitle>
        <HeroSub>Explore the different areas of Victoria Falls — from the town centre to the Zambezi riverfront.</HeroSub>
      </HeroSection>
      <Content>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid>
            {destinations.map(dest => (
              <motion.div key={dest.id} variants={cardVariants}>
                <Link to="/discover" style={{ textDecoration: 'none' }}>
                  <CardWrapper>
                    <CardImg src={dest.image} alt={dest.name} />
                    <Overlay className="dest-overlay">
                      <Name>{dest.name}</Name>
                      <Description>{dest.description}</Description>
                      <PropertyCount>{dest.propertyCount} properties</PropertyCount>
                    </Overlay>
                  </CardWrapper>
                </Link>
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      </Content>
    </PageWrapper>
  );
}
