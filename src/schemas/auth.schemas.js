import joi from 'joi';

export const imageSchema = joi.object({
    url: joi.string().uri().required(),
    imgTypeId: joi.valid(1,2,3)
});