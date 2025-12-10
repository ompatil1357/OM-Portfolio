import { useEffect, useState } from 'react';

export const useTypingEffect = (
  words: string[],
  typingSpeed = 120,
  deletingSpeed = 60,
  pauseDuration = 1200
) => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) {
      return;
    }

    const currentWord = words[wordIndex];
    let timeoutId: number | undefined;

    if (!isDeleting && displayText.length < currentWord.length) {
      timeoutId = window.setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayText.length === currentWord.length) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && displayText.length > 0) {
      timeoutId = window.setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [displayText, deletingSpeed, isDeleting, pauseDuration, typingSpeed, wordIndex, words]);

  useEffect(() => {
    if (!words.length) {
      return;
    }

    setDisplayText('');
    setIsDeleting(false);
  }, [wordIndex, words]);

  return displayText;
};

export default useTypingEffect;

