import { useState } from 'react';

type UserAboutProps = {
  name: string;
  description: string;
  isFormEditable: boolean;
}

function UserAbout({name, description, isFormEditable}: UserAboutProps):JSX.Element {
  const [changedName, setName] = useState<string | null>(name);
  const [changedDescription, setDescription] = useState<string | null>(description);

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.target.value);
  };

  return (
    <div className={`user-info${isFormEditable ? '-edit' : ''}__section`}>
      <h2 className={`user-info${isFormEditable ? '-edit' : ''}__title`}>Обо мне</h2>
      <div className={`custom-input ${!isFormEditable ? 'custom-input--readonly' : ''} user-info${isFormEditable ? '-edit' : ''}__input`}>
        <label>
          <span className="custom-input__label">Имя</span>
          <span className="custom-input__wrapper">
            <input
              type="text"
              name="name"
              value={changedName ?? ''}
              onChange={handleNameChange}
              disabled={!isFormEditable}
              required
            />
          </span>
        </label>
      </div>
      <div className={`custom-textarea ${!isFormEditable ? 'custom-textarea--readonly' : ''} user-info${isFormEditable ? '-edit' : ''}__textarea`}>
        <label>
          <span className="custom-textarea__label">Описание</span>
          <textarea
            name="description"
            placeholder=" "
            value={changedDescription ?? ''}
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
