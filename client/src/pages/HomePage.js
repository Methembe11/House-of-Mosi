import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../components/Icon';
import { signatureJourneys } from '../data/data';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ─── SHARED ─── */
const Section = styled.section` padding:${p=>p.theme.spacing.section} 2rem; max-width:1400px; margin:0 auto; `;
const FullBleed = styled.section` padding:${p=>p.theme.spacing.section} 0; overflow:hidden; `;
const SectionHeader = styled.div` text-align:center; margin-bottom:4rem; `;
const SectionLabel = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.3em; color:${p=>p.theme.colors.cocoa}; font-weight:500; display:block; margin-bottom:1rem; `;
const SectionTitle = styled.h2` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,4vw,3.25rem); font-weight:300; color:${p=>p.theme.colors.text}; margin-bottom:1.25rem; letter-spacing:-0.01em; `;
const SectionDesc = styled.p` font-size:${p=>p.theme.fontSizes.md}; color:${p=>p.theme.colors.textLight}; max-width:520px; margin:0 auto; line-height:1.8; `;
const Divider = styled.div` width:60px; height:1px; background:${p=>p.theme.colors.champagne}; margin:0 auto 2rem; `;

/* ─── HERO ─── */
const Hero = styled.section`
  height: 100vh; min-height: 750px; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, ${p => p.theme.colors.primaryDark} 0%, ${p => p.theme.colors.primary} 40%, #1a3830 100%);
  &::before {
    content:''; position:absolute; inset:0;
    background: radial-gradient(ellipse at 20% 50%, rgba(216,195,165,0.07) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(107,79,58,0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 80%, rgba(216,195,165,0.05) 0%, transparent 40%);
  }
  &::after { content:''; position:absolute; bottom:0; left:0; right:0; height:250px; background: linear-gradient(transparent, ${p => p.theme.colors.background}); }
`;
const HeroContent = styled.div` text-align:center; position:relative; z-index:2; padding:0 2rem; max-width:880px; `;
const HeroLabel = styled(motion.div)` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.35em; color:${p=>p.theme.colors.champagne}; font-weight:500; margin-bottom:1.5rem; `;
const HeroTitle = styled(motion.h1)` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2.8rem,6.5vw,5rem); font-weight:300; color:${p=>p.theme.colors.white}; line-height:1.1; margin-bottom:1.75rem; letter-spacing:-0.01em; `;
const HeroSub = styled(motion.p)` font-size:${p=>p.theme.fontSizes.lg}; color:rgba(255,255,255,0.6); max-width:600px; margin:0 auto 3.5rem; line-height:1.8; font-weight:300; `;
const HeroCTAs = styled(motion.div)` display:flex; gap:1.25rem; justify-content:center; flex-wrap:wrap; `;
const BtnPrimary = styled(Link)` padding:1rem 3rem; background:${p=>p.theme.colors.champagne}; color:${p=>p.theme.colors.primaryDark}; font-size:${p=>p.theme.fontSizes.sm}; font-weight:600; text-transform:uppercase; letter-spacing:0.12em; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); &:hover{ background:${p=>p.theme.colors.white}; transform:translateY(-2px); box-shadow:0 8px 30px rgba(0,0,0,0.15); } `;
const BtnOutline = styled(Link)` padding:1rem 3rem; background:transparent; color:${p=>p.theme.colors.white}; border:1px solid rgba(255,255,255,0.3); font-size:${p=>p.theme.fontSizes.sm}; font-weight:500; text-transform:uppercase; letter-spacing:0.12em; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); &:hover{ background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.5); transform:translateY(-2px); } `;
const HeroScroll = styled(motion.div)` position:absolute; bottom:3rem; left:50%; transform:translateX(-50%); z-index:3; color:rgba(255,255,255,0.4); font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.2em; display:flex; flex-direction:column; align-items:center; gap:0.75rem; `;
const ScrollLine = styled.div` width:1px; height:40px; background:linear-gradient(transparent, rgba(255,255,255,0.4)); `;

/* ─── WHY VICTORIA FALLS ─── */
const WhySection = styled.section` padding:0; `;
const WhyGrid = styled.div` display:grid; grid-template-columns:1fr 1fr; min-height:500px; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:1fr; } `;
const WhyImage = styled.div` position:relative; overflow:hidden; img{ width:100%; height:100%; object-fit:cover; display:block; min-height:500px; @media(max-width:${p=>p.theme.breakpoints.tablet}){ min-height:350px; } } `;
const WhyContent = styled.div` display:flex; flex-direction:column; justify-content:center; padding:4rem 3.5rem; background:${p=>p.theme.colors.cream}; @media(max-width:${p=>p.theme.breakpoints.tablet}){ padding:3rem 2rem; } `;
const WhyLabel = styled.div` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.3em; color:${p=>p.theme.colors.cocoa}; font-weight:500; margin-bottom:1.5rem; display:flex; align-items:center; gap:1rem; &::before{ content:''; width:40px; height:1px; background:${p=>p.theme.colors.cocoa}; } `;
const WhyTitle = styled.h2` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,3.5vw,3rem); font-weight:300; color:${p=>p.theme.colors.text}; line-height:1.15; margin-bottom:1.5rem; `;
const WhyDesc = styled.p` font-size:${p=>p.theme.fontSizes.md}; color:${p=>p.theme.colors.textLight}; line-height:1.9; margin-bottom:2.5rem; max-width:480px; `;
const WhyList = styled.div` display:flex; flex-direction:column; gap:1.25rem; `;
const WhyItem = styled(motion.div)` display:flex; gap:1.25rem; align-items:flex-start; `;
const WhyItemIcon = styled.div` flex-shrink:0; width:44px; height:44px; background:${p=>p.theme.colors.primary}; color:${p=>p.theme.colors.white}; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:all 0.3s; ${WhyItem}:hover &{ background:${p=>p.theme.colors.cocoa}; } `;
const WhyItemTitle = styled.h4` font-family:${p=>p.theme.fonts.serif}; font-size:${p=>p.theme.fontSizes.lg}; font-weight:500; color:${p=>p.theme.colors.text}; margin-bottom:0.15rem; `;
const WhyItemText = styled.p` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textMuted}; line-height:1.6; `;

/* ─── VALUE PROPS ─── */
const ValueGrid = styled.div` display:grid; grid-template-columns:repeat(4,1fr); gap:2rem; @media(max-width:${p=>p.theme.breakpoints.desktop}){ grid-template-columns:repeat(2,1fr); } @media(max-width:${p=>p.theme.breakpoints.mobile}){ grid-template-columns:1fr; } `;
const ValueCard = styled.div` text-align:center; padding:3rem 2rem; background:${p=>p.theme.colors.white}; border:1px solid ${p=>p.theme.colors.borderLight}; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); &:hover{ box-shadow:${p=>p.theme.shadows.xl}; transform:translateY(-6px); border-color:transparent; } `;
const ValueIcon = styled.div` width:72px; height:72px; background:${p=>p.theme.colors.primary}; color:${p=>p.theme.colors.white}; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem; border-radius:50%; transition:all 0.4s; ${ValueCard}:hover &{ background:${p=>p.theme.colors.cocoa}; } `;
const ValueTitle = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:${p=>p.theme.fontSizes.xxl}; font-weight:500; color:${p=>p.theme.colors.text}; margin-bottom:0.75rem; `;
const ValueText = styled.p` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textLight}; line-height:1.8; `;

/* ─── HANDPICKED STAYS ─── */
const StaysScroll = styled.div` display:flex; gap:2rem; padding:0 2rem; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scrollbar-width:none; &::-webkit-scrollbar{display:none;} `;
const StayCard = styled(Link)` flex:0 0 380px; scroll-snap-align:start; background:${p=>p.theme.colors.white}; border:1px solid ${p=>p.theme.colors.borderLight}; overflow:hidden; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); display:block; text-decoration:none; color:inherit; &:hover{ box-shadow:${p=>p.theme.shadows.lg}; transform:translateY(-4px); border-color:transparent; .stayimg img{transform:scale(1.05);} } `;
const StayImg = styled.div` height:260px; overflow:hidden; position:relative; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.6s cubic-bezier(0.22,1,0.36,1); } `;
const StayBadge = styled.div` position:absolute; top:1rem; left:1rem; padding:0.35rem 0.75rem; background:rgba(0,0,0,0.5); backdrop-filter:blur(4px); color:white; font-size:0.7rem; text-transform:uppercase; letter-spacing:0.1em; font-weight:500; `;
const StayBody = styled.div` padding:1.75rem; `;
const StayCategory = styled.div` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.15em; color:${p=>p.theme.colors.cocoa}; font-weight:500; margin-bottom:0.5rem; `;
const StayName = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:1.35rem; font-weight:500; color:${p=>p.theme.colors.text}; margin-bottom:0.75rem; line-height:1.3; `;
const StayMeta = styled.div` display:flex; align-items:center; gap:1rem; margin-bottom:1rem; font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textMuted}; `;
const StayRating = styled.span` color:${p=>p.theme.colors.gold}; font-weight:600; `;
const StayPriceRow = styled.div` display:flex; justify-content:space-between; align-items:center; padding-top:1rem; border-top:1px solid ${p=>p.theme.colors.borderLight}; `;
const StayPrice = styled.div` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textLight}; span{ font-size:${p=>p.theme.fontSizes.xl}; font-weight:600; color:${p=>p.theme.colors.text}; } `;
const StayCTA = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600; color:${p=>p.theme.colors.primary}; transition:color 0.3s; ${StayCard}:hover &{ color:${p=>p.theme.colors.cocoa}; } `;

/* ─── BANNER ─── */
const BannerSection = styled.section` position:relative; height:75vh; min-height:550px; overflow:hidden; background:${p=>p.theme.colors.primaryDark}; `;
const BannerSlide = styled.div` position:absolute; inset:0; opacity:${p=>p.$active?1:0}; transition:opacity 1.2s cubic-bezier(0.4,0,0.2,1); pointer-events:${p=>p.$active?'auto':'none'}; `;
const BannerImg = styled.div` position:absolute; inset:0; img{ width:100%; height:100%; object-fit:cover; transition:transform 8s linear; ${p=>p.$active && css`img{ transform:scale(1.08); }`} } `;
const BannerOverlay = styled.div` position:absolute; inset:0; background:linear-gradient(135deg, rgba(21,42,36,0.82) 0%, rgba(31,58,50,0.55) 50%, rgba(21,42,36,0.75) 100%); `;
const BannerContent = styled.div` position:relative; z-index:2; height:100%; display:flex; flex-direction:column; justify-content:center; padding:0 8%; max-width:1400px; margin:0 auto; `;
const BannerTag = styled(motion.div)` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.35em; color:${p=>p.theme.colors.champagne}; font-weight:500; margin-bottom:1.25rem; display:flex; align-items:center; gap:1rem; &::before{ content:''; width:40px; height:1px; background:${p=>p.theme.colors.champagne}; } `;
const BannerTitle = styled(motion.h2)` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,4.5vw,3.75rem); font-weight:300; color:${p=>p.theme.colors.white}; line-height:1.15; margin-bottom:1.25rem; max-width:600px; `;
const BannerDesc = styled(motion.p)` font-size:${p=>p.theme.fontSizes.md}; color:rgba(255,255,255,0.7); max-width:480px; line-height:1.8; margin-bottom:2.5rem; `;
const BannerCTA = styled(motion(Link))` display:inline-flex; align-items:center; gap:0.75rem; padding:1rem 2.5rem; background:transparent; border:1px solid rgba(255,255,255,0.3); color:${p=>p.theme.colors.white}; font-size:${p=>p.theme.fontSizes.sm}; font-weight:500; text-transform:uppercase; letter-spacing:0.1em; transition:all 0.4s; width:fit-content; text-decoration:none; &:hover{ background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.5); } `;
const BannerControls = styled.div` position:absolute; bottom:3rem; left:50%; transform:translateX(-50%); z-index:5; display:flex; align-items:center; gap:1.5rem; `;
const BannerDot = styled.button` width:${p=>p.$active?'32px':'8px'}; height:8px; border-radius:4px; background:${p=>p.$active?p.theme.colors.champagne:'rgba(255,255,255,0.3)'}; border:none; cursor:pointer; transition:all 0.4s; padding:0; &:hover{ background:rgba(255,255,255,0.6); } `;
const BannerCounter = styled.div` position:absolute; top:3rem; right:4rem; z-index:5; font-family:${p=>p.theme.fonts.serif}; font-size:${p=>p.theme.fontSizes.xl}; color:rgba(255,255,255,0.5); font-weight:300; `;
const BannerArrow = styled.button` position:absolute; top:50%; ${p=>p.$left?'left:2rem;':'right:2rem;'} transform:translateY(-50%); z-index:5; width:48px; height:48px; border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.2); backdrop-filter:blur(4px); color:white; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.3s; opacity:0; ${BannerSection}:hover &{ opacity:1; } &:hover{ background:rgba(255,255,255,0.15); border-color:rgba(255,255,255,0.4); } `;
const PlatformIconStrip = styled.div` position:absolute; bottom:6rem; left:0; right:0; z-index:5; display:flex; justify-content:center; gap:2.5rem; opacity:0.4; transition:opacity 0.3s; ${BannerSection}:hover &{ opacity:0.7; } `;
const PlatformIconItem = styled(Link)` display:flex; flex-direction:column; align-items:center; gap:0.5rem; color:rgba(255,255,255,0.8); text-decoration:none; font-size:0.65rem; text-transform:uppercase; letter-spacing:0.1em; transition:all 0.3s; &:hover{ color:${p=>p.theme.colors.champagne}; } ${p=>p.$active && css` color:${p=>p.theme.colors.champagne}; `} `;

/* ─── JOURNEYS ─── */
const JourneyScroll = styled.div` display:flex; gap:2rem; padding:0 2rem; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scrollbar-width:none; &::-webkit-scrollbar{display:none;} `;
const JourneyCard = styled(Link)` flex:0 0 360px; scroll-snap-align:start; position:relative; height:480px; overflow:hidden; display:block; border-radius:2px; text-decoration:none; &:hover .jimg img{transform:scale(1.06);} &:hover .joverlay{opacity:1;} `;
const JImg = styled.div` position:absolute; inset:0; background:${p=>p.theme.colors.primary}; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.7s cubic-bezier(0.22,1,0.36,1); } `;
const JOverlay = styled.div` position:absolute; inset:0; background:linear-gradient(transparent 35%, rgba(21,42,36,0.93)); display:flex; flex-direction:column; justify-content:flex-end; padding:2.5rem; transition:opacity 0.3s; `;
const JTag = styled.span` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.25em; color:${p=>p.theme.colors.champagne}; margin-bottom:0.5rem; font-weight:500; `;
const JName = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:1.65rem; color:${p=>p.theme.colors.white}; font-weight:400; margin-bottom:0.75rem; line-height:1.25; `;
const JMeta = styled.div` display:flex; align-items:center; gap:1rem; font-size:${p=>p.theme.fontSizes.sm}; color:rgba(255,255,255,0.6); `;
const JPrice = styled.span` color:${p=>p.theme.colors.champagne}; font-weight:600; `;

/* ─── INTERACTIVE MAP ─── */
const MapSection = styled.section` background:${p=>p.theme.colors.cream}; padding:${p=>p.theme.spacing.section} 0; `;
const MapInner = styled.div` max-width:1400px; margin:0 auto; padding:0 2rem; `;
const MapLayout = styled.div` display:grid; grid-template-columns:1.3fr 1fr; gap:3rem; align-items:start; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:1fr; } `;
const MapCanvas = styled.div` position:relative; background:${p=>p.theme.colors.primary}; border-radius:4px; overflow:hidden; aspect-ratio:4/3; `;
const MapSvg = styled.div` position:absolute; inset:0; display:flex; align-items:center; justify-content:center; `;
const MapPin = styled.button` position:absolute; width:${p=>p.$active?'18px':'14px'}; height:${p=>p.$active?'18px':'14px'}; border-radius:50%; background:${p=>p.$active?p.theme.colors.champagne:p.theme.colors.white}; border:2px solid ${p=>p.theme.colors.primary}; cursor:pointer; transition:all 0.3s; z-index:${p=>p.$active?3:2}; transform:translate(-50%,-50%); ${p=>p.$active && css` box-shadow:0 0 0 6px rgba(216,195,165,0.3); `} &:hover{ transform:translate(-50%,-50%) scale(1.2); } `;
const MapPinLabel = styled.div` position:absolute; bottom:calc(100% + 8px); left:50%; transform:translateX(-50%); white-space:nowrap; font-size:0.65rem; text-transform:uppercase; letter-spacing:0.08em; color:${p=>p.theme.colors.white}; background:${p=>p.theme.colors.primary}; padding:0.25rem 0.6rem; opacity:${p=>p.$active?1:0}; transition:opacity 0.3s; pointer-events:none; `;
const MapInfo = styled.div` background:${p=>p.theme.colors.white}; border:1px solid ${p=>p.theme.colors.borderLight}; padding:2rem; `;
const MapInfoCategory = styled.div` font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.15em; color:${p=>p.theme.colors.cocoa}; font-weight:500; margin-bottom:0.5rem; `;
const MapInfoName = styled.h3` font-family:${p=>p.theme.fonts.serif}; font-size:1.5rem; font-weight:500; color:${p=>p.theme.colors.text}; margin-bottom:0.5rem; `;
const MapInfoRating = styled.div` color:${p=>p.theme.colors.gold}; font-size:${p=>p.theme.fontSizes.sm}; margin-bottom:0.75rem; `;
const MapInfoDesc = styled.p` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textLight}; line-height:1.7; margin-bottom:1.25rem; `;
const MapInfoPrice = styled.div` font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textMuted}; margin-bottom:1.25rem; span{ font-size:${p=>p.theme.fontSizes.xl}; font-weight:600; color:${p=>p.theme.colors.text}; } `;
const MapInfoBtn = styled(Link)` display:inline-flex; align-items:center; gap:0.5rem; padding:0.75rem 1.5rem; background:${p=>p.theme.colors.primary}; color:${p=>p.theme.colors.white}; font-size:${p=>p.theme.fontSizes.sm}; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; text-decoration:none; transition:all 0.3s; &:hover{ background:${p=>p.theme.colors.primaryDark}; } `;
const MapPinsList = styled.div` display:flex; flex-direction:column; gap:0.5rem; margin-top:1.5rem; `;
const MapPinBtn = styled.button` display:flex; align-items:center; gap:0.75rem; padding:0.75rem 1rem; background:${p=>p.$active?p.theme.colors.primary:'transparent'}; color:${p=>p.$active?p.theme.colors.white:p.theme.colors.text}; border:1px solid ${p=>p.$active?p.theme.colors.primary:p.theme.colors.borderLight}; text-align:left; cursor:pointer; transition:all 0.3s; font-size:${p=>p.theme.fontSizes.sm}; font-family:${p=>p.theme.fonts.sans}; &:hover{ border-color:${p=>p.theme.colors.primary}; } `;
const PinDot = styled.span` width:8px; height:8px; border-radius:50%; flex-shrink:0; background:${p=>p.$active?p.theme.colors.champagne:p.theme.colors.primary}; `;

/* ─── GUIDES ─── */
const GuidesGrid = styled.div` display:grid; grid-template-columns:repeat(4,1fr); gap:1.75rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:repeat(2,1fr); } @media(max-width:${p=>p.theme.breakpoints.mobile}){ grid-template-columns:1fr; } `;
const GuideCard = styled(Link)` display:block; background:${p=>p.theme.colors.white}; overflow:hidden; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); text-decoration:none; color:inherit; &:hover{ box-shadow:${p=>p.theme.shadows.md}; .gimg img{transform:scale(1.04);} } `;
const GCardImg = styled.div` height:220px; overflow:hidden; background:${p=>p.theme.colors.backgroundAlt}; img{ width:100%; height:100%; object-fit:cover; transition:transform 0.6s cubic-bezier(0.22,1,0.36,1); } `;
const GCardBody = styled.div` padding:1.5rem; .cat{ font-size:${p=>p.theme.fontSizes.xs}; text-transform:uppercase; letter-spacing:0.15em; color:${p=>p.theme.colors.cocoa}; font-weight:500; margin-bottom:0.5rem; } h3{ font-family:${p=>p.theme.fonts.serif}; font-size:1.15rem; font-weight:500; margin-bottom:0.5rem; line-height:1.3; color:${p=>p.theme.colors.text}; } p{ font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textLight}; line-height:1.7; } `;

/* ─── SOCIAL PROOF ─── */
const ProofSection = styled.div` background:${p=>p.theme.colors.cream}; padding:${p=>p.theme.spacing.section} 0; `;
const ProofInner = styled.div` max-width:1400px; margin:0 auto; padding:0 2rem; `;
const ProofGrid = styled.div` display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; @media(max-width:${p=>p.theme.breakpoints.tablet}){ grid-template-columns:1fr; } `;
const ProofCard = styled.div` background:${p=>p.theme.colors.white}; padding:2.75rem; border-left:3px solid ${p=>p.theme.colors.champagne}; `;
const ProofQuote = styled.p` font-family:${p=>p.theme.fonts.serif}; font-size:${p=>p.theme.fontSizes.xl}; color:${p=>p.theme.colors.text}; line-height:1.7; font-style:italic; margin-bottom:1.75rem; font-weight:400; `;
const ProofAuthor = styled.div` .name{ font-weight:600; color:${p=>p.theme.colors.text}; font-size:${p=>p.theme.fontSizes.md}; } .trip{ font-size:${p=>p.theme.fontSizes.sm}; color:${p=>p.theme.colors.textMuted}; margin-top:0.25rem; } `;

/* ─── FINAL CTA ─── */
const FinalCTA = styled.section` position:relative; height:60vh; min-height:450px; display:flex; align-items:center; justify-content:center; text-align:center; overflow:hidden; `;
const FinalCTABg = styled.div` position:absolute; inset:0; img{ width:100%; height:100%; object-fit:cover; } `;
const FinalCTAOverlay = styled.div` position:absolute; inset:0; background:linear-gradient(135deg, rgba(21,42,36,0.85), rgba(31,58,50,0.7)); `;
const FinalCTAContent = styled.div` position:relative; z-index:2; padding:2rem; `;
const FinalCTATitle = styled.h2` font-family:${p=>p.theme.fonts.serif}; font-size:clamp(2rem,5vw,3.5rem); font-weight:300; color:${p=>p.theme.colors.white}; margin-bottom:2.5rem; line-height:1.2; `;
const FinalCTAButtons = styled.div` display:flex; gap:1.25rem; justify-content:center; flex-wrap:wrap; `;

/* ─── DATA ─── */
const WHY_FEATURES = [
  { icon: 'compass', title: 'UNESCO World Heritage Site', text: 'One of the Seven Natural Wonders of the World.' },
  { icon: 'sun', title: 'Wildlife Corridors', text: 'Connecting Zambezi National Park and beyond.' },
  { icon: 'mountain', title: 'Adventure Capital', text: 'Bungee, rafting, helicopter flights, and more.' },
  { icon: 'pool', title: 'Luxury Meets Wilderness', text: 'World-class lodges in pristine settings.' },
];

const FEATURED_STAYS = [
  { id: 'acc-1', slug: 'the-victoria-falls-hotel', category: 'Heritage Hotel', name: 'The Victoria Falls Hotel', rating: 9.1, reviews: 251, price: 577, image: 'https://www.victoriafallshotel.com/data/files/1.jpg' },
  { id: 'acc-2', slug: 'victoria-falls-safari-lodge', category: 'Safari Lodge', name: 'Victoria Falls Safari Lodge', rating: 9.0, reviews: 432, price: 418, image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80' },
  { id: 'acc-3', slug: 'anantara-stanley-livingstone', category: 'Boutique Hotel', name: 'Anantara Stanley & Livingstone', rating: 9.2, reviews: 24, price: 400, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80' },
  { id: 'acc-7', slug: 'ilala-lodge-hotel', category: 'Lodge', name: 'Ilala Lodge Hotel', rating: 8.8, reviews: 2200, price: 150, image: 'https://www.ilalalodge.com/wp-content/uploads/2022/08/Ilala-Lodge-Hotel-and-pools-ILH.jpeg' },
];

const BANNER_SLIDES = [
  { title: 'Discover Victoria Falls', desc: 'Explore the Smoke That Thunders — from misty rainforests to the legendary Victoria Falls Bridge.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=80', to: '/discover', icon: 'compass' },
  { title: 'Curated Experiences', desc: 'Helicopter flights, sunset cruises, white-water rafting, and bush walks with world-class guides.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80', to: '/experiences', icon: 'sun' },
  { title: 'World-Class Dining', desc: 'Bush dinners under the stars, fine dining at historic hotels, and authentic local cuisine.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80', to: '/dining', icon: 'dining' },
  { title: 'Seamless Transport', desc: 'Airport transfers, private drivers, and guided transfers across Victoria Falls.', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=80', to: '/transport', icon: 'car' },
  { title: 'Unforgettable Events', desc: 'Live entertainment, cultural festivals, and exclusive private events throughout the year.', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80', to: '/events', icon: 'ticket' },
  { title: 'Build Your Journey', desc: 'AI-powered trip planning — tell us your style and we\'ll craft the perfect Victoria Falls itinerary.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80', to: '/plan', icon: 'mapPin' },
];

const MAP_PINS = [
  { id: 'falls', name: 'Victoria Falls', x: '35%', y: '42%', category: 'Natural Wonder', desc: 'The main falls — 1.7km of cascading water, 108m drop. The Smoke That Thunders.', rating: null, price: null, to: '/discover' },
  { id: 'hotel', name: 'The Victoria Falls Hotel', x: '52%', y: '35%', category: 'Heritage Hotel', desc: 'Iconic Edwardian elegance since 1904. Views of the bridge and gorge.', rating: '★ 9.1 · 251 reviews', price: 'From $577 / night', to: '/stays/the-victoria-falls-hotel' },
  { id: 'safari', name: 'Victoria Falls Safari Lodge', x: '68%', y: '55%', category: 'Safari Lodge', desc: 'Perched on a ridge overlooking a wildlife waterhole. 500 acres of wilderness.', rating: '★ 9.0 · 432 reviews', price: 'From $418 / night', to: '/stays/victoria-falls-safari-lodge' },
  { id: 'bridge', name: 'Victoria Falls Bridge', x: '40%', y: '55%', category: 'Landmark', desc: 'Bungee, zip-line, and bridge tours with canyon views. Built in 1905.', rating: null, price: null, to: '/experiences' },
  { id: 'town', name: 'Victoria Falls Town', x: '55%', y: '48%', category: 'Town Centre', desc: 'Shops, restaurants, markets, and the gateway to all activities.', rating: null, price: null, to: '/dining' },
  { id: 'national-park', name: 'Zambezi National Park', x: '25%', y: '30%', category: 'National Park', desc: 'Wildlife-rich park stretching along the Zambezi. Big game, birdlife, and river cruises.', rating: null, price: null, to: '/experiences' },
];

const GUIDE_DATA = [
  { title: 'First Time in Victoria Falls', slug: 'first-time', excerpt: 'Everything you need to know for your first visit to the Smoke That Thunders.', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80' },
  { title: '48 Hours in Victoria Falls', slug: '48-hours', excerpt: 'A perfectly packed two-day itinerary for the time-conscious traveler.', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80' },
  { title: 'Best Sunset Spots', slug: 'best-sunset-spots', excerpt: 'Where to watch the most spectacular sunsets in Victoria Falls.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80' },
  { title: 'Family Adventure Guide', slug: 'family-adventure', excerpt: 'The best family-friendly activities and stays for your Victoria Falls trip.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80' },
];

const PROOF_DATA = [
  { quote: 'VicFalls One made our honeymoon effortless. The helicopter flight over the falls at sunrise was the highlight of our lives.', name: 'Sarah & James', trip: '5-Day Honeymoon Journey' },
  { quote: 'We had no idea Victoria Falls had this level of luxury. Having everything in one platform saved us so much time.', name: 'The Chen Family', trip: '4-Day Family Discovery' },
  { quote: 'From the sunset cruise to the bush dinner under the stars — every moment was perfectly curated.', name: 'Amara & Kofi', trip: '3-Day Romantic Retreat' },
];

/* ─── COMPONENT ─── */
export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activePin, setActivePin] = useState(MAP_PINS[0]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % BANNER_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <>
      {/* ─── 1. HERO ─── */}
      <Hero>
        <HeroContent>
          <HeroLabel initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.3}}>
            Victoria Falls, Zimbabwe
          </HeroLabel>
          <HeroTitle initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.5}}>
            One Platform.<br />Every Experience.
          </HeroTitle>
          <HeroSub initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.8}}>
            Discover, book, and experience the world's greatest natural wonder — all from a single, beautifully crafted platform.
          </HeroSub>
          <HeroCTAs initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:1.1}}>
            <BtnPrimary to="/discover">Begin Your Journey</BtnPrimary>
            <BtnOutline to="/plan">Plan My Trip</BtnOutline>
          </HeroCTAs>
        </HeroContent>
        <HeroScroll initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8,duration:0.8}}>
          Scroll
          <ScrollLine />
        </HeroScroll>
      </Hero>

      {/* ─── 2. WHY VICTORIA FALLS ─── */}
      <WhySection>
        <WhyGrid>
          <WhyImage>
            <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85" alt="Victoria Falls" />
          </WhyImage>
          <WhyContent>
            <WhyLabel>Why Victoria Falls</WhyLabel>
            <WhyTitle>A Wonder of the World,<br />A Playground for the Soul</WhyTitle>
            <WhyDesc>
              Victoria Falls is not just a destination — it's an experience that transforms you.
              Where the mighty Zambezi plunges into the Batoka Gorge, nature reveals its most dramatic spectacle.
              This is where luxury meets wilderness.
            </WhyDesc>
            <WhyList>
              {WHY_FEATURES.map((f, i) => (
                <WhyItem key={i} initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.1}}>
                  <WhyItemIcon><Icon name={f.icon} size={20} /></WhyItemIcon>
                  <div>
                    <WhyItemTitle>{f.title}</WhyItemTitle>
                    <WhyItemText>{f.text}</WhyItemText>
                  </div>
                </WhyItem>
              ))}
            </WhyList>
          </WhyContent>
        </WhyGrid>
      </WhySection>

      {/* ─── 3. WHAT IS VFCALLS ONE ─── */}
      <Section>
        <SectionHeader>
          <SectionLabel>What is VicFalls One?</SectionLabel>
          <Divider />
          <SectionTitle>Everything You Need, One Platform</SectionTitle>
          <SectionDesc>The all-in-one platform connecting travellers with the finest of Victoria Falls.</SectionDesc>
        </SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}} variants={stagger}>
          <ValueGrid>
            {[
              { icon: 'compass', title: 'Discover', text: 'Find attractions, events, restaurants, and hidden gems curated by locals.' },
              { icon: 'calendar', title: 'Book', text: 'Secure experiences, transport, dining, and accommodations instantly.' },
              { icon: 'mountain', title: 'Plan', text: 'Build personalized itineraries powered by AI and local expertise.' },
              { icon: 'binoculars', title: 'Experience', text: 'Navigate Victoria Falls with everything in one beautifully designed place.' },
            ].map((v, i) => (
              <motion.div key={i} variants={fadeUp}>
                <ValueCard>
                  <ValueIcon><Icon name={v.icon} size={28} /></ValueIcon>
                  <ValueTitle>{v.title}</ValueTitle>
                  <ValueText>{v.text}</ValueText>
                </ValueCard>
              </motion.div>
            ))}
          </ValueGrid>
        </motion.div>
      </Section>

      {/* ─── 4. HANDPICKED STAYS ─── */}
      <FullBleed>
        <SectionHeader style={{padding:'0 2rem'}}>
          <SectionLabel>Exceptional Places to Stay</SectionLabel>
          <Divider />
          <SectionTitle>Handpicked Properties</SectionTitle>
          <SectionDesc>Where you rest matters. These are the stays we'd choose ourselves.</SectionDesc>
        </SectionHeader>
        <StaysScroll>
          {FEATURED_STAYS.map(s => (
            <StayCard key={s.id} to={`/stays/${s.slug}`}>
              <StayImg className="stayimg">
                <img src={s.image} alt={s.name} loading="lazy" />
                <StayBadge>{s.category}</StayBadge>
              </StayImg>
              <StayBody>
                <StayCategory>{s.category}</StayCategory>
                <StayName>{s.name}</StayName>
                <StayMeta>
                  <StayRating>★ {s.rating}</StayRating>
                  <span>· {s.reviews.toLocaleString()} reviews</span>
                </StayMeta>
                <StayPriceRow>
                  <StayPrice>From <span>${s.price}</span> / night</StayPrice>
                  <StayCTA>Explore Stay →</StayCTA>
                </StayPriceRow>
              </StayBody>
            </StayCard>
          ))}
        </StaysScroll>
      </FullBleed>

      {/* ─── 5. VISITOR PLATFORM BANNER ─── */}
      <BannerSection
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {BANNER_SLIDES.map((slide, i) => (
          <BannerSlide key={i} $active={i === currentSlide}>
            <BannerImg $active={i === currentSlide}>
              <img src={slide.image} alt={slide.title} />
            </BannerImg>
            <BannerOverlay />
          </BannerSlide>
        ))}

        <BannerContent>
          <BannerTag key={`tag-${currentSlide}`} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.6,delay:0.2}}>
            Your Victoria Falls Companion
          </BannerTag>
          <BannerTitle key={`title-${currentSlide}`} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.3}}>
            {BANNER_SLIDES[currentSlide].title}
          </BannerTitle>
          <BannerDesc key={`desc-${currentSlide}`} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.5}}>
            {BANNER_SLIDES[currentSlide].desc}
          </BannerDesc>
          <BannerCTA key={`cta-${currentSlide}`} to={BANNER_SLIDES[currentSlide].to} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.7}}>
            Explore <Icon name="arrow" size={16} />
          </BannerCTA>
        </BannerContent>

        <BannerCounter>
          {String(currentSlide + 1).padStart(2, '0')} / {String(BANNER_SLIDES.length).padStart(2, '0')}
        </BannerCounter>

        <BannerArrow $left onClick={prevSlide}>&#8592;</BannerArrow>
        <BannerArrow onClick={nextSlide}>&#8594;</BannerArrow>

        <PlatformIconStrip>
          {BANNER_SLIDES.map((slide, i) => (
            <PlatformIconItem key={i} to={slide.to} $active={i === currentSlide}>
              <Icon name={slide.icon} size={16} />
              {slide.title.split(' ').pop()}
            </PlatformIconItem>
          ))}
        </PlatformIconStrip>

        <BannerControls>
          {BANNER_SLIDES.map((_, i) => (
            <BannerDot key={i} $active={i === currentSlide} onClick={() => setCurrentSlide(i)} />
          ))}
        </BannerControls>
      </BannerSection>

      {/* ─── 6. SIGNATURE JOURNEYS ─── */}
      <FullBleed>
        <SectionHeader style={{padding:'0 2rem'}}>
          <SectionLabel>Signature Journeys</SectionLabel>
          <Divider />
          <SectionTitle>Trips You'll Dream About</SectionTitle>
          <SectionDesc>Curated multi-day experiences — each one a complete Victoria Falls story.</SectionDesc>
        </SectionHeader>
        <JourneyScroll>
          {signatureJourneys.map(j => (
            <JourneyCard key={j.id} to="/plan">
              <JImg className="jimg"><img src={j.images[0]} alt={j.name} loading="lazy" /></JImg>
              <JOverlay className="joverlay">
                <JTag>{j.duration}</JTag>
                <JName>{j.name}</JName>
                <JMeta>
                  <JPrice>From ${j.priceFrom.toLocaleString()}</JPrice>
                  <span>{j.priceUnit}</span>
                </JMeta>
              </JOverlay>
            </JourneyCard>
          ))}
        </JourneyScroll>
      </FullBleed>

      {/* ─── 7. INTERACTIVE MAP ─── */}
      <MapSection>
        <MapInner>
          <SectionHeader>
            <SectionLabel>Explore the Region</SectionLabel>
            <Divider />
            <SectionTitle>Interactive Map</SectionTitle>
            <SectionDesc>Discover key locations across Victoria Falls and the surrounding area.</SectionDesc>
          </SectionHeader>
          <MapLayout>
            <MapCanvas>
              <MapSvg>
                <svg viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
                  <rect width="600" height="450" fill="#1F3A32"/>
                  <path d="M0 200 Q80 180 150 220 Q220 260 300 240 Q380 220 450 250 Q520 280 600 260 L600 450 L0 450Z" fill="#2A4F43" opacity="0.5"/>
                  <path d="M0 280 Q100 260 200 290 Q300 320 400 290 Q500 260 600 280 L600 450 L0 450Z" fill="#1F3A32" opacity="0.3"/>
                  <path d="M280 100 Q290 150 285 200 Q280 250 290 300 Q300 350 295 400" stroke="rgba(216,195,165,0.3)" strokeWidth="3" strokeDasharray="8 4"/>
                  <path d="M100 150 Q150 180 200 170 Q250 160 300 180 Q350 200 400 190 Q450 180 500 200" stroke="rgba(216,195,165,0.15)" strokeWidth="2"/>
                  <circle cx="210" cy="190" r="40" fill="rgba(216,195,165,0.08)" stroke="rgba(216,195,165,0.15)" strokeWidth="1"/>
                  <circle cx="410" cy="250" r="25" fill="rgba(216,195,165,0.06)" stroke="rgba(216,195,165,0.1)" strokeWidth="1"/>
                  <text x="300" y="20" textAnchor="middle" fill="rgba(216,195,165,0.25)" fontSize="10" fontFamily="Inter" letterSpacing="0.15em">ZAMBEZI RIVER</text>
                  <text x="150" y="380" textAnchor="middle" fill="rgba(216,195,165,0.15)" fontSize="9" fontFamily="Inter" letterSpacing="0.1em">ZAMBEZI NATIONAL PARK</text>
                </svg>
              </MapSvg>
              {MAP_PINS.map(pin => (
                <MapPin
                  key={pin.id}
                  style={{ left: pin.x, top: pin.y }}
                  $active={activePin.id === pin.id}
                  onClick={() => setActivePin(pin)}
                >
                  <MapPinLabel $active={activePin.id === pin.id}>{pin.name}</MapPinLabel>
                </MapPin>
              ))}
            </MapCanvas>
            <div>
              <AnimatePresence mode="wait">
                <MapInfo key={activePin.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.3}}>
                  <MapInfoCategory>{activePin.category}</MapInfoCategory>
                  <MapInfoName>{activePin.name}</MapInfoName>
                  {activePin.rating && <MapInfoRating>{activePin.rating}</MapInfoRating>}
                  <MapInfoDesc>{activePin.desc}</MapInfoDesc>
                  {activePin.price && <MapInfoPrice><span>{activePin.price}</span></MapInfoPrice>}
                  <MapInfoBtn to={activePin.to}>Explore <Icon name="arrow" size={14} /></MapInfoBtn>
                </MapInfo>
              </AnimatePresence>
              <MapPinsList>
                {MAP_PINS.map(pin => (
                  <MapPinBtn key={pin.id} $active={activePin.id === pin.id} onClick={() => setActivePin(pin)}>
                    <PinDot $active={activePin.id === pin.id} />
                    {pin.name}
                  </MapPinBtn>
                ))}
              </MapPinsList>
            </div>
          </MapLayout>
        </MapInner>
      </MapSection>

      {/* ─── 8. GUIDES & STORIES ─── */}
      <Section>
        <SectionHeader>
          <SectionLabel>Guides & Stories</SectionLabel>
          <Divider />
          <SectionTitle>Plan Your Perfect Trip</SectionTitle>
          <SectionDesc>Insider knowledge from the heart of Victoria Falls.</SectionDesc>
        </SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}} variants={stagger}>
          <GuidesGrid>
            {GUIDE_DATA.map((g, i) => (
              <motion.div key={i} variants={fadeUp}>
                <GuideCard to={`/journal/${g.slug}`}>
                  <GCardImg className="gimg"><img src={g.image} alt={g.title} loading="lazy" /></GCardImg>
                  <GCardBody>
                    <div className="cat">Travel Guide</div>
                    <h3>{g.title}</h3>
                    <p>{g.excerpt}</p>
                  </GCardBody>
                </GuideCard>
              </motion.div>
            ))}
          </GuidesGrid>
        </motion.div>
      </Section>

      {/* ─── 9. SOCIAL PROOF ─── */}
      <ProofSection>
        <ProofInner>
          <SectionHeader>
            <SectionLabel>Recent Journeys</SectionLabel>
            <Divider />
            <SectionTitle>Guest Experiences</SectionTitle>
          </SectionHeader>
          <ProofGrid>
            {PROOF_DATA.map((p, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
                <ProofCard>
                  <ProofQuote>"{p.quote}"</ProofQuote>
                  <ProofAuthor>
                    <div className="name">{p.name}</div>
                    <div className="trip">{p.trip}</div>
                  </ProofAuthor>
                </ProofCard>
              </motion.div>
            ))}
          </ProofGrid>
        </ProofInner>
      </ProofSection>

      {/* ─── 10. FINAL CTA ─── */}
      <FinalCTA>
        <FinalCTABg>
          <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1800&q=85" alt="Victoria Falls" />
        </FinalCTABg>
        <FinalCTAOverlay />
        <FinalCTAContent>
          <FinalCTATitle>Your Victoria Falls Journey<br/>Starts Here</FinalCTATitle>
          <FinalCTAButtons>
            <BtnPrimary to="/plan">Plan My Trip</BtnPrimary>
            <BtnOutline to="/discover">Explore Victoria Falls</BtnOutline>
          </FinalCTAButtons>
        </FinalCTAContent>
      </FinalCTA>
    </>
  );
}
