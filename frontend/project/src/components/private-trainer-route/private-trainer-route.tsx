import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isAuthorizationUnknown, isTrainer} from '../../const';
import { Role } from '../../types/role.enum';
import Loading from '../loading/loading';

type PrivateTrainerRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus?: RegisterStatus;
  currentRole: Role;
}

function PrivateTrainerRoute(props: PrivateTrainerRouteProps): JSX.Element {
  const {authorizationStatus, currentRole, registerStatus, children} = props;

  if(isTrainer(currentRole) && isAuthorization(authorizationStatus) && registerStatus !== RegisterStatus.InProgress){
    return children;
  }

  if(isAuthorizationUnknown(authorizationStatus, currentRole)) {
    return <Loading />;
  }

  if(isTrainer(currentRole) && registerStatus === RegisterStatus.InProgress){
    return <Navigate to={AppRoute.RegisterTrainer}/>;
  }

  return <Navigate to={AppRoute.MainRegister}/>;
}

export default PrivateTrainerRoute;
