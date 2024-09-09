import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateUserInfo } from "../../redux/user/user.slice";
import { setUser } from "../../redux/auth/auth.slice";

const Profile = () => {

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");


  const {user} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if (user) {
        setUserName(user.username);
        setEmail(user.email)
    }
  },[user])

  const submitHandler = async(e)=>{
    e.preventDefault();

    const apiData = {
        username,
        email
    }

    const result = await dispatch(updateUserInfo(apiData));
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(setUser(result.payload.data));
      navigate('/');
    }

  }
  

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile Info</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-white mb-2">
                Username
              </label>
              <input
                type="text"
                className="form-input p-4 rounded-sm w-full"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-white mb-2">
                Email
              </label>
              <input
                type="text"
                className="form-input p-4 rounded-sm w-full"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 mb-4 text-right">
              <p className="text-white">
                <Link to="/changePassword" className="text-white hover:underline hover:text-pink-500">
                  Change Password ?
                </Link>
              </p>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 rounded text-white py-2 px-4 hover:bg-pink-600"
              >
                Update
              </button>
              <Link
                to={"/user-order"}
                className="bg-pink-500 rounded text-white py-2 px-4 hover:bg-pink-600"
              >
                My Order
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
