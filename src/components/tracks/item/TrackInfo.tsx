interface ITrackInfoProps {
  coverImage?: string;
  title: string;
  artist: string;
  trackId: string;
}

function TrackInfo({ coverImage, title, artist, trackId }: ITrackInfoProps) {
  return (
    <section className='flex gap-4 items-center'>
      <img
        src={coverImage || './default-track.png'}
        alt='Track cover image'
        width={50}
        height={50}
        className='rounded-md'
      />
      <section>
        <p
          data-testid={`track-item-${trackId}-title`}
          className='font-semibold'
        >
          {title}
        </p>
        <p data-testid={`track-item-${trackId}-artist`}>{artist}</p>
      </section>
    </section>
  );
}

export default TrackInfo;
