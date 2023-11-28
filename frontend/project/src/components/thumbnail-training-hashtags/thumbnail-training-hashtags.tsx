type ThumbnailTrainingHashtagsProps = {
  hashtags: string[];
}

function ThumbnailTrainingHashtags({ hashtags }: ThumbnailTrainingHashtagsProps): JSX.Element {
  return (
    <ul className="thumbnail-training__hashtags-list">
      {hashtags.map((hashtag) => (
        <li key={hashtag} className="thumbnail-training__hashtags-item">
          <div className="hashtag thumbnail-training__hashtag">
            <span>{hashtag}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ThumbnailTrainingHashtags;
