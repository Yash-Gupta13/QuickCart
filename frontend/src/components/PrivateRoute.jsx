import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getAccessToken, getRefreshToken } from "../utils/getToken";
import { setUser, userRefreshAccessToken } from "../redux/auth/auth.slice";
import { useEffect } from "react";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  

  const checkAuth = async()=>{
    if (!accessToken && !refreshToken) {
        dispatch(setUser(null));
      navigate("/login", { replace: true });
    }

    if (!accessToken && refreshToken) {
        const res  = await dispatch(userRefreshAccessToken());
        if(res.meta.requestStatus === 'rejected'){
            user = null;
            navigate('/login' , {replace:true});
        }
    }

  }


  useEffect(() => {
    checkAuth();
  }, [accessToken, refreshToken, dispatch, navigate]);

  return <Outlet />;
};
export default PrivateRoute;
