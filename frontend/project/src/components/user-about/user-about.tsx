type UserAboutProps = {
  name: string;
  description: string;
}

function UserAbout({name, description}: UserAboutProps):JSX.Element {
  const isEdit: boolean = false;
  return (
    <div className={`user-info${isEdit && '-edit'}__section`}>
      <h2 className={`user-info${isEdit && '-edit'}__title`}>Обо мне</h2>
      <div className={`custom-input ${!isEdit && 'custom-input--readonly'} user-info${isEdit && '-edit'}__input`}>
        <label>
          <span className="custom-input__label">Имя</span>
          <span className="custom-input__wrapper">
            <input type="text" name="name" value={name} disabled={!isEdit}/>
          </span>
        </label>
      </div>
      <div className={`custom-textarea ${!isEdit && 'custom-textarea--readonly'} user-info${isEdit && '-edit'}__textarea`}>
        <label>
          <span className="custom-textarea__label">Описание</span>
          <textarea name="description" value={description} placeholder=" " disabled={!isEdit}></textarea>
        </label>
      </div>
    </div>
  );
}

export default UserAbout;
