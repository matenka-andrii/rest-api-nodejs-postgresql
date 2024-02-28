import Joi from "joi";

export const CreateProductSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().required(),
        currency: Joi.string(),
        quantity: Joi.number(),
        active: Joi.boolean(),
        category_id: Joi.number().required(),
    }),
});