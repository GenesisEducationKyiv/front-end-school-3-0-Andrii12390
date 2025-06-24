import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import TextInputField from '../common/TextInput';
import GenreSelector from './GenreSelector';
import FormDialog from '../common/FormDialog';

import { TrackFormSchema, type TTrack, type TTrackForm } from '@/lib/schemas';
import { useEditTrack } from '@/api/tracks/hooks';
import { useGenres } from '@/api/genres/hooks';

interface IEditTrackForm {
  track: TTrack;
  isOpen: boolean;
  handleClose: () => void;
}

function EditTrackForm({ track, isOpen, handleClose }: IEditTrackForm) {
  const { mutate, isPending } = useEditTrack();
  const { data: genres = [] } = useGenres();

  const form = useForm<TTrackForm>({
    resolver: zodResolver(TrackFormSchema),
    defaultValues: {
      title: track.title,
      artist: track.artist,
      album: track.album ?? '',
      coverImage: track.coverImage ?? '',
      genres: track.genres,
    },
  });

  const onSubmit = (values: TTrackForm) => {
    mutate(values);
  };

  return (
    <FormDialog
      isOpen={isOpen}
      title="Edit track"
      onClose={handleClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <TextInputField
            name="title"
            label="Title"
            testId="input-title"
            control={form.control}
          />
          <TextInputField
            name="artist"
            label="Artist"
            testId="input-artist"
            control={form.control}
          />
          <TextInputField
            name="album"
            label="Album"
            testId="input-album"
            control={form.control}
          />
          <TextInputField
            name="coverImage"
            label="Cover Image URL"
            testId="input-cover-image"
            control={form.control}
          />

          <FormField
            control={form.control}
            name="genres"
            render={({ field }) => (
              <GenreSelector
                genres={genres}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            data-testid="submit-button"
            className="active:scale-95"
          >
            {isPending ? 'Saving...' : 'Update'}
          </Button>
        </form>
      </Form>
    </FormDialog>
  );
}

export default EditTrackForm;
