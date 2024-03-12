import { Request, Response } from "express";
import { reservationCreate, RestaurantIdFind, employeeIdFind, reservationphone, reservationUpdate } from "../store/reservationStore";

async function reservationdata(req: Request, res: Response) {
    try {
        const { userName }: any = req.body;
        // Check if the item name is missing or empty
        if (!userName) {
            return res.status(400).json({ message: "userName name is required." });

        }

        // Check if restaurant id is valid
        const phonevalid: any = await reservationphone(req, res);
        if (phonevalid) {
            return res.status(500).json({ message: " ContactNo Already Exits" });
        }

        // Check if restaurant id is valid
        const restaurantIdIdValid: number = await RestaurantIdFind(req, res);
        if (!restaurantIdIdValid) {
            return res.status(404).json({ message: " RestaurantId  not found" });
        }

        const categoryIdIdValid: number = await employeeIdFind(req, res);
        if (!categoryIdIdValid) {
            return res.status(404).json({ message: " categoryId not found" });
        }

        // Create a new item
        const newResrvation: any = await reservationCreate(req, res);

        return res.status(201).json({
            message: 'Reservation created successfully.',
            data: newResrvation,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while creating Reservation.' });
    }
};

/* resveration update api using the  */


async function getReservationupdate(req: Request, res: Response) {
    try {
        const reservationId: number = await reservationUpdate(req, res);
        if (!reservationId) {
            return res.status(404).json({ message: "Resveration ID not found" });
        }
        return res.status(200).json({ data: reservationId })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while updating Reservation.' });
    }
};




export default {
    reservationdata,
    getReservationupdate
}