import express from "express";
import authRouter from "./routes/users";
import postsRouter from "./routes/posts";
import "dotenv/config";

const cors = require('cors');
const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  methods: ['HEAD', 'GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/users", authRouter); 
app.use("/posts", postsRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
