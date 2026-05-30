'use client';

import { useMemo } from 'react';

import { useAudioPlaybackState } from './use-audio-playback-state';

export type AIAgentState = 'idle' | 'thinking' | 'speaking';

interface AIAgentStateHook {
  agentState: AIAgentState;
  isThinking: boolean;
  isSpeaking: boolean;
}

/**
 * Hook to manage AI agent visual states for enhanced UI feedback.
 * Uses useMemo instead of useEffect + setState to avoid cascading renders.
 */
export function useAIAgentState(isLoading: boolean): AIAgentStateHook {
  const { isAudioPlaying } = useAudioPlaybackState();

  const agentState = useMemo<AIAgentState>(() => {
    if (isAudioPlaying) return 'speaking';
    if (isLoading) return 'thinking';
    return 'idle';
  }, [isLoading, isAudioPlaying]);

  return {
    agentState,
    isThinking: agentState === 'thinking',
    isSpeaking: agentState === 'speaking',
  };
}
