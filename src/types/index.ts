type ApiError = {
  message: string;
  status?: number;
};

type ApiSuccess<T> = {
  data: T;
  status: number;
};

export type { ApiError, ApiSuccess };
