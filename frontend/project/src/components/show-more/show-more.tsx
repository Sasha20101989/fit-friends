import { memo } from 'react';

type ShowMoreProps = {
  sourceName: string;
  length: number;
  limit: number | undefined;
  onShowMoreClick: () => void;
}

function ShowMore({ sourceName, length, limit, onShowMoreClick }: ShowMoreProps):JSX.Element {
  const handleShowMoreClick = () => {
    onShowMoreClick();
  };

  return (
    <div className={sourceName}>
      {length > 0 && limit && length % limit === 0 && (
        <button className="btn show-more__button show-more__button--more" type="button" onClick={handleShowMoreClick}>
          Показать еще
        </button>
      )}
      <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
    </div>
  );
}

export default memo(ShowMore);

