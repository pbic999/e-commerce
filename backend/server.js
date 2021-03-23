import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter';
import productRouter from './routers/productRouter';
import orderRouter from './routers/orderRouter';
import cors from 'cors';


const app = express();
dotenv.config();
const url = process.env.MONGO_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(console.log('connected to db')).
catch( (err) =>console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(cors());
app.use('/api/products', productRouter);
 app.use('/api/user/', userRouter);
 app.use('/api/order/', orderRouter);

 app.listen(5000, () => {
     console.log("Server started");
 })