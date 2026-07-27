import React, { useState } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div` padding-top: 90px; min-height: 100vh; display: flex; background: ${p => p.theme.colors.background}; `;

const Sidebar = styled.aside`
  width: 260px; background: ${p => p.theme.colors.primary}; color: ${p => p.theme.colors.white};
  padding: 2rem 0; display: flex; flex-direction: column; position: fixed; top: 90px; bottom: 0; left: 0; z-index: 50;
  @media(max-width: ${p => p.theme.breakpoints.tablet}) { display: ${p => p.$mobileOpen ? 'flex' : 'none'}; width: 100%; }
`;

const SidebarLogo = styled.div` padding: 0 1.5rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); h3 { font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.lg}; font-weight: 400; } span { color: ${p => p.theme.colors.champagne}; } `;

const SidebarNav = styled.nav` flex: 1; padding: 1rem 0; `;

const SidebarItem = styled.button`
  width: 100%; text-align: left; padding: 0.75rem 1.5rem; background: ${p => p.$active ? 'rgba(255,255,255,0.1)' : 'transparent'};
  color: ${p => p.$active ? p.theme.colors.champagne : 'rgba(255,255,255,0.7)'}; border: none; cursor: pointer;
  font-size: ${p => p.theme.fontSizes.sm}; font-family: ${p => p.theme.fonts.sans}; display: flex; align-items: center; gap: 0.75rem;
  transition: all 0.2s; border-left: 3px solid ${p => p.$active ? p.theme.colors.champagne : 'transparent'};
  &:hover { background: rgba(255,255,255,0.05); color: ${p => p.theme.colors.white}; }
`;

const Main = styled.main` flex: 1; margin-left: 260px; padding: 2rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { margin-left: 0; } `;

const MobileToggle = styled.button`
  display: none; position: fixed; top: 95px; left: 1rem; z-index: 60; padding: 0.5rem 0.75rem;
  background: ${p => p.theme.colors.primary}; color: ${p => p.theme.colors.white}; border: none; cursor: pointer; font-size: 1.25rem;
  @media(max-width: ${p => p.theme.breakpoints.tablet}) { display: block; }
`;

const PageHeader = styled.div` margin-bottom: 2rem; h1 { font-family: ${p => p.theme.fonts.serif}; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 400; color: ${p => p.theme.colors.text}; } p { font-size: ${p => p.theme.fontSizes.md}; color: ${p => p.theme.colors.textMuted}; margin-top: 0.25rem; } `;

const StatsGrid = styled.div` display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; @media(max-width: ${p => p.theme.breakpoints.desktop}) { grid-template-columns: repeat(2, 1fr); } @media(max-width: ${p => p.theme.breakpoints.mobile}) { grid-template-columns: 1fr; } `;

const StatCard = styled.div` background: ${p => p.theme.colors.white}; padding: 1.5rem; border: 1px solid ${p => p.theme.colors.border}; .label { font-size: ${p => p.theme.fontSizes.xs}; text-transform: uppercase; letter-spacing: 0.1em; color: ${p => p.theme.colors.textMuted}; margin-bottom: 0.5rem; } .value { font-family: ${p => p.theme.fonts.serif}; font-size: 2rem; font-weight: 500; color: ${p => p.theme.colors.text}; } .change { font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.success}; margin-top: 0.25rem; } `;

const TableContainer = styled.div` background: ${p => p.theme.colors.white}; border: 1px solid ${p => p.theme.colors.border}; margin-bottom: 2rem; `;

const TableHeader = styled.div` padding: 1.25rem 1.5rem; border-bottom: 1px solid ${p => p.theme.colors.border}; display: flex; justify-content: space-between; align-items: center; h3 { font-family: ${p => p.theme.fonts.serif}; font-size: ${p => p.theme.fontSizes.xl}; font-weight: 500; } `;

const Table = styled.table` width: 100%; border-collapse: collapse; `;

const Th = styled.th` text-align: left; padding: 0.75rem 1.5rem; font-size: ${p => p.theme.fontSizes.xs}; text-transform: uppercase; letter-spacing: 0.1em; color: ${p => p.theme.colors.textMuted}; border-bottom: 1px solid ${p => p.theme.colors.border}; font-weight: 500; `;

const Td = styled.td` padding: 0.85rem 1.5rem; font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.text}; border-bottom: 1px solid ${p => p.theme.colors.borderLight}; `;

const StatusBadge = styled.span` display: inline-block; padding: 0.2rem 0.6rem; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; background: ${p => p.$status === 'confirmed' ? '#e8f5e9' : p.$status === 'pending' ? '#fff3e0' : '#fce4ec'}; color: ${p => p.$status === 'confirmed' ? '#2d6a4f' : p.$status === 'pending' ? '#e65100' : '#9b2226'}; `;

const QuickActions = styled.div` display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; @media(max-width: ${p => p.theme.breakpoints.tablet}) { grid-template-columns: 1fr; } `;

const ActionCard = styled.button` padding: 1.25rem; background: ${p => p.theme.colors.white}; border: 1px solid ${p => p.theme.colors.border}; cursor: pointer; text-align: left; transition: all 0.3s; &:hover { border-color: ${p => p.theme.colors.primary}; box-shadow: ${p => p.theme.shadows.md}; } .title { font-size: ${p => p.theme.fontSizes.md}; font-weight: 600; color: ${p => p.theme.colors.text}; margin-bottom: 0.25rem; } .desc { font-size: ${p => p.theme.fontSizes.sm}; color: ${p => p.theme.colors.textMuted}; } `;

const MENU = ['Dashboard', 'Bookings', 'Customers', 'Listings', 'Analytics', 'Reviews', 'Settings'];

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
        <SidebarLogo><h3>VicFalls One <span>Business</span></h3></SidebarLogo>
        <SidebarNav>
          {MENU.map(item => (
            <SidebarItem key={item} $active={active === item} onClick={() => { setActive(item); setMobileOpen(false); }}>
              {item}
            </SidebarItem>
          ))}
        </SidebarNav>
      </Sidebar>

      <Main>
        <PageHeader>
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
