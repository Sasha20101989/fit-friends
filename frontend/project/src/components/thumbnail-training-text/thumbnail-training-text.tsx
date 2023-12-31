type ThumbnailTrainingTextProps = {
  text: string;
}

function ThumbnailTrainingText({ text }: ThumbnailTrainingTextProps): JSX.Element {
  return (
    <div className="thumbnail-training__text-wrapper">
      <p className="thumbnail-training__text">{text}</p>
    </div>
  );
}

export default ThumbnailTrainingText;
