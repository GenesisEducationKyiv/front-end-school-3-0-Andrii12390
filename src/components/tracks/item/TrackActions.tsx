import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Pause, Play } from 'lucide-react';
import { useState } from 'react';
import TrackFileDialog from './TrackFileDialog';
import { type TTrack } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { usePlayerStore } from '@/store/usePlayerStore';

interface ITrackActionsProps {
  isChecked: boolean;
  track: TTrack;
  onEdit: () => void;
  onPlay: () => void;
  onFileUpload: (file: File) => void;
  onDeleteFile: () => void;
  onDeleteTrack: () => void;
  handleSelect: () => void;
}

function TrackActions({
  isChecked,
  track,
  onEdit,
  onPlay,
  onFileUpload,
  onDeleteFile,
  onDeleteTrack,
  handleSelect,
}: ITrackActionsProps) {
  const activeTrack = usePlayerStore(state => state.activeTrack);
  const isPlaying = usePlayerStore(state => state.isPlaying);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPlay}
      >
        {activeTrack?.id === track.id && isPlaying ? (
          <Pause className={`${!track.audioFile && 'text-muted'} size-5`} />
        ) : (
          <Play className={`${!track.audioFile && 'text-muted'} size-5`} />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
          >
            <MoreVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-input-background border-2 border-border"
        >
          <DropdownMenuItem onClick={onEdit}>Edit Track</DropdownMenuItem>

          <DropdownMenuItem onClick={openModal}>Manage File</DropdownMenuItem>

          <DropdownMenuItem onClick={onDeleteTrack}>Delete Track</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Checkbox
        checked={isChecked}
        className="size-5 ml-2"
        onCheckedChange={handleSelect}
        onClick={e => e.stopPropagation()}
      />

      <TrackFileDialog
        isOpen={isModalOpen}
        onClose={closeModal}
        track={track}
        onFileUpload={onFileUpload}
        onDeleteFile={onDeleteFile}
      />
    </div>
  );
}

export default TrackActions;
