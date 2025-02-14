
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StarryNight from './StarryNight';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = location.pathname.split('/')[1] || 'en';

  useEffect(() => {
    if (!['en', 'ru', 'cn'].includes(currentLang)) {
      navigate('/en' + location.pathname);
    }
  }, [currentLang, navigate, location.pathname]);

  const handleLanguageChange = (lang: string) => {
    const pathParts = location.pathname.split('/');
    pathParts[1] = lang;
    navigate(pathParts.join('/'));
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <StarryNight />
      <div className="aurora">
        <div className="aurora__item"></div>
        <div className="aurora__item"></div>
        <div className="aurora__item"></div>
      </div>
      <Header currentLang={currentLang} onLanguageChange={handleLanguageChange} />
      <main className="flex-grow container mx-auto px-4 pt-20 pb-8">
        {children}
      </main>
      <Footer currentLang={currentLang} />
    </div>
  );
};

export default Layout;
