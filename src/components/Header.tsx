
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const Header = ({ currentLang, onLanguageChange }: HeaderProps) => {
  const location = useLocation();
  
  const changeLang = (lang: string) => {
    onLanguageChange(lang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={`/${currentLang}`} className="text-white text-2xl font-bold">
            Sadka
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to={`/${currentLang}/tours`} className="text-white hover:text-blue-400 transition">
              {currentLang === 'ru' ? 'Туры' : currentLang === 'cn' ? '旅游' : 'Tours'}
            </Link>
            <Link to={`/${currentLang}/houses`} className="text-white hover:text-blue-400 transition">
              {currentLang === 'ru' ? 'Дома' : currentLang === 'cn' ? '住宿' : 'Houses'}
            </Link>
            <Link to={`/${currentLang}/about`} className="text-white hover:text-blue-400 transition">
              {currentLang === 'ru' ? 'О нас' : currentLang === 'cn' ? '关于我们' : 'About'}
            </Link>
            <Link to={`/${currentLang}/contact`} className="text-white hover:text-blue-400 transition">
              {currentLang === 'ru' ? 'Контакты' : currentLang === 'cn' ? '联系我们' : 'Contact'}
            </Link>
          </nav>

          <div className="flex space-x-4">
            <button
              onClick={() => changeLang('en')}
              className={`text-sm ${currentLang === 'en' ? 'text-blue-400' : 'text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => changeLang('ru')}
              className={`text-sm ${currentLang === 'ru' ? 'text-blue-400' : 'text-white'}`}
            >
              RU
            </button>
            <button
              onClick={() => changeLang('cn')}
              className={`text-sm ${currentLang === 'cn' ? 'text-blue-400' : 'text-white'}`}
            >
              中文
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
