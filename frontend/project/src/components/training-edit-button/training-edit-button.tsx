import { useEffect, useState } from 'react';

type TrainingEditButtonProps = {
  isFormEditable: boolean;
  onToggleFormEditable: () => void;
  onSave: () => void;
}

function TrainingEditButton({isFormEditable, onToggleFormEditable, onSave}: TrainingEditButtonProps):JSX.Element {
  const [shouldSave, setShouldSave] = useState(false);

  useEffect(() => {
    if (!isFormEditable && shouldSave) {
      onSave();
      setShouldSave(false);
    }
  }, [isFormEditable, onSave, shouldSave]);

  const handleToggleFormEditable = () => {
    if (isFormEditable) {
      setShouldSave(true);
    }
    onToggleFormEditable();
  };

  return(
    <button
      onClick={handleToggleFormEditable}
      className="btn-flat btn-flat--light training-info__edit training-info__edit--edit btn-flat--underlined"
      type="button"
    >
      <svg width="12" height="12" aria-hidden="true">
        <use xlinkHref="#icon-edit"></use>
      </svg>
      <span>{isFormEditable ? 'Сохранить' : 'Редактировать'}</span>
    </button>
  );
}

export default TrainingEditButton;
