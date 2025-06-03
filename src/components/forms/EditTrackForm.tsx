import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { editTrack } from '@/features/tracks/trackThunks';
import { fetchGenres } from '@/features/genres/genresThunk';

import { Form, FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import TextInputField from './TextInput';
import GenreSelector from './GenreSelector';
import FormDialog from './FormDialog';

import { trackFormSchema, type TTrackForm } from '@/lib/schemas';
import type { ApiError, TTrack } from '@/types';
import { customToast } from '../ui/toasts';
import { selectGenres } from '@/features/genres/genresSlice';
import { selectTracks } from '@/features/tracks/tracksSlice';

interface ITrackEditor {
  track: TTrack;
  isOpenModal: boolean;
  setIsOpenModal: (val: boolean) => void;
}

function EditTrackForm({ track, isOpenModal, setIsOpenModal }: ITrackEditor) {
  const dispatch = useAppDispatch();

  const { genres } = useAppSelector(selectGenres);
  const { isLoading } = useAppSelector(selectTracks);

  useEffect(() => {
    dispatch(fetchGenres())
      .unwrap()
      .catch((err: ApiError) => {
        customToast.error(`Fetch failed: ${err.message}`);
      });
  }, [dispatch]);

  const form = useForm<TTrackForm>({
    resolver: zodResolver(trackFormSchema),
    defaultValues: {
      title: track.title,
      artist: track.artist,
      album: track.album ?? '',
      coverImage: track.coverImage ?? '',
      genres: track.genres,
    },
  });

  const onSubmit = (values: TTrackForm) => {
    dispatch(editTrack({ ...values, id: track.id })).then((result) => {
      if (editTrack.rejected.match(result)) {
        const err = result.payload ?? {
          message: 'Unknown error',
        };
        return customToast.error(err.message);
      }
      customToast.success('Track updated successfully');
    });
  };

  return (
    <FormDialog
      isOpen={isOpenModal}
      title='Edit track'
      onClose={() => {
        setIsOpenModal(false);
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
            {isLoading ? 'Saving...' : 'Update'}
          </Button>
        </form>
      </Form>
    </FormDialog>
  );
}

export default EditTrackForm;
