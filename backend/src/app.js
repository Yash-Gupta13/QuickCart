import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

export const app = express();

app.use(
  cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//* Route section

import userRouter from './routes/user.routes.js'
import categoryRouter from './routes/category.routes.js'

app.use('/api/v1/users',userRouter)
app.use('/api/v1/category' , categoryRouter)