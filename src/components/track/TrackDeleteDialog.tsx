import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface ITrackDeleteDialogProps {
  isFileDeleteOpen: boolean;
  isTrackDeleteOpen: boolean;
  setIsFileDeleteOpen: (open: boolean) => void;
  setIsTrackDeleteOpen: (open: boolean) => void;
  onDeleteFile: () => void;
  onDeleteTrack: () => void;
}

function TrackDeleteDialog({
  isFileDeleteOpen,
  isTrackDeleteOpen,
  setIsFileDeleteOpen,
  setIsTrackDeleteOpen,
  onDeleteFile,
  onDeleteTrack,
}: ITrackDeleteDialogProps) {
  return (
    <>
      <AlertDialog open={isFileDeleteOpen} onOpenChange={setIsFileDeleteOpen}>
        <AlertDialogContent data-testid='confirm-dialog'>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete file from this track?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex justify-between'>
            <AlertDialogCancel data-testid='cancel-delete'>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-testid='confirm-delete'
              onClick={onDeleteFile}
            >
              Delete File
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isTrackDeleteOpen} onOpenChange={setIsTrackDeleteOpen}>
        <AlertDialogContent data-testid='confirm-dialog'>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this track?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex justify-between'>
            <AlertDialogCancel data-testid='cancel-delete'>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-testid='confirm-delete'
              onClick={onDeleteTrack}
            >
              Delete Track
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default TrackDeleteDialog;
