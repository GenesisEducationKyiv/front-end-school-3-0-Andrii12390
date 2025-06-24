import { describe, it, beforeEach, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Pagination from '../Pagination'; 


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
  useAppSelector:
    () =>
      ({
        isLoading,
        meta: { totalPages },
      }) satisfies { isLoading: boolean; meta: { totalPages: number } },
}));

describe('Pagination component integration tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('on first page page (1/5) prev button is disabled', () => {
    currPage = 1;
    totalPages = 5;
    isLoading = false;

    render(<Pagination />);

    const prevBtn = screen.getByTestId('pagination-prev') as HTMLButtonElement;
    expect(prevBtn).toBeDisabled();
  });

  it('On first page (1/5) next button is enabled', () => {
    currPage = 1;
    totalPages = 5;
    isLoading = false;

    render(<Pagination />);

    const nextBtn = screen.getByTestId('pagination-next') as HTMLButtonElement;
    expect(nextBtn).toBeEnabled();
  });

  it('on first page page (1/5) clicking next calls setPage(2)', () => {
    currPage = 1;
    totalPages = 5;
    isLoading = false;

    render(<Pagination />);

    const nextBtn = screen.getByTestId('pagination-next') as HTMLButtonElement;
    fireEvent.click(nextBtn);
    expect(setPageMock).toHaveBeenCalledWith(2);
  });

  it('On last page page (5/5) next button is disabled', () => {
    currPage = 5;
    totalPages = 5;
    isLoading = false;

    render(<Pagination />);

    const nextBtn = screen.getByTestId('pagination-next');
    expect(nextBtn).toBeDisabled();
  });

  it('On last page page (5/5) prev button is enabled', () => {
    currPage = 5;
    totalPages = 5;
    isLoading = false;

    render(<Pagination />);

    const prevBtn = screen.getByTestId('pagination-prev');
    expect(prevBtn).toBeEnabled();
  });

  it('On last page page (5/5) clicking prev calls setPage(4)', () => {
    currPage = 5;
    totalPages = 5;
    isLoading = false;

    render(<Pagination />);

    const prevBtn = screen.getByTestId('pagination-prev');
    fireEvent.click(prevBtn);
    expect(setPageMock).toHaveBeenCalledWith(4);
  });

  it('Loading state disables prev pagination button', () => {
    currPage = 3;
    totalPages = 5;
    isLoading = true;

    render(<Pagination />);

    const prevBtn = screen.getByTestId('pagination-prev');
    expect(prevBtn).toBeDisabled();
  });

  it('Loading state disables next pagination button', () => {
    currPage = 3;
    totalPages = 5;
    isLoading = true;

    render(<Pagination />);

    const nextBtn = screen.getByTestId('pagination-next');
    expect(nextBtn).toBeDisabled();
  });

  it('Loading state prevents setPage calls on prev button click', () => {
    currPage = 3;
    totalPages = 5;
    isLoading = true;

    render(<Pagination />);

    const prevBtn = screen.getByTestId('pagination-prev');
    fireEvent.click(prevBtn);
    expect(setPageMock).not.toHaveBeenCalled();
  });

  it('Loading state prevents setPage calls on next button click', () => {
    currPage = 3;
    totalPages = 5;
    isLoading = true;

    render(<Pagination />);

    const nextBtn = screen.getByTestId('pagination-next');
    fireEvent.click(nextBtn);
    expect(setPageMock).not.toHaveBeenCalled();
  });
});
