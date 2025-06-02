interface ITrackCoverProps {
  coverImage: string | undefined;
}

function TrackCover({ coverImage }: ITrackCoverProps) {
  return (
    <img
      src={coverImage || './default-track.png'}
      alt='Track cover image'
      width={50}
      height={50}
      className='rounded-md'
    />
  );
}

export default TrackCover;
