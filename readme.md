# Ecommerce API
An API for an ecommerce platform admin to manage product inventory.

## Functionalities
1. API to add products to the database

    Create new product with provided product_name and product_quantity.

    ![Create Product](./productImages/ecommerce-create-product.jpg)

    > URL [POST] http://localhost:8000/api/v1/products/create


2. API to list products

    List all products available.

    ![Product List](./productImages/ecommerce-products-list.jpg)

    > URL [GET] http://localhost:8000/api/v1/products

3. API to delete products

    Delete a product with provided id with url.

    ![Delete Product](./productImages/ecommerce-delete-product.jpg)

    > URL [Delete] http://localhost:8000/api/v1/products/<id>

4. API to update quantity of a product 

    Update a product with provided number as query with url.

    ![Update Product](./productImages/ecommerce-update-product.jpg)

    > URL [POST] http://localhost:8000/api/v1/products/<id>/update_quantity/?number=<qty>


## Getting Started with Ecommerce API

After you have this project in your machine.

**To setup:**

`npm install`

Installs all the dependencies for App that are present in package.json file.

> You can modify MongoDB url if required.

**In the project directory, you can run:**

`npm start`

Runs the app.
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

> You can change port number by modifying env.js file.
