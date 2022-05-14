CREATE TABLE orders_products
(
quantity INT,
order_id INT REFERENCES orders(id),
product_id INT REFERENCES products(id)
)