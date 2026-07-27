import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { journalArticles } from '../data/data';

const PageWrapper = styled.div`padding-top: 90px;`;

const Hero = styled.div`
  height: 55vh;
  min-height: 400px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
  &::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60%; background: linear-gradient(transparent, rgba(31,58,50,0.85)); }
  @media (max-width: ${props => props.theme.breakpoints.tablet}) { height: 40vh; min-height: 300px; }
`;

const HeroContent = styled.div`
  position: relative; z-index: 2; padding: 3rem;
  max-width: 800px;
`;

const BackLink = styled(Link)`
  position: absolute; top: 1.5rem; left: 1.5rem; z-index: 5;
  background: rgba(255,255,255,0.9); padding: 0.5rem 1.2rem;
  font-size: ${props => props.theme.fontSizes.sm}; font-weight: 500;
  &:hover { background: white; }
`;

const Cat = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase; letter-spacing: 0.2em;
  color: ${props => props.theme.colors.champagne}; font-weight: 500;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.serif};
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${props => props.theme.colors.white}; font-weight: 400;
  margin: 0.75rem 0 0.5rem; line-height: 1.2;
`;

const Meta = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: rgba(255,255,255,0.7);
  display: flex; gap: 0.75rem;
`;

const Article = styled.div`
  max-width: 750px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const Paragraph = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.9;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.sans};
`;

export default function JournalArticlePage() {
  const { slug } = useParams();
  const article = journalArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <PageWrapper>
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem' }}>Article not found</h1>
          <Link to="/journal" style={{ color: '#6B4F3A', textDecoration: 'underline' }}>Back to Journal</Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Hero>
        <BackLink to="/journal">← Back to Journal</BackLink>
        <img src={article.image} alt={article.title} />
        <HeroContent>
          <Cat>{article.category}</Cat>
          <Title>{article.title}</Title>
          <Meta>
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.readTime}</span>
            <span>·</span>
            <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </Meta>
        </HeroContent>
      </Hero>

      <Article>
        {article.content.split('\n\n').map((para, i) => (
          <Paragraph key={i}>{para}</Paragraph>
        ))}
      </Article>
    </PageWrapper>
  );
}
