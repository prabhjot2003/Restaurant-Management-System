import { Request, Response } from 'express';
import { employeeRestaurant, createEmployee, validPasswordEmployee, RestaurantIdFind, getEmployee, updateEmployee, deleteEmployee } from "../store/employeeStore"


async function employeedata(req: Request, res: Response) {
    const { email }: any = req.body;
    try {
        const { email }: any = req.body;


        // Check if the email is missing or empty
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        // Check if the restaurant id is valid
        const restaurantIdValid: any = await RestaurantIdFind(req, res);
        if (!restaurantIdValid) {
            return res.status(404).json({ message: "Restaurant ID not found" });
        }

        // Check if an employee with the same email already exists
        const existingEmployee: any = await employeeRestaurant(req, res);
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee with the same email already exists." });
        }

        // Create a new employee
        const newEmployee: any = await createEmployee(req, res);

        return res.status(201).json({
            message: 'Employee created successfully.',
            data: newEmployee,
        });

    } catch (error) {
        return (error)
        // return res.status(500).json({ error: 'Error while creating employee.' });
    }
}









/* login Employee using emial and password */

async function loginEmployee(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const validEmail = await employeeRestaurant(req, res);
        if (validEmail) {
            const checkPassword = await validPasswordEmployee(req, res)
            if (checkPassword) {
                return res.status(201).json({ message: 'login successfully', data: checkPassword })
            } else {
                return res.status(400).json({ message: "Incorrect Password." });

            }
        } else {
            return res.status(400).json({ message: "no Restaurant is registered with this email." });
        }
    } catch (error) {
        return res.status(500).json({ message: 'error while creating restaurant.' });

    }

};



/* getAll Empolye by restaurand Id */

async function getAllEmployee(req: Request, res: Response) {
    try {

        const restaurantIdvalid: any = await RestaurantIdFind(req, res);
        if (!restaurantIdvalid) {
            return res.status(404).json({ message: "Restaurant id not found" })
        }


        const employee = await getEmployee(req, res)
        return res.status(200).json({ message: employee })

    } catch (error) {
        return res.status(500).json({ message: 'error while creating restaurant.' });

    }
};




/* update the Employee api using employee id */

async function getupdateEmployees(req: Request, res: Response) {
    try {

        const employeeIdValid: number = await updateEmployee(req, res);
        if (!employeeIdValid) {
            return res.status(404).json({ message: "employes id not found" });
        }

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({ message: 'Error while updating employees.' });
    }
};




/*delete api Employee using Id   */

async function getdeleteEmployees(req: Request, res: Response) {
    try {
        const menuId: string = req.params.id

        const employeevalid = await deleteEmployee(req, res)
        if (employeevalid) {
            return res.status(201).json({ message: "Employee deleted successfully", employeevalid })
        }
        return res.status(400).json({ message: "employee id item does not exists" })
    } catch (error) {
        return res.status(500).json({ message: 'Error while deletinh Employee.' });
    }
};









export default {
    employeedata,
    loginEmployee,
    getAllEmployee,
    getupdateEmployees,
    getdeleteEmployees

}

