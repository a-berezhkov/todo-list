import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router.js";

const DB_URL =
  "mongodb+srv://super-user:super-pass@cluster0.fdc3gbh.mongodb.net/?retryWrites=true&w=majority";

const port = 5002;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(port, () => {
      console.log(`serv strt on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();

