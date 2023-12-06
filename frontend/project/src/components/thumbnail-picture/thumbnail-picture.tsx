type ThumbnailPictureProps = {
  sourceName: string;
  imageSrc: string;
  width: number;
  height: number;
}

function ThumbnailPicture({ imageSrc, sourceName, width, height }: ThumbnailPictureProps): JSX.Element {
  const fileExtension = imageSrc.split('.').pop();
  const imageNameWithoutExtension = imageSrc.replace(/\.[^/.]+$/, '');
  const hostedImage = `http://localhost:3000/${imageNameWithoutExtension}`;

  return (
    <div className={sourceName}>
      <picture>
        <source type="image/webp" srcSet={`${hostedImage}.webp, ${hostedImage}@2x.webp 2x`} />
        <img src={`${hostedImage}.${fileExtension}`} srcSet={`${hostedImage}@2x.${fileExtension} 2x`} width={width} height={height} alt="" />
      </picture>
      {/* <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div> */}
    </div>
  );
}


export default ThumbnailPicture;
