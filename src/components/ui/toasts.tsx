import { Check, CircleX } from 'lucide-react';
import { toast } from 'sonner';

const success = (text: string) =>
  toast(
    <div
      data-testid='toast-success'
      className='flex items-center gap-3 text-lg text-green-500'
    >
      <Check className='size-5' />
      <p>{text}</p>
    </div>
  );

const error = (text: string) =>
  toast(
    <div
      data-testid='toast-error'
      className='flex items-center gap-3 text-lg text-red-600'
    >
      <CircleX className='size-5' />
      <p>{text}</p>
    </div>
  );

export const customToast = { success, error };
