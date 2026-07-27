import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 5rem 2rem 2rem;
`;

const FooterInner = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Brand = styled.div`
  h3 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: ${props => props.theme.fontSizes.xxl};
    color: ${props => props.theme.colors.white};
    margin-bottom: 1rem;
    font-weight: 400;

    span { font-style: italic; font-weight: 300; }
  }

  p {
    font-size: ${props => props.theme.fontSizes.sm};
    line-height: 1.8;
    opacity: 0.7;
    max-width: 320px;
  }
`;

const Column = styled.div`
  h4 {
    font-family: ${props => props.theme.fonts.sans};
    font-size: ${props => props.theme.fontSizes.xs};
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.champagne};
    font-weight: 600;
  }

  a {
    display: block;
    font-size: ${props => props.theme.fontSizes.sm};
    opacity: 0.7;
    margin-bottom: 0.75rem;
    transition: opacity 0.3s ease;

    &:hover { opacity: 1; }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255,255,255,0.1);
  margin-bottom: 2rem;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  p {
    font-size: ${props => props.theme.fontSizes.xs};
    opacity: 0.5;
  }
`;

const Regions = styled.div`
  display: flex;
  gap: 1.5rem;

  span {
    font-size: ${props => props.theme.fontSizes.xs};
    opacity: 0.5;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        <FooterGrid>
          <Brand>
            <h3>VicFalls <span>One</span></h3>
            <p>
              The all-in-one platform for Victoria Falls. We connect
              travelers with the destination's finest experiences, stays, dining, and transport.
            </p>
          </Brand>

          <Column>
            <h4>Explore</h4>
            <Link to="/discover">Discover</Link>
            <Link to="/experiences">Experiences</Link>
            <Link to="/dining">Dining</Link>
            <Link to="/transport">Transport</Link>
            <Link to="/events">Events</Link>
            <Link to="/plan">Trip Planner</Link>
          </Column>

          <Column>
            <h4>Areas</h4>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
              Victoria Falls Town · Zambezi Riverfront · Rainforest Vicinity · Batoka Gorge · Wildlife Corridor · Zambezi National Park
            </p>
            <Link to="/destinations">Explore All Areas →</Link>
          </Column>

          <Column>
            <h4>Platform</h4>
            <Link to="/collection">Your Collection</Link>
            <Link to="/plan">Trip Planner</Link>
            <Link to="/business">Business Portal</Link>
            <Link to="/dashboard">Tourism Dashboard</Link>
          </Column>
        </FooterGrid>

        <Divider />

        <Bottom>
          <p>&copy; 2026 VicFalls One by House of Mosi. All rights reserved.</p>
          <Regions>
            <span>Zimbabwe</span>
            <span>Zambia</span>
            <span>Botswana</span>
            <span>Namibia</span>
            <span>South Africa</span>
          </Regions>
        </Bottom>
      </FooterInner>
    </FooterWrapper>
  );
}
