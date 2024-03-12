import { orderDetails } from "../models/orderModel";
import Restaurant from "../models/resgisterModel"

async function orderRestaurant(req: any, res: any) {
  try {
    const { restaurantId } = req.body; // Destructure the restaurantId directly from req.body
    const restaurant = await Restaurant.findByPk(restaurantId);
    return restaurant || null; // Simplified if-else statement
  } catch (error) {
    throw error;
  }
}

async function createOrder(req: any, res: any) {
  try {
    const neworder = await orderDetails.create(req.body); // Changed orderDetails to OrderDetails
    return neworder;
  } catch (error) {
    throw error;
  }
};

/* update order api */

async function orderUpdate(req: any, res: any) {
  try {
    const Id: any = req.params.id;
    const data: any = req.body;

    const orderId: any = await orderDetails.findByPk(Id);
    if (!orderId) {
      return res.status(404).json({ message: 'order Id not found' });
    }

    await orderId.update(data);
    return orderId
  } catch (error) {
    throw error;
  }
};


/* delete api */

async function deleteOrder(req: any, res: any) {
  try {
    const Id: number = req.params.id;
    const OrderIDvaild: any = await orderDetails.findByPk(Id);
    if (!OrderIDvaild) {
      return null;
    }
    await OrderIDvaild.destroy()
    return OrderIDvaild
  } catch (error) {
    throw error;
  }
};




export {
  orderRestaurant,
  createOrder,
  orderUpdate,
  deleteOrder

};
