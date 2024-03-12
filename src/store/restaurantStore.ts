import Restaurant from "../models/resgisterModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/env";


async function findRestaurant(req: any, res: any) {
  try {
    const { email }: any = req.body;
    const restaurant: any = await Restaurant.findOne({
      where: {
        email: email
      }
    });
    if (restaurant) {
      return restaurant; // Return the restaurant if found
    }
    return null;   // Return null if the restaurant is not found
  } catch (error) {
    throw error;
  }
};



async function createRestaurant(req: any, res: any) {
  try {
    // Destructure the password from the request body
    const { password } = req.body;

    // Check if password is provided
    if (!password) {
      throw new Error("Password is required");
    }

    // Generate a salt and hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the request body with hashed password
    req.body.password = hashedPassword;

    // Assuming Restaurant.create() is an asynchronous function that creates a new restaurant
    const newRestaurant = await Restaurant.create(req.body);

    // Return the newly created restaurant
    return newRestaurant;
  } catch (error) {
    // Handle errors gracefully
    throw error;
  }
}




async function validPassword(req: any, res: any) {
  try {
    const { password, email } = req.body
    const restaurant: any = await Restaurant.findOne({
      where: {
        email: email
      }
    })

    const checkPassword = await bcrypt.compare(password, restaurant?.password)

    if (checkPassword) {
      const token = jwt.sign(
        { _id: restaurant._id, email },
        TOKEN_KEY)
      return res.json({ message: "successfully login", token })
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}




export {
  createRestaurant,
  findRestaurant,
  validPassword
};
