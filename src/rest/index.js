// Core
import bodyParser from 'body-parser';

// Routers
import categoriesRouter from './routes/categories.router';
import productsRouter from "./routes/products.router";

export const applyRoutes = (app) => {
    app.use(bodyParser.json());
    app.use('/categories', categoriesRouter);
    app.use('/products', productsRouter);
};