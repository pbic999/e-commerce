import express from 'express';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils';
import { Products } from '../models/productsModel';
import mongoose from 'mongoose';

const userRouter =  express.Router();
let token = '';
userRouter.post('/signup', async (req,res) =>{
    try{
    let {name,email,password} = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        const hashPassword = bcrypt.hashSync(password, 12)
        const regUser = new User({
            name,
            email,
            password: hashPassword
        });
        await regUser.save();
        const user = await User.findOne({email});
        token = generateToken(user);
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              cart: user.products,
              address: user.address,
              token
            });}
    }
        catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
});

userRouter.post('/signin', async (req,res) =>{
    try{
    const {email,password} = req.body;
    // Check if this user already exisits
    const user = await User.findOne({ email });
    if (user) {
        //res.send(user);
       if(bcrypt.compareSync(password, user.password)){
         //  console.log({token : generateToken(user)});
         token = generateToken(user);
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              cart: user.products,
              address: user.address,
              token
            });
        }
           else res.status(400).send("paeeword doesn't match");
    } else {
        res.status(400).send("User not esixt");
    }}
    catch (err) {
        res.status(500).send(err);
    }
})

userRouter.post('/addToCart', async (req,res) =>{
    try{
        const {email,productId,qty} = req.body;
        const user = await User.findOne({email});
        const isExist = user.products.find(x=> x._id==productId);
         const data = await Products.findOne({_id:productId})
        await User.updateOne({email},
            {$set: {products: isExist ? user.products.map((x) => 
                x._id==productId ? {...x,qty} : x):
            [...user.products,{...{...data}._doc,qty}]}},{upsert: false});
            const updatedUser = await User.findOne({email},{password: 0});
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                cart: updatedUser.products,
                address: updatedUser.address,
                token
              });
         //   console.log(user);
       // console.log(updateUser)
    }
    catch(err) {
        res.status(500).send(err);
        console.log(err);
    }
})

userRouter.post('/removeFromCart', async (req,res) =>{
    try{
        const {email,productId} = req.body;
       const rs = await User.updateOne({email},{
            $pull : {products: { _id: mongoose.Types.ObjectId(productId)} }
        },{multi: false});
        const updatedUser = await User.findOne({email},{password: 0});
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            cart: updatedUser.products,
            address: updatedUser.address,
            token
          });
    }
    catch(err) {
        res.status(500).send(err);
        console.log(err);
    }
})

userRouter.post('/addAddress', async (req,res) =>{
    try{
        const {email,address} = req.body;
        const ans = await User.updateOne({email},{
            $push : {address}
        },{multi: false});
        const updatedUser = await User.findOne({email},{password: 0});
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            cart: updatedUser.products,
            address: updatedUser.address,
            token
          });
    }
    catch(err) {
        res.status(500).send(err);
        console.log(err);
    }
})

userRouter.post('/removeAddress', async (req,res) =>{
    try{
        const {email,address} = req.body;
        const ans = await User.updateOne({email,address},{
            $pull : {address}
        },{multi: false});
        const updatedUser = await User.findOne({email},{password: 0});
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            cart: updatedUser.products,
            address: updatedUser.address,
            token
          });
    }
    catch(err) {
        res.status(500).send(err);
        console.log(err);
    }
})

userRouter.post('/removeCart', async (req,res) =>{
    try{
        const {email} = req.body;
        const ans = await User.updateOne({email},{
            $set : {products: []}
        },{multi: false});
        const updatedUser = await User.findOne({email},{password: 0});
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            cart: updatedUser.products,
            address: updatedUser.address,
            token
          });
    }
    catch(err) {
        res.status(500).send(err);
        console.log(err);
    }
})

export default userRouter;
