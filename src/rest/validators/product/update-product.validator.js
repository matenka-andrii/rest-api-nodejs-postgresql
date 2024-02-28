import Joi from "joi";

export const UpdateProductSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number().required(),
        currency: Joi.string().required(),
        quantity: Joi.number().required(),
        active: Joi.boolean(),
        category_id: Joi.number().required(),
    }),
});