
import { useLocation, useNavigate } from 'react-router-dom';
import { Deer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = location.pathname.split('/')[1];

  const getContent = () => {
    switch (currentLang) {
      case 'ru':
        return {
          pitch: "Откройте магию севера!\nПогрузитесь в мир, где небо озаряется яркими красками северного сияния, а каждая минута наполнена чистыми, незабываемыми эмоциями. С туром от \"Sadka\" вы почувствуете дыхание дикой природы Мурманской области, насладитесь свежестью северного воздуха и ощутите связь с каждым уголком этой загадочной земли. Отдохните душой, вдохните свободу и позвольте природе подарить вам мгновения настоящего восторга!",
          about: "\"Sadka\" – ваш надежный проводник в удивительный мир Мурманской области. Мы специализируемся на организации эксклюзивных туров по Кольскому полуострову, открывая перед вами захватывающие пейзажи, богатую историю и уникальную атмосферу северной природы.\n\nНаши маршруты продуманы с любовью к деталям, чтобы каждый путешественник мог насладиться не только красотой заснеженных вершин, величием фьордов и сказочностью полярных ночей, но и почувствовать тепло гостеприимства местных жителей. Мы предлагаем экскурсии, дающие возможность прикоснуться к первозданной природе, узнать о традициях и культуре северных народов, испытать бурю эмоций, сопровождающую каждое новое открытие.\n\nПусть каждый ваш шаг по Кольскому полуострову станет началом уникального приключения, а \"Sadka\" поможет сделать его поистине незабываемым!",
          bookTour: "Забронировать тур",
          rentHouse: "Арендовать дом"
        };
      case 'cn':
        return {
          pitch: "发现北方的魔力！\n沉浸在一个天空被北极光明亮色彩点燃的世界，每一分钟都充满纯粹、难忘的情感。通过\"Sadka\"的旅行，您将感受到摩尔曼斯克地区野性自然的呼吸，享受北方空气的清新，感受与这片神秘土地每个角落的联系。让心灵休息，呼吸自由，让大自然带给您真正愉悦的时刻！",
          about: "\"Sadka\"是您通往摩尔曼斯克地区奇妙世界的可靠向导。我们专门组织科拉半岛独家旅游，为您展现迷人的景观、丰富的历史和北方自然的独特氛围。\n\n我们的路线经过精心设计，关注每一个细节，使每位旅行者不仅能欣赏被雪覆盖的山峰之美、峡湾的壮丽和极夜的童话，还能感受到当地人的热情好客。我们提供的观光游让您有机会接触原始自然，了解北方民族的传统和文化，体验每一次新发现带来的情感波动。\n\n让您在科拉半岛的每一步都成为独特冒险的开始，\"Sadka\"将帮助您使其真正难忘！",
          bookTour: "预订旅游",
          rentHouse: "租房"
        };
      default:
        return {
          pitch: "Discover the magic of the north!\nImmerse yourself in a world where the sky is ablaze with the bright colors of the northern lights, and every minute is filled with pure, unforgettable emotions. With a tour from \"Sadka\" you will feel the breath of wild nature of the Murmansk region, enjoy the freshness of northern air and feel a connection with every corner of this mysterious land. Rest your soul, breathe in freedom and let nature give you moments of real delight!",
          about: "\"Sadka\" is your reliable guide to the wonderful world of the Murmansk region. We specialize in organizing exclusive tours around the Kola Peninsula, opening before you fascinating landscapes, rich history and unique atmosphere of northern nature.\n\nOur routes are designed with love to details so that every traveler could enjoy not only the beauty of snow-covered peaks, majesty of fjords and fairy-tale polar nights, but also feel the warmth of hospitality of local people. We offer excursions that give you the opportunity to touch the pristine nature, learn about the traditions and culture of the northern peoples, and experience the storm of emotions that accompanies each new discovery.\n\nLet every step you take across the Kola Peninsula be the beginning of a unique adventure, and \"Sadka\" will help you make it truly unforgettable!",
          bookTour: "Book a Tour",
          rentHouse: "Rent a House"
        };
    }
  };

  const content = getContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-4xl mx-auto">
      <div className="text-white space-y-8">
        <div className="flex items-center justify-center mb-8">
          <Deer className="w-16 h-16 text-green-400" />
        </div>
        
        <div className="space-y-6">
          <div>
            {content.pitch.split('\n').map((paragraph, index) => (
              <p key={index} className="text-xl text-gray-300 mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Button 
              onClick={() => navigate(`/${currentLang}/tours`)}
              className="bg-green-500 hover:bg-green-600"
            >
              {content.bookTour}
            </Button>
            <Button 
              onClick={() => navigate(`/${currentLang}/houses`)}
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500/10"
            >
              {content.rentHouse}
            </Button>
          </div>

          <div className="mt-16">
            {content.about.split('\n').map((paragraph, index) => (
              <p key={index} className="text-base text-gray-400 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
