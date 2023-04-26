import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ auth, authUser, allowedRoles, path }) => {
  return auth && allowedRoles?.includes(authUser?.role) ? (
    <Outlet />
  ) : (
    <Navigate to={path} replace={true} />
  );
};

export default PrivateRoute;
