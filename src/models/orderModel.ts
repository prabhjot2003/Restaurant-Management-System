import { Sequelize, DataTypes, Model, STRING } from "sequelize";
import sequelize from "../config/dbconfig";
import { order } from '../utiles/interface/resisterinterface';
import Stauts from "../utiles/enums/orderEnum";
import { Json } from "sequelize/types/utils";


class orderDetails extends Model<order> {
    public customerName!: string;
    public address!: string;
    public contact!: number;
    public restaurantId!: number;
    public Stauts!: Stauts;
    public menuId!: Json;


}

orderDetails.init({

    customerName: {
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

    Stauts: {
        type: DataTypes.ENUM,
        values: Object.values(Stauts),
    },
    menuId: {
        type: DataTypes.JSON
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'RestaurantDetails',
            key: 'id',
        }
    }
},

    {
        sequelize,
        modelName: 'Order',
    });


sequelize.sync().then(() => {
    console.log('Order table created successfully!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});

export { orderDetails };

