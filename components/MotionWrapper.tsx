"use client";

import { motion } from "framer-motion";

// TODO (accessibility): Add `const shouldReduce = useReducedMotion()` from framer-motion
// and set `animate` to the final state immediately when shouldReduce is true,
// skipping the enter animation for users who prefer reduced motion.

interface MotionWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export default function MotionWrapper({ children, delay = 0 }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
