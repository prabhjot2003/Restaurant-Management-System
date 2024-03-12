import { Request, Response } from 'express';
import { orderRestaurant, createOrder, orderUpdate, deleteOrder } from "../store/orderStore";


async function ordercreated(req: Request, res: Response) {
    try {
        // Check if restaurantId is valid
        const restaurantIdValid: any = await orderRestaurant(req, res);
        if (!restaurantIdValid) {
            return res.status(404).json({ message: "Restaurant id not found" });
        }

        // Create a new order
        const newOrder: any = await createOrder(req, res);

        return res.status(201).json({
            message: 'Order created successfully.',
            data: newOrder,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while creating order.' });
    }
};


/* updated order by order Id */

async function updatedorder(req: Request, res: Response) {
    try {
        const orderId: number = await orderUpdate(req, res);
        if (!orderId) {
            return res.status(404).json({ message: "Order ID not found" });
        }
        return res.status(200).json({ data: orderId })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while updating orders.' });
    }
}




/* delete api  using with Id */


async function getdeleteOrder(req: Request, res: Response) {
    try {
        const Id: string = req.params.id

        const OrderIDvaild = await deleteOrder(req, res)
        if (OrderIDvaild) {
            return res.status(201).json({ message: "Order deleted successfully", OrderIDvaild })
        }
        return res.status(400).json({ message: "Order item does not exists" })
    } catch (error) {
        return res.status(500).json({ message: 'Error while deleting Ordre.' });
    }
};








export default {
    ordercreated,
    updatedorder,
    getdeleteOrder
}