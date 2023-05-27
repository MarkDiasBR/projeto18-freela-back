import joi from 'joi';

export const signupSchema = joi.object({
    fullname: joi.string().required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.valid(joi.ref('password')).required().messages({
        'any.only': "\"confirmPassword\" must match \"password\""
    }),
    roleId: joi.valid(2).required()
});

export const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
})