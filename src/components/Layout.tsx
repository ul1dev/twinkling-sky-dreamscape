
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import StarryNight from "./StarryNight";
import AuroraEffect from "./AuroraEffect";
import { useState, ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [currentLang, setCurrentLang] = useState("en");

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      <Header currentLang={currentLang} onLanguageChange={handleLanguageChange} />
      <StarryNight />
      <AuroraEffect />
      <main className="flex-1 container mx-auto px-4 py-24">
        {children || <Outlet />}
      </main>
      <Footer currentLang={currentLang} />
    </div>
  );
};

export default Layout;
