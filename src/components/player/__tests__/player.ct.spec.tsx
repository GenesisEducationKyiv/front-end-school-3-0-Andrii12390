import '@testing-library/jest-dom';

import { describe, it, beforeEach, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import AudioPlayer from '..';
import { useAudioPlayer, IAudioState } from '@/hooks/useAudioPlayer'; 
import { TTrack } from '@/lib/schemas';

vi.mock('@/hooks/useAudioPlayer');

const mockedUseAudioPlayer = vi.mocked(useAudioPlayer);

const baseTrack: TTrack = {
  id: 'id',
  title: 'title',
  artist: 'artist',
  album: '',
  slug: 'slug',
  genres: [],
};

const mockTogglePlay = vi.fn();
const mockHandleSeek = vi.fn();
const mockOnEnded = vi.fn();

const defaultState: IAudioState = {
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  duration: 0,
};

function setup(partial: Partial<IAudioState> = {}) {
  const state = { ...defaultState, ...partial };

  mockedUseAudioPlayer.mockReturnValue({
    audioRef: { current: null },
    progressRef: { current: null },
    isPlaying: state.isPlaying,
    progress: state.progress,
    currentTime: state.currentTime,
    duration: state.duration,
    togglePlay: mockTogglePlay,
    handleSeek: mockHandleSeek,
    onEnded: mockOnEnded,
  });

  render(<AudioPlayer track={baseTrack} />);
}

describe('AudioPlayer tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Shows play button, progress 25 % and correct time', () => {
    setup({ progress: 25, currentTime: 12, duration: 48 });

    expect(screen.getByTestId('play-button-id')).toBeInTheDocument();
    expect(
      screen.getByTestId('audio-progress-id').firstElementChild
    ).toHaveStyle({ width: '25%' });

    expect(screen.getByText('0:12')).toBeInTheDocument();
    expect(screen.getByText('0:48')).toBeInTheDocument();
  });

  it('Call togglePlay by clicking pause button', () => {
    setup({ isPlaying: true });

    const pauseBtn = screen.getByTestId('pause-button-id');
    fireEvent.click(pauseBtn);

    expect(mockTogglePlay).toHaveBeenCalledTimes(1);
  });
});
