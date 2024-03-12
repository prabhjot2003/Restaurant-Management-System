import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
   'test',
   'root',
   '',
   {
      host: 'localhost',
      dialect: 'mysql'
   }
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

export default sequelize