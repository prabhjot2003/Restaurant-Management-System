import { Request, Response } from 'express';
import { createRestaurant, findRestaurant, validPassword } from '../store/restaurantStore';

async function creatingRestaurant(req: Request, res: Response) {
  try {
    const { email }: any = req.body;
    // Check if the email is missing or empty
    if (!email) {
      return res.status(400).json({ message: "email is required." });
    }
    // Check if a restaurant with the same email already exists
    const existingRestaurant: string = await findRestaurant(req, res);
    if (existingRestaurant) {
      return res.status(400).json({ message: "Restaurant with the same email already exists." });
    }
    // Create a new restaurant
    const newRestaurant: any = await createRestaurant(req, res);

    return res.status(201).json({
      message: 'Restaurant created successfully.',
      data: newRestaurant,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error while creating restaurant.' });
  }
}


async function loginRestaurant(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const validEmail = await findRestaurant(req, res);
    if (validEmail) {
      const checkPassword = await validPassword(req, res)
      if (checkPassword) {
        return res.status(201).json({ message: 'login successfully', data: validEmail })
      } else {
        return res.status(400).json({ message: "Incorrect Password." });

      }
    } else {
      return res.status(400).json({ message: "no Restaurant is registered with this email." });
    }
  } catch (error) {
    return res.status(500).json({ message: 'error while creating restaurant.' });

  }
}



export default {
  creatingRestaurant,
  loginRestaurant
};
