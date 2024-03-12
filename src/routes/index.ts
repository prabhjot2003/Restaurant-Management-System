
import { restaurantRoute } from './restaurantRoutes';
import employessRoute from './employeeRoutes';
import categoryRoute from './categoryRoutes';
import menuRoute from './menuRoutes';
import reservationRoute from "./reservationRoutes"
import orderRoutes from './orderRoutes';
import PaymentRoute from ".//paymentRoutes"



const route = (app: any) => {
  restaurantRoute(app)
  employessRoute(app)
  categoryRoute(app)
  menuRoute(app)
  reservationRoute(app)
  orderRoutes(app)
  PaymentRoute(app)
}
export default route;

