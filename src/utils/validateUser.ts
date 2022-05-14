import { Request } from "express";

interface user {
  firstname: string;
  lastname: string;
  password: string;
}
const userValidate = async (req: Request): Promise<user> => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;
  // make sure the values are all sent then cases for each possible error
  if (firstname && lastname && password) {
    return {
      firstname: firstname,
      lastname: lastname,
      password: password,
    };
  } else if (!firstname) {
    throw new Error("Undefined first name");
  } else if (!lastname) {
    throw new Error("Undefined last name");
  } else if (!password) {
    throw new Error("Undefined password ");
  } else {
    throw new Error("unknown error");
  }
};

export default userValidate;
