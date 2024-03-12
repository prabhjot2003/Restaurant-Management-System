import { EmployeeDetails } from "../models/employeeModel";
import bcrypt from "bcrypt";
import Restaurant from "../models/resgisterModel"
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/env";

async function employeeRestaurant(req: any, res: any) {
  try {
    const { email } = req.body;
    const employee = await EmployeeDetails.findOne({
      where: { email }
    });
    return employee || null;
  } catch (error) {
    console.error(error);
    throw new Error("Error in finding employee's restaurant");
  }
};


async function createEmployee(req: any, res: any) {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;

    const newEmployee = await EmployeeDetails.create(req.body);
    return newEmployee;
  } catch (error) {
    console.error(error);

    throw new Error("Error in creating employee");
  }
};


async function validPasswordEmployee(req: any, res: any) {
  try {
    const { password, email } = req.body;
    const employee = await EmployeeDetails.findOne({
      where: {
        email
      }
    });

    if (!employee) {
      return res.status(404).json({ message: "No employee found with the given email" });
    }

    const checkPassword = await bcrypt.compare(password, employee.password);

    if (checkPassword) {
      const token = jwt.sign(
        { _id: employee.id, role: employee.role, email: employee.email },
        TOKEN_KEY
      );
      console.log(employee.role);
      return res.json({ message: "successfully login", token });
    } else {
      return res.status(401).json({ message: "Password is invalid" });
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error in validating employee password");
  }
};


async function RestaurantIdFind(req: any, res: any) {
  try {
    const id = req.params.id;
    const validRestaurant = await Restaurant.findByPk(id);

    if (validRestaurant) {
      return res.status(200).json(validRestaurant);
    } else {
      return res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" }); // Handle any error
  }
}





async function getEmployee(req: any, res: any) {
  try {
    const restaurantId: any = req.params.id;
    const employee: any = await EmployeeDetails.findAll({
      where: {
        restaurantId: restaurantId
      }
    });

    if (employee) {
      return employee;
    }
    return null;
  } catch (error) {
    throw error;
  }
};



async function updateEmployee(req: any, res: any) {
  try {
    const restaurantId: any = req.params.id;
    const data: any = req.body;

    const employeeValidId: any = await EmployeeDetails.findByPk(restaurantId);
    if (!employeeValidId) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const { password }: any = req.body;
    const saltRounds: number = 10;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword

    await employeeValidId.update(data);
    return res.status(200).json({ message: 'Employee updated', data });
  } catch (error) {
    throw error;
  }
}



/* Employee delet api*/

async function deleteEmployee(req: any, res: any) {
  try {
    const Id: number = req.params.id;
    const employeevalid: any = await EmployeeDetails.findByPk(Id);
    if (!employeevalid) {
      return null;
    }
    await employeevalid.destroy()
    return employeevalid
  } catch (error) {
    throw error;
  }
};





export {
  employeeRestaurant,
  createEmployee,
  validPasswordEmployee,
  RestaurantIdFind,
  getEmployee,
  updateEmployee,
  deleteEmployee
};








