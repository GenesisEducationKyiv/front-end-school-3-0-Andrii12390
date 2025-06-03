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
};

type ApiError = {
  message: string;
  status?: number;
};

type ApiSuccess<T> = {
  data: T;
  status: number;
};

export type { TTrack, ApiError, ApiSuccess };
