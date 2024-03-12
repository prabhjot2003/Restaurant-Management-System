import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/dbconfig";
import { menu } from '../utiles/interface/resisterinterface';


class menuDetails extends Model<menu> {
    public nameOfIteam!: string;
    public categoryId!: Number;
    public Price!: Number;
    // public id?: Number



}

menuDetails.init({
    nameOfIteam: {
        type: DataTypes.STRING,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'id',
        }
    },
    price: {
        type: DataTypes.INTEGER
    },

},
    {
        sequelize,
        modelName: 'Menu',
    });


sequelize.sync().then(() => {
    console.log('Employee table created successfully!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});

export { menuDetails }

