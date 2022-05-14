import express from "express";
import userRoutes from "./routes/users";
import productsRoutes from "./routes/products";
import cors, { CorsOptions } from "cors";
import ordersRoutes from "./routes/orders";
import auth from "./routes/JWTAuth";

const app = express();
const corsOptions: CorsOptions = {
  origin: "https://www.gmk2tech.com",
  optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));

app.use("/users", userRoutes);
app.use("/products", productsRoutes);
app.use("/orders",auth, ordersRoutes);

app.listen(3000, () => {
  console.log("running");
});

export default app;
