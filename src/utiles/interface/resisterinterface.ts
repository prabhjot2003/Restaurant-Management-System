
// Define the interface for the Restaurant entity
export interface RestaurantAttributes {
  name: string;
  address: string;
  since?: Date;
  about?: string;
  email: string;
  password: string;
  contact: number

};




import { Json } from "sequelize/types/utils";

/* Define the interface for the Employee entity */
import Role from "../enums/employeEnum";

export interface Employee {
  name: string;
  address: string;
  email: string;
  password: string;
  contact: Number;
  isActive: boolean;
  role: Role;
  restaurantId: Number;
  id: number

};



/* define the interface for the category entity */

export interface category {
  name: String,
  restaurantId: Number,


};

/* define the interface for the menu  entity */

export interface menu {
  nameOfIteam: String,
  categoryId: Number,
  price: Number,
  // id: Number

};


/* define the interface for the reservation entity */

export interface reservation {
  userName: String,
  contact: Number,
  employeeId: Number,
  restaurantId: Number
}


import Stauts from "../enums/orderEnum";

export interface order {

  contact: Number,
  restaurantId: Number,
  customerName: String,
  address: String,
  Stauts: Stauts,
  menuId: Json,


};

export interface Decoded {
  _id: string;
  email: string;
  // Add more properties if `decoded` has more properties
}

// Define interface for req object
export interface Req {
  _id: string;
  email: string;
  // Add more properties if `req` has more properties
}




