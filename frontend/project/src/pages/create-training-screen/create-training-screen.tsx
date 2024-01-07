import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getSubmittingStatus } from '../../store/user-process/user-process.selectors';
import { Gender } from '../../types/gender.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { createTrainingAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import CreateTrainingDto from '../../dto/create-training.dto';
import DropdownSelect from '../../components/dropdown-select/dropdown-select';
import LabeledInput from '../../components/labeled-input/labeled-input';
import RadioSelect from '../../components/radio-select/radio-select';
import Layout from '../../components/layout/layout';
import { useNavigate } from 'react-router-dom';
import { AppRoute, CALORIES_CONSTRAINTS, DESCRIPTION_CONSTRAINTS, PRICE_CONSTRAINTS, TRAINING_NAME_CONSTRAINTS, capitalizeFirstLetter, genderToPreference } from '../../const';

const errorStyle = {
  color: '#e4001b',
  opacity: 1,
  marginTop: '6px'
};

function CreateTrainingScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSubmitting = useAppSelector(getSubmittingStatus);

  const nameRef = useRef<HTMLInputElement | null>(null);

  const [description, setDescription] = useState<string | null>(null);
  const [selectedType, setType] = useState<WorkoutType | undefined>(undefined);
  const [selectedDuration, setDuration] = useState<WorkoutDuration | undefined>(undefined);
  const [selectedGender, setSelectedGender] = useState<Gender | undefined>(undefined);
  const [selectedLevel, setLevel] = useState<TrainingLevel | undefined>(undefined);
  const [selectedVideo, setVideo] = useState<File | null>(null);
  const [selectedCalories, setSelectedCalories] = useState<number>(0);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [typeError, setTypeError] = useState('');
  const [durationError, setDurationError] = useState('');
  const [levelError, setLevelError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [videoError, setVideoError] = useState('');

  const handleDescriptionChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.target.value);
    setDescriptionError('');
  };

  const handleCaloriesChange = (value: string) => {
    setSelectedCalories(parseInt(value, 10));
  };

  const handlePriceChange = (value: string) => {
    setSelectedPrice(parseInt(value, 10));
  };

  const handleSexChange = (evt: ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>) => {
    const gender = 'value' in evt.target ?
      (evt.target as HTMLInputElement).value as Gender :
        (evt.target as HTMLLIElement).dataset.value as Gender;

    setSelectedGender(gender);
  };

  const handleCreate = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(selectedType === undefined){
      setTypeError('Выберите тип тренировки');
      return;
    }

    if(selectedLevel === undefined){
      setLevelError('Выберите уровень тренировки');
      return;
    }

    if(selectedDuration === undefined){
      setDurationError('Сколько времени потратим');
      return;
    }

    if(selectedGender === undefined){
      setGenderError('Выберите пол');
      return;
    }

<<<<<<< HEAD
    if (
      (description && description.length < DESCRIPTION_CONSTRAINTS.MIN_LENGTH) ||
      (description && description.length > DESCRIPTION_CONSTRAINTS.MAX_LENGTH)
    ) {
=======
    if(
      (description && description.length < DESCRIPTION_CONSTRAINTS.MIN_LENGTH) ||
      (description && description.length > DESCRIPTION_CONSTRAINTS.MAX_LENGTH)
    ){
>>>>>>> refactoring
      setDescriptionError(`Длина описания должна быть от ${DESCRIPTION_CONSTRAINTS.MIN_LENGTH} до ${DESCRIPTION_CONSTRAINTS.MAX_LENGTH} символов`);
      return;
    }

    if(selectedVideo === null || selectedVideo === null){
      setVideoError('Выберите файл в предложенном формате');
      return;
    }

    if (nameRef.current !== null &&
        selectedCalories !== 0 &&
        description !== null &&
        selectedVideo !== null
    ){
      const trainingData: CreateTrainingDto = {
        name: nameRef.current.value,
        trainingLevel: selectedLevel,
        workoutType: selectedType,
        workoutDuration: selectedDuration,
        price: selectedPrice,
        calories: selectedCalories,
        description,
        genderPreference: genderToPreference(selectedGender),
        video: selectedVideo,
        specialOffer: false
      };

      onCreate(trainingData);
    }
  };

  const onCreate = (trainingData: CreateTrainingDto) => {
    dispatch(createTrainingAction(trainingData));
    navigate(AppRoute.Main);
  };

  const handleSpecializationChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const newType = evt.currentTarget.textContent as WorkoutType;
    setType(newType);
    setTypeError('');
    setIsTypeDropdownOpen(false);
  };

  const handleDurationChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const newDuration = evt.currentTarget.textContent as WorkoutDuration;
    setDuration(newDuration);
    setDurationError('');
    setIsDurationDropdownOpen(false);
  };

  const handleLevelChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const newLevel = evt.currentTarget.textContent as TrainingLevel;
    setLevel(newLevel);
    setLevelError('');
    setIsLevelDropdownOpen(false);
  };

  const handleVideoChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    const file = evt.target.files?.[0];

    const isMovOrAviOrMp4 = file?.type === 'video/quicktime' || file?.type === 'video/avi' || file?.type === 'video/mp4';

    if (isMovOrAviOrMp4) {
      setVideo(file);
      setVideoError('');
    } else {
      setVideoError('Выбранный файл должен быть формата (mov) или (avi) или (mp4).');
    }
  };

  const handleToggleTypeDropdown = () => setIsTypeDropdownOpen(!isTypeDropdownOpen);
  const handleDurationToggleDropdown = () => setIsDurationDropdownOpen(!isDurationDropdownOpen);
  const handleLevelToggleDropdown = () => setIsLevelDropdownOpen(!isLevelDropdownOpen);

  return(
    <Layout>
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
                            <input type="text" name="training-name" id="training-name" ref={nameRef} required minLength={TRAINING_NAME_CONSTRAINTS.MIN_LENGTH} maxLength={TRAINING_NAME_CONSTRAINTS.MAX_LENGTH}/>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Характеристики тренировки</h2>
                      <div className="create-training__info">
                        <DropdownSelect
                          classType={`custom-select ${!isTypeDropdownOpen ? 'select--not-selected' : 'is-open'} ${typeError && 'is-invalid'}`} label={'Выберите тип тренировки'}
                          onValueChange={handleSpecializationChange}
                          selectedValue={selectedType ?? capitalizeFirstLetter(selectedType)}
                          object={Object.values(WorkoutType)}
                          onToggleDropdown={handleToggleTypeDropdown}
                          error={typeError}
                        />
                        <LabeledInput
                          classType={'custom-input custom-input--with-text-right'}
                          type={'number'}
                          label="Сколько калорий потратим"
                          inputName="calories"
                          text="ккал"
                          min={CALORIES_CONSTRAINTS.MIN}
                          max={CALORIES_CONSTRAINTS.MAX}
                          onChange={handleCaloriesChange}
                        />
                        <DropdownSelect
                          classType={`custom-select ${!isDurationDropdownOpen ? 'select--not-selected' : 'is-open'} ${durationError && 'is-invalid'}`} label={'Сколько времени потратим'}
                          onValueChange={handleDurationChange}
                          selectedValue={selectedDuration ?? capitalizeFirstLetter(selectedDuration)}
                          object={Object.values(WorkoutDuration).filter((duration) => duration !== WorkoutDuration.Unknown)}
                          onToggleDropdown={handleDurationToggleDropdown}
                          error={durationError}
                        />
                        <LabeledInput
                          classType={'custom-input custom-input--with-text-right'}
                          type={'number'}
                          label="Стоимость тренировки"
                          inputName="price"
                          text="₽"
                          min={PRICE_CONSTRAINTS.MIN}
                          onChange={handlePriceChange}
                        />
                        <DropdownSelect
                          classType={`custom-select ${!isLevelDropdownOpen ? 'select--not-selected' : 'is-open'} ${levelError && 'is-invalid'}`}
                          label={'Выберите уровень тренировки'}
                          onValueChange={handleLevelChange}
                          selectedValue={selectedLevel ?? capitalizeFirstLetter(selectedLevel)}
                          object={Object.values(TrainingLevel).filter((level) => level !== TrainingLevel.Unknown)}
                          onToggleDropdown={handleLevelToggleDropdown}
                          error={levelError}
                        />
                        <RadioSelect
                          name={'gender'}
                          classType={'create-training__radio-wrapper'}
                          classLabelType={'create-training__label'}
                          toNextLine
                          label={'Кому подойдет тренировка'}
                          classChildType={'custom-toggle-radio create-training__radio'}
                          selectedValue={selectedGender}
                          onValueChange={handleSexChange}
                          object={Object.values(Gender).filter((gender) => gender !== Gender.Unknown)}
                          error={genderError}
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
                          {descriptionError && <span style={errorStyle}>{descriptionError}</span>}
                        </label>
                      </div>
                    </div>
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                      <div className="drag-and-drop create-training__drag-and-drop">
                        <label>
                          <span className="drag-and-drop__label" tabIndex={0}>{selectedVideo ? selectedVideo.name : 'Загрузите сюда файлы формата MOV, AVI или MP4'}
                            <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import-video"></use>
                            </svg>
                          </span>
                          <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" id="video-input" onChange={handleVideoChange}/>
                        </label>
                        {videoError && <span style={errorStyle}>{videoError}</span>}
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
    </Layout>
  );
}

export default CreateTrainingScreen;
