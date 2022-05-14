import express from "express";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = `${process.env.TOKEN_SECRET}`;

const authP = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = `${req.headers.authorization}`;
    const id = parseInt(req.params.id);
    const user = Jwt.decode(authorizationHeader);
    //@ts-ignore
    if (id == user.id) {
      next();
    } else {
      res.status(401);
      res.json(`You dont have acces to ths user`);
    }
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

export default authP;
