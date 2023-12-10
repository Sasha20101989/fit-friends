type ThumbnailPictureProps = {
  sourceName: string;
  imageSrc: string;
  width: number;
  height: number;
  alt: string;
}

function ThumbnailPicture({ imageSrc, sourceName, width, height, alt }: ThumbnailPictureProps): JSX.Element {
  const fileExtension = imageSrc.split('.').pop();
  const imageNameWithoutExtension = imageSrc.replace(/\.[^/.]+$/, '');
  const hostedImage = `http://localhost:3000/${imageNameWithoutExtension}`;

  return (
    <div className={sourceName}>
      <picture>
        <source type="image/webp" srcSet={`${hostedImage}.webp, ${hostedImage}@2x.webp 2x`} />
        <img
          src={`${hostedImage}${fileExtension ? `.${fileExtension}` : ''}`}
          srcSet={`${hostedImage}@2x.${fileExtension ? fileExtension : ''} 2x`}
          width={width}
          height={height}
          alt={alt}
        />
      </picture>
      {/* <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div> */}
    </div>
  );
}


export default ThumbnailPicture;
