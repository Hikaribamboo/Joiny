import express from "express";
import authRouter from "./routes/users";
import "dotenv/config";

const app = express();
app.use(express.json());

app.use("/users", authRouter); 

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
