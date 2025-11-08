import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Confetti = ({ trigger, onComplete }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (trigger) {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
      }));
      setPieces(newPieces);

      // Clean up after animation
      const timer = setTimeout(() => {
        setPieces([]);
        if (onComplete) onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
            top: `${piece.y}%`,
          }}
          initial={{
            y: -10,
            rotate: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            y: '100vh',
            rotate: piece.rotation + 360,
            opacity: [1, 1, 0],
            scale: [1, 1.2, 0.8],
            x: piece.x + (Math.random() - 0.5) * 50,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: piece.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;

