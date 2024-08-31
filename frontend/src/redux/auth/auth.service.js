import axios from 'axios'


 const userSignIn = async(apiData)=>{
   const response =  await axios.post('/api/v1/users/login',apiData)

   return response.data;
}



const authService = {
    userSignIn
}

export default authService