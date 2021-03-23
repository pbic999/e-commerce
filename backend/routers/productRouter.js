import express from 'express';
import { Products } from '../models/productsModel';
import data from '../data'
import { User } from '../models/userModel';
import mongoose from 'mongoose';

const productRouter = express.Router();
productRouter.get('/', async (req,res) => {
    try{
      //  await Products.insertMany(data.products);
    const createProducts = await Products.find({});
    res.send(createProducts);

}
    catch (err) {
        res.send(err);
    }
});

productRouter.post('/updateProducts', async (req,res)=>{
     const {id,qty} = req.body;
     await Products.updateOne({_id: mongoose.Types.ObjectId(id)},{
         $inc: {countInStock: -qty}
     })
     res.send("yes");
})

productRouter.get('/:id', async (req,res) => {
    try{
    const product = await Products.findById(req.params.id);
    if(product) res.send(product);
    else res.status(404).send("err page not found");}
    catch (err){
        res.send(err);
    }
})


export default productRouter;