import db from "../database";

// types to use
interface product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export class productsCRUD {
  async index(): Promise<product[]> {
    try {
      const con = await db.connect();
      const sql = `SELECT * FROM products`;
      const res = (await con.query(sql)).rows;
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not get" + error);
    }
  }
  async indexOne(id: number): Promise<product> {
    try {
      const con = await db.connect();
      const sql = `SELECT * FROM products
      WHERE id = ${id}`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not get" + error);
    }
  }
  async insert(
    name: string,
    quantity: number,
    price: number
  ): Promise<product> {
    try {
      const con = await db.connect();
      const sql = `INSERT INTO products 
        (name,quantity,price)
        VALUES
        ('${name}',${quantity},${price})
        RETURNING *`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not insert" + error);
    }
  }
  async edit(
    id: number,
    name: string,
    quantity: number,
    price: number
  ): Promise<product> {
    try {
      const con = await db.connect();
      const sql = `UPDATE products 
        SET name = '${name}',
        quantity = ${quantity},
        price = ${price}
        WHERE id = ${id}
        RETURNING *`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not edit" + error);
    }
  }
  async delete(id: number): Promise<product> {
    try {
      const con = await db.connect();
      const sql = `DELETE FROM products
      WHERE id = ${id}
      RETURNING *`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not delete" + error);
    }
  }
}
