"use client";

import { useEffect, useState } from "react";

interface TypingEffectProps {
  words: string[];
}

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_DURATION = 2000;

export default function TypingEffect({ words }: TypingEffectProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const tick = () => {
      if (!isDeleting) {
        // Typing forward
        const next = currentWord.slice(0, displayed.length + 1);
        setDisplayed(next);

        if (next === currentWord) {
          // Fully typed — pause then start deleting
          setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
          return;
        }
      } else {
        // Deleting
        const next = displayed.slice(0, displayed.length - 1);
        setDisplayed(next);

        if (next === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          return;
        }
      }
    };

    const delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, wordIndex, words]);

  return (
    <span className="text-xl sm:text-2xl font-mono text-accent">
      {displayed}
      <span className="animate-pulse text-accent ml-[1px]">|</span>
    </span>
  );
}
