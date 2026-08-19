import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    // Core palette — VicFalls One
    background: '#F5F1E8',
    backgroundDark: '#292722',
    backgroundAlt: '#FAF8F3',
    text: '#292722',
    textLight: '#8B8174',
    textMuted: '#8B8174',
    secondary: '#8B8174',
    accent: '#CBB89D',
    accentDeep: '#B39B76',
    primary: '#CBB89D',
    primaryDark: '#292722',
    primaryLight: '#FAF8F3',
    identity: '#46584A',
    identityLight: '#5C7060',
    white: '#FFFFFF',
    cream: '#FAF8F3',
    ivory: '#F5F1E8',
    border: '#E6DDCB',
    borderLight: '#F1EBDE',
    overlay: 'rgba(41, 39, 34, 0.82)',
    success: '#2D6A4F',
    error: '#9B2226',
    gold: '#CBB89D',
    badge: '#46584A',
    // Legacy aliases (kept for existing pages)
    cocoa: '#46584A',
    champagne: '#CBB89D',
  },
  fonts: {
    serif: "'Cormorant Garamond', 'Playfair Display', 'Georgia', serif",
    sans: "'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'IBM Plex Mono', 'Consolas', monospace",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '1.875rem',
    display: '2.5rem',
    hero: '3.5rem',
    heroLg: '4.5rem',
    title: 'clamp(2rem, 4vw, 3.5rem)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
    section: 'clamp(4rem, 8vw, 7rem)',
    gutter: 'clamp(1.25rem, 4vw, 2.5rem)',
  },
  borderRadius: {
    sm: '2px',
    md: '6px',
    lg: '12px',
    xl: '20px',
    circle: '50%',
  },
  shadows: {
    sm: '0 1px 3px rgba(41, 39, 34, 0.06)',
    md: '0 6px 18px rgba(41, 39, 34, 0.08)',
    lg: '0 16px 40px rgba(41, 39, 34, 0.12)',
    xl: '0 24px 70px rgba(41, 39, 34, 0.18)',
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.35s ease',
    slow: '0.6s ease',
    verySlow: '0.9s ease',
    cubic: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  zIndices: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
    ultraWide: '1440px',
  },
  maxWidth: '1320px',
  lineHeights: {
    tight: 1.15,
    snug: 1.3,
    normal: 1.55,
    relaxed: 1.7,
  },
};

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Manrope:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-padding-top: 88px;
  }

  body {
    font-family: ${props => props.theme.fonts.sans};
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};
    line-height: ${props => props.theme.lineHeights.relaxed};
    font-weight: 400;
    overflow-x: hidden;
    font-feature-settings: 'kern' 1;

    &::-webkit-scrollbar { width: 10px; }
    &::-webkit-scrollbar-track { background: ${props => props.theme.colors.background}; }
    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.textLight};
      border-radius: 6px;
      border: 2px solid ${props => props.theme.colors.background};
    }
    &::-webkit-scrollbar-thumb:hover { background: ${props => props.theme.colors.identity}; }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.serif};
    font-weight: 400;
    line-height: ${props => props.theme.lineHeights.tight};
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.lg};
    letter-spacing: -0.01em;
  }

  h1 { font-size: clamp(2.75rem, 6vw, 4.5rem); }
  h2 { font-size: clamp(2rem, 4vw, 3rem); }
  h3 { font-size: clamp(1.5rem, 2.5vw, 2rem); }
  h4 { font-size: clamp(1.25rem, 2vw, 1.5rem); }

  p {
    color: ${props => props.theme.colors.textLight};
    font-size: ${props => props.theme.fontSizes.md};
    line-height: 1.75;

    &:last-child { margin-bottom: 0; }
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color ${props => props.theme.transitions.fast};
  }

  button {
    font-family: ${props => props.theme.fonts.sans};
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  ::selection {
    background-color: ${props => props.theme.colors.identity};
    color: ${props => props.theme.colors.white};
  }

  .eyebrow {
    font-family: ${props => props.theme.fonts.mono};
    font-size: ${props => props.theme.fontSizes.xs};
    font-weight: 400;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.identity};
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
  }

  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes marqueePulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export default GlobalStyles;
