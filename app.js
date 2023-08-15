import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const url = `mongodb+srv://admin-aviprit:${process.env.PASSWORD}@cluster0.vdvle.mongodb.net/reuniondb?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db is connected");
});

app.listen(3000, console.log("Server is running on port 3000"));
