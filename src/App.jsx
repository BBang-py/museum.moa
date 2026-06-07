import { useCallback, useEffect, useState } from 'react';
import HomePage from './components/HomePage.jsx';
import ExplorePage from './components/ExplorePage.jsx';

function getInitialPage() {
  return window.location.hash === '#explore' ? 'explore' : 'home';
}

export default function App() {
  const [page, setPage] = useState(getInitialPage);
  const [language, setLanguage] = useState(() => localStorage.getItem('museumMoaLanguage') || 'kor');

  useEffect(() => {
    const onHashChange = () => setPage(getInitialPage());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('museumMoaLanguage', language);
  }, [language]);

  const navigate = useCallback((nextPage) => {
    window.location.hash = nextPage === 'explore' ? 'explore' : '';
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return page === 'explore' ? (
    <ExplorePage language={language} onLanguageChange={setLanguage} onNavigate={navigate} />
  ) : (
    <HomePage language={language} onLanguageChange={setLanguage} onNavigate={navigate} />
  );
}
