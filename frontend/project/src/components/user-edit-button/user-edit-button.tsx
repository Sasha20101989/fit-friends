function UserEditButton():JSX.Element {
  const isEdit = false;
  return(
    <button className={`btn-flat btn-flat--underlined user-info${isEdit ? '-edit__save' : '__edit'}-button`} type="button" aria-label={isEdit ? 'Сохранить' : 'Редактировать'}>
      <svg width="12" height="12" aria-hidden="true">
        <use xlinkHref="#icon-edit"></use>
      </svg>
      <span>{isEdit ? 'Сохранить' : 'Редактировать'}</span>
    </button>
  );
}

export default UserEditButton;
