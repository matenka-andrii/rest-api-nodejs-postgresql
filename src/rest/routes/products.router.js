// Core
import { Router } from "express";

// Controllers
import { ProductsController } from "../controllers/products.controller";

// Middlewares
import validationMiddleware from "../middlewares/validation.middleware";

// Validation schemas
import { CreateProductSchema } from "../validators/product/create-product.validator";
import { UpdateProductSchema } from "../validators/product/update-product.validator";
import { DeleteProductSchema } from "../validators/product/delete-product.validator";
import { GetProductByIdSchema } from "../validators/product/get-product-by-id.validator";
import { GetProductsByCategorySchema } from "../validators/product/get-products-by-category.validator";

const controller = new ProductsController();
const router = new Router();

router.get(
    '/',
    (req, res) => controller.getProducts(req, res),
);
router.get(
    '/:id',
    validationMiddleware(GetProductByIdSchema),
    (req, res) => controller.getProductById(req, res),
);
router.post(
    '/',
    validationMiddleware(CreateProductSchema),
    (req, res) => controller.createProduct(req, res),
);
router.put(
    '/:id',
    validationMiddleware(UpdateProductSchema),
    (req, res) => controller.updateProduct(req, res),
);
router.delete(
    '/:id',
    validationMiddleware(DeleteProductSchema),
    (req, res) => controller.deleteProduct(req, res),
);
router.get(
    '/category/:categoryId',
    validationMiddleware(GetProductsByCategorySchema),
    (req, res) => controller.getProductsByCategory(req, res),
);

export default router;