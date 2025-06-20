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

  it('on first page (1/5): prev button is disabled, next button is enabled, clicking next calls setPage(2)', () => {
    currPage = 1;
    totalPages = 5;
    isLoading = false;

    render(<Pagination />);

    const prevBtn = screen.getByTestId('pagination-prev') as HTMLButtonElement;
    const nextBtn = screen.getByTestId('pagination-next') as HTMLButtonElement;

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).toBeEnabled();

    fireEvent.click(nextBtn);
    expect(setPageMock).toHaveBeenCalledWith(2);
  });

  it('on last page (5/5): next button is disabled, prev button is enabled, clicking prev calls setPage(4)', () => {
    currPage = 5;
    totalPages = 5;
    isLoading = false;

    render(<Pagination />);

    const prevBtn = screen.getByTestId('pagination-prev');
    const nextBtn = screen.getByTestId('pagination-next');

    expect(nextBtn).toBeDisabled();
    expect(prevBtn).toBeEnabled();

    fireEvent.click(prevBtn);
    expect(setPageMock).toHaveBeenCalledWith(4);
  });

  it('when loading: disables both pagination buttons and prevents setPage calls', () => {
    currPage = 3;
    totalPages = 5;
    isLoading = true;

    render(<Pagination />);

    const prevBtn = screen.getByTestId('pagination-prev');
    const nextBtn = screen.getByTestId('pagination-next');

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).toBeDisabled();

    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);

    expect(setPageMock).not.toHaveBeenCalled();
  });
});
