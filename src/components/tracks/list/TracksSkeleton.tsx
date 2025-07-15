import { Skeleton } from '../../ui/skeleton';

interface ITrackSkeletonProps {
  tracksQuantity?: number;
}

function TracksSkeleton({ tracksQuantity = 10 }: ITrackSkeletonProps) {
  return (
    <ul
      data-testid="loading-tracks"
      className="px-4 space-y-[29px]"
    >
      {Array.from({ length: tracksQuantity }).map(() => (
        <li
          key={crypto.randomUUID()}
          className="flex gap-4 items-center"
        >
          <Skeleton className="size-[50px] shrink-0 rounded-full bg-skeleton" />
          <div className="w-full flex flex-col gap-1 justify-center">
            <Skeleton className="w-full h-[14px] bg-skeleton rounded mb-2" />
            <Skeleton className="w-3/4 h-[14px] bg-skeleton rounded mb-2" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TracksSkeleton;
