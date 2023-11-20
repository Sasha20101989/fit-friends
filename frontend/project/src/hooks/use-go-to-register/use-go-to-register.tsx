import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

export const useGoToRegister = (): ((event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => void) => {
  const navigate = useNavigate();
  const handleGoRegisterClick = (evt: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    navigate(AppRoute.Register);
  };
  return handleGoRegisterClick;
};
