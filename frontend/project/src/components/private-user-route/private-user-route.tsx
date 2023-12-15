import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isAuthorizationUnknown, isTrainer, isUser} from '../../const';
import { Role } from '../../types/role.enum';
import Loading from '../loading/loading';

type PrivateUserRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus?: RegisterStatus;
  currentRole: Role;
  userId: string;
}

function PrivateUserRoute({authorizationStatus, currentRole, registerStatus, children, userId}: PrivateUserRouteProps): JSX.Element {

  if(isUser(currentRole) && isAuthorization(authorizationStatus) && registerStatus !== RegisterStatus.InProgress){
    return children;
  }

  if(isAuthorizationUnknown(authorizationStatus, currentRole)) {
    return <Loading />;
  }

  if(isUser(currentRole) && registerStatus === RegisterStatus.InProgress){
    return <Navigate to={AppRoute.RegisterUser}/>;
  }

  if(isTrainer(currentRole) && isAuthorization(authorizationStatus) && registerStatus !== RegisterStatus.InProgress){
    return <Navigate to={`${AppRoute.TrainerRoom}/${userId}`}/>;
  }

  return <Navigate to={AppRoute.MainRegister}/>;
}

export default PrivateUserRoute;
