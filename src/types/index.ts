type TTrack = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverImage?: string;
  audioFile?: string;
  genres: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type { TTrack }