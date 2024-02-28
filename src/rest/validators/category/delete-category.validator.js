import Joi from "joi";

export const DeleteCategorySchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    }),
});