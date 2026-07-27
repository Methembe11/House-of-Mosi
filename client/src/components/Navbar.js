import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.$scrolled ? 'rgba(247, 243, 234, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(20px)' : 'none'};
  transition: all 0.4s ease;
  border-bottom: ${props => props.$scrolled ? '1px solid rgba(216, 195, 165, 0.3)' : '1px solid transparent'};
`;

const NavInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${props => props.$scrolled ? '64px' : '80px'};
  transition: height 0.4s ease;
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: 500;
  color: ${props => props.$scrolled ? props.theme.colors.text : props.theme.colors.white};
  letter-spacing: 0.02em;
  transition: color 0.4s ease;
  flex-shrink: 0;

  span {
    font-weight: 300;
    font-style: italic;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${props => props.$active
    ? (props.$scrolled ? props.theme.colors.primary : props.theme.colors.white)
    : (props.$scrolled ? props.theme.colors.textLight : 'rgba(255,255,255,0.75)')
  };
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  padding: 0.25rem 0;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: ${props => props.$scrolled ? props.theme.colors.primary : props.theme.colors.white};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${props => props.$scrolled ? props.theme.colors.primary : props.theme.colors.white};
    &::after { width: 100%; }
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: none;
  }
`;

const CollectionIcon = styled(Link)`
  position: relative;
  color: ${props => props.$scrolled ? props.theme.colors.textLight : 'rgba(255,255,255,0.75)'};
  transition: color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: ${props => props.$scrolled ? props.theme.colors.primary : props.theme.colors.white};
  }

  .badge {
    position: absolute;
    top: -6px;
    right: -8px;
    background: ${props => props.theme.colors.cocoa};
    color: ${props => props.theme.colors.white};
    font-size: 9px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
`;

const PlanBtn = styled(Link)`
  background: ${props => props.$scrolled ? props.theme.colors.primary : 'rgba(255,255,255,0.15)'};
  color: ${props => props.theme.colors.white};
  padding: 0.4rem 1rem;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid ${props => props.$scrolled ? 'transparent' : 'rgba(255,255,255,0.3)'};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$scrolled ? props.theme.colors.primaryDark : 'rgba(255,255,255,0.25)'};
  }
`;

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: flex;
  }

  span {
    width: 22px;
    height: 2px;
    background: ${props => props.$scrolled ? props.theme.colors.text : props.theme.colors.white};
    transition: all 0.3s ease;
    display: block;
  }
`;

const MobileOverlay = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: ${props => props.$open ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.primary};
    z-index: 999;
    padding: 5rem 2rem 2rem;
    flex-direction: column;
  }
`;

const MobileLink = styled(Link)`
  display: block;
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.white};
  opacity: 0.9;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  transition: opacity 0.3s ease;

  &:hover { opacity: 1; }
`;

const MobilePlanBtn = styled(Link)`
  display: block;
  margin-top: 2rem;
  padding: 0.9rem 1.5rem;
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  text-align: center;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;

  &:hover { opacity: 0.9; }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  color: ${props => props.theme.colors.white};
  font-size: 1.75rem;
  font-weight: 300;
  cursor: pointer;
  background: none;
  border: none;
`;

const NAV_ITEMS = [
  { to: '/discover', label: 'Discover' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/dining', label: 'Dining' },
  { to: '/transport', label: 'Transport' },
  { to: '/events', label: 'Events' },
  { to: '/journal', label: 'Guides' },
];

function isActive(pathname, to) {
  if (to === '/discover') return pathname === '/discover';
  return pathname.startsWith(to);
}

export default function Navbar({ collectionCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isHome = location.pathname === '/';
  const navScrolled = scrolled || !isHome;

  return (
    <>
      <Nav $scrolled={navScrolled}>
        <NavInner $scrolled={navScrolled}>
          <Logo to="/" $scrolled={navScrolled}>
            VicFalls <span>One</span>
          </Logo>

          <NavLinks>
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                $scrolled={navScrolled}
                $active={isActive(location.pathname, item.to)}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>

          <NavRight>
            <CollectionIcon to="/collection" $scrolled={navScrolled} aria-label="Collection">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {collectionCount > 0 && <span className="badge">{collectionCount}</span>}
            </CollectionIcon>
            <PlanBtn to="/plan" $scrolled={navScrolled}>Plan Journey</PlanBtn>
            <PlanBtn to="/auth" $scrolled={navScrolled}>Sign In</PlanBtn>
          </NavRight>

          <Hamburger $scrolled={navScrolled} onClick={() => setMobileOpen(true)} aria-label="Open navigation menu" aria-expanded={mobileOpen}>
            <span /><span /><span />
          </Hamburger>
        </NavInner>
      </Nav>

      <MobileOverlay $open={mobileOpen}>
        <CloseBtn onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">&times;</CloseBtn>
        {NAV_ITEMS.map(item => (
          <MobileLink key={item.to} to={item.to}>{item.label}</MobileLink>
        ))}
        <MobileLink to="/about">About</MobileLink>
        <MobileLink to="/contact">Contact</MobileLink>
        <MobileLink to="/auth">Sign In</MobileLink>
        <MobileLink to="/profile">My Account</MobileLink>
        <MobilePlanBtn to="/plan">Plan Your Journey</MobilePlanBtn>
      </MobileOverlay>
    </>
  );
}
