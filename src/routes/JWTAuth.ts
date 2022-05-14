import express from "express";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = `${process.env.TOKEN_SECRET}`;

const auth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = `${req.headers.authorization}`;
    const token = authorizationHeader.split(" ")[0];
    const decoded = Jwt.verify(token, secret);
    if (decoded) next();
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

export default auth;
