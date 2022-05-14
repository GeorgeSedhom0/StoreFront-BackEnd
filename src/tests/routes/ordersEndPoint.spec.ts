import supertest from "supertest";
import app from "../../index";
import shell from "shelljs";
import { usersCRUD } from "../../models/usersCRUD";
import { productsCRUD } from "../../models/productsCRUD";

const request = supertest(app);
const db = new usersCRUD();
const pdb = new productsCRUD();

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NTEwODYzNTF9.W_o4FkIvzirQUkgSkNWkRnUNU_rK1RgLVrdHZL5KPak";

const order = {
  userId: 1,
};
const product = {
  userId: 1,
  productId: 1,
  quantity: 20,
};
describe("Test orders End Point", () => {
  it("sould index all orders", async () => {
    const res = await request.get("/orders").set("authorization", jwt);
    expect(res.body).toEqual([]);
  });
  it("sould post an order", async () => {
    await db.insert("g", "s", "1");
    const res = await request
      .post("/orders")
      .send(order)
      .set("authorization", jwt);

    expect(res.body).toEqual({ user_id: 1, status: "true", id: 1 });
  });
  it("sould edit a order", async () => {
    const res = await request.put("/orders/1/close").set("authorization", jwt);
    expect(res.body).toEqual({
      user_id: 1,
      status: "false",
      id: 1,
    });
  });
  it("sould insert products to an order", async () => {
    await pdb.insert("prod", 20, 200);
    const res = await request
      .post("/orders/1/products")
      .send(product)
      .set("authorization", jwt);
    expect(res.body).toEqual({
      order_id: 1,
      product_id: 1,
      quantity: 20,
    });
  });
  it("sould get products to an order", async () => {
    const res = await request
      .get("/orders/1/products")
      .set("authorization", jwt);
    expect(res.body).toEqual([
      {
        id: 1,
        name: "prod",
      },
    ]);
  });
  it("sould delete to an order", async () => {
    const res = await request
      .del("/orders/1/products/1")
      .set("authorization", jwt);
    expect(res.body).toEqual({
      order_id: 1,
      product_id: 1,
      quantity: 20,
    });
  });

  afterAll(() => {
    shell.exec("db-migrate --env test reset && db-migrate --env test up");
  });
});
