import axios from "axios";

const updateUserInfo = async(apiData)=>{
    const response = await axios.patch('/api/v1/users/profile/update-profile' , apiData ,{
        withCredentials:true
    });
    
    return response.data;
}

const changePassword = async(apiData)=>{
    const response = await axios.post('/api/v1/users/profile/change-password' , apiData , {
        withCredentials : true
    })

    return response.data;
}

const getAllUsers = async()=>{
    const response = await axios.get('/api/v1/users/get-all-user',{
        withCredentials : true
    })

    return response.data;
}

const updateUserInfoById = async(apiData)=>{
    const response = await axios.patch(`/api/v1/users/update-user-info/${apiData.id}`,{
        username:apiData.username,
        email : apiData.email
    } ,{
        withCredentials:true
    })

    return response.data;
}

const deleteUserById = async(apiData)=>{
    const response = await axios.delete(`/api/v1/users/delete-user/${apiData.id}`,{
        withCredentials:true
    })

    return response.data;
}

const userService = {
    updateUserInfo,
    changePassword,
    getAllUsers,
    updateUserInfoById,
    deleteUserById
}

export default userService

