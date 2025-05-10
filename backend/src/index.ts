import express from "express";
import authRouter from "./routes/auth";
import "dotenv/config";

const app = express();
app.use(express.json());

app.use("/auth", authRouter); // → POST /auth/login

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
