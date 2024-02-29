# REST API with Node.js, Express.js and PostgreSQL

## To start, follow the instructions:

1. Clone the repository:
+ `git clone git@github.com:matenka-andrii/rest-api-nodejs-postgresql.git`

2. Change into the project directory:
+ `cd rest-api-nodejs-mongodb`

3. Install dependencies:
+ `npm install`

4. Create a `.env` file in the root directory of the project with the following contents:
+ `DB_URL=postgres://********:e_oetdO********@flora.db.elephantsql.com/********` You can get that url using https://www.elephantsql.com/
+ `PORT=3000`

5. Start the server:
+ `npm run start:dev`

After completing the above steps, the server should be running and accessible at http://localhost:3000.

## Using Postman to Fetch Endpoints
This section provides detailed information about the available endpoints that can be accessed using Postman.

### Available Endpoints

#### Create Category

+ **Method**: POST
+ **Endpoint**: /categories
+ **Body**: JSON object containing the category's details. Fields required are as follows:

```
{
  "name": "YourCategoryName",
}
```

#### Get Categories

+ **Method**: GET
+ **Endpoint**: /categories
+ **Returns**: This endpoint returns a JSON array of categories. Each category object contains an ID and a name attribute.

```
[
  {
    "id": 1,
    "name": "Technology"
  },
  {
    "id": 2,
    "name": "Science"
  }
]
```
+ **Description**: Use this endpoint to fetch a list of all categories available in the system.

### Other endpoints:
+ Update category: `PUT /categories/:id`
+ Delete category: `DELETE /categories/:id`

#### Create Product

+ **Method**: POST
+ **Endpoint**: /products
+ **Body**: JSON object containing the product's details. Fields required are as follows:

```
{
  "name": "YourProductName",
  "description": "Product description ...",
  "price": 49.99,
  "currency": "USD",
  "quantity": 1,
  "active": true,
  "category_id": 1,
}
```

### Other endpoints:
+ Get products: `GET /products`
+ Get product by id: `GET /products/:id`
+ Get products by category: `GET /products/category/:categoryId`
+ Update product: `PUT /products/:id`
+ Delete product: `DELETE /products/:id`