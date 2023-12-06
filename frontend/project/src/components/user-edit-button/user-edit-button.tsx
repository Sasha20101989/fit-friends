type UserEditButtonProps = {
  isFormEditable: boolean;
  onToggleFormEditable: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function UserEditButton({isFormEditable, onToggleFormEditable}: UserEditButtonProps):JSX.Element {
  return(
    <button
      onClick={onToggleFormEditable}
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
