import { apSlice } from "./apiSlice";
import { USERS_URL } from "../constant";


export const userApiSlice = apSlice.injectEndpoints({
    endpoints : (builder)=>({
        login : builder.mutation({
            query : (data)=>(
                {
                    url : `${USERS_URL}/login`,
                    method : "POST",
                    body : data
                }
            )
        })
    })
})


export const {useLoginMutation} = userApiSlice