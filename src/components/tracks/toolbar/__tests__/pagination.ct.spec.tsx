import { describe, it, beforeEach, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Pagination from '../Pagination';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let currPage = 1;
let totalPages = 1;
let isLoading = false;

const setPageMock = vi.fn();

vi.mock('@/hooks/useFilters', () => ({
  useFilters: () => ({
    setPage: setPageMock,
    filters: { page: currPage },
  }),
}));

vi.mock('@/app/hooks', () => ({
  useAppSelector: () =>
    ({
      isLoading,
      meta: { totalPages },
    }) satisfies { isLoading: boolean; meta: { totalPages: number } },
}));

vi.mock('@/hooks/usePagination', () => ({
  usePagination: () => ({
    isLoading,
    page: currPage,
    handleNext: vi.fn(() => {
      if (!isLoading && currPage < totalPages) {
        setPageMock(currPage + 1);
      }
    }),
    handlePrev: vi.fn(() => {
      if (!isLoading && currPage > 1) {
        setPageMock(currPage - 1);
      }
    }),
    totalPages,
  }),
}));

describe('Pagination component integration tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('on first page (1/5) prev button is disabled', () => {
    currPage = 1;
    totalPages = 5;
    isLoading = false;

    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <Pagination />
      </QueryClientProvider>,
    );

    const prevBtn = screen.getByTestId('pagination-prev') as HTMLButtonElement;
    expect(prevBtn).toBeDisabled();
  });

  it('on first page (1/5) next button is enabled', () => {
    currPage = 1;
    totalPages = 5;
    isLoading = false;

    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <Pagination />
      </QueryClientProvider>,
    );

    const nextBtn = screen.getByTestId('pagination-next') as HTMLButtonElement;
    expect(nextBtn).toBeEnabled();
  });

  it('on first page (1/5) clicking next calls setPage(2)', () => {
    currPage = 1;
    totalPages = 5;
    isLoading = false;

    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <Pagination />
      </QueryClientProvider>,
    );

    const nextBtn = screen.getByTestId('pagination-next') as HTMLButtonElement;
    fireEvent.click(nextBtn);
    expect(setPageMock).toHaveBeenCalledWith(2);
  });

  it('on last page (5/5) next button is disabled', () => {
    currPage = 5;
    totalPages = 5;
    isLoading = false;

    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <Pagination />
      </QueryClientProvider>,
    );

    const nextBtn = screen.getByTestId('pagination-next');
    expect(nextBtn).toBeDisabled();
  });

  it('on last page (5/5) prev button is enabled', () => {
    currPage = 5;
    totalPages = 5;
    isLoading = false;

    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <Pagination />
      </QueryClientProvider>,
    );

    const prevBtn = screen.getByTestId('pagination-prev');
    expect(prevBtn).toBeEnabled();
  });

  it('on last page (5/5) clicking prev calls setPage(4)', () => {
    currPage = 5;
    totalPages = 5;
    isLoading = false;

    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <Pagination />
      </QueryClientProvider>,
    );

    const prevBtn = screen.getByTestId('pagination-prev');
    fireEvent.click(prevBtn);
    expect(setPageMock).toHaveBeenCalledWith(4);
  });

  it('loading state prevents rendering when isLoading is true', () => {
    currPage = 3;
    totalPages = 5;
    isLoading = true;

    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <Pagination />
      </QueryClientProvider>,
    );

    expect(screen.queryByTestId('pagination-prev')).toBeNull();
    expect(screen.queryByTestId('pagination-next')).toBeNull();
  });
});
