import { useEffect, useRef, useState } from 'react';

import { Message } from './use-interview-chat';

/**
 * Hook to automatically play audio for the last AI message.
 * setState calls are deferred via setTimeout to avoid cascading renders
 * (react-hooks/set-state-in-effect).
 */
export function useAudioAutoplay(messages: Message[]): string | null {
  const lastPlayedRef = useRef<string | null>(null);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const initialLoadRef = useRef(true);
  const userInteractedRef = useRef(false);

  // Track user interactions to enable autoplay after first interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      userInteractedRef.current = true;
      // Remove event listeners once we've detected interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;

    // Find the most recent AI message with audio
    const lastAiMessage = [...messages]
      .reverse()
      .find((msg) => msg.sender === 'ai' && msg.audioUrl);

    // If we found one and haven't signaled it yet, defer the setState
    if (lastAiMessage?.audioUrl && lastAiMessage.id !== lastPlayedRef.current) {
      if (initialLoadRef.current) {
        // Always try to play audio on initial page load/refresh
        console.log('Attempting to play audio on page load/refresh');
        lastPlayedRef.current = lastAiMessage.id;
        initialLoadRef.current = false;
        // Defer to avoid synchronous setState inside effect
        const id = lastAiMessage.id;
        setTimeout(() => setPlayingMessageId(id), 0);
      } else {
        // For new messages after initial load
        console.log('Playing new message audio after initial load');
        lastPlayedRef.current = lastAiMessage.id;
        const id = lastAiMessage.id;
        setTimeout(() => setPlayingMessageId(id), 0);
      }
    }
  }, [messages]);

  return playingMessageId;
}
