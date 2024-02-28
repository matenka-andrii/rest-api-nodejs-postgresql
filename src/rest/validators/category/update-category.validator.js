import Joi from "joi";

export const UpdateCategorySchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        name: Joi.string().required(),
    }),
});