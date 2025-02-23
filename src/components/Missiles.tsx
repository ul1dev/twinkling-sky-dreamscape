
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
      const size = Math.random() * 50 + 30; // Smaller size range to match pixel art style
      const startFromLeft = Math.random() < 0.5;
      const top = Math.random() * window.innerHeight;
      const left = startFromLeft ? -150 : window.innerWidth;
      const angle = startFromLeft 
        ? -30 + Math.random() * 60 // Angle between -30 and 30 degrees when starting from left
        : 150 + Math.random() * 60; // Angle between 150 and 210 degrees when starting from right
      const speed = 3 + Math.random() * 2;

      setMissiles(prev => [...prev, { id, size, top, left, angle, speed }]);

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
                background: `url('/lovable-uploads/bd2ccef2-e18a-44e1-b4e4-418f7ea028e7.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                imageRendering: 'pixelated', // Add pixel art rendering
              }}
            />
            <div
              className="absolute right-full top-1/2 -translate-y-1/2"
              style={{
                width: missile.size * 1.2,
                height: missile.size * 0.6,
                background: 'linear-gradient(to left, rgba(255, 76, 0, 0.8), rgba(255, 195, 0, 0.3), transparent)',
                filter: 'blur(2px)',
                transform: 'scaleX(1.2)',
                transformOrigin: 'right',
                animation: 'flicker 0.1s infinite alternate'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Missiles;
