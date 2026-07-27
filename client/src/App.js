import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles, { theme } from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import StaysPage from './pages/StaysPage';
import AccommodationDetailPage from './pages/AccommodationDetailPage';
import ExperiencesPage from './pages/ExperiencesPage';
import ExperienceDetailPage from './pages/ExperienceDetailPage';
import DiningPage from './pages/DiningPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import DestinationsPage from './pages/DestinationsPage';
import JourneyWizardPage from './pages/JourneyWizardPage';
import JourneyResultsPage from './pages/JourneyResultsPage';
import JournalPage from './pages/JournalPage';
import JournalArticlePage from './pages/JournalArticlePage';
import CollectionPage from './pages/CollectionPage';
import FloatingConcierge from './components/FloatingConcierge';
import { JourneyProvider } from './hooks/useJourney';
import { useTripPlanner } from './hooks/useCollection';

function AppContent() {
  const { collection, toggleCollection, isInCollection } = useTripPlanner();

  return (
    <JourneyProvider>
      <Navbar collectionCount={collection.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage isInCollection={isInCollection} toggleCollection={toggleCollection} />} />
        <Route path="/stays" element={<StaysPage isInCollection={isInCollection} toggleCollection={toggleCollection} />} />
        <Route path="/stays/:slug" element={<AccommodationDetailPage isInCollection={isInCollection} toggleCollection={toggleCollection} />} />
        <Route path="/experiences" element={<ExperiencesPage isInCollection={isInCollection} toggleCollection={toggleCollection} />} />
        <Route path="/experiences/:slug" element={<ExperienceDetailPage isInCollection={isInCollection} toggleCollection={toggleCollection} />} />
        <Route path="/dining" element={<DiningPage isInCollection={isInCollection} toggleCollection={toggleCollection} />} />
        <Route path="/dining/:slug" element={<RestaurantDetailPage isInCollection={isInCollection} toggleCollection={toggleCollection} />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/plan" element={<JourneyWizardPage />} />
        <Route path="/plan/results" element={<JourneyResultsPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/journal/:slug" element={<JournalArticlePage />} />
        <Route path="/collection" element={<CollectionPage collection={collection} count={collection.length} toggleCollection={toggleCollection} />} />
      </Routes>
      <FloatingConcierge />
      <Footer />
    </JourneyProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
