import { Router } from "express";
import { usersCRUD } from "../models/usersCRUD";
import userValidate from "../utils/validateUser";
import auth from "./JWTAuth";
import authP from "./JWTAuthPersonal";

const userRoutes = Router();
const db = new usersCRUD();

userRoutes.get("/", auth, async (req, res) => {
  try {
    const users = await db.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

userRoutes.get("/:id", auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const users = await db.indexOne(id);
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

userRoutes.post("/", async (req, res) => {
  // make sure sent user data are valied

  try {
    const userData = await userValidate(req);
    const userJWT = await db.insert(
      userData.firstname,
      userData.lastname,
      userData.password
    );
    res.json(userJWT);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});
userRoutes.post("/auth", async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const userJWT = await db.auth(firstname, lastname, password);
    res.json(userJWT);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

userRoutes.put("/:id", authP, async (req, res) => {
  const id = parseInt(req.params.id);
  // make sure sent user data are valied
  try {
    const userData = await userValidate(req);
    const user = await db.edit(
      id,
      userData.firstname,
      userData.lastname,
      userData.password
    );
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

userRoutes.delete("/:id", authP, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await db.delete(id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

export default userRoutes;
