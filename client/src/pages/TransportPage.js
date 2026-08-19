import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PageHero, Container, SectionHeading, Btn } from '../components/ui';
import { transportServices } from '../data/data';
import Icon from '../components/Icon';

const VehicleMap = [
  ['Sedan', 'car'],
  ['SUV', 'car'],
  ['Minibus', 'bus'],
  ['Bus', 'bus'],
  ['Helicopter', 'plane'],
  ['Boat', 'boat']
];

const Intro = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: end;
  margin: 5rem 0 3rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 3rem;
  }
`;

const IntroText = styled.p`
  font-size: 1.15rem;
  line-height: 1.75;
  color: ${props => props.theme.colors.textLight};

  em {
    font-family: ${props => props.theme.fonts.serif};
    font-style: italic;
    color: ${props => props.theme.colors.identity};
  }
`;

const Routes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem;
`;

const Route = styled(motion.div)`
  display: grid;
  grid-template-columns: 90px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.6rem 1.9rem;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.borderLight};
  transition: all ${props => props.theme.transitions.normal} ${props => props.theme.transitions.cubic};

  &:hover {
    border-color: ${props => props.theme.colors.accent};
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-3px);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 60px 1fr;
    .price-col { grid-column: 1 / -1; }
  }
`;

const Vehicle = styled.div`
  width: 84px;
  height: 84px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  color: ${props => props.theme.colors.identity};

  svg { width: 26px; height: 26px; }
`;

const VehicleLabel = styled.span`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.textLight};
`;

const RouteInfo = styled.div`
  h3 { font-size: 1.45rem; margin-bottom: 0.4rem; }

  .meta {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.accentDeep};
    margin-bottom: 0.7rem;
  }

  .desc {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textLight};
    line-height: 1.6;
    max-width: 46rem;
  }
`;

const Chips = styled.div`
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
  margin-top: 0.85rem;

  span {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.3rem 0.6rem;
    border: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.textLight};
  }
`;

const PriceCol = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  .price {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 1.25rem;
    color: ${props => props.theme.colors.identity};
  }

  .unit {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.textLight};
  }

  .rate {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.textLight};
  }
`;

const BookBtn = styled(Btn)`
  min-width: 8.5rem;
  text-align: center;
`;

const CTA = styled.div`
  background: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors.cream};
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 1px;
    background: ${props => props.theme.colors.accent};
  }

  h2 {
    font-size: 2.2rem;
    margin-bottom: 0.6rem;

    em { color: ${props => props.theme.colors.accent}; }
  }

  p {
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 1.75rem;
    max-width: 34rem;
  }
`;

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

const iconFor = (vehicle) => {
  const found = VehicleMap.find(v => v[0] === vehicle);
  return found ? found[1] : 'car';
};

export default function TransportPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 05 — The Movement Layer"
        title={<>Move through the <em>bush.</em></>}
        subtitle="Airport transfers, private drivers, shared shuttles — every journey in and around Victoria Falls, booked in one place."
        image={transportServices[0].description ? 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=2000&q=85' : undefined}
      />
      <Container>
        <Intro>
          <SectionHeading
            eyebrow="The network"
            title={<>One booking. <em>Every</em> journey.</>}
          />
          <IntroText>
            Victoria Falls is small by design — but the region is vast. The Movement Layer connects the airport, the town, the river, and the bush with a single dispatch network that knows the roads, the border crossings, and the wildlife.
          </IntroText>
        </Intro>

        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <Routes>
            {transportServices.map(service => (
              <Route key={service.id} variants={fadeUp}>
                <Vehicle>
                  <Icon name={iconFor(service.vehicleType)} />
                  <VehicleLabel>{service.vehicleType}</VehicleLabel>
                </Vehicle>
                <RouteInfo>
                  <h3>{service.name}</h3>
                  <div className="meta">{service.route} · {service.duration} · ★ {service.rating}</div>
                  <p className="desc">{service.description}</p>
                  <Chips>
                    <span>{service.capacity}</span>
                    {service.features.slice(0, 3).map(f => <span key={f}>{f}</span>)}
                  </Chips>
                </RouteInfo>
                <PriceCol className="price-col">
                  <div>
                    <div className="price">${service.priceFrom}</div>
                    <div className="unit">{service.priceUnit}</div>
                  </div>
                  <BookBtn to={`/transport/${service.slug}`} $variant="solid" $size="sm">Book now</BookBtn>
                </PriceCol>
              </Route>
            ))}
          </Routes>
        </motion.div>

        <CTA>
          <h2>Planning a longer <em>route?</em></h2>
          <p>Multi-stop itineraries, cross-border transfers to Zambia and Botswana, or a helicopter over the gorge — let the concierge design the journey.</p>
          <Btn to="/plan" $variant="gold" $size="md">Plan your journey</Btn>
        </CTA>
      </Container>
    </>
  );
}
