import { ordersCRUD } from "../../models/ordersCRUD";
import { usersCRUD } from "../../models/usersCRUD";
import { productsCRUD } from "../../models/productsCRUD";
import shell from "shelljs";

const db = new ordersCRUD();
const udb = new usersCRUD();
const pdb = new productsCRUD();

describe("Test orders CRUD", () => {
  it("sould index all orders", async () => {
    const res = await db.index();
    expect(res).toEqual([]);
  });
  it("sould insert an order", async () => {
    await udb.insert("g", "s", "1");
    const res = await db.insert(1);
    expect(res).toEqual({ user_id: 1, status: "true", id: 1 });
  });
  it("sould edit an order", async () => {
    expect(await db.edit(1, false)).toEqual({
      user_id: 1,
      status: "false",
      id: 1,
    });
  });
  it("sould add products to order", async () => {
    await pdb.insert("prod", 10, 1100);
    expect(await db.productsOrder(1, 1, 100)).toEqual({
      quantity: 100,
      order_id: 1,
      product_id: 1,
    });
  });
  it("sould add products to order", async () => {
    await pdb.insert("prod", 10, 1100);
    expect(await db.productsOrderIndex(1)).toEqual([
      {
        id: 1,
        name: "prod",
      },
    ]);
  });
  it("sould delete products of an order", async () => {
    expect(await db.productsOrderDel(1, 1)).toEqual({
      quantity: 100,
      order_id: 1,
      product_id: 1,
    });
  });
  it("sould delete an order", async () => {
    expect(await db.delete(1)).toEqual({
      user_id: 1,
      status: "false",
      id: 1,
    });
  });
  afterAll(() => {
    shell.exec("db-migrate --env test reset && db-migrate --env test up");
  });
});
