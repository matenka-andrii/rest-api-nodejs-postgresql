import Joi from 'joi';

export const GetProductByIdSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().required(),
    })
});