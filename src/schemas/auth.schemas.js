import joi from 'joi';

export const imageSchema = joi.object({
    url: joi.string().uri().required(),
    imgTypeId: joi.valid(1,2,3)
});

export const postSchema = joi.object({
    description: joi.string(),
    imageUrl: joi.string().uri().required()
});