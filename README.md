# Downloading node_modules

the node modules file was too big therefor i had to delete it
so before you start just run the following
"npm i"

## create user for the database

CREATE USER full_stack_app WITH PASSWORD 'strongpassword';

Database should be on port 5432

### Grant all preveliges

GRANT ALL PRIVILEGES ON DATABASE store_front TO full_stack_app;
GRANT ALL PRIVILEGES ON DATABASE store_front_test TO full_stack_app;
ALTER USER full_stack_app WITH SUPERUSER;

### Create Databases

CREATE DATABASE store_front;
CREATE DATABASE store_front_test;

#### Run migration

Command db-migrate up

## Getting Started with creating the .env file

All the node_modules are included
The first step create .env file and include these vales

POSTGRES_HOST=localhost
POSTGRES_DB=store_front
POSTGRES_TEST_DB=store_front_test
POSTGRES_USER=full_stack_app
POSTGRES_PASSWORD=strongpassword
BCRYPT_PASSWORD=theFlash
SALT_ROUNDS=10
TOKEN_SECRET=hehee
ENV=dev

then
npm run start

## Using the API

You can access all the routes through this guide

### users

new usernames should be diffrant from all other usernames

post 1 user http://localhost:3000/users Method: post
include in body {
"firstname": "myFN",
"lastname": "myLN",
"password": "mystrongpassword"
}
Will return JWT and id
include the jwt in the headers authorization

get all users http://localhost:3000/users Method: get
Will return all users

get 1 user http://localhost:3000/users/1 Method: get
Will return 1 user with the reqested id

put(edit) 1 user http://localhost:3000/users/1 Method: put
include in body {
"firstname": "myNFN",
"lastname": "myNLN",
"password": "mystrongpassword"
}
Will return jwt and id after editing

delete 1 user http://localhost:3000/users/1 Method: delete
Will return deleted user

get auth jwt http://localhost:3000/users/auth Method: post
include in body {
"firstname": "myNFN",
"lastname": "myNLN",
"password": "mystrongpassword"
}
Will return JWT and user_id

### product

new products names should be diffrant from all other products names

post a new product http://localhost:3000/products Method: post
include in body {
"name": "prod",
"quantity":5,
"price":200
}
Will return The product

get all products http://localhost:3000/products Method: get
Will trturn all products

get one products http://localhost:3000/products/1 Method: get
Will return 1 product with the requested id

put (edit) a product http://localhost:3000/products/1 Method: put
include in body {
"name": "newprod",
"quantity":5,
"price"

Will return the edited product

delete 1 product http://localhost:3000/products/1 Method: delete
Will return the deleted product

### orders

user_id,product_id,quantity should be valied
ex: you can't order more than aviliable
post a new order http://localhost:3000/orders Method: post
include in body {
"userId": 1,
}
Will return the order

get all orders http://localhost:3000/orders Method: get
Will return all orders

get one order http://localhost:3000/orders/1 Method: get
Will return 1 order with the requested id

put (edit) a product http://localhost:3000/orders/1/close Method: put
Will tutn the status to false (close the order)

Will return the closed order

delete 1 order http://localhost:3000/order/1 Method: delete
Will return the deleted product

#### products of an orders

Add products to an order
http://localhost:3000/orders/1/products Method: post
include in body {
"productId":1,
"quantity":20
}
will return the added product

index products of an order
http://localhost:3000/orders/1/products Method: get
will return the products names and ids that's on the order

delete a product from an order
http://localhost:3000/orders/1/products/1 Method: delete
will return the deleted product form the order

## database schema

### users

Column | Type | Collation | Nullable | Default

------------+-------------------+-----------+--
id | integer | | not null | nextval('users_id_seq'::regclass)
first_name | character varying | | |
last_name | character varying | | |
password | character varying | | |

"users_pkey" PRIMARY KEY, btree (id)
Referenced by:
TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

### orders

Column | Type | Collation | Nullable | Default
---------+-------------------+-----------+----
id | integer | | not null | nextval('orders_id_seq'::regclass)
status | character varying | | |
user_id | integer | | |

"orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
TABLE "orders_products" CONSTRAINT "orders_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

### products

Column | Type | Collation | Nullable | Default
----------+-------------------+-----------+----
id | integer | | not null | nextval('products_id_seq'::regclass)
name | character varying | | |
quantity | integer | | |
price | double precision | | |

Indexes:
"products_pkey" PRIMARY KEY, btree (id)
Referenced by:
TABLE "orders_products" CONSTRAINT "orders_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

### orders_products

Column | Type | Collation | Nullable | Default
------------+---------+-----------+----------+---------
quantity | integer | | |
order_id | integer | | |
product_id | integer | |

Foreign-key constraints:
"orders_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
"orders_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

## tests

just run npm run testall

## extras

prettier and lint
npm run fix
will run both
