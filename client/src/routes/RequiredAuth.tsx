import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserInfoQuery } from "../features/Account/accountApi";

const RequiredAuth = () => {
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation();
  if (isLoading) return <div>loading ...</div>;

  if (!user) {
    return <Navigate to="login" state={{ from: location }} />;
  }
  return <Outlet />;
};
export default RequiredAuth;
