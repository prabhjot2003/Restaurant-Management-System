import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/dbconfig";
import { Employee } from '../utiles/interface/resisterinterface';
import Role from "../utiles/enums/employeEnum";

class EmployeeDetails extends Model<Employee> {
    public id?: number;
    public name!: string;
    public address!: string;
    public phoneNO!: number;
    public isActive!: boolean;
    public email!: string;
    public password!: string;
    public role!: Role;
    public restaurantId!: number;

}

EmployeeDetails.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    contact: {
        type: DataTypes.BIGINT, // Assuming the contact is a phone number, use BIGINT for storing large integer values
        unique: true,
        validate: {
            min: 1000000000,
            max: 9999999999,
            isInt: true
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true // Validation rule for email
        }
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM, // Corrected data type
        values: Object.values(Role),
    },

    restaurantId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'RestaurantDetails',
            key: 'id',
        }
    }
}, {
    sequelize,
    modelName: 'Employee',
});


sequelize.sync().then(() => {
    console.log('Employee table created successfully!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});

export { EmployeeDetails };

