import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { checkAuth } from "../redux/auth/auth.slice";
import { useEffect } from "react";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector(state =>state.auth);
  
  useEffect(()=>{
    const verifyAuth = async()=>{
      const response = await dispatch(checkAuth());
      console.log(response);
    }

    if (!user) {
      navigate("/login");
    }

    verifyAuth();
  } , [dispatch])

  

  return <Outlet />;
};
export default PrivateRoute;
