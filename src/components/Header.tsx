
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const Header = ({ currentLang, onLanguageChange }: HeaderProps) => {
  const location = useLocation();
  
  const getLangLabel = (lang: string) => {
    switch(lang) {
      case 'ru': return 'Русский';
      case 'cn': return '中文';
      default: return 'English';
    }
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

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-white hover:text-blue-400 transition">
              <span>{getLangLabel(currentLang)}</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onLanguageChange('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange('ru')}>
                Русский
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange('cn')}>
                中文
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
