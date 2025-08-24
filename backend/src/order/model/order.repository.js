import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  // Write your code here for placing a new order
  const newOrder = await new OrderModel(data).save();
  return newOrder;
};

export const getsingleorder = async(orderId) =>{
  return await OrderModel.findOne({_id:orderId});

}

export const getUserOrders = async(userID) =>{
  return await OrderModel.find({user:userID});
}

export const getAllOrders = async() =>{
  return await OrderModel.find();
}

export const updateStatus = async(orderId,status) =>{
  const order = await OrderModel.findOne({_id:orderId});
  order.orderStatus = status;
  return await order.save();
}