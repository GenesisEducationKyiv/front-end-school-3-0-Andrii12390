import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Upload, File, Trash2 } from 'lucide-react';
import { type TTrack } from '@/types';

interface TrackFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: TTrack;
  onFileUpload: (file: File) => void;
  onDeleteFile: () => void;
}

function TrackFileDialog({
  isOpen,
  onClose,
  track,
  onFileUpload,
  onDeleteFile,
}: TrackFileModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      onClose();
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const audioFile = files.find((file) => file.type.startsWith('audio/'));

    if (audioFile) {
      onFileUpload(audioFile);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl tracking-wide'>
            Manage Track File
          </DialogTitle>
          <p className='text-center text-sm text-muted-foreground'>
            {track.title} - {track.artist}
          </p>
        </DialogHeader>

        <div className='space-y-4'>
          {!track.audioFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-primary bg-primary/10'
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFileSelect}
            >
              <Upload className='size-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='font-medium mb-2'>Drop your audio file here</h3>
              <p className='text-muted-foreground text-sm mb-4'>
                or click to browse
              </p>
              <p className='text-muted-foreground/75 text-xs'>
                Supports MP3, WAV, FLAC, AAC files
              </p>
            </div>
          ) : (
            <div className='bg-primary/15 rounded-lg p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='size-10 bg-primary rounded-lg flex items-center justify-center'>
                    <File className='size-5' />
                  </div>
                  <div>
                    <p className='font-medium text-sm'>Audio file uploaded</p>
                    <p className='text-xs text-muted-foreground'>
                      File is ready to play
                    </p>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={onDeleteFile}
                  className='text-destructive hover:text-destructive hover:bg-destructive/10'
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className='mt-4 pt-4 border-t border-border'>
                <Button
                  variant='outline'
                  onClick={handleFileSelect}
                  className='w-full'
                >
                  <Upload size={16} />
                  Replace File
                </Button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type='file'
            accept='audio/*'
            onChange={handleFileInputChange}
            className='hidden'
          />
        </div>

        <div className='flex gap-3 mt-6'>
          <Button variant='outline' onClick={onClose} className='flex-1'>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TrackFileDialog;
