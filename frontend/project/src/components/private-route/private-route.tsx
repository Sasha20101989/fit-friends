import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, isAuthorization, isAuthorizationUnknown} from '../../const';
import Loading from '../loading/loading';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  if (isAuthorization(authorizationStatus)) {
    return children;
  }

  if (isAuthorizationUnknown(authorizationStatus)) {
    return <Loading />;
  }

  return <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
