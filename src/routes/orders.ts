import { ordersCRUD } from "../models/ordersCRUD";
import { Router } from "express";
import { validateOrder } from "../utils/validateOrders";

const ordersRoutes = Router();
const db = new ordersCRUD();

ordersRoutes.get("/", async (req, res) => {
  try {
    const users = await db.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

ordersRoutes.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const users = await db.indexOne(id);
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

ordersRoutes.post("/", async (req, res) => {
  // make sure sent product data are valied
  try {
    const userId = await validateOrder(req);
    const order = await db.insert(userId);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

ordersRoutes.put("/:id/close", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await db.edit(id, false);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

ordersRoutes.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await db.delete(id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});
ordersRoutes.post("/:id/products", async (req, res) => {
  try {
    const quantity = parseInt(req.body.quantity);
    const orderId = parseInt(req.params.id);
    const productId = parseInt(req.body.productId);
    const orderProducts = await db.productsOrder(orderId, productId, quantity);
    res.json(orderProducts);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

ordersRoutes.get("/:id/products", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const orderProducts = await db.productsOrderIndex(orderId);
    res.json(orderProducts);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

ordersRoutes.delete("/:orderId/products/:productId", async (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const productId = parseInt(req.params.productId);
    const orderProducts = await db.productsOrderDel(orderId, productId);
    res.json(orderProducts);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

export default ordersRoutes;
