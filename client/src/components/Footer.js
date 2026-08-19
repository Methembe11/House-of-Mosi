import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.footer`
  background: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors.white};
  padding: 5rem 0 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.accent}, transparent);
    opacity: 0.4;
  }
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.gutter};
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const Brand = styled.div`
  h3 {
    font-family: ${props => props.theme.fonts.serif};
    font-size: 1.8rem;
    font-weight: 400;
    color: ${props => props.theme.colors.white};
    margin-bottom: 0.4rem;

    em {
      font-style: normal;
      font-family: ${props => props.theme.fonts.mono};
      font-size: 0.65rem;
      letter-spacing: 0.3em;
      color: ${props => props.theme.colors.accent};
      margin-left: 0.4rem;
    }
  }

  p {
    font-size: ${props => props.theme.fontSizes.sm};
    color: rgba(250, 248, 243, 0.55);
    line-height: 1.9;
    max-width: 340px;
    margin-bottom: 1.5rem;
  }
`;

const Tag = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accent};
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;

  &::before {
    content: '';
    width: 2rem;
    height: 1px;
    background: ${props => props.theme.colors.accent};
    opacity: 0.6;
  }
`;

const Column = styled.div`
  h4 {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.accent};
    margin-bottom: 1.5rem;
  }

  a {
    display: block;
    font-size: ${props => props.theme.fontSizes.sm};
    color: rgba(250, 248, 243, 0.6);
    margin-bottom: 0.8rem;
    transition: all ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.white};
      padding-left: 4px;
    }
  }
`;

const Bottom = styled.div`
  border-top: 1px solid rgba(250, 248, 243, 0.08);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  p {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.12em;
    color: rgba(250, 248, 243, 0.35);
    text-transform: uppercase;
  }
`;

const Regions = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;

  span {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.15em;
    color: rgba(250, 248, 243, 0.35);
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <Inner>
        <Top>
          <Brand>
            <h3>VicFalls<em>One</em></h3>
            <Tag>The Digital Operating System of Victoria Falls</Tag>
            <p>
              One platform for the entire destination — where to stay, what to do, what's on,
              how to move, and who to call. Plan a journey, run a business, or discover the
              Smoke That Thunders.
            </p>
          </Brand>

          <Column>
            <h4>Plan</h4>
            <Link to="/visit">Visitor Guide</Link>
            <Link to="/plan">Plan a Journey</Link>
            <Link to="/collection">Your Collection</Link>
            <Link to="/events">What's On</Link>
            <Link to="/journal">Local Guides</Link>
          </Column>

          <Column>
            <h4>Explore</h4>
            <Link to="/stays">Stay</Link>
            <Link to="/experiences">Experience</Link>
            <Link to="/dining">Eat</Link>
            <Link to="/transport">Move</Link>
            <Link to="/destinations">Areas & Maps</Link>
          </Column>

          <Column>
            <h4>Discover</h4>
            <Link to="/discover">The Destination</Link>
            <Link to="/discover">History & Culture</Link>
            <Link to="/discover">Wildlife & Seasons</Link>
            <Link to="/journal">Travel Guides</Link>
            <Link to="/about">About Us</Link>
          </Column>

          <Column>
            <h4>Business</h4>
            <Link to="/business">Business Portal</Link>
            <Link to="/dashboard">Tourism Dashboard</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/auth">Sign In</Link>
          </Column>
        </Top>

        <Bottom>
          <p>&copy; 2026 VicFalls One. The digital front door to Victoria Falls.</p>
          <Regions>
            <span>Zimbabwe</span>
            <span>Zambia</span>
            <span>Botswana</span>
            <span>Namibia</span>
            <span>South Africa</span>
          </Regions>
        </Bottom>
      </Inner>
    </Wrapper>
  );
}
