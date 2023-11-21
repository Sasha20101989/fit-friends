import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react';
import { RegisterTransferData } from '../../types/register-transfer-data';
import { useNavigate } from 'react-router-dom';
import { AppRoute, MAX_SPECIALIZATIONS_COUNT } from '../../const';

//import { useAppDispatch } from '..';
//import { AppRoute, isValidPassword } from '../../const';
//import { registerAction } from '../../store/api-actions/auth-api-actions/auth-api-actions';
import { toast } from 'react-toastify';
import { Role } from '../../types/role.enum';
import { Gender } from '../../types/gender.enum';
import { Location } from '../../types/location.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutType } from '../../types/workout-type.enum.js';

function useRegisterForm(){
  //const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const birthdayRef = useRef<HTMLInputElement | null>(null);

  const descriptionCoachRef = useRef<HTMLTextAreaElement | null>(null);

  const [selectedLocation, setLocation] = useState<Location | null>(null);
  const [selectedSex, setGenderType] = useState<Gender | null>(Gender.Other);
  const [selectedRole, setRole] = useState<Role | null>(Role.Trainer);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<TrainingLevel>(TrainingLevel.Beginner);
  const [selectedSpecializations, setSelectedSpecializations] = useState<WorkoutType[]>([]);
  const [selectedCoachDescription, setSelectedCoachDescription] = useState<string | null>(null);
  const [isPersonalTrainingSelected, setIsPersonalTrainingSelected] = useState(false);

  const handleRole = (roleData: Role) => {
    const handlers: Record<Role, () => void> = {
      [Role.Trainer]: () => navigate(AppRoute.RegisterTrainer),
      [Role.User]: () => navigate(AppRoute.RegisterUser),
    };

    const errorHandler = () => {
      toast.error('Некорректная роль пользователя');
    };

    (handlers[roleData] || errorHandler)();
  };

  const onSubmit = (registerData: RegisterTransferData) => {
    handleRole(registerData.role);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(!isAgreementChecked){
      toast.error('Подтвердите согласие с политикой конфиденциальности');
      return;
    }

    if (nameRef.current !== null &&
        passwordRef.current !== null &&
        emailRef.current !== null &&
        birthdayRef.current !== null &&
        selectedSex !== null &&
        selectedRole !== null) {

      const formData: RegisterTransferData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        location: Location.Zvezdnaya,
        gender: selectedSex,
        role: selectedRole,
      };

      if (birthdayRef.current !== null) {
        formData.birthDate = birthdayRef.current.value;
      }

      onSubmit(formData);
    }
  };

  const handleLocationChange = (event: MouseEvent<HTMLLIElement>) => {
    const location: Location = event.currentTarget.textContent as Location;
    setLocation(location);
    setIsDropdownOpen(false);
  };

  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const role: Role = event.target.value as Role;
    setRole(role);
  };

  const handleSexChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedGender: Gender = event.target.value as Gender;

    setGenderType(selectedGender);
  };

  const handleAgreementChange = () => {
    setIsAgreementChecked(!isAgreementChecked);
  };

  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newLevel = event.target.value as TrainingLevel;
    setSelectedLevel(newLevel);
  };

  const handleSpecializationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedType = event.target.value as WorkoutType;

    if (event.target.checked) {
      setSelectedSpecializations((prevSelected) => [...prevSelected, selectedType]);
    } else {
      setSelectedSpecializations((prevSelected) => prevSelected.filter((type) => type !== selectedType));
    }
  };

  const isDisabled = (type: WorkoutType): boolean => selectedSpecializations.length >= MAX_SPECIALIZATIONS_COUNT && !selectedSpecializations.includes(type);

  const handleDescriptionCoachChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedCoachDescription(event.target.value);
  };

  const handleIsPersonalTrainingChange = () => {
    setIsPersonalTrainingSelected(!isPersonalTrainingSelected);
  };

  return {
    nameRef,
    emailRef,
    passwordRef,
    birthdayRef,
    descriptionCoachRef,
    selectedLocation,
    selectedSex,
    selectedRole,
    isAgreementChecked,
    isDropdownOpen,
    selectedLevel,
    selectedSpecializations,
    selectedCoachDescription,
    isPersonalTrainingSelected,
    isDisabled,
    handleSubmit,
    handleLocationChange,
    handleSexChange,
    handleRoleChange,
    handleAgreementChange,
    handleToggleDropdown,
    handleLevelChange,
    handleSpecializationChange,
    handleDescriptionCoachChange,
    handleIsPersonalTrainingChange
  };
}

export default useRegisterForm;
