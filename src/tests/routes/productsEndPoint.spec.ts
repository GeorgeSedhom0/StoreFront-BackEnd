import supertest from "supertest";
import app from "../../index";
const request = supertest(app);

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NTEwODYzNTF9.W_o4FkIvzirQUkgSkNWkRnUNU_rK1RgLVrdHZL5KPak";

const product = {
  name: "product",
  price: 1,
  quantity: 1,
};
const newProduct = {
  name: "product",
  price: 2,
  quantity: 2,
};

describe("Test products End Point", () => {
  it("sould index all products", async () => {
    const res = await request.get("/products");
    expect(res.body).toEqual([]);
  });
  it("sould post a product", async () => {
    const res = await request
      .post("/products")
      .send(product)
      .set("authorization", jwt);
    expect(res.body).toEqual({
      id: 1,
      name: "product",
      price: 1,
      quantity: 1,
    });
  });
  it("sould edit (put) a product", async () => {
    const res = await request
      .put("/products/1")
      .send(newProduct)
      .set("authorization", jwt);
    expect(res.body).toEqual({
      id: 1,
      name: "product",
      price: 2,
      quantity: 2,
    });
  });
  it("sould delete a product", async () => {
    const res = await request.delete("/products/1").set("authorization", jwt);
    expect(res.body).toEqual({
      id: 1,
      name: "product",
      price: 2,
      quantity: 2,
    });
  });
});
