import { Request } from "express";

interface product {
  name: string;
  price: number;
  quantity: number;
}

const productValidate = async (req: Request): Promise<product> => {
  const name = req.body.name;
  const price = parseInt(req.body.price);
  const quantity = parseInt(req.body.quantity);
  if (name && !isNaN(price) && !isNaN(quantity) && quantity >= 0 && price > 0) {
    return {
      name: name,
      price: price,
      quantity: quantity,
    };
  } else if (!name) {
    throw new Error("name not defined");
  } else if (isNaN(price) || price <= 0) {
    throw new Error("un-valied price");
  } else if (isNaN(quantity) || quantity < 0) {
    throw new Error("un-valied quantity");
  } else {
    throw new Error("unknown error");
  }
};

export default productValidate;
