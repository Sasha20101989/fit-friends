import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';

export const useGoToLogin = (): ((event: MouseEvent<HTMLAnchorElement>) => void) => {
  const navigate = useNavigate();
  const handleGoLoginClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    navigate(AppRoute.Login);
  };
  return handleGoLoginClick;
};
