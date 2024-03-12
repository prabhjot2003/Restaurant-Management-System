import { Express } from 'express';
import creatingRestaurant from '../services/restaurantService';
import auth from '../middleware/milddleware';

const restaurantRoute = (app: Express) => {

	app.post('/createRestaurant', creatingRestaurant.creatingRestaurant);
	app.post('/loginRestaurant', creatingRestaurant.loginRestaurant);



}
export { restaurantRoute };

