import { useEffect, useState } from 'react';

type UserEditButtonProps = {
  isFormEditable: boolean;
  onToggleFormEditable: () => void;
  onSave: () => void;
}

function UserEditButton({isFormEditable, onToggleFormEditable, onSave}: UserEditButtonProps):JSX.Element {
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
      className={`btn-flat btn-flat--underlined user-info${isFormEditable ? '-edit__save' : '__edit'}-button`}
      type="button"
      aria-label={isFormEditable ? 'Сохранить' : 'Редактировать'}
    >
      <svg width="12" height="12" aria-hidden="true">
        <use xlinkHref="#icon-edit"></use>
      </svg>
      <span>{isFormEditable ? 'Сохранить' : 'Редактировать'}</span>
    </button>
  );
}

export default UserEditButton;
