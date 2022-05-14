import supertest from "supertest";
import app from "../../index";
import shell from "shelljs";
const request = supertest(app);
const user = {
  firstname: "george",
  lastname: "sedhom",
  password: "pass",
};
const newUser = {
  firstname: "newGeorge",
  lastname: "newSedhom",
  password: "pass",
};
// using let so i can access it in diffrant scopes
let jwt: string;
describe("Test users End Point", () => {
  it("sould post a user", async () => {
    const res = await request.post("/users").send(user);
    expect(res.body.id).toEqual(1);
  });
  it("should get jwt", async () => {
    const res = await request.post("/users/auth").send(user);
    jwt = res.body.jwt;
    expect(res.body.id).toEqual(1);
  });
  it("sould edit (put) a user", async () => {
    const res = await request
      .put("/users/1")
      .send(newUser)
      .set("authorization", jwt);
    expect(res.body.id).toEqual(1);
  });
  it("sould delete a user", async () => {
    const res = await request.delete("/users/1").set("authorization", jwt);
    expect(res.body).toEqual({
      id: 1,
      first_name: "newGeorge",
      last_name: "newSedhom",
    });
  });
});
afterAll(() => {
  shell.exec("db-migrate --env test reset");
});
