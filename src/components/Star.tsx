
import { useEffect, useState } from 'react';

interface StarProps {
  size: number;
  delay: number;
  duration: number;
  top: number;
  left: number;
}

const Star = ({ size, delay, duration, top, left }: StarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className="absolute rounded-full bg-white"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? `twinkle ${duration}s infinite` : 'none',
        transition: 'opacity 0.5s ease-in-out',
      }}
    />
  );
};

export default Star;
