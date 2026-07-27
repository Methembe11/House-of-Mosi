import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { journalArticles, guides } from '../data/data';

const PageWrapper = styled.div`padding-top: 90px;`;

const HeroSection = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 4rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${props => props.theme.colors.white};
  font-weight: 400;
  margin-bottom: 0.75rem;
`;

const HeroSub = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: rgba(255,255,255,0.7);
`;

const Content = styled.div`max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) { grid-template-columns: 1fr; }
`;

const FeaturedCard = styled(Link)`
  display: block;
  background: ${props => props.theme.colors.white};
  overflow: hidden;
  transition: all 0.4s ease;
  &:hover { box-shadow: ${props => props.theme.shadows.lg}; img { transform: scale(1.03); } }
`;

const FeaturedImg = styled.div`
  height: 350px;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
`;

const SideCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SideCard = styled(FeaturedCard)``;

const SideImg = styled.div`
  height: 165px;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
`;

const CardBody = styled.div`padding: 1.5rem;`;

const Cat = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase; letter-spacing: 0.15em;
  color: ${props => props.theme.colors.cocoa}; font-weight: 500; margin-bottom: 0.5rem; display: block;
`;

const CardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500; margin-bottom: 0.75rem; line-height: 1.3;
`;

const CardExcerpt = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight}; line-height: 1.6;
`;

const CardMeta = styled.div`
  display: flex; gap: 1rem; margin-top: 0.75rem;
  font-size: ${props => props.theme.fontSizes.xs}; color: ${props => props.theme.colors.textMuted};
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) { grid-template-columns: 1fr; }
`;

const ArticleCard = styled(FeaturedCard)``;

const ArticleImg = styled.div`
  height: 220px;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
`;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function JournalPage() {
  const featured = journalArticles[0];
  const rest = journalArticles.slice(1);

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Guides & Stories</HeroTitle>
        <HeroSub>Stories, guides, and insights from the heart of Victoria Falls</HeroSub>
      </HeroSection>

      <Content>
        {/* Travel Guides Section */}
        <SectionLabel style={{ marginBottom: '1rem' }}>Travel Guides</SectionLabel>
        <SectionTitle style={{ marginBottom: '2rem' }}>Plan Your Perfect Trip</SectionTitle>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <ArticlesGrid>
            {guides.map(guide => (
              <motion.div key={guide.id} variants={fadeUp}>
                <ArticleCard to={`/journal/${guide.slug}`}>
                  <ArticleImg><img src={guide.image} alt={guide.title} loading="lazy" /></ArticleImg>
                  <CardBody>
                    <Cat>{guide.category}</Cat>
                    <CardTitle>{guide.title}</CardTitle>
                    <CardExcerpt>{guide.excerpt}</CardExcerpt>
                    <CardMeta><span>{guide.readTime}</span></CardMeta>
                  </CardBody>
                </ArticleCard>
              </motion.div>
            ))}
          </ArticlesGrid>
        </motion.div>

        {/* Articles Section */}
        <div style={{ marginTop: '4rem' }}>
        <SectionLabel style={{ marginBottom: '1rem' }}>Articles</SectionLabel>
        <SectionTitle style={{ marginBottom: '2rem' }}>Stories & Insights</SectionTitle>
        <FeaturedGrid>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <FeaturedCard to={`/journal/${featured.slug}`}>
              <FeaturedImg><img src={featured.image} alt={featured.title} loading="lazy" /></FeaturedImg>
              <CardBody>
                <Cat>{featured.category}</Cat>
                <CardTitle>{featured.title}</CardTitle>
                <CardExcerpt>{featured.excerpt}</CardExcerpt>
                <CardMeta><span>{featured.author}</span><span>·</span><span>{featured.readTime}</span></CardMeta>
              </CardBody>
            </FeaturedCard>
          </motion.div>
          <SideCards>
            {rest.slice(0, 2).map(article => (
              <motion.div key={article.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <SideCard to={`/journal/${article.slug}`}>
                  <SideImg><img src={article.image} alt={article.title} loading="lazy" /></SideImg>
                  <CardBody>
                    <Cat>{article.category}</Cat>
                    <CardTitle>{article.title}</CardTitle>
                    <CardMeta><span>{article.readTime}</span></CardMeta>
                  </CardBody>
                </SideCard>
              </motion.div>
            ))}
          </SideCards>
        </FeaturedGrid>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <ArticlesGrid>
            {rest.slice(2).map(article => (
              <motion.div key={article.id} variants={fadeUp}>
                <ArticleCard to={`/journal/${article.slug}`}>
                  <ArticleImg><img src={article.image} alt={article.title} loading="lazy" /></ArticleImg>
                  <CardBody>
                    <Cat>{article.category}</Cat>
                    <CardTitle>{article.title}</CardTitle>
                    <CardExcerpt>{article.excerpt}</CardExcerpt>
                    <CardMeta><span>{article.readTime}</span></CardMeta>
                  </CardBody>
                </ArticleCard>
              </motion.div>
            ))}
          </ArticlesGrid>
        </motion.div>
        </div>
      </Content>
    </PageWrapper>
  );
}

const SectionLabel = styled.span` font-size: ${p => p.theme.fontSizes.xs}; text-transform: uppercase; letter-spacing: 0.25em; color: ${p => p.theme.colors.cocoa}; font-weight: 500; display: block; `;
const SectionTitle = styled.h2` font-family: ${p => p.theme.fonts.serif}; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 400; color: ${p => p.theme.colors.text}; `;
