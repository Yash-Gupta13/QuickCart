import axios from "axios";

const updateUserInfo = async(apiData)=>{
    const response = await axios.patch('/api/v1/users/profile/update-profile' , apiData ,{
        withCredentials:true
    });
    
    return response.data;
}


const userService = {
    updateUserInfo
}

export default userService

