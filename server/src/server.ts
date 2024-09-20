import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./config/dbConnection";
import userRouter from "./routes/usersRoutes";

dotenv.config();
dbConnection();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
