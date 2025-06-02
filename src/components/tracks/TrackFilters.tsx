import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { useAppSelector } from '@/app/hooks';
import { selectGenres } from '@/features/genres/genresSlice';
import type { TField, TOrder } from '@/features/filters/filtersSlice';

interface ITrackFilters {
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  localSort: {
    field: TField;
    order: TOrder;
  } | null;
  handleSortFieldChange: (value: string) => void;
  handleSortOrderChange: (value: string) => void;
  localGenre: string;
  handleGenreChange: (value: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

export const TrackFilters = ({
  isSheetOpen,
  setIsSheetOpen,
  localSort,
  handleSortFieldChange,
  handleSortOrderChange,
  localGenre,
  handleGenreChange,
  applyFilters,
  clearFilters,
}: ITrackFilters) => {
  const { genres } = useAppSelector(selectGenres);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
            value={localSort?.field || ''}
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
            value={localSort?.order || 'asc'}
            onValueChange={handleSortOrderChange}
            disabled={!localSort}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Order' />
            </SelectTrigger>
            <SelectContent className='bg-input-background'>
              <SelectItem value='asc'>Ascending</SelectItem>
              <SelectItem value='desc'>Descending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={localGenre} onValueChange={handleGenreChange}>
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
            onClick={clearFilters}
            variant='outline'
            className='w-full h-10 active:scale-95 bg-button'
          >
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
