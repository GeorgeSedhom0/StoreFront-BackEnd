import { Router } from "express";
import { productsCRUD } from "../models/productsCRUD";
import productValidate from "../utils/productValidation";
import auth from "./JWTAuth";

const productsRoutes = Router();
const db = new productsCRUD();

productsRoutes.get("/", async (req, res) => {
  try {
    const users = await db.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

productsRoutes.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const users = await db.indexOne(id);
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

productsRoutes.post("/", auth, async (req, res) => {
  // make sure sent product data are valied
  try {
    const productData = await productValidate(req);
    const product = await db.insert(
      productData.name,
      productData.quantity,
      productData.price
    );
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

productsRoutes.put("/:id", auth, async (req, res) => {
  const id = parseInt(req.params.id);
  // make sure sent user data are valied
  try {
    const productData = await productValidate(req);
    const product = await db.edit(
      id,
      productData.name,
      productData.quantity,
      productData.price
    );
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json("error" + error);
  }
});

productsRoutes.delete("/:id", auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await db.delete(id);
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json("error" + error);
  }
});

export default productsRoutes;
