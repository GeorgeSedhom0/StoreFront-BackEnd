import { Request } from "express";
import db from "../database";

export const validateOrder = async (req: Request): Promise<number> => {
  const userId = parseInt(req.body.userId);
  const con = await db.connect();
  const sql = `SELECT EXISTS(SELECT id FROM users WHERE id = ${userId});`;
  const res = await con.query(sql);
  con.release();
  if (res.rows[0]) {
    return userId;
  } else {
    throw new Error("Un-valied user id");
  }
};
