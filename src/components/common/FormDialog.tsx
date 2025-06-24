import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface IFormDialog {
  title: string;
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
}

function FormDialog({ title, isOpen, onClose, children }: IFormDialog) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={isOpen => !isOpen && onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl tracking-wide">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;
