import '@testing-library/jest-dom';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import AudioPlayer from '..';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { TTrack } from '@/lib/schemas';
import { PlayerState } from '@/store/usePlayerStore';

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

const defaultState: Omit<PlayerState, ''> = {
  activeTrack: null,
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  duration: 0,
};

function setup(partial: Partial<PlayerState> = {}) {
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
    handleEnded: () => {},
    onLoadedMetadata: () => {},
    onTimeUpdate: () => {},
  });

  render(<AudioPlayer track={baseTrack} />);
}

describe('AudioPlayer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Play button when not playing', () => {
    setup();
    expect(screen.getByTestId('play-button-id')).toBeInTheDocument();
  });

  it('renders Pause button when playing', () => {
    setup({ isPlaying: true });
    expect(screen.getByTestId('pause-button-id')).toBeInTheDocument();
  });

  it('displays correct progress width', () => {
    setup({ progress: 25 });
    const bar = screen.getByTestId('audio-progress-id').firstElementChild as HTMLElement;
    expect(bar).toHaveStyle({ width: '25%' });
  });

  it('displays formatted current time', () => {
    setup({ currentTime: 12 });
    expect(screen.getByText('0:12')).toBeInTheDocument();
  });

  it('displays formatted duration', () => {
    setup({ duration: 48 });
    expect(screen.getByText('0:48')).toBeInTheDocument();
  });

  it('calls togglePlay when Play button clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('play-button-id'));
    expect(mockTogglePlay).toHaveBeenCalledTimes(1);
  });

  it('calls togglePlay when Pause button clicked', () => {
    setup({ isPlaying: true });
    fireEvent.click(screen.getByTestId('pause-button-id'));
    expect(mockTogglePlay).toHaveBeenCalledTimes(1);
  });
});
