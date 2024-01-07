import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization } from '../../const';
import { Role } from '../../types/role.enum';
import { Trainer } from '../../types/trainer.interface';
import { User } from '../../types/user.interface';

type PrivateUserRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus?: RegisterStatus;
  currentUser: User | Trainer | null;
}

function PrivateUserRoute({currentUser, authorizationStatus, registerStatus, children}: PrivateUserRouteProps): JSX.Element {
  if(currentUser && currentUser.role === Role.User && isAuthorization(authorizationStatus) && registerStatus !== RegisterStatus.InProgress){
    return children;
  }

  if(currentUser && currentUser.role === Role.Trainer && isAuthorization(authorizationStatus) && registerStatus !== RegisterStatus.InProgress){
    if(currentUser.id){
      return <Navigate to={`${AppRoute.TrainerRoom}/${currentUser.id}`}/>;
    }
  }

  return <Navigate to={AppRoute.MainRegister}/>;
}

export default PrivateUserRoute;
