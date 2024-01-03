import { memo, useEffect, useState } from 'react';

type ImageProps = {
  sourceName: string;
  imageSrc: string;
  width: number;
  height: number;
  alt: string;
}

function Image({imageSrc, sourceName, width, height, alt}: ImageProps): JSX.Element {
  const [hostedImage, setHostedImage] = useState<string>('');
  const [fileExtension, setFileExtension] = useState<string>('');

  useEffect(() => {
    if (imageSrc) {
      const extension = imageSrc.split('.').pop() || '';
      const imageNameWithoutExtension = imageSrc.replace(/\.[^/.]+$/, '');
      setHostedImage(imageNameWithoutExtension);
      setFileExtension(extension);
    }
  }, [imageSrc]);

  return (
    <div className={sourceName} data-testid="certificate-card-image">
      <picture>
        <img
          src={`${hostedImage}${fileExtension ? `.${fileExtension}` : ''}`}
          srcSet={`${hostedImage}@2x.${fileExtension ? fileExtension : ''} 2x`}
          width={width}
          height={height}
          alt={alt}
        />
      </picture>
    </div>
  );
}

export default memo(Image);

