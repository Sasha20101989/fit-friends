import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isAuthorizationUnknown} from '../../const';
import { Role } from '../../types/role.enum';
import Loading from '../loading/loading';
import { Trainer } from '../../types/trainer.interface';
import { User } from '../../types/user.interface';

type PrivateTrainerRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus?: RegisterStatus;
  currentUser: User | Trainer | null;
}

function PrivateTrainerRoute({currentUser, authorizationStatus, registerStatus, children}: PrivateTrainerRouteProps): JSX.Element | null{
  if(currentUser && currentUser.role === Role.Trainer && isAuthorization(authorizationStatus) && registerStatus !== RegisterStatus.InProgress){
    return children;
  }

  if(isAuthorizationUnknown(authorizationStatus, currentUser)) {
    return <Loading />;
  }

  return <Navigate to={AppRoute.MainRegister}/>;
}

export default PrivateTrainerRoute;
