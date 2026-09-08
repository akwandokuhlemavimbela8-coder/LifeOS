import { useEffect } from 'react';

interface HotkeyOptions {
  metaKey?: boolean;
  ctrlKey?: boolean;
}

export function useHotkeys(
  targetKey: string,
  callback: () => void,
  options: HotkeyOptions = {}
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isKeyMatch = event.key.toLowerCase() === targetKey.toLowerCase();
      const isModifierMatch =
        (!options.metaKey && !options.ctrlKey) ||
        (options.metaKey && event.metaKey) ||
        (options.ctrlKey && event.ctrlKey);

      if (isKeyMatch && isModifierMatch) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetKey, callback, options]);
}
