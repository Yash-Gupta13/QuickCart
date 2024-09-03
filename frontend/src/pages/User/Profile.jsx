import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const {user} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();

  useEffect(()=>{
    if (user) {
        setUserName(user.username);
        setEmail(user.email)
    }
  },[user.username , user.email ])

  const submitHandler = (e)=>{
    e.preventDefault();
    

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
            <div className="flex justify-between">
              <button type="submit" className="bg-pink-500 rounded text-white py-2 px-4 hover:bg-pink-600">Update</button>
              <Link to={'/user-order'} className="bg-pink-500 rounded text-white py-2 px-4 hover:bg-pink-600">My Order</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
