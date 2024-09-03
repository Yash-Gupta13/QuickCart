import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
    const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  if(!user){
    navigate('/login' , {replace:true});
    return null;
  }

  return <Outlet/>
};
export default PrivateRoute;
