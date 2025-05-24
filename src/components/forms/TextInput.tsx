import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ITextInputFieldProps {
  name: string;
  label: string;
  testId?: string;
  control: any;
}

function TextInputField({
  name,
  label,
  testId,
  control,
}: ITextInputFieldProps) {
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
