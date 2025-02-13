
import { useMemo } from 'react';
import Star from './Star';

const StarryNight = () => {
  const stars = useMemo(() => {
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 10000);
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3000,
      duration: Math.random() * 3 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      {stars.map((star) => (
        <Star
          key={star.id}
          size={star.size}
          delay={star.delay}
          duration={star.duration}
          top={star.top}
          left={star.left}
        />
      ))}
    </div>
  );
};

export default StarryNight;
