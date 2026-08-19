import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '../components/Icon';

const PageWrapper = styled.div`
  padding-top: 90px;
  min-height: 100vh;
  display: flex;
  background: ${p => p.theme.colors.ivory};
`;

const Sidebar = styled.aside`
  width: 270px;
  background: ${p => p.theme.colors.backgroundDark};
  color: ${p => p.theme.colors.white};
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 90px;
  bottom: 0;
  left: 0;
  z-index: 50;

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    display: ${p => p.$mobileOpen ? 'flex' : 'none'};
    width: 100%;
  }
`;

const SidebarLogo = styled.div`
  padding: 0 1.75rem 2rem;
  border-bottom: 1px solid rgba(203, 184, 157, 0.2);

  h3 {
    font-family: ${p => p.theme.fonts.serif};
    font-size: ${p => p.theme.fontSizes.xl};
    font-weight: 300;
    margin-bottom: 0.35rem;
  }

  span { color: ${p => p.theme.colors.accent}; font-style: italic; }

  .tag {
    font-family: ${p => p.theme.fonts.mono};
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${p => p.theme.colors.textLight};
  }
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: 1.25rem 0;
`;

const SidebarItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.8rem 1.75rem;
  background: ${p => p.$active ? 'rgba(203,184,157,0.12)' : 'transparent'};
  color: ${p => p.$active ? p.theme.colors.accent : 'rgba(250,248,243,0.65)'};
  border: none;
  cursor: pointer;
  font-size: ${p => p.theme.fontSizes.sm};
  font-family: ${p => p.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.25s;
  border-left: 2px solid ${p => p.$active ? p.theme.colors.accent : 'transparent'};

  svg { width: 16px; height: 16px; opacity: 0.8; }

  &:hover { background: rgba(203,184,157,0.07); color: ${p => p.theme.colors.white}; }
`;

const Main = styled.main`
  flex: 1;
  margin-left: 270px;
  padding: 2.5rem 3rem;

  @media (max-width: ${p => p.theme.breakpoints.tablet}) { margin-left: 0; }
`;

const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: 100px;
  left: 1rem;
  z-index: 60;
  padding: 0.5rem 0.8rem;
  background: ${p => p.theme.colors.text};
  color: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.accent};
  font-size: 1.25rem;

  @media (max-width: ${p => p.theme.breakpoints.tablet}) { display: block; }
`;

const PageHeader = styled.div`
  margin-bottom: 2.25rem;

  .eyebrow {
    font-family: ${p => p.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${p => p.theme.colors.accentDeep};
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.9rem;

    &::before {
      content: '';
      width: 2.25rem;
      height: 1px;
      background: ${p => p.theme.colors.accent};
    }
  }

  h1 {
    font-family: ${p => p.theme.fonts.serif};
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 300;
    color: ${p => p.theme.colors.text};
    margin-bottom: 0.4rem;
  }

  p {
    font-size: ${p => p.theme.fontSizes.md};
    color: ${p => p.theme.colors.textLight};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.25rem;

  @media (max-width: ${p => p.theme.breakpoints.desktop}) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: ${p => p.theme.breakpoints.mobile}) { grid-template-columns: 1fr; }
`;

const StatCard = styled.div`
  background: ${p => p.theme.colors.white};
  padding: 1.6rem;
  border: 1px solid ${p => p.theme.colors.borderLight};
  border-top: 2px solid ${p => p.theme.colors.accent};

  .label {
    font-family: ${p => p.theme.fonts.mono};
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${p => p.theme.colors.textLight};
    margin-bottom: 0.75rem;
  }

  .value {
    font-family: ${p => p.theme.fonts.serif};
    font-size: 2.1rem;
    font-weight: 300;
    color: ${p => p.theme.colors.text};
    margin-bottom: 0.35rem;
  }

  .change {
    font-family: ${p => p.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${p => p.theme.colors.identity};
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2.25rem;

  @media (max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: 1fr; }
`;

const ActionCard = styled.button`
  padding: 1.5rem;
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.borderLight};
  cursor: pointer;
  text-align: left;
  transition: all 0.3s;

  &:hover {
    border-color: ${p => p.theme.colors.accent};
    box-shadow: ${p => p.theme.shadows.md};
    transform: translateY(-2px);
  }

  .title {
    font-family: ${p => p.theme.fonts.serif};
    font-size: 1.25rem;
    color: ${p => p.theme.colors.text};
    margin-bottom: 0.4rem;
  }

  .desc {
    font-size: ${p => p.theme.fontSizes.sm};
    color: ${p => p.theme.colors.textLight};
    line-height: 1.55;
  }
`;

const TableContainer = styled.div`
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.borderLight};
  margin-bottom: 2.5rem;
`;

const TableHeader = styled.div`
  padding: 1.35rem 1.75rem;
  border-bottom: 1px solid ${p => p.theme.colors.border};

  h3 {
    font-family: ${p => p.theme.fonts.serif};
    font-size: 1.6rem;
    font-weight: 300;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.85rem 1.75rem;
  font-family: ${p => p.theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.textLight};
  border-bottom: 1px solid ${p => p.theme.colors.border};
  font-weight: 400;
`;

const Td = styled.td`
  padding: 1rem 1.75rem;
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.text};
  border-bottom: 1px solid ${p => p.theme.colors.borderLight};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.28rem 0.7rem;
  font-family: ${p => p.theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: ${p => p.$status === 'confirmed' ? 'rgba(70,88,74,0.12)' : p.$status === 'pending' ? 'rgba(203,184,157,0.25)' : 'rgba(155,34,38,0.1)'};
  color: ${p => p.$status === 'confirmed' ? p.theme.colors.identity : p.$status === 'pending' ? '#8A6D3B' : '#9B2226'};
`;

const MENU = ['Dashboard', 'Bookings', 'Customers', 'Listings', 'Analytics', 'Reviews', 'Settings'];

const MENU_ICONS = {
  Dashboard: 'chart',
  Bookings: 'calendar',
  Customers: 'users',
  Listings: 'building',
  Analytics: 'chart',
  Reviews: 'star',
  Settings: 'settings',
};

const BOOKINGS = [
  { id: 'B-2847', guest: 'Sarah Mitchell', stay: 'Victoria Falls Hotel', dates: 'Jul 15-18', amount: '$2,250', status: 'confirmed' },
  { id: 'B-2846', guest: 'James & Chen Family', stay: 'Safari Lodge', dates: 'Jul 14-17', amount: '$1,830', status: 'confirmed' },
  { id: 'B-2845', guest: 'Amara & Kofi Mensah', stay: 'Anantara', dates: 'Jul 13-16', amount: '$3,600', status: 'confirmed' },
  { id: 'B-2844', guest: 'Tom Richards', stay: 'Savanna68', dates: 'Jul 12-14', amount: '$452', status: 'pending' },
  { id: 'B-2843', guest: 'Lisa Park', stay: 'Ilala Lodge', dates: 'Jul 11-15', amount: '$1,240', status: 'cancelled' },
];

export default function BusinessPortal() {
  const [active, setActive] = useState('Dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <PageWrapper>
      <MobileToggle onClick={() => setMobileOpen(!mobileOpen)}>&#9776;</MobileToggle>
      <Sidebar $mobileOpen={mobileOpen}>
        <SidebarLogo>
          <h3>VicFalls One <span>Business</span></h3>
          <div className="tag">Partner Command</div>
        </SidebarLogo>
        <SidebarNav>
          {MENU.map(item => (
            <SidebarItem key={item} $active={active === item} onClick={() => { setActive(item); setMobileOpen(false); }}>
              <Icon name={MENU_ICONS[item]} />
              {item}
            </SidebarItem>
          ))}
        </SidebarNav>
      </Sidebar>

      <Main>
        <PageHeader>
          <div className="eyebrow">Partner Command · Module 07</div>
          <h1>Dashboard</h1>
          <p>Welcome back. Here's what's happening with your business.</p>
        </PageHeader>

        <StatsGrid>
          <StatCard><div className="label">Total Bookings</div><div className="value">156</div><div className="change">+12% this month</div></StatCard>
          <StatCard><div className="label">Revenue</div><div className="value">$45,280</div><div className="change">+8% this month</div></StatCard>
          <StatCard><div className="label">Active Listings</div><div className="value">12</div><div className="change">2 new this month</div></StatCard>
          <StatCard><div className="label">Average Rating</div><div className="value">4.8</div><div className="change">+0.1 this month</div></StatCard>
        </StatsGrid>

        <QuickActions>
          <ActionCard><div className="title">+ Add New Listing</div><div className="desc">Create a new tour, room, or experience listing</div></ActionCard>
          <ActionCard><div className="title">View All Bookings</div><div className="desc">Manage reservations and availability</div></ActionCard>
          <ActionCard><div className="title">Update Availability</div><div className="desc">Set dates and capacity for your listings</div></ActionCard>
        </QuickActions>

        <TableContainer>
          <TableHeader><h3>Recent Bookings</h3></TableHeader>
          <Table>
            <thead><tr><Th>Booking ID</Th><Th>Guest</Th><Th>Property</Th><Th>Dates</Th><Th>Amount</Th><Th>Status</Th></tr></thead>
            <tbody>
              {BOOKINGS.map(b => (
                <tr key={b.id}>
                  <Td style={{ fontWeight: 600 }}>{b.id}</Td>
                  <Td>{b.guest}</Td>
                  <Td>{b.stay}</Td>
                  <Td>{b.dates}</Td>
                  <Td style={{ fontWeight: 600 }}>{b.amount}</Td>
                  <Td><StatusBadge $status={b.status}>{b.status}</StatusBadge></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Main>
    </PageWrapper>
  );
}
