interface ITrackInfoProps {
  title: string;
  artist: string;
  trackId: string;
}

function TrackInfo({ title, artist, trackId }: ITrackInfoProps) {
  return (
    <section>
      <p data-testid={`track-item-${trackId}-title`} className='font-semibold'>
        {title}
      </p>
      <p data-testid={`track-item-${trackId}-artist`}>{artist}</p>
    </section>
  );
}

export default TrackInfo;
