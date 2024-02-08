import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Restaurant Management System");
});

app.listen(port, () => {
  console.log(` http://localhost:${port}`);
});

