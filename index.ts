import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import conection from "./src/config/dbconfig";
import mysql from 'mysql2';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Restaurant Management System");
});

app.listen(port, () => {
  console.log(` http://localhost:${port}`);
});

const connections = mysql.createConnection({
  host:conection.host,
  user: conection.user,
  password: conection.password,
  database: conection.database

});


connections.connect((error) => {
  if (error) {
    console.error('Connection failed:', error);
  } else {
    console.log("Connection successful");
  }
});



