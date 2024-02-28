import { pool as database } from '../../postgresql/database';

export class ProductsController {
    async getProductById(request, response) {
        try {
            const { id } = request.params;

            const res = await database.query({
                text: `
                    SELECT p.id, p.name, p.description, p.price, p.currency, 
                    p.quantity, p.active, p.created_date, p.updated_date,
                    
                    (SELECT ROW_TO_JSON(category_obj) FROM (
                        SELECT id, name FROM category WHERE id = p.category_id
                    ) category_obj) AS category
                    
                    FROM product p
                    WHERE p.id = $1`,
                values: [id],
            });

            if ( res.rowCount === 0 ) {
                return response.status(404).json({ error: `Product not found` });
            }

            return response.status(200).json(res.rows[0]);
        } catch (error) {
            console.error(error);

            return response.status(500).json({ error: error.message });
        }
    }
    async getProductsByCategory(request, response) {
        try {
            const { categoryId } = request.params;

            const existingCategory = await database.query({
                text: 'SELECT EXISTS (SELECT * FROM category WHERE id = $1)',
                values: [categoryId],
            });

            if ( !existingCategory.rows[0].exists ) {
                return response.status(404).json({ error: `Category not found` });
            }

            const res = await database.query({
                text: `
                    SELECT p.id, p.name, p.description, p.price, p.currency, 
                    p.quantity, p.active, p.created_date, p.updated_date,
                    
                    (SELECT ROW_TO_JSON(category_obj) FROM (
                        SELECT id, name FROM category WHERE id = p.category_id
                    ) category_obj) AS category
                    
                    FROM product p
                    WHERE p.category_id = $1`,
                values: [categoryId],
            });

            if ( res.rowCount === 0 ) {
                return response.status(404).json({ error: `Product not found` });
            }

            return response.status(200).json(res.rows);
        } catch (error) {
            console.error(error);

            response.status(500).json({ error: error.message });
        }
    }
    async getProducts(request, response) {
        try {
            const res = await database.query(`
                SELECT p.id, p.name, p.description, p.price, p.currency, 
                    p.quantity, p.active, p.created_date, p.updated_date,
                    
                    (SELECT ROW_TO_JSON(category_obj) FROM (
                        SELECT id, name FROM category WHERE id = p.category_id
                    ) category_obj) AS category
                    
                FROM product p`);

            return response.status(200).json(res.rows);
        } catch (error) {
            console.error(error);

            return response.status(500).json({ error: error.message });
        }
    }
    async createProduct(request, response) {
        try {
            const existingCategory = await database.query({
                text: 'SELECT EXISTS (SELECT * FROM category WHERE id = $1)',
                values: [request.body.category_id],
            });

            if ( !existingCategory.rows[0].exists ) {
                return response.status(422).json({ error: `Category id not found` });
            }

            const res = await database.query({
                text: `
                    INSERT INTO product (name, description, price, currency, quantity, active, category_id) 
                    VALUES($1, $2, $3, $4, $5, $6, $7) 
                    RETURNING *`,
                values: [
                    request.body.name,
                    request.body.description ? request.body.description : null,
                    request.body.price,
                    request.body.currency ? request.body.currency : 'USD',
                    request.body.quantity ? request.body.quantity : 0,
                    'active' in request.body ? request.body.active : true,
                    request.body.category_id
                ],
            });

            return response.status(201).json(res.rows[0]);
        } catch (error) {
            console.error(error);

            return response.status(500).json({ error: error.message });
        }
    }
    async updateProduct(request, response) {
        try {
            const { id } = request.params;
            const res = await database.query({
                text: `
                    UPDATE product 
                    SET name = $1, description = $2, price = $3, currency = $4, quantity = $5, active = $6, category_id = $7, updated_date = CURRENT_TIMESTAMP
                    WHERE id = $8
                    RETURNING *                
                `,
                values: [
                    request.body.name,
                    request.body.description,
                    request.body.price,
                    request.body.currency,
                    request.body.quantity,
                    request.body.active,
                    request.body.category_id,
                    id
                ],
            });

            if ( res.rowCount === 0 ) {
                return response.status(404).json({ error: `Product not found` });
            }

            return response.status(200).json(res.rows[0]);
        } catch (error) {
            console.error(error);

            return response.status(500).json({ error: error.message });
        }
    }
    async deleteProduct(request, response) {
        try {
            const { id } = request.params;

            const res = await database.query({
                text: 'DELETE FROM product WHERE id = $1',
                values: [id],
            });

            if ( res.rowCount === 0 ) {
                return response.status(404).json({ error: `Product not found` });
            }

            return response.status(204).send('Product has been deleted.');
        } catch (error) {
            console.error(error);

            return response.status(500).json({ error: error.message });
        }
    }
}