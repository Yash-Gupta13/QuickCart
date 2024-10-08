import axios from "axios";

const userRegister = async(apiData)=>{
  const response = await axios.post("/api/v1/users/register",apiData);
  return response.data;
}

const userSignIn = async (apiData) => {
  const response = await axios.post("/api/v1/users/login", apiData);

  return response.data;
};

const userLogout = async()=>{
  const response = await axios.post("/api/v1/users/logout",{
    withCredentials:true
  });
  return response.data
}

const userRefreshAccessToken = async()=>{
  const response = await axios.post("/api/v1/users/refresh-token",{
    withCredentials:true
  });

  return response.data;
}

const checkAuth = async()=>{
  const response = await axios.post("/api/v1/users/checkAuth",{
    withCredentials:true
  });

  return response.data;

}

const authService = {
  userRegister,
  userSignIn,
  userLogout,
  userRefreshAccessToken,
  checkAuth
};

export default authService;
