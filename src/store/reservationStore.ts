import { reservationDetails } from "../models/reservationModel";
import Restaurant from "../models/resgisterModel"
import { EmployeeDetails } from "../models/employeeModel"

async function reservationphone(req: any, res: any) {
    try {
        const { contact } = req.body;
        const phoneCheck = await reservationDetails.findOne({
            where: {
                contact: contact
            }
        });
        if (phoneCheck) {
            return phoneCheck;
        }
        return null;
    } catch (error) {
        throw error;
    }
}


async function reservationCreate(req: any, res: any) {
    try {

        const newName: any = await reservationDetails.create(req.body);
        return newName;
    } catch (error) {
        throw error;
    }
};



async function RestaurantIdFind(req: any, res: any) {
    try {
        const { restaurantId }: any = req.body;

        const validRestaurantId: any = await Restaurant.findByPk(restaurantId);
        return validRestaurantId;

        return null;
    } catch (error) {
        throw error;
    }
};


async function employeeIdFind(req: any, res: any) {
    try {
        const { employeeId }: any = req.body;

        const validemployeeId: any = await EmployeeDetails.findByPk(employeeId);
        if (validemployeeId) {
            return validemployeeId;
        }

        return null;
    } catch (error) {
        throw error;
    }
};



/* Reservation Update Api */

async function reservationUpdate(req: any, res: any) {
    try {
        const Id: any = req.params.id;
        const data: any = req.body;

        const reservationId: any = await reservationDetails.findByPk(Id);
        if (!reservationId) {
            return res.status(404).json({ message: 'Reservation Id not found' });
        }

        await reservationId.update(data);
        return reservationId
    } catch (error) {
        throw error;
    }
};








export {
    reservationCreate,
    RestaurantIdFind,
    employeeIdFind,
    reservationphone,
    reservationUpdate
};

