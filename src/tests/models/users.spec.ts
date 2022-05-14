import { usersCRUD } from "../../models/usersCRUD";
import shell from "shelljs";
const db = new usersCRUD();

describe("Test users CRUD", () => {
  it("sould index all users", async () => {
    const res = await db.index();
    expect(res).toEqual([]);
  });
  it("sould insert a user", async () => {
    const res = await db.insert("george", "sedhom", "pass");
    expect(res.id).toEqual(1);
  });
  it("sould edit a user", async () => {
    const res = await db.edit(1, "newGeorge", "newSedhom", "newPass");
    expect(res.id).toEqual(1);
  });
  it("sould delete a user", async () => {
    const res = await db.delete(1);
    expect(res).toEqual({
      id: 1,
      first_name: "newGeorge",
      last_name: "newSedhom",
    });
  });
  afterAll(() => {
    shell.exec("db-migrate --env test reset && db-migrate --env test up");
  });
});
