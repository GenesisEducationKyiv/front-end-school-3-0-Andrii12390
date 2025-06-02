import { Form, FormField } from '@/components/ui/form';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';

import FormDialog from './FormDialog';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchGenres } from '@/features/genres/genresThunk';
import { createTrack } from '@/features/tracks/trackThunks';
import { Button } from '@/components/ui/button';
import { trackFormSchema, type TTrackForm } from '@/lib/schemas';
import TextInputField from './TextInput';
import GenreSelector from './GenreSelector';
import { customToast } from '../ui/toasts';
import { selectGenres } from '@/features/genres/genresSlice';
import { selectTracks } from '@/features/tracks/tracksSlice';

function CreateTrackForm() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { genres } = useAppSelector(selectGenres);
  const { isLoading } = useAppSelector(selectTracks);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const form = useForm<TTrackForm>({
    resolver: zodResolver(trackFormSchema),
    defaultValues: {
      title: '',
      artist: '',
      album: '',
      coverImage: '',
      genres: [],
    },
  });

  const onSubmit = async (values: TTrackForm) => {
    const result = await dispatch(createTrack(values));

    if (createTrack.rejected.match(result)) {
      return customToast.error('Failed to create track. Please try again');
    }
    customToast.success('Track created successfully');

    setSearchParams(searchParams);
  };

  return (
    <FormDialog
      isOpen={searchParams.get('modal') === 'create'}
      title='Create Track'
      onClose={() => {
        searchParams.delete('modal');
        setSearchParams(searchParams);
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <TextInputField
            name='title'
            label='Title'
            testId='input-title'
            control={form.control}
          />
          <TextInputField
            name='artist'
            label='Artist'
            testId='input-artist'
            control={form.control}
          />
          <TextInputField
            name='album'
            label='Album'
            testId='input-album'
            control={form.control}
          />
          <TextInputField
            name='coverImage'
            label='Cover Image URL'
            testId='input-cover-image'
            control={form.control}
          />

          <FormField
            control={form.control}
            name='genres'
            render={({ field }) => (
              <GenreSelector
                genres={genres}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Button
            type='submit'
            disabled={isLoading}
            data-testid='submit-button'
            className='active:scale-95'
          >
            {isLoading ? 'Saving...' : 'Create'}
          </Button>
        </form>
      </Form>
    </FormDialog>
  );
}

export default CreateTrackForm;
