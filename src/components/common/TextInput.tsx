import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Control, FieldValues, Path } from 'react-hook-form';

interface ITextInputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  testId?: string;
  control: Control<T>;
}

function TextInputField<T extends FieldValues>({
  name,
  label,
  testId,
  control,
}: ITextInputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl className='bg-input-background'>
            <Input data-testid={testId} {...field} />
          </FormControl>
          <FormMessage data-testid={`error-${name}`} />
        </FormItem>
      )}
    />
  );
}

export default TextInputField;
