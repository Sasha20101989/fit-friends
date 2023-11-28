type ThumbnailPictureProps = {
  sourceName: string;
  imageSrc: string;
}

function ThumbnailPicture({ imageSrc, sourceName }: ThumbnailPictureProps): JSX.Element {
  return (
    <div className={sourceName}>
      <picture>
        <source type="image/webp" srcSet={`${imageSrc}.webp, ${imageSrc}@2x.webp 2x`} />
        <img src={`${imageSrc}.jpg`} srcSet={`${imageSrc}@2x.jpg 2x`} width="330" height="190" alt="" />
      </picture>
      {/* <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div> */}
    </div>
  );
}

export default ThumbnailPicture;
