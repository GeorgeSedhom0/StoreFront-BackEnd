import { productsCRUD } from "../../models/productsCRUD";
import shell from "shelljs";

const db = new productsCRUD();

describe("Test products CRUD", () => {
  it("sould index all products", async () => {
    const res = await db.index();
    expect(res).toEqual([]);
  });
  it("sould insert a product", async () => {
    const res = await db.insert("product", 1, 1);
    expect(res).toEqual({ id: 1, name: "product", quantity: 1, price: 1 });
  });
  it("sould edit a product", async () => {
    const res = await db.edit(1, "product", 2, 2);
    expect(res).toEqual({ id: 1, name: "product", quantity: 2, price: 2 });
  });
  it("sould delete a product", async () => {
    const res = await db.delete(1);
    expect(res).toEqual({ id: 1, name: "product", quantity: 2, price: 2 });
  });
  afterAll(() => {
    shell.exec("db-migrate --env test reset && db-migrate --env test up");
  });
});
