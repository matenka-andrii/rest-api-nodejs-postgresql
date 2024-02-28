import { pool as database } from '../../postgresql/database';

export class CategoriesController {
    async getCategories(request, response) {
        try {
            const res = await database.query(`SELECT * FROM category`);

            return response.status(200).json(res.rows);
        } catch (error) {
            console.error(error);

            return response.status(500).json({ error: error.message });
        }
    }
    async createCategory(request, response) {
        try {
            const existingCategory = await database.query({
                text: 'SELECT EXISTS (SELECT * FROM category WHERE name = $1)',
                values: [request.body.name],
            });

            if ( existingCategory.rows[0].exists ) {
                return response.status(409).json({ error: `Category ${request.body.name} already exists` });
            }

            const res = await database.query({
                text: 'INSERT INTO category (name) VALUES($1) RETURNING *',
                values: [request.body.name],
            });

            return response.status(201).json(res.rows[0]);
        } catch (error) {
            console.error(error);

            return response.status(500).json({ error: error.message });
        }
    }
    async updateCategory(request, response) {
        try {
            const existingCategory = await database.query({
                text: 'SELECT EXISTS (SELECT * FROM category WHERE name = $1)',
                values: [request.body.name],
            });

            if ( existingCategory.rows[0].exists ) {
                return response.status(409).json({ error: `Category ${request.body.name} already exists` });
            }

            const { id } = request.params;
            const res = await database.query({
                text: `
                    UPDATE category 
                    SET name = $1, updated_date = CURRENT_TIMESTAMP
                    WHERE id = $2
                    RETURNING *                
                `,
                values: [request.body.name, id],
            });

            if ( res.rowCount === 0 ) {
                return response.status(404).json({ error: `Category not found` });
            }

            return response.status(200).json(res.rows[0]);
        } catch (error) {
            console.error(error);

            return response.status(500).json({ error: error.message });
        }
    }
    async deleteCategory(request, response) {
        try {
            const { id } = request.params;

            const countResult = await database.query({
                text: 'SELECT COUNT(*) FROM product WHERE category_id = $1',
                values: [id]
            });

            if ( countResult.rows[0].count > 0 ) {
                return response.status(409).json({ error: `Category is being used in ${countResult.rows[0].count} product(s)` })
            }

            const res = await database.query({
                text: 'DELETE FROM category WHERE id = $1',
                values: [id],
            });

            if ( res.rowCount === 0 ) {
                return response.status(404).json({ error: `Category not found` });
            }

            return response.status(204).send('Category has been deleted.');
        } catch (error) {
            console.error(error);

            return response.status(500).json({ error: error.message });
        }
    }
}