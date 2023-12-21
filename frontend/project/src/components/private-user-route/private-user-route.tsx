import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isAuthorizationUnknown } from '../../const';
import Loading from '../loading/loading';
import { useAppSelector } from '../../hooks/index';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';
import { Role } from '../../types/role.enum';

type PrivateUserRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus?: RegisterStatus;
}

function PrivateUserRoute({authorizationStatus, registerStatus, children}: PrivateUserRouteProps): JSX.Element {

  const currentUser = useAppSelector(getCurrentUser);

  if(currentUser && currentUser.role === Role.User && isAuthorization(authorizationStatus) && registerStatus !== RegisterStatus.InProgress){
    return children;
  }

  if(isAuthorizationUnknown(authorizationStatus, currentUser)) {
    return <Loading />;
  }

  if(currentUser && currentUser.role === Role.User && registerStatus === RegisterStatus.InProgress){
    return <Navigate to={AppRoute.RegisterUser}/>;
  }

  if(currentUser && currentUser.role === Role.Trainer && isAuthorization(authorizationStatus) && registerStatus !== RegisterStatus.InProgress){
    if(currentUser.id){
      return <Navigate to={`${AppRoute.TrainerRoom}/${currentUser.id}`}/>;
    }
  }

  return <Navigate to={AppRoute.MainRegister}/>;
}

export default PrivateUserRoute;
