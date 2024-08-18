import dotenv from 'dotenv'

import { connectDb } from "./config/index.js";
import { app } from "./app.js";


dotenv.config();

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 5000 , ()=>{
        console.log(`Server is running on Port :  ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(`Database connection Failed` , error);
});






