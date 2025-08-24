// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo ,getsingleorder,getUserOrders,getAllOrders,updateStatus} from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
 try{

  const newOrder = await createNewOrderRepo({
    user:req.user._id,
    ...req.body,
    paidAt: Date.now(),
  });
  if (newOrder) {
    res.status(201).json({ success: true, newOrder });
  } else {
    return next(new ErrorHandler(400, "some error occured!"));
  }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};


export const getSingleOrder = async(req,res,next) =>{
  const orderId = req.params.id;
  const userId = req.user._id;

  try{
    const order = await getsingleorder(orderId);
  
    if (!order) {
      return next(new ErrorHandler(404, "order not found"));
    }else{
      if(order.user.toString() === userId.toString()){
        return res.status(200).json({ success: true, order});
      }else{
        return next(new ErrorHandler(401, "you are not authorized to view this order"));
      }
    }
  }catch(err){
    return next(new ErrorHandler(400, err));
  }
}

export const findMyOrders = async(req,res,next) =>{
  const userId = req.user._id;
  try{
    const orders = await getUserOrders(userId);
    if(orders){
      return res.status(200).json({ success: true, orders});
    }else{
      return next(new ErrorHandler(404, "no orders found"));
    }
  }catch(err){
    return next(new ErrorHandler(400, err));
  }
}

export const getAllPlacedOrders = async(req,res,next) =>{
  try{
    const orders = await getAllOrders();
    if(orders){
      return res.status(200).json({ success: true, orders});
    }else{
      return next(new ErrorHandler(404, "no orders found"));
    }
  }catch(err){
    return next(new ErrorHandler(400, err));
  }
}

export const updateOrderStatus = async(req,res,next)=>{
  const orderID = req.params.id;
  const {orderStatus} = req.body;

  try{
      const update = await updateStatus(orderID,orderStatus);
      if(update){
        return res.status(200).json({ success: true,message:"order status updated", update});
      }else{
        return next(new ErrorHandler(404, "order not found"));
      }
  }catch(err){
    return next(new ErrorHandler(400, err));
  }
}