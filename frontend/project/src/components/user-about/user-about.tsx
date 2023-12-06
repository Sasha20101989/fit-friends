import useRegisterForm from '../../hooks/use-register-form/use-register-form';

type UserAboutProps = {
  name: string;
  description: string;
  isFormEditable: boolean;
}

function UserAbout({name, description, isFormEditable}: UserAboutProps):JSX.Element {
  const {
    descriptionRef,
    handleDescriptionChange} = useRegisterForm();
  return (
    <div className={`user-info${isFormEditable ? '-edit' : ''}__section`}>
      <h2 className={`user-info${isFormEditable ? '-edit' : ''}__title`}>Обо мне</h2>
      <div className={`custom-input ${!isFormEditable ? 'custom-input--readonly' : ''} user-info${isFormEditable ? '-edit' : ''}__input`}>
        <label>
          <span className="custom-input__label">Имя</span>
          <span className="custom-input__wrapper">
            <input type="text" name="name" value={name} disabled={!isFormEditable}/>
          </span>
        </label>
      </div>
      <div className={`custom-textarea ${!isFormEditable ? 'custom-textarea--readonly' : ''} user-info${isFormEditable ? '-edit' : ''}__textarea`}>
        <label>
          <span className="custom-textarea__label">Описание</span>
          <textarea
            name="description"
            placeholder=" "
            ref={descriptionRef}
            value={description ?? ''}
            onChange={handleDescriptionChange}
            disabled={!isFormEditable}
            required
          >
          </textarea>
        </label>
      </div>
    </div>
  );
}

export default UserAbout;
