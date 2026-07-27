import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageWrapper = styled.div` padding-top: 90px; `;

const Header = styled.div` background: ${p => p.theme.colors.primary}; padding: 3rem 2rem; text-align: center; color: ${p => p.theme.colors.white}; `;

const HeaderTitle = styled.h1` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 400; margin-bottom: 0.5rem; `;

const HeaderSub = styled.p` font-size: ${p => p.theme.fontSizes.md}; opacity: 0.7; `;

const Content = styled.div` max-width: 1400px; margin: 0 auto; padding: 2.5rem 2rem; `;

const StatsGrid = styled.div` display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2.5rem; @media(max-width: ${p => p.theme.breakpoints.desktop}) { grid-template-columns: repeat(2, 1fr); } @media(max-width: ${p => p.theme.breakpoints.mobile}) { grid-template-columns: 1fr; } `;

const StatCard = styled.div` background: ${p => p.theme.colors.white}; padding: 1.5rem; border: 1px solid ${p => p.theme.colors.border}; border-left: 3px solid ${p => p.$color || p.theme.colors.primary}; .label { font-size: ${p => p.theme.fontSizes.xs}; text-transform: uppercase; letter-spacing: 0.1em; color: ${p => p.theme.colors.textMuted}; margin-bottom: 0.5rem; } .value { font-family: ${p => p.theme.fonts.serif}; font-size: 2rem; font-weight: 500; color: ${p => p.theme.colors.text}; } .sub { font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; margin-top: 0.25rem; } `;

const ChartsRow = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: 1fr; } `;

const ChartCard = styled.div` background: ${p => p.theme.colors.white}; padding: 1.5rem; border: 1px solid ${p => p.theme.colors.border}; h3 { font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.xl}; font-weight: 500; margin-bottom: 1.5rem; } `;

const BarChart = styled.div` display: flex; align-items: flex-end; gap: 0.75rem; height: 180px; padding-top: 1rem; `;

const Bar = styled.div` flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; `;

const BarFill = styled.div` width: 100%; background: ${p => p.$color || p.theme.colors.primary}; border-radius: 2px 2px 0 0; transition: height 0.5s ease; min-height: 4px; `;

const BarLabel = styled.div` font-size: 11px; color: ${p => p.theme.colors.textMuted}; margin-top: 0.5rem; text-align: center; `;

const BarValue = styled.div` font-size: 11px; font-weight: 600; color: ${p => p.theme.colors.text}; margin-bottom: 0.25rem; `;

const ProgressBar = styled.div` margin-bottom: 1rem; .header { display: flex; justify-content: space-between; margin-bottom: 0.35rem; } .label { font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.text}; } .value { font-size: ${p => p.theme.fontSizes.sm}; font-weight: 600; color: ${p => p.theme.colors.text}; } .track { height: 8px; background: ${p => p.theme.colors.backgroundAlt}; border-radius: 4px; overflow: hidden; } .fill { height: 100%; background: ${p => p.$color || p.theme.colors.primary}; border-radius: 4px; transition: width 0.6s ease; } `;

const InfoGrid = styled.div` display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2.5rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: 1fr; } `;

const InfoCard = styled.div` background: ${p => p.theme.colors.white}; padding: 1.5rem; border: 1px solid ${p => p.theme.colors.border}; h4 { font-size: ${p => p.theme.fontSizes.xs}; text-transform: uppercase; letter-spacing: 0.1em; color: ${p => p.theme.colors.textMuted}; margin-bottom: 0.75rem; } .value { font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.xxl}; font-weight: 500; color: ${p => p.theme.colors.text}; margin-bottom: 0.5rem; } .detail { font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textLight}; line-height: 1.6; } `;

const SeasonGrid = styled.div` display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: repeat(2, 1fr); } @media(max-width: ${p => p.theme.breakpoints.mobile}) { grid-template-columns: 1fr; } `;

const SeasonCard = styled.div` background: ${p => p.theme.colors.white}; padding: 1.5rem; border: 1px solid ${p => p.theme.colors.border}; text-align: center; .season { font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.xl}; font-weight: 500; color: ${p => p.theme.colors.text}; margin-bottom: 0.5rem; } .months { font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textMuted}; margin-bottom: 0.75rem; } .demand { display: inline-block; padding: 0.25rem 0.75rem; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; background: ${p => p.$high ? '#e8f5e9' : p.$med ? '#fff3e0' : '#e3f2fd'}; color: ${p => p.$high ? '#2d6a4f' : p.$med ? '#e65100' : '#1565c0'}; } `;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const MONTHLY_DATA = [
  { month: 'Feb', value: 8200, color: '#B8B0A5' },
  { month: 'Mar', value: 9800, color: '#B8B0A5' },
  { month: 'Apr', value: 10500, color: '#B8B0A5' },
  { month: 'May', value: 12847, color: '#1F3A32' },
  { month: 'Jun', value: 11200, color: '#B8B0A5' },
  { month: 'Jul', value: 9500, color: '#B8B0A5' },
];

const CATEGORIES = [
  { name: 'Experiences', value: 85, color: '#1F3A32' },
  { name: 'Stays', value: 78, color: '#2A4F43' },
  { name: 'Dining', value: 62, color: '#6B4F3A' },
  { name: 'Transport', value: 45, color: '#D8C3A5' },
  { name: 'Events', value: 38, color: '#B8B0A5' },
];

const SEASONS = [
  { name: 'Summer', months: 'Nov - Mar', demand: 'Moderate', high: false, med: true },
  { name: 'Autumn', months: 'Apr - May', demand: 'High', high: true, med: false },
  { name: 'Winter', months: 'Jun - Aug', demand: 'Peak', high: true, med: false },
  { name: 'Spring', months: 'Sep - Oct', demand: 'Moderate', high: false, med: true },
];

const maxMonthly = Math.max(...MONTHLY_DATA.map(d => d.value));

export default function TourismDashboard() {
  return (
    <PageWrapper>
      <Header>
        <HeaderTitle>Tourism Authority Dashboard</HeaderTitle>
        <HeaderSub>Real-time insights for Victoria Falls tourism</HeaderSub>
      </Header>

      <Content>
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <StatsGrid>
            <motion.div variants={fadeUp}><StatCard $color="#1F3A32"><div className="label">Tourist Arrivals</div><div className="value">12,847</div><div className="sub">This month</div></StatCard></motion.div>
            <motion.div variants={fadeUp}><StatCard $color="#6B4F3A"><div className="label">Popular Attraction</div><div className="value">Victoria Falls</div><div className="sub">4,230 visitors</div></StatCard></motion.div>
            <motion.div variants={fadeUp}><StatCard $color="#D8C3A5"><div className="label">Average Spend</div><div className="value">$385</div><div className="sub">Per visitor</div></StatCard></motion.div>
            <motion.div variants={fadeUp}><StatCard $color="#2A4F43"><div className="label">Active Businesses</div><div className="value">248</div><div className="sub">12 new this month</div></StatCard></motion.div>
          </StatsGrid>

          <ChartsRow>
            <motion.div variants={fadeUp}>
              <ChartCard>
                <h3>Monthly Arrivals</h3>
                <BarChart>
                  {MONTHLY_DATA.map(d => (
                    <Bar key={d.month}>
                      <BarValue>{(d.value / 1000).toFixed(1)}k</BarValue>
                      <BarFill $color={d.color} style={{ height: `${(d.value / maxMonthly) * 100}%` }} />
                      <BarLabel>{d.month}</BarLabel>
                    </Bar>
                  ))}
                </BarChart>
              </ChartCard>
            </motion.div>
            <motion.div variants={fadeUp}>
              <ChartCard>
                <h3>Popular Categories</h3>
                {CATEGORIES.map(c => (
                  <ProgressBar key={c.name} $color={c.color}>
                    <div className="header"><span className="label">{c.name}</span><span className="value">{c.value}%</span></div>
                    <div className="track"><div className="fill" style={{ width: `${c.value}%` }} /></div>
                  </ProgressBar>
                ))}
              </ChartCard>
            </motion.div>
          </ChartsRow>

          <InfoGrid>
            <motion.div variants={fadeUp}>
              <InfoCard><h4>Peak Season</h4><div className="value">May — October</div><div className="detail">Dry season with best wildlife viewing and ideal conditions for outdoor activities.</div></InfoCard>
            </motion.div>
            <motion.div variants={fadeUp}>
              <InfoCard><h4>Average Stay</h4><div className="value">3.2 Days</div><div className="detail">Visitors typically stay 3-4 nights, with weekend getaways being most common.</div></InfoCard>
            </motion.div>
            <motion.div variants={fadeUp}>
              <InfoCard><h4>Top Source Markets</h4><div className="value">UK, Germany, USA</div><div className="detail">Followed by Australia and South Africa. European visitors account for 45% of arrivals.</div></InfoCard>
            </motion.div>
          </InfoGrid>

          <ChartCard style={{ marginBottom: '2.5rem' }}>
            <h3>Seasonal Demand</h3>
            <SeasonGrid>
              {SEASONS.map(s => (
                <SeasonCard key={s.name} $high={s.high} $med={s.med}>
                  <div className="season">{s.name}</div>
                  <div className="months">{s.months}</div>
                  <span className="demand">{s.demand}</span>
                </SeasonCard>
              ))}
            </SeasonGrid>
          </ChartCard>
        </motion.div>
      </Content>
    </PageWrapper>
  );
}
