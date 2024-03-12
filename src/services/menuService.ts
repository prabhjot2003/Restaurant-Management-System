import { Request, Response } from "express";
import { menuRestaurant, createMenu, categoryIdFind, updateMenu, deleteMenu, categoryIdFindMenu, getAllMenu } from "../store/menuStore";

async function menudata(req: Request, res: Response) {
    try {
        const { nameOfIteam }: any = req.body;
        // Check if the item name is missing or empty
        if (!nameOfIteam) {
            return res.status(400).json({ message: "Item name is required." });
        }

        // Check if an item with the same name already exists
        const existingItem: any = await menuRestaurant(req, res);
        if (existingItem) {
            return res.status(400).json({ message: "Item with the same name already exists." });
        }

        // Check if restaurant id is valid
        const categoryIdIdValid: number = await categoryIdFind(req, res);
        if (!categoryIdIdValid) {
            return res.status(404).json({ message: " categoryId not found" });
        }

        // Create a new item
        const newMenu: string = await createMenu(req, res);

        return res.status(201).json({
            message: 'Item created successfully.',
            data: newMenu,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while creating Item.' });
    }
};



async function getUpdateMenu(req: Request, res: Response) {
    try {

        const MenuIdValid: number = await updateMenu(req, res);
        if (!MenuIdValid) {
            return res.status(404).json({ message: "employes id not found" });
        }

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({ message: 'Error while updating MenuIteam.' });
    }
};






async function getdeleteMenu(req: Request, res: Response) {
    try {
        const menuId: string = req.params.id

        const validMenu = await deleteMenu(req, res)
        if (validMenu) {
            return res.status(201).json({ message: "item deleted successfully", validMenu })
        }
        return res.status(400).json({ message: "Menu item does not exists" })
    } catch (error) {
        return res.status(500).json({ message: 'Error while deleting menu.' });
    }
}





async function getAllMEnuIteam(req: Request, res: Response) {
    try {
        //    const restaurantId = await getEmployee(req,res)
        const restaurantIdvalid: any = await categoryIdFindMenu(req, res);
        if (!restaurantIdvalid) {
            return res.status(404).json({ message: "Category id not found" })
        }


        const category = await getAllMenu(req, res)
        return res.status(200).json({ category })

    } catch (error) {
        return res.status(500).json({ message: 'error while creating Category.' });

    }
};



export default {
    menudata,
    getUpdateMenu,
    getdeleteMenu,
    getAllMEnuIteam
}


