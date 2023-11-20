import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '..';
//import { AppRoute, isValidPassword } from '../../const';
//import { registerAction } from '../../store/api-actions/auth-api-actions/auth-api-actions';
//import { toast } from 'react-toastify';
//import { RegisterData } from '../../types/register-data';

function useRegisterForm(){
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  // const onSubmit = (authData: RegisterData) => {
  //   if (!isValidPassword(authData.password)) {
  //     toast.warn('Password must contain at least one letter and one number.');
  //     return;
  //   }
  //   dispatch(registerAction(authData));
  //   navigate(AppRoute.Login);
  // };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (nameRef.current !== null && passwordRef.current !== null && emailRef.current !== null) {
      // onSubmit({
      //   name: nameRef.current.value,
      //   login: emailRef.current.value,
      //   password: passwordRef.current.value,
      // });
    }
  };

  return {
    nameRef,
    emailRef,
    passwordRef,
    handleSubmit
  };
}

export default useRegisterForm;
