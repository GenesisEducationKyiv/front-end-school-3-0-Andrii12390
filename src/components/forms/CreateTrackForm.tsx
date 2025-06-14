import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormDialog from '../common/FormDialog';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { createTrack } from '@/features/tracks/trackThunks';
import { Button } from '@/components/ui/button';
import { TrackFormSchema, type TTrackForm } from '@/lib/schemas';
import TextInputField from '../common/TextInput';
import GenreSelector from './GenreSelector';
import { customToast } from '../ui/toasts';
import { selectGenres } from '@/features/genres/genresSlice';
import { selectTracks } from '@/features/tracks/tracksSlice';

interface ICreateTrackFormProps {
  isOpen: boolean;
  handleClose: () => void;
}

function CreateTrackForm({ isOpen, handleClose }: ICreateTrackFormProps) {
  const dispatch = useAppDispatch();
  const { genres } = useAppSelector(selectGenres);
  const { isLoading } = useAppSelector(selectTracks);

  const form = useForm<TTrackForm>({
    resolver: zodResolver(TrackFormSchema),
    defaultValues: {
      title: '',
      artist: '',
      album: '',
      coverImage: '',
      genres: [],
    },
  });

  const onSubmit = (values: TTrackForm) => {
    dispatch(createTrack(values)).then((result) => {
      if (createTrack.fulfilled.match(result)) {
        customToast.success('Track created successfully');
      } else {
        const error = result.payload ?? { message: 'Unknown error' };
        customToast.error(error.message);
      }
    });
  };

  return (
    <FormDialog isOpen={isOpen} title='Create Track' onClose={handleClose}>
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
