import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/dbconfig";
import { category } from '../utiles/interface/resisterinterface';


class categoryDetails extends Model<category> {
    public name!: string;
    public restaurantId!: Number;


}

categoryDetails.init({
    name: {
        type: DataTypes.STRING,
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
        modelName: 'Category',
    });


sequelize.sync().then(() => {
    console.log('Employee table created successfully!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});

export { categoryDetails };

