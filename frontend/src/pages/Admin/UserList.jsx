import { useDispatch, useSelector } from "react-redux";
import { deleteUserById, getAllUsers, updateUserInfoById } from "../../redux/user/user.slice";
import { useEffect, useState } from "react";
import {FaCheck , FaEdit ,FaTimes ,FaTrash} from 'react-icons/fa'
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const UserList = () => {
  const dispatch = useDispatch();

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  const [editableUserId , setEditableUserId] = useState(null);
  const [editableUserName , setEditableUserName] = useState('');
  const [editableUserEmail , setEditableUserEmail] = useState('');

  const toggleEdit = (id , username , email)=>{
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  }

  const updateHandler = async(id)=>{
    const apiData = {
      id:id,
      username:editableUserName,
      email : editableUserEmail
    }

    try {
      const response = await dispatch(updateUserInfoById(apiData));
      await dispatch(getAllUsers());
      setEditableUserId(null);
    } catch (error) {
      console.log(`Error in update Handler`,error);
    }

    
  }

  const deleteHandler = async(id)=>{
      const apiData = {
        id
      }

      if(window.confirm("Are you sure to delte this user ?")){
        try {
          const response = await dispatch(deleteUserById(apiData));
          await dispatch(getAllUsers());
        } catch (error) {
          console.log(`Error in deleting the user`, error);
        }
      }
  }


  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center mb-10">Users</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Id</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Admin</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex flex-centers">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="py-2 w-full border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}{" "}
                        {!user?.isAdmin ? (
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        ) : null}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                        {!user?.isAdmin ? (<button
                          onClick={() =>
                            toggleEdit(user._id, user.name, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>):null}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default UserList;
