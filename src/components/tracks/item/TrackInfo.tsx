interface ITrackInfoProps {
  coverImage?: string;
  title: string;
  artist: string;
  trackId: string;
}

function TrackInfo({ coverImage, title, artist, trackId }: ITrackInfoProps) {
  return (
    <section className="flex gap-4 items-center">
      <img
        src={coverImage || './default-track.webp'}
        alt="Track cover image"
        width={50}
        height={50}
        className="rounded-md flex-shrink-0"
      />
      <section>
        <p
          data-testid={`track-item-${trackId}-title`}
          className="font-semibold truncate max-w-25 sm:max-w-40 md:max-w-60 xl:max-w-4xl"
        >
          {title}
        </p>
        <p
          data-testid={`track-item-${trackId}-artist`}
          className="truncate text-sm max-w-25 sm:max-w-40 md:max-w-60 xl:max-w-4xl"
        >
          {artist}
        </p>
      </section>
    </section>
  );
}

export default TrackInfo;
