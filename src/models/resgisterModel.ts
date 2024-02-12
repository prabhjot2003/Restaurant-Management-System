// import registration from "../utiles/interface/resisterinterface";
// import { Sequelize, DataTypes } from "sequelize";

// const sequelize = new Sequelize('sqlite::memory:');


// const userSchema = sequelize.define("Restaurant", {
//         id: {
//           type: DataTypes.NUMBER,
         
//         },
//         ownerName: {
//           type: DataTypes.STRING(100),
//         },
//         restaurantName: {
//           type: DataTypes.STRING(100),
          
//         },
//         city: {
//           type: DataTypes.STRING(50),
          
//         },
//         address: {
//           type: DataTypes.STRING(100),
         
//         },
//         email:{
//           type: DataTypes.STRING(100),
          
          
//         },
//         password: {
          
//           type: DataTypes.STRING(100),
//         }
// });

// export default userSchema;


import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('sqlite::memory:');

const Restaurant = sequelize.define("Restaurant", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ownerName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    restaurantName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
       
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

export default Restaurant;



