import React from 'react';

export const Sparkles = () => {
  const stars = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${1 + Math.random() * 2}s`,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden rounded-2xl">
       {/* (Mesmo código de antes...) */}
       {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse shadow-[0_0_4px_#fff]"
          style={{
            top: star.top,
            left: star.left,
            animation: `twinkle ${star.duration} ease-in-out infinite`,
            animationDelay: star.delay,
          }}
        />
      ))}
       <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};