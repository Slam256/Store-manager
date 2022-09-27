import { Router } from "express";
import productsRoute from "./products.js";
import usersRoute from "./users.js";

const routes = Router();

routes.use("/products", productsRoute);
routes.use("/auth", usersRoute);

export default routes;
