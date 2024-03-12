
import { menuDetails } from "../models/menuModel";
import { categoryDetails } from "../models/categoryModel"

async function menuRestaurant(req: any, res: any) {
  try {
    const { nameOfIteam, categoryId }: any = req.body;
    const menuName: any = await menuDetails.findOne({
      where: {
        nameOfIteam: nameOfIteam, categoryId: categoryId
      }
    });
    if (menuName) {
      return menuName; // Return the restaurant if found 
    }
    return null;   // Return null if the restaurant is not found
  } catch (error) {
    throw error;
  }
};

async function createMenu(req: any, res: any) {
  try {

    const newMenu: any = await menuDetails.create(req.body);
    return newMenu;
  } catch (error) {
    throw error;
  }
};




async function categoryIdFind(req: any, res: any) {
  try {
    const { categoryId }: any = req.body;
    const validCategoryId: any = await categoryDetails.findByPk(categoryId);
    if (validCategoryId) {
      return validCategoryId;
    } else {
      return null;
    }
  } catch (error) {

    res.status(500).send("Internal Server Error");

    throw error;
  }
}



async function updateMenu(req: any, res: any) {
  try {
    const Id: any = req.params.id;
    const data: any = req.body;

    const menuIteamvaild: any = await menuDetails.findByPk(Id);
    if (!menuIteamvaild) {
      return res.status(404).json({ message: 'Menu Id  not found' });
    }


    await menuIteamvaild.update(data);
    return res.status(200).json({ message: 'Employee updated', data });
  } catch (error) {
    throw error;
  }
}


/* delete Menu */

async function deleteMenu(req: any, res: any) {
  try {
    const menuId: number = req.params.id;
    const menuIteamvaild: any = await menuDetails.findByPk(menuId);
    if (!menuIteamvaild) {
      return null;
    }
    await menuIteamvaild.destroy()
    return menuIteamvaild
  } catch (error) {
    throw error;
  }
};



/* getall menu by categoryId */

async function categoryIdFindMenu(req: any, res: any) {
  try {
    const categoryId: any = req.params.id;

    const validCategoryId: any = await categoryDetails.findByPk(categoryId);
    if (validCategoryId) {
      return validCategoryId;
    } else {
      // If restaurant not found, send error response
      return res.status(404).json({ message: "Category id not found" });
    }
  } catch (error) {
    // If any error occurs, throw it
    throw error;
  }
}


async function getAllMenu(req: any, res: any) {
  try {
    const categoryId: any = req.params.id;
    const category: any = await menuDetails.findAll({
      where: {
        categoryId: categoryId
      }
    });

    if (category) {
      return category;
    }
    return null;
  } catch (error) {
    throw error;
  }
};









export {
  menuRestaurant,
  createMenu,
  categoryIdFind,
  updateMenu,
  deleteMenu,
  categoryIdFindMenu,
  getAllMenu


}