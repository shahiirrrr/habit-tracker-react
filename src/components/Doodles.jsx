import { motion } from 'framer-motion';

export const StarDoodle = ({ className = '' }) => (
  <motion.svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ rotate: 0, scale: 0 }}
    animate={{ rotate: 360, scale: 1 }}
    transition={{ duration: 1, ease: 'easeOut' }}
  >
    <path
      d="M20 5L23 15L33 15L25 21L28 31L20 25L12 31L15 21L7 15L17 15L20 5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
    />
  </motion.svg>
);

export const HeartDoodle = ({ className = '' }) => (
  <motion.svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    <path
      d="M20 35C20 35 8 25 8 16C8 11 12 8 16 8C18 8 20 9 20 11C20 9 22 8 24 8C28 8 32 11 32 16C32 25 20 35 20 35Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
    />
  </motion.svg>
);

export const CheckDoodle = ({ className = '' }) => (
  <motion.svg
    className={className}
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
  >
    <circle cx="25" cy="25" r="20" fill="currentColor" opacity="0.2" />
    <path
      d="M15 25L22 32L35 18"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

export const FlameDoodle = ({ className = '' }) => (
  <motion.svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ 
      scale: [1, 1.1, 1],
      y: [0, -5, 0]
    }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
  >
    <path
      d="M20 10C20 10 15 15 15 22C15 28 19 32 20 32C21 32 25 28 25 22C25 15 20 10 20 10Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M20 32L20 38"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
);

export const TrophyDoodle = ({ className = '' }) => (
  <motion.svg
    className={className}
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ rotate: [0, 5, -5, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    <rect x="20" y="10" width="20" height="25" rx="5" fill="currentColor" opacity="0.3" />
    <path
      d="M15 35L18 45H42L45 35H15Z"
      fill="currentColor"
    />
    <circle cx="30" cy="22" r="8" fill="currentColor" />
    <path
      d="M25 5L25 10M35 5L35 10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </motion.svg>
);

export const RocketDoodle = ({ className = '' }) => (
  <motion.svg
    className={className}
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    <path
      d="M25 5L30 20L25 25L20 20L25 5Z"
      fill="currentColor"
    />
    <rect x="22" y="25" width="6" height="20" rx="3" fill="currentColor" />
    <path
      d="M15 35L20 40M35 35L30 40"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="20" cy="30" r="2" fill="white" />
    <circle cx="30" cy="30" r="2" fill="white" />
  </motion.svg>
);

export const SmileDoodle = ({ className = '' }) => (
  <motion.svg
    className={className}
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    <circle cx="30" cy="30" r="25" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="3" />
    <circle cx="20" cy="25" r="3" fill="currentColor" />
    <circle cx="40" cy="25" r="3" fill="currentColor" />
    <path
      d="M20 35Q30 42 40 35"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </motion.svg>
);

