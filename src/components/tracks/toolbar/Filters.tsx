import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';

import { useAppSelector } from '@/app/hooks';
import { selectGenres } from '@/features/genres/genresSlice';
import { useFilters } from '@/hooks/useFilters';
import type { TField, TOrder } from '@/features/filters/filtersSlice';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface ITrackFilters {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function Filters({ isOpen, setIsOpen }: ITrackFilters) {
  const { genres } = useAppSelector(selectGenres);
  const { filters, setSort, setOrder, setGenre, applyFilters, resetFilters } =
    useFilters();

  const handleSortFieldChange = (value: string) => {
    setSort(value as TField);
  };

  const handleSortOrderChange = (value: string) => {
    setOrder(value as TOrder);
  };

  const handleGenreChange = (value: string) => {
    setGenre(value);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' className='h-9 bg-button mr-3'>
          <Filter /> <span>Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle className='text-center text-2xl tracking-wide'>
            Filters
          </SheetTitle>
        </SheetHeader>

        <div className='flex flex-col gap-4 mt-4 p-10'>
          <Select
            value={filters.sort || ''}
            onValueChange={handleSortFieldChange}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent className='bg-input-background'>
              <SelectItem value='title'>Title</SelectItem>
              <SelectItem value='artist'>Artist</SelectItem>
              <SelectItem value='album'>Album</SelectItem>
              <SelectItem value='createdAt'>Created At</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.order || 'asc'}
            onValueChange={handleSortOrderChange}
            disabled={!filters.sort}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Order' />
            </SelectTrigger>
            <SelectContent className='bg-input-background'>
              <SelectItem value='asc'>Ascending</SelectItem>
              <SelectItem value='desc'>Descending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.genre || ''} onValueChange={handleGenreChange}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Filter by genre' />
            </SelectTrigger>
            <SelectContent className='bg-input-background'>
              {genres.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={applyFilters}
            className='w-full h-10 active:scale-95'
          >
            Apply Filters
          </Button>
          <Button
            onClick={resetFilters}
            variant='outline'
            className='w-full h-10 active:scale-95 bg-button'
          >
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Filters;
