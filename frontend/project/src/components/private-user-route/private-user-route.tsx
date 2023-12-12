import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isAuthorizationUnknown, isTrainer, isUser} from '../../const';
import { Role } from '../../types/role.enum';
import Loading from '../loading/loading';

type PrivateUserRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus?: RegisterStatus;
  role: Role;
  userId: string;
}

function PrivateUserRoute({authorizationStatus, role, registerStatus, children, userId}: PrivateUserRouteProps): JSX.Element {

  if(isUser(role) && isAuthorization(authorizationStatus) && registerStatus !== RegisterStatus.InProgress){
    return children;
  }

  if(isAuthorizationUnknown(authorizationStatus, role)) {
    return <Loading />;
  }

  if(isUser(role) && registerStatus === RegisterStatus.InProgress){
    return <Navigate to={AppRoute.RegisterUser}/>;
  }

  if(isTrainer(role) && isAuthorization(authorizationStatus) && registerStatus !== RegisterStatus.InProgress){
    return <Navigate to={`${AppRoute.Trainers}/${userId}`}/>;
  }

  return <Navigate to={AppRoute.MainRegister}/>;
}

export default PrivateUserRoute;
