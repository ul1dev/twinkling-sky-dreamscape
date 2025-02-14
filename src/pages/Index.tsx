
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  const currentLang = location.pathname.split('/')[1];

  const getWelcomeMessage = () => {
    switch (currentLang) {
      case 'ru':
        return {
          title: 'Добро пожаловать в Sadka',
          subtitle: 'Откройте для себя магию Русского Севера'
        };
      case 'cn':
        return {
          title: '欢迎来到 Sadka',
          subtitle: '探索俄罗斯北部的魔力'
        };
      default:
        return {
          title: 'Welcome to Sadka',
          subtitle: 'Discover the Magic of Russian North'
        };
    }
  };

  const message = getWelcomeMessage();

  return (
    <div className="flex items-center justify-center min-h-[80vh] text-center">
      <div className="text-white">
        <h1 className="text-5xl font-bold mb-4">{message.title}</h1>
        <p className="text-xl text-gray-300">{message.subtitle}</p>
      </div>
    </div>
  );
};

export default Index;
