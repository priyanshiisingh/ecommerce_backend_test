import express from "express";
import dotenv from "dotenv";
dotenv.config("../.env");
import connectdb from "./services/mongodb/connectDB";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productsRoutes from "./routes/productsRoutes";

const app = express();

const PORT = process.env.PORT || 3000;

connectdb();

app.use(cors());
app.use(express.json());

//route to handle auth request
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productsRoutes);

console.log("hi");

app.get("/", (req, res) => {
  res.send(`server listening to PORT ${PORT}`);
});

app.listen(PORT, (req, res) => {
  console.log(`Server listening to PORT ${PORT}`);
});
