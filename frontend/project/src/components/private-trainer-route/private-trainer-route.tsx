import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isAuthorizationUnknown} from '../../const';
import { Role } from '../../types/role.enum';
import Loading from '../loading/loading';
import { useAppSelector } from '../../hooks/index';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';

type PrivateTrainerRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus?: RegisterStatus;
}

function PrivateTrainerRoute(props: PrivateTrainerRouteProps): JSX.Element {
  const {authorizationStatus, registerStatus, children} = props;

  const currentUser = useAppSelector(getCurrentUser);

  if(currentUser && currentUser.role === Role.Trainer && isAuthorization(authorizationStatus) && registerStatus !== RegisterStatus.InProgress){
    return children;
  }

  if(isAuthorizationUnknown(authorizationStatus, currentUser)) {
    return <Loading />;
  }

  if(currentUser && currentUser.role === Role.Trainer && registerStatus === RegisterStatus.InProgress){
    return <Navigate to={AppRoute.RegisterTrainer}/>;
  }

  return <Navigate to={AppRoute.MainRegister}/>;
}

export default PrivateTrainerRoute;
