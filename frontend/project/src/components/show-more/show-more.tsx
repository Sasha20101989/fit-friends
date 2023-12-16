

import { memo } from 'react';

type ShowMoreProps = {
  onShowMoreClick: () => void;
}

function ShowMore({ onShowMoreClick }: ShowMoreProps):JSX.Element {
  const handleShowMoreClick = () => {
    onShowMoreClick();
  };

  return (
    <button className="btn show-more__button show-more__button--more" type="button" onClick={handleShowMoreClick}>
      Показать еще
    </button>
  );
}

export default memo(ShowMore);
