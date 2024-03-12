import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/dbconfig";
import { RestaurantAttributes } from '../utiles/interface/resisterinterface';

class Restaurant extends Model<RestaurantAttributes> implements RestaurantAttributes {
  public name!: string;
  public address!: string;
  public since!: Date; // Ensure it's required if it shouldn't be nullable
  public about?: string;
  public email!: string;
  public password!: string;
  public contact!: number

}

Restaurant.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  since: {
    type: DataTypes.DATEONLY,
    allowNull: false // Ensure it's not nullable if it shouldn't be
  },
  about: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
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

},
  {
    sequelize,
    modelName: 'RestaurantDetails' // Corrected the model name
  });

sequelize.sync().then(() => {
  console.log('Restaurant table created successfully!');
}).catch((error) => {
  console.error('Unable to create table: ', error);
});

export default Restaurant;
