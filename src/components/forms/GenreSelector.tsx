import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface IGenreSelectorProps {
  genres: string[];
  selected: string[];
  onChange: (genres: string[]) => void;
}

function GenreSelector({ genres, selected, onChange }: IGenreSelectorProps) {
  return (
    <FormItem>
      <FormLabel>Genres</FormLabel>
      <div className='flex flex-wrap gap-2 mt-2' data-testid='genre-selector'>
        {genres.map((genre) => {
          const isSelected = selected.includes(genre);
          return (
            <button
              key={genre}
              type='button'
              onClick={() =>
                onChange(
                  isSelected
                    ? selected.filter((g) => g !== genre)
                    : [...selected, genre]
                )
              }
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border 
              ${isSelected ? 'bg-selected' : 'bg-not-selected'}`}
            >
              <span>{genre}</span>
              <span>{isSelected ? '×' : '+'}</span>
            </button>
          );
        })}
      </div>
      <FormMessage data-testid='error-genres' />
    </FormItem>
  );
}

export default GenreSelector;