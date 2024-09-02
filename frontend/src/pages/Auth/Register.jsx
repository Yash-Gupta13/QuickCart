import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegister } from "../../redux/auth/auth.slice";
import { validateEmail } from "../../utils/validation";

const Register = () => {

    const [email , setEmail] = useState('');
    const [username , setUserName] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async(e)=>{
        e.preventDefault();

        if(!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()){
          return toast.error("Please provide all required field");
        }

        if(password !== confirmPassword){
          return toast.error("Password is not matched");
        }

        if(!validateEmail(email)){
          return toast.error("Please enter a valid Email Address");
        }

        const apiData = {
          email,
          username,
          password
        }

        const response = await dispatch(userRegister(apiData));
        if(response.meta.requestStatus === 'fulfilled'){
          setEmail('');
          setUserName('');
          setPassword('');
          setConfirmPassword('');
          navigate('/');

        }

    }
  return (
    <div className="">
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem] ">
          <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                className="mt-1 p-2 border rounded w-full"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="text"
                className="mt-1 p-2 border rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                className="mt-1 p-2 border rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                className="mt-1 p-2 border rounded w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[0.5rem]"
              type="submit"
            >
              Sign up
            </button>
          </form>

          <div className="mt-4 ">
            <p className="text-white">
              Already have an account? {"  "}
              <Link to="/login" className="text-pink-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Register