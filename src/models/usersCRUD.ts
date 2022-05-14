import db from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";

// types to use
interface user {
  id: number;
  first_name: string;
  last_name: string;
}
interface userJWT {
  id: number;
  jwt: string;
}
// consts from the .env file
dotenv.config();
const { SALT_ROUNDS, BCRYPT_PASSWORD, TOKEN_SECRET } = process.env;
const secret = `${TOKEN_SECRET}`;
const salt = `${BCRYPT_PASSWORD}`;
const saltRounds = parseInt(`${SALT_ROUNDS}`);

export class usersCRUD {
  async index(): Promise<user[]> {
    try {
      const con = await db.connect();
      const sql = `SELECT first_name,last_name,id
    FROM users`;
      const res = (await con.query(sql)).rows;
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not get" + error);
    }
  }
  async indexOne(id: number): Promise<user> {
    try {
      const con = await db.connect();
      const sql = `SELECT first_name,last_name,id
    FROM users WHERE id = ${id};`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not get" + error);
    }
  }
  async insert(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<userJWT> {
    try {
      password = await bcrypt.hash(password + salt, saltRounds);
      const con = await db.connect();
      const sql = `INSERT INTO users 
        (first_name,last_name,password)
        VALUES
        ('${firstname}','${lastname}','${password}')
        RETURNING first_name,last_name,id`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      const jwt = JWT.sign(res, secret);
      return { jwt: jwt, id: res.id };
    } catch (error) {
      throw new Error("can not insert" + error);
    }
  }
  async auth(
    firstname: string | undefined,
    lastname: string | undefined,
    password: string | undefined
  ): Promise<userJWT> {
    try {
      const con = await db.connect();
      const sql = `SELECT first_name,last_name,id FROM users
      WHERE first_name = '${firstname}' AND
      last_name = '${lastname}'`;
      const sqlPassword = `SELECT password FROM users
      WHERE first_name = '${firstname}' AND
      last_name = '${lastname}'`;
      const DBPass = (await con.query(sqlPassword)).rows[0].password;
      const res = (await con.query(sql)).rows[0];
      con.release();
      if (bcrypt.compareSync(password + salt, DBPass)) {
        const jwt = JWT.sign(res, secret);
        return { jwt: jwt, id: res.id };
      } else {
        return { jwt: "Wrong passwrd", id: res.id };
      }
    } catch (error) {
      throw new Error("can not insert" + error);
    }
  }
  async edit(
    id: number,
    firstname: string,
    lastname: string,
    password: string
  ): Promise<userJWT> {
    try {
      password = await bcrypt.hash(password + salt, saltRounds);
      const con = await db.connect();
      const sql = `UPDATE users 
        SET first_name = '${firstname}',
        last_name = '${lastname}',
        password = '${password}'
        WHERE id = ${id}
        RETURNING first_name,last_name,id`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      const jwt = JWT.sign(res, secret);
      return { jwt: jwt, id: res.id };
    } catch (error) {
      throw new Error("can not edit" + error);
    }
  }
  async delete(id: number): Promise<user> {
    try {
      const con = await db.connect();
      const sql = `DELETE FROM users
      WHERE id = ${id}
      RETURNING first_name,last_name,id`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not delete" + error);
    }
  }
}
