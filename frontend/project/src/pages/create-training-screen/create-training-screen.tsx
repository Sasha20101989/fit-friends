import { FormEvent, useRef, useState } from 'react';
import GenderItem from '../../components/gender-item/gender-item';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { getSubmittingStatus, getUser } from '../../store/user-process/user-process.selectors';
import { Gender } from '../../types/gender.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { GenderPreference } from '../../types/gender-preference.enum';
import { Trainer } from '../../types/trainer.interface';
import { createTrainingAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import CreateTrainingDto from '../../dto/create-training.dto.js';

function CreateTrainingScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(getSubmittingStatus);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const user = useAppSelector(getUser) as Trainer;

  const [description, setDescription] = useState<string | null>(null);

  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.target.value);
  };

  const handleCreate = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (nameRef.current !== null && description !== null && user.id) {
      const trainingData: CreateTrainingDto = {
        name: nameRef.current.value,
        trainingLevel: TrainingLevel.Amateur,
        workoutType: WorkoutType.Aerobics,
        workoutDuration: WorkoutDuration.ExtraLong,
        price: 0,
        calories: 0,
        description,
        genderPreference: GenderPreference.All,
        video: 'video.mov',
        trainer: user.id
      };

      onCreate(trainingData);
    }
  };

  const onCreate = (trainingData: CreateTrainingDto) => {
    dispatch(createTrainingAction(trainingData));
  };

  const {
    isDropdownOpen,
    handleToggleDropdown } = useRegisterForm();

  return(
    <div className="popup-form popup-form--create-training">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Создание тренировки</h1>
          </div>
          <div className="popup-form__form">
            <form method="get" onSubmit={handleCreate}>
              <div className="create-training">
                <div className="create-training__wrapper">
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Название тренировки</h2>
                    <div className="custom-input create-training__input">
                      <label>
                        <span className="custom-input__wrapper">
                          <input type="text" name="training-name" id="training-name" ref={nameRef}/>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Характеристики тренировки</h2>
                    <div className="create-training__info">
                      <div className={`custom-select ${!isDropdownOpen ? 'select--not-selected' : 'is-open'}`}>
                        <span className="custom-select__label">Выберите тип тренировки</span>
                        <button className="custom-select__button" type="button" onClick={handleToggleDropdown} aria-label="Выберите одну из опций">
                          <span className="custom-select__text"></span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-down"></use>
                            </svg>
                          </span>
                        </button>
                        <ul className="custom-select__list" role="listbox">
                        </ul>
                      </div>
                      <div className="custom-input custom-input--with-text-right">
                        <label>
                          <span className="custom-input__label">Сколько калорий потратим</span>
                          <span className="custom-input__wrapper">
                            <input type="number" name="calories"/>
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                      <div className={`custom-select ${!isDropdownOpen ? 'select--not-selected' : 'is-open'}`}>
                        <span className="custom-select__label">Сколько времени потратим</span>
                        <button className="custom-select__button" type="button" onClick={handleToggleDropdown} aria-label="Выберите одну из опций">
                          <span className="custom-select__text"></span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-down"></use>
                            </svg>
                          </span>
                        </button>
                        <ul className="custom-select__list" role="listbox">
                        </ul>
                      </div>
                      <div className="custom-input custom-input--with-text-right">
                        <label>
                          <span className="custom-input__label">Стоимость тренировки</span>
                          <span className="custom-input__wrapper">
                            <input type="number" name="price"/>
                            <span className="custom-input__text">₽</span>
                          </span>
                        </label>
                      </div>
                      <div className={`custom-select ${!isDropdownOpen ? 'select--not-selected' : 'is-open'}`}>
                        <span className="custom-select__label">Выберите уровень тренировки</span>
                        <button className="custom-select__button" type="button" onClick={handleToggleDropdown} aria-label="Выберите одну из опций">
                          <span className="custom-select__text"></span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-down"></use>
                            </svg>
                          </span>
                        </button>
                        <ul className="custom-select__list" role="listbox">
                        </ul>
                      </div>
                      <div className="create-training__radio-wrapper">
                        <span className="create-training__label">Кому подойдет тренировка</span>
                        <br/>
                        <div className="custom-toggle-radio create-training__radio">
                          {Object.values(Gender).map((gender) => (
                            <GenderItem key={gender} gender={gender}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Описание тренировки</h2>
                    <div className="custom-textarea create-training__textarea">
                      <label>
                        <textarea
                          name="description"
                          placeholder=" "
                          value={description ?? ''}
                          onChange={handleDescriptionChange}
                          required
                        >
                        </textarea>
                      </label>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                    <div className="drag-and-drop create-training__drag-and-drop">
                      <label>
                        <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import-video"></use>
                          </svg>
                        </span>
                        <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4"/>
                      </label>
                    </div>
                  </div>
                </div>
                <button className="btn create-training__button" type="submit" disabled={isSubmitting}>Опубликовать</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrainingScreen;
