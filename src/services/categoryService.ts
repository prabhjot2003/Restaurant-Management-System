import { Request, Response } from 'express';
import { categoryRestaurant, createCategory, RestaurantIdFind, } from "../store/categoryStore"

async function categorydata(req: Request, res: Response) {
    try {
        const { name }: any = req.body;
        // Check if the email is missing or empty
        if (!name) {
            return res.status(400).json({ message: "name  is required." });
        }


        // Check if a restaurant with the same email already exists
        const existingCategory: string = await categoryRestaurant(req, res);
        if (existingCategory) {
            return res.status(400).json({ message: "Category with the same name already exists." });
        }


        const restaurantIdvalid: Number = await RestaurantIdFind(req, res);
        if (!restaurantIdvalid) {
            return res.status(404).json({ message: "Restaurant id not found" })
        }

        // Create a new restaurant
        const newEmployee: string = await createCategory(req, res);

        return res.status(201).json({
            message: 'Category created successfully.',
            data: newEmployee,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while creating Category.' });
    }
}

export default {
    categorydata
}