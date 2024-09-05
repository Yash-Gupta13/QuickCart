import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { changeOldPassword } from "../../redux/user/user.slice";

const ChangePassword = () => {

    const [oldPassword , setOldPassword] = useState('');
    const [newPassword , setNewPassword] = useState('');

    const dispatch = useDispatch();

    const submitHandler = async(e)=>{
        
        e.preventDefault();

        if(!oldPassword.trim() || !newPassword.trim()){
            return toast.error("Please provide the credentials.")
        }

        const apiData = {
            oldPassword,
            newPassword
        }

        const response = await dispatch(changeOldPassword(apiData));

        console.log(response);

    }
  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block text-white mb-2">
                Old Password
              </label>
              <input
                type="password"
                className="form-input p-4 rounded-sm w-full"
                placeholder="Enter Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-white mb-2">
                New Password
              </label>
              <input
                type="password"
                className="form-input p-4 rounded-sm w-full"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
           
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 rounded text-white py-2 px-4 hover:bg-pink-600"
              >
                Update
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ChangePassword