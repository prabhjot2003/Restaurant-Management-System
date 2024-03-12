import { categoryDetails } from "../models/categoryModel";
import Restaurant from "../models/resgisterModel"

async function categoryRestaurant(req: any, res: any) {
    try {
        const { name, restaurantId }: any = req.body;
        const categoryName: any = await categoryDetails.findOne({
            where: {
                name: name, restaurantId: restaurantId
            }
        });
        if (categoryName) {
            return categoryName; // Return the restaurant if found
        }
        return null;   // Return null if the restaurant is not found
    } catch (error) {
        throw error;
    }
};

async function createCategory(req: any, res: any) {
    try {

        const newName: any = await categoryDetails.create(req.body);
        return newName;
    } catch (error) {
        throw error;
    }
};



async function RestaurantIdFind(req: any, res: any) {
    try {
        const { restaurantId }: any = req.body; // Assuming the primary key column is named 'id'

        const validRestaurantId: any = await Restaurant.findByPk(restaurantId); // Correcting the column name here
        if (validRestaurantId) {
            return validRestaurantId; // Return the restaurant if found
        }

        return null;   // Return null if the restaurant is not found
    } catch (error) {
        throw error;
    }
};







export {
    categoryRestaurant,
    createCategory,
    RestaurantIdFind
};


