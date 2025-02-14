
import { Link } from "react-router-dom";

interface FooterProps {
  currentLang: string;
}

const Footer = ({ currentLang }: FooterProps) => {
  return (
    <footer className="bg-black/50 backdrop-blur-sm text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sadka</h3>
            <p className="text-sm text-gray-300">
              {currentLang === 'ru' 
                ? 'Ваш проводник по красоте Севера' 
                : currentLang === 'cn' 
                ? '您的北方美景向导'
                : 'Your guide to Northern beauty'}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {currentLang === 'ru' ? 'Документы' : currentLang === 'cn' ? '文件' : 'Documents'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to={`/${currentLang}/terms`} className="text-gray-300 hover:text-white transition">
                  {currentLang === 'ru' ? 'Условия' : currentLang === 'cn' ? '条款' : 'Terms'}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/privacy`} className="text-gray-300 hover:text-white transition">
                  {currentLang === 'ru' ? 'Конфиденциальность' : currentLang === 'cn' ? '隐私政策' : 'Privacy'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {currentLang === 'ru' ? 'Контакты' : currentLang === 'cn' ? '联系方式' : 'Contacts'}
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-300">+7 (XXX) XXX-XX-XX</li>
              <li className="text-gray-300">info@sadka.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {currentLang === 'ru' ? 'Адрес' : currentLang === 'cn' ? '地址' : 'Address'}
            </h4>
            <p className="text-gray-300">
              {currentLang === 'ru' 
                ? 'Мурманск, Россия' 
                : currentLang === 'cn' 
                ? '摩尔曼斯克，俄罗斯' 
                : 'Murmansk, Russia'}
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          © 2024 Sadka. {currentLang === 'ru' 
            ? 'Все права защищены' 
            : currentLang === 'cn' 
            ? '保留所有权利' 
            : 'All rights reserved'}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
