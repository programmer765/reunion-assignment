import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./UserSchema.js";
import jwt from "jsonwebtoken";

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

app.post("/api/authenticate", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  await User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.status(404);
      res.send("User Not Found");
    } else if (user.password === password) {
      const token = jwt.sign({ email: email }, "secretKey", {
        expiresIn: "10m",
      });
      res.status(200);
      res.send({
        success: true,
        data: {
          email: email,
          token: token,
        },
      });
    } else {
      res.status(403);
      res.send("Passwords do not match");
    }
  });
});

app.listen(3000, console.log("Server is running on port 3000"));
