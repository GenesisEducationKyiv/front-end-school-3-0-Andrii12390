import { Skeleton } from '../../ui/skeleton';

interface ITrackSkeletonProps {
  tracksQuantity?: number;
}

function TracksSkeleton({ tracksQuantity = 10 }: ITrackSkeletonProps) {
  return (
    <ul data-testid='loading-tracks' className='px-2'>
      {Array.from({ length: tracksQuantity }).map(() => (
        <li key={Math.floor(Math.random() * 1e6)} className='flex gap-4 mb-3'>
          <Skeleton className='size-[64px] shrink-0 rounded-full bg-skeleton' />
          <div className='w-full flex flex-col gap-2 justify-center'>
            <Skeleton className='w-full h-[16px] bg-skeleton rounded mb-2' />
            <Skeleton className='w-3/4 h-[16px] bg-skeleton rounded mb-2' />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TracksSkeleton;
