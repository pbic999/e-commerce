import express from 'express';
import { Order } from '../models/orders';
import Razorpay from 'razorpay';
import request from 'request';

const orderRouter = express.Router();
const razorInstance = new Razorpay({
    key_id: "rzp_test_0KBkOkEusq0BBg",
    key_secret: "wOUqiDw0MmWbLLYr4MwWlzYB"
})
orderRouter.post('/', async (req,res) =>{
    try{
        const {amount} =req.body;
        const options =  {amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture: 0
    }
        razorInstance.orders.create(options, async (err, order) =>{
            console.log(order)
           try{
            err ? res.status(500).send(err) :
                res.send(order)
            }
            catch(error){
                res.status(500).send(error);
            }
          });
    }
    catch(err) {

    }
})

orderRouter.post("/capture/:paymentId",async (req,res)=>{
    try{
      const {amount} = req.body;
      return request(
        {
          method : "POST",
          url : `https://rzp_test_0KBkOkEusq0BBg:wOUqiDw0MmWbLLYr4MwWlzYB@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
          form:{
            amount,
            currency: "INR"
          },
        },
        async function(err,response,body){
          if(err){
            return res.status(500).json({
              message: "Something error!s"
            })
          }
          return res.status(200).json(body)
        }
      )
    }
    catch(err){
      return res.status(500).json({
        message: err.message
      })
    }
  })

  orderRouter.post('/addOrder', async (req,res)=>{
    const {email,name,products,address,status} = req.body;
    const newOrder = new Order({
      email,name,products,address,status
    });
    await newOrder.save();
    res.send("success");
    console.log('yes');
   })

export default orderRouter;