import db from "../database";

// types to use
interface order {
  id: number;
  status: string;
  user_id: number;
}
interface orderProducts {
  order_id: number;
  product_id: number;
  quantity: number;
}
interface productsOrder {
  id: number;
  name: string;
}

export class ordersCRUD {
  async index(): Promise<order[]> {
    try {
      const con = await db.connect();
      const sql = `SELECT * FROM orders;`;
      const res = (await con.query(sql)).rows;
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not get " + error);
    }
  }
  async indexOne(userId: number): Promise<order[]> {
    try {
      const con = await db.connect();
      const sql = `SELECT * FROM orders
      WHERE user_id = ${userId};`;
      const res = (await con.query(sql)).rows;
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not get " + error);
    }
  }
  async insert(userId: number): Promise<order> {
    try {
      const con = await db.connect();
      const sql = `INSERT INTO orders 
        (status,user_id)
        VALUES
        (true,${userId})
        RETURNING *`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not insert " + error);
    }
  }
  async edit(id: number, status: boolean): Promise<order> {
    try {
      const con = await db.connect();
      const sql = `UPDATE orders 
        SET status = '${status}'
        WHERE id = ${id}
        RETURNING *`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not edit " + error);
    }
  }
  async delete(id: number): Promise<order> {
    try {
      const con = await db.connect();
      const sql = `DELETE FROM orders
      WHERE id = ${id}
      RETURNING *`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not delete" + error);
    }
  }
  async productsOrder(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<orderProducts> {
    try {
      const con = await db.connect();
      const sql = `INSERT INTO orders_products 
        (quantity,order_id,product_id)
        VALUES
        (${quantity},${orderId},${productId})
        RETURNING *`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not insert" + error);
    }
  }
  async productsOrderIndex(orderId: number): Promise<productsOrder[]> {
    try {
      const con = await db.connect();
      const sql = `SELECT products.name, products.id FROM orders_products 
      INNER JOIN products ON products.id = product_id 
      INNER JOIN orders ON orders.id = order_id
      WHERE orders.id = ${orderId};`;
      const res = (await con.query(sql)).rows;
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not insert" + error);
    }
  }
  async productsOrderDel(
    orderId: number,
    productId: number
  ): Promise<orderProducts> {
    try {
      const con = await db.connect();
      const sql = `DELETE FROM orders_products 
        WHERE order_id = ${orderId} AND product_id = ${productId}
        RETURNING *;`;
      const res = (await con.query(sql)).rows[0];
      con.release();
      return res;
    } catch (error) {
      throw new Error("can not insert" + error);
    }
  }
}
