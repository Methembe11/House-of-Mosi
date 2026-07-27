import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#1F3A32',
    primaryLight: '#2A4F43',
    primaryDark: '#152A24',
    background: '#F7F3EA',
    backgroundAlt: '#F0EBE0',
    champagne: '#D8C3A5',
    stone: '#B8B0A5',
    cocoa: '#6B4F3A',
    cocoaLight: '#8A6B52',
    text: '#332B25',
    textLight: '#6B6259',
    textMuted: '#9A928A',
    white: '#FFFFFF',
    border: '#E5DDD0',
    borderLight: '#EDE7DB',
    overlay: 'rgba(31, 58, 50, 0.7)',
    success: '#2D6A4F',
    error: '#9B2226',
    gold: '#B8860B',
    cream: '#FAF6ED',
    ivory: '#FFFFF0',
  },
  fonts: {
    serif: "'Cormorant Garamond', 'Georgia', serif",
    sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '2rem',
    display: '2.5rem',
    hero: '3.5rem',
    heroLg: '4.5rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
    section: '6rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  shadows: {
    sm: '0 1px 3px rgba(51, 43, 37, 0.06)',
    md: '0 4px 12px rgba(51, 43, 37, 0.08)',
    lg: '0 8px 30px rgba(51, 43, 37, 0.1)',
    xl: '0 16px 50px rgba(51, 43, 37, 0.12)',
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    verySlow: '0.8s ease',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
    ultraWide: '1440px',
  },
  maxWidth: '1320px',
};

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.fonts.sans};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    line-height: 1.6;
    font-weight: 400;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.serif};
    font-weight: 500;
    line-height: 1.2;
    color: ${theme.colors.text};
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color ${theme.transitions.fast};
  }

  button {
    font-family: ${theme.fonts.sans};
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  input, textarea, select {
    font-family: ${theme.fonts.sans};
    font-size: ${theme.fontSizes.md};
    outline: none;
  }

  ::selection {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.stone};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.cocoa};
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

export default GlobalStyles;
