import dotenv from 'dotenv'

import { connectDb } from "./config/database.config.js";
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


//* Route section

import userRouter from './routes/user.routes.js'

app.use('/api/users',userRouter)





