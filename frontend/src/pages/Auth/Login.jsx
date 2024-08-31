import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { userSignIn } from "../../redux/auth/auth.slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

      if (!email?.trim() || !password?.trim()) {
        return toast.error("Please enter all required Field");
      }

      const apiData = {
        email,
        password,
      };

      const result = await dispatch(userSignIn(apiData));
      console.log(result)
      if(result.meta.requestStatus === "fulfilled"){
        setEmail('');
        setPassword('');
        navigate("/");
      }
    
  };

  return (
    <div className="container">
      <section className="pl-[10rem] flex justify-center">
        <div className="mr-[4rem] mt-[5rem] ">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <form onSubmit={submitHandler} className="container w-[40rem]">
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

            <button
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[0.5rem]"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="mt-4 ">
            <p className="text-white">
              New Customer ? {"  "}
              <Link to="/register" className="text-pink-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
