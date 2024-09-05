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


const userService = {
    updateUserInfo,
    changePassword
}

export default userService

