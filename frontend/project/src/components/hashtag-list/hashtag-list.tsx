type HashtagListProps = {
  classType: string;
  hashtagClassType: string;
  hashtagItemClassType: string;
  hashtags: string[];
}

function HashtagList({classType, hashtagClassType, hashtagItemClassType, hashtags}: HashtagListProps): JSX.Element {
  return(
    <ul className={classType}>
      {hashtags.map((hashtag) => (
        <li key={hashtag} className={hashtagClassType}>
          <div className={hashtagItemClassType}>
            <span>{`#${hashtag}`}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default HashtagList;
