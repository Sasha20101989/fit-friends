type IntroBackgroundProps = {
  sourceName: string;
  imageSrc: string;
  width: number;
  height: number;
}

function IntroBackground({imageSrc, sourceName, width, height}: IntroBackgroundProps): JSX.Element {
  const fileExtension = imageSrc.split('.').pop();
  const imageNameWithoutExtension = imageSrc.replace(/\.[^/.]+$/, '');
  const hostedImage = `http://localhost:3000/${imageNameWithoutExtension}`;

  return (
    <div className={sourceName}>
      <picture>
        <source type="image/webp" srcSet={`${hostedImage}.webp, ${hostedImage}@2x.webp 2x`}/>
        <img
          src={`${hostedImage}${fileExtension ? `.${fileExtension}` : ''}`}
          srcSet={`${hostedImage}@2x.${fileExtension ? fileExtension : ''} 2x`}
          width={width}
          height={height}
          alt="Логотип Fit Friends"
        />
      </picture>
    </div>
  );
}

export default IntroBackground;



