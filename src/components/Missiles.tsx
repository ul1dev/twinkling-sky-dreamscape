
import { useEffect, useState } from 'react';

interface Missile {
  id: number;
  size: number;
  top: number;
  left: number;
  angle: number;
  speed: number;
}

const Missiles = () => {
  const [missiles, setMissiles] = useState<Missile[]>([]);

  useEffect(() => {
    const createMissile = () => {
      const id = Date.now();
      const size = Math.random() * 100 + 50; // Random size between 50 and 150
      const startFromLeft = Math.random() < 0.5;
      const top = Math.random() * window.innerHeight;
      const left = startFromLeft ? -150 : window.innerWidth;
      const angle = startFromLeft 
        ? -30 + Math.random() * 60 // Angle between -30 and 30 degrees when starting from left
        : 150 + Math.random() * 60; // Angle between 150 and 210 degrees when starting from right
      const speed = 3 + Math.random() * 2; // Random speed between 3 and 5

      setMissiles(prev => [...prev, { id, size, top, left, angle, speed }]);

      // Remove missile after it goes off screen
      setTimeout(() => {
        setMissiles(prev => prev.filter(m => m.id !== id));
      }, 10000);
    };

    const interval = setInterval(createMissile, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updatePositions = () => {
      setMissiles(prevMissiles => 
        prevMissiles.map(missile => {
          const radians = missile.angle * (Math.PI / 180);
          return {
            ...missile,
            left: missile.left + Math.cos(radians) * missile.speed,
            top: missile.top + Math.sin(radians) * missile.speed,
          };
        })
      );
      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {missiles.map((missile) => (
        <div
          key={missile.id}
          className="absolute"
          style={{
            top: missile.top,
            left: missile.left,
            transform: `rotate(${missile.angle}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div
            className="relative"
            style={{
              width: missile.size,
              height: missile.size,
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: `url('/lovable-uploads/58ed175b-23fc-4eee-aaf1-a0df49b8655c.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                filter: 'drop-shadow(0 0 10px rgba(255, 165, 0, 0.5))'
              }}
            />
            <div
              className="absolute right-full top-1/2 -translate-y-1/2"
              style={{
                width: missile.size * 1.5,
                height: missile.size / 3,
                background: 'linear-gradient(to left, rgba(255, 165, 0, 0.3), transparent)',
                filter: 'blur(5px)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Missiles;
