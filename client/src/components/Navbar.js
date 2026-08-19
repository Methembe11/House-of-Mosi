import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  {
    label: 'Visit',
    to: '/visit',
    items: [
      { label: 'Visitor Guide', to: '/visit' },
      { label: 'Weather & Seasons', to: '/visit#seasons' },
      { label: 'Maps & Getting Around', to: '/visit#maps' },
      { label: 'Local Deals', to: '/visit#deals' },
      { label: 'Emergency Contacts', to: '/visit#emergency' },
      { label: 'Plan an Itinerary', to: '/plan' },
    ],
  },
  {
    label: 'Stay',
    to: '/stays',
    items: [
      { label: 'All Stays', to: '/stays' },
      { label: 'Hotels', to: '/stays', filterValue: 'Hotel' },
      { label: 'Safari Lodges', to: '/stays', filterValue: 'Safari Lodge' },
      { label: 'Resorts', to: '/stays', filterValue: 'Resort' },
      { label: 'Guest Houses', to: '/stays', filterValue: 'Guest Lodge' },
      { label: 'Villas', to: '/stays', filterValue: 'Lodge' },
    ],
  },
  {
    label: 'Experience',
    to: '/experiences',
    items: [
      { label: 'All Experiences', to: '/experiences' },
      { label: 'Falls Activities', to: '/experiences', filterValue: 'Aerial' },
      { label: 'Safari & Wildlife', to: '/experiences', filterValue: 'Wildlife' },
      { label: 'Water Adventures', to: '/experiences', filterValue: 'Water' },
      { label: 'Helicopter Flights', to: '/experiences', filterValue: 'Aerial' },
    ],
  },
  {
    label: 'Eat',
    to: '/dining',
    items: [
      { label: 'All Restaurants', to: '/dining' },
      { label: 'Fine Dining', to: '/dining', filterValue: 'Fine Dining' },
      { label: 'Local Cuisine', to: '/dining', filterValue: 'Local Cuisine' },
      { label: 'Bush Dinners', to: '/dining', filterValue: 'Conservation' },
      { label: 'Sunset & River Views', to: '/dining', filterValue: 'Nature' },
    ],
  },
  {
    label: 'Move',
    to: '/transport',
    items: [
      { label: 'Airport Transfers', to: '/transport' },
      { label: 'Hotel Transfers', to: '/transport' },
      { label: 'Private Driver', to: '/transport' },
      { label: 'Shuttle Services', to: '/transport' },
    ],
  },
  {
    label: 'Events',
    to: '/events',
    items: [
      { label: 'Festivals', to: '/events', filterValue: 'Festivals' },
      { label: 'Conferences', to: '/events', filterValue: 'Conferences' },
      { label: 'Live Entertainment', to: '/events', filterValue: 'Live Entertainment' },
      { label: 'Cultural Events', to: '/events', filterValue: 'Cultural' },
    ],
  },
  {
    label: 'Discover',
    to: '/discover',
    items: [
      { label: 'The Destination', to: '/discover' },
      { label: 'History & Culture', to: '/discover' },
      { label: 'Wildlife & Seasons', to: '/discover' },
      { label: 'Local Guides', to: '/journal' },
      { label: 'Neighbourhoods', to: '/destinations' },
    ],
  },
];

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndices.sticky};
  background: ${props => props.$scrolled ? 'rgba(250, 248, 243, 0.96)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(18px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.$scrolled ? 'blur(18px)' : 'none'};
  transition: all ${props => props.theme.transitions.slow} ${props => props.theme.transitions.cubic};
  border-bottom: ${props => props.$scrolled ? '1px solid rgba(203, 184, 157, 0.35)' : '1px solid transparent'};
`;

const NavInner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.gutter};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${props => props.$scrolled ? '64px' : '84px'};
  transition: height ${props => props.theme.transitions.slow} ${props => props.theme.transitions.cubic};
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.serif};
  font-size: 1.4rem;
  font-weight: 500;
  color: ${props => props.$scrolled ? props.theme.colors.text : props.theme.colors.white};
  letter-spacing: 0.02em;
  transition: color ${props => props.theme.transitions.fast};
  flex-shrink: 0;
  display: flex;
  align-items: baseline;
  gap: 0.45rem;

  em {
    font-style: normal;
    font-family: ${props => props.theme.fonts.mono};
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${props => props.$scrolled ? props.theme.colors.identity : props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 1.75rem;
  height: 100%;

  @media (max-width: ${props => props.theme.breakpoints.wide}) {
    gap: 1.15rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: none;
  }
`;

const LinkItem = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavLinkBtn = styled(Link)`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${props => props.$scrolled
    ? (props.$active ? props.theme.colors.identity : props.theme.colors.textLight)
    : (props.$active ? props.theme.colors.accent : 'rgba(250, 248, 243, 0.78)')};
  padding: 0.4rem 0;
  position: relative;
  transition: color ${props => props.theme.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 1px;
    background: ${props => props.$scrolled ? props.theme.colors.identity : props.theme.colors.accent};
    transform: scaleX(${props => props.$active ? 1 : 0});
    transform-origin: left;
    transition: transform ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};
  }

  &:hover {
    color: ${props => props.$scrolled ? props.theme.colors.identity : props.theme.colors.white};
    &::after { transform: scaleX(1); }
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 2px;
  }
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% - 6px);
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.theme.colors.backgroundDark};
  border: 1px solid rgba(203, 184, 157, 0.18);
  padding: 1.75rem 0;
  min-width: 280px;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 28px;
    height: 1px;
    background: ${props => props.theme.colors.accent};
  }
`;

const DropdownLabel = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accent};
  padding: 0 1.75rem 0.9rem;
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 0.55rem 1.75rem;
  font-family: ${props => props.theme.fonts.serif};
  font-size: 1.05rem;
  color: rgba(250, 248, 243, 0.82);
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.accent};
    padding-left: 2.1rem;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    gap: 1rem;
  }
`;

const IconLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  color: ${props => props.$scrolled ? props.theme.colors.textLight : 'rgba(250,248,243,0.8)'};
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.$scrolled ? props.theme.colors.identity : props.theme.colors.white};
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -7px;
    background: ${props => props.theme.colors.identity};
    color: ${props => props.theme.colors.white};
    font-size: 9px;
    font-weight: 600;
    min-width: 15px;
    height: 15px;
    padding: 0 3px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PlanBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.62rem 1.35rem;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 400;
  transition: all ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};

  ${props => props.$scrolled ? `
    background: ${props.theme.colors.identity};
    color: ${props.theme.colors.white};
    &:hover { background: ${props.theme.colors.text}; transform: translateY(-2px); box-shadow: ${props.theme.shadows.md}; }
  ` : `
    background: rgba(250,248,243,0.1);
    color: ${props.theme.colors.white};
    border: 1px solid rgba(250,248,243,0.35);
    backdrop-filter: blur(8px);
    &:hover { background: ${props.theme.colors.white}; color: ${props.theme.colors.text}; border-color: ${props.theme.colors.white}; }
  `}

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 10px;
  z-index: ${props => props.theme.zIndices.sticky};

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: flex;
  }

  span {
    width: 24px;
    height: 1.5px;
    background: ${props => props.$scrolled ? props.theme.colors.text : props.theme.colors.white};
    transition: all ${props => props.theme.transitions.normal};
    display: block;
  }
`;

const MobileDrawer = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${props => props.theme.colors.backgroundDark};
  z-index: ${props => props.theme.zIndices.modal};
  padding: 5.5rem ${props => props.theme.spacing.gutter} 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  color: ${props => props.theme.colors.white};
  font-size: 2.25rem;
  font-weight: 200;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
`;

const MobileGroup = styled.div`
  border-bottom: 1px solid rgba(203, 184, 157, 0.14);
  padding: 0.9rem 0;
`;

const MobileGroupTitle = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${props => props.theme.fonts.serif};
  font-size: 1.6rem;
  color: ${props => props.theme.colors.white};
  padding: 0.4rem 0;

  span {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.3em;
    color: ${props => props.theme.colors.accent};
  }
`;

const MobileSubLink = styled(Link)`
  display: block;
  padding: 0.5rem 0 0.5rem 1rem;
  font-size: 0.95rem;
  color: rgba(250, 248, 243, 0.65);
  font-family: ${props => props.theme.fonts.sans};
`;

const MobileBottom = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

function isActive(pathname, to) {
  if (to === '/discover') return pathname === '/discover';
  if (to === '/visit') return pathname.startsWith('/visit');
  if (to === '/events') return pathname.startsWith('/events');
  return pathname.startsWith(to);
}

export default function Navbar({ collectionCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const location = useLocation();
  const timer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const openMenu = (label) => {
    clearTimeout(timer.current);
    setHovered(label);
  };

  const closeMenu = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setHovered(null), 180);
  };

  const isHome = location.pathname === '/';
  const navScrolled = scrolled || !isHome;

  return (
    <>
      <Nav $scrolled={navScrolled}>
        <NavInner $scrolled={navScrolled}>
          <Logo to="/" $scrolled={navScrolled}>
            VicFalls<em>One</em>
          </Logo>

          <Links>
            {NAV.map(item => (
              <LinkItem key={item.label} onMouseEnter={() => openMenu(item.label)} onMouseLeave={closeMenu}>
                <NavLinkBtn
                  to={item.to}
                  $scrolled={navScrolled}
                  $active={isActive(location.pathname, item.to)}
                >
                  {item.label}
                </NavLinkBtn>
                <AnimatePresence>
                  {hovered === item.label && (
                    <Dropdown
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <DropdownLabel>{item.label} / {item.label.toLowerCase()}-vf1</DropdownLabel>
                      {item.items.map(sub => (
                        <DropdownLink
                          key={sub.label}
                          to={sub.filterValue ? `${sub.to}?category=${encodeURIComponent(sub.filterValue)}` : sub.to}
                          onClick={() => setHovered(null)}
                        >
                          {sub.label}
                        </DropdownLink>
                      ))}
                    </Dropdown>
                  )}
                </AnimatePresence>
              </LinkItem>
            ))}
          </Links>

          <Right>
            <IconLink to="/collection" $scrolled={navScrolled} aria-label="Your collection">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {collectionCount > 0 && <span className="badge">{collectionCount}</span>}
            </IconLink>
            <IconLink to="/auth" $scrolled={navScrolled} aria-label="Account" style={{ display: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </IconLink>
            <PlanBtn to="/plan" $scrolled={navScrolled}>Plan Journey</PlanBtn>
            <Hamburger $scrolled={navScrolled} onClick={() => setMobileOpen(true)} aria-label="Open navigation">
              <span /><span /><span />
            </Hamburger>
          </Right>
        </NavInner>
      </Nav>

      <AnimatePresence>
        {mobileOpen && (
          <MobileDrawer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <CloseBtn onClick={() => setMobileOpen(false)} aria-label="Close navigation">&times;</CloseBtn>
            {NAV.map(item => (
              <MobileGroup key={item.label}>
                <MobileGroupTitle to={item.to}>
                  {item.label}
                  <span>{String(item.to).slice(1)}</span>
                </MobileGroupTitle>
                {item.items.slice(1, 4).map(sub => (
                  <MobileSubLink key={sub.label} to={sub.to}>{sub.label}</MobileSubLink>
                ))}
              </MobileGroup>
            ))}
            <MobileBottom>
              <PlanBtn to="/plan" $scrolled={true} style={{ width: '100%', justifyContent: 'center' }}>
                Plan Journey with AI
              </PlanBtn>
              <MobileSubLink to="/business" style={{ color: 'rgba(250,248,243,0.5)', textAlign: 'center' }}>
                Business Portal
              </MobileSubLink>
            </MobileBottom>
          </MobileDrawer>
        )}
      </AnimatePresence>
    </>
  );
}
