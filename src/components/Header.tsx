
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const Header = ({ currentLang, onLanguageChange }: HeaderProps) => {
  const location = useLocation();
  
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
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-1 text-sm font-medium text-white bg-slate-800/50 rounded-full hover:bg-slate-700/50 transition">
              {currentLang}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-900/95 backdrop-blur-sm border-slate-700">
              <DropdownMenuItem onClick={() => onLanguageChange('en')} className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                EN
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange('ru')} className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                RU
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange('cn')} className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                CN
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
