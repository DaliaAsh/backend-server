import express from "express"; 
import Checkout from "../models/checkout"; 
const router = express.Router(); 
router.post('/',(req,res,next)=>{
  const checkout = new Checkout({
      id:req.body.id , 
      date:req.body.date,
      products:req.body.products,
      total:req.body.total , 
      discount:req.body.discount,
      paymentAmount:req.body.paymentAmount, 
      paymentMethod:req.body.paymentMethod
  }); 
  checkout.save().
  then((checkout)=>{
  res.status(200).
  json({
  checkout: checkout,
  request:{
  method:'POST',
  action:'create checkout'    
  }    
  })
  }).
  catch((err)=>{
      console.log(err); 
      res.status(500).
      json({
          error:err
      })
  })
}); 




export default router ; 