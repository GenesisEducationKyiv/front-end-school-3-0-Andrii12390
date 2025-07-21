import { Skeleton } from '@/components/ui/skeleton';

function PlayerSkeleton() {
  return (
    <div className="max-w-4xl mx-auto flex items-center gap-2">
      <Skeleton className="size-12 rounded-full shrink-0" />
      <div className="w-full space-y-2">
        <Skeleton className="w-50 h-3 rounded" />
        <Skeleton className="w-full h-3 rounded" />
      </div>
    </div>
  );
}

export default PlayerSkeleton;
