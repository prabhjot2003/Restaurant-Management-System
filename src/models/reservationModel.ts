import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/dbconfig";
import { reservation } from '../utiles/interface/resisterinterface';


class reservationDetails extends Model<reservation> {
    public userName!: string
    public employeeId!: Number
    public restaurantId!: Number
    public contact!: Number


}

reservationDetails.init({
    userName: {
        type: DataTypes.STRING,
    },
    contact: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            min: 1000000000,
            max: 9999999999,
            isInt: true
        }
    },

    restaurantId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'RestaurantDetails',
            key: 'id',
        }
    },
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Employees',
            key: 'id',
        }

    }
}, {
    sequelize,
    modelName: 'revservation' // Corrected the model name
});

sequelize.sync().then(() => {
    console.log('Restaurant table created successfully!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});

export { reservationDetails }  
