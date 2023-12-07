import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getSubmittingStatus } from '../../store/user-process/user-process.selectors';
import { Gender } from '../../types/gender.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { GenderPreference } from '../../types/gender-preference.enum';
import { createTrainingAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import CreateTrainingDto from '../../dto/create-training.dto';
import DropdownSelect from '../../components/dropdown-select/dropdown-select';
import LabeledInput from '../../components/labeled-input/labeled-input';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import RadioSelect from '../../components/radio-select/radio-select';

function CreateTrainingScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(getSubmittingStatus);

  const { selectedGender, handleSexChange } = useRegisterForm();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const caloriesRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);

  const [description, setDescription] = useState<string | null>(null);
  const [selectedType, setType] = useState<WorkoutType | null>(null);
  const [selectedDuration, setDuration] = useState<WorkoutDuration | null>(null);
  const [selectedLevel, setLevel] = useState<TrainingLevel | null>(null);

  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.target.value);
  };

  const handleCreate = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (nameRef.current !== null &&
        priceRef.current !== null &&
        caloriesRef.current !== null &&
        description !== null &&
        selectedLevel !== null &&
        selectedType !== null &&
        selectedDuration !== null
    ){
      const trainingData: CreateTrainingDto = {
        name: nameRef.current.value,
        trainingLevel: selectedLevel,
        workoutType: selectedType,
        workoutDuration: selectedDuration,
        price: parseInt(priceRef.current.value, 10),
        calories: parseInt(caloriesRef.current.value, 10),
        description,
        genderPreference: GenderPreference.All,
        video: 'video.mov'
      };

      onCreate(trainingData);
    }
  };

  const onCreate = (trainingData: CreateTrainingDto) => {
    dispatch(createTrainingAction(trainingData));
  };

  const handleSpecializationChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const newType = evt.currentTarget.textContent as WorkoutType;
    setType(newType);
  };

  const handleDurationChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const newDuration = evt.currentTarget.textContent as WorkoutDuration;
    setDuration(newDuration);
  };

  const handleLevelChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const newLevel = evt.currentTarget.textContent as TrainingLevel;
    setLevel(newLevel);
  };

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
                          <input type="text" name="training-name" id="training-name" ref={nameRef} required/>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Характеристики тренировки</h2>
                    <div className="create-training__info">
                      <DropdownSelect label={'Выберите тип тренировки'} onValueChange={handleSpecializationChange} selectedValue={selectedType} object={Object.values(WorkoutType)}/>
                      <LabeledInput classType={'custom-input custom-input--with-text-right'} type={'number'} label="Сколько калорий потратим" inputName="calories" text="ккал" reference={caloriesRef}/>
                      <DropdownSelect label={'Сколько времени потратим'} onValueChange={handleDurationChange} selectedValue={selectedDuration} object={Object.values(WorkoutDuration)}/>
                      <LabeledInput classType={'custom-input custom-input--with-text-right'} type={'number'} label="Стоимость тренировки" inputName="price" text="₽" reference={priceRef}/>
                      <DropdownSelect label={'Выберите уровень тренировки'} onValueChange={handleLevelChange} selectedValue={selectedLevel} object={Object.values(TrainingLevel)}/>
                      <RadioSelect
                        name={'gender'}
                        classType={'create-training__radio-wrapper'}
                        classLabelType={'create-training__label'}
                        toNextLine
                        label={'Кому подойдет тренировка'}
                        classChildType={'custom-toggle-radio create-training__radio'}
                        selectedValue={selectedGender}
                        onValueChange={handleSexChange}
                        object={Object.values(Gender)}
                      />
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
