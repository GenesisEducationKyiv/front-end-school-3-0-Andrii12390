import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormDialog from '../common/FormDialog';
import { Button } from '@/components/ui/button';
import { TrackFormSchema, type TTrackForm } from '@/lib/schemas';
import TextInputField from '../common/TextInput';
import GenreSelector from './GenreSelector';
import { useCreateTrack } from '@/api/tracks/hooks';
import { useGenres } from '@/api/genres/hooks';

interface ICreateTrackFormProps {
  isOpen: boolean;
  handleClose: () => void;
}

function CreateTrackForm({ isOpen, handleClose }: ICreateTrackFormProps) {
  const { mutate, isPending } = useCreateTrack();
  const { data: genres = [] } = useGenres();

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
    mutate(values);
  };

  return (
    <FormDialog
      isOpen={isOpen}
      title="Create Track"
      onClose={handleClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          data-testid="create-track-form"
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
            {isPending ? 'Saving...' : 'Create'}
          </Button>
        </form>
      </Form>
    </FormDialog>
  );
}

export default CreateTrackForm;
