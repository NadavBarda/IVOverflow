import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./config/dbConnection";

dotenv.config();
dbConnection();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
