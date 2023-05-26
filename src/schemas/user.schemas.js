import joi from 'joi';

export const signupSchema = joi.object({
    fullname: joi.string().required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.ref('password'),
    roleId: joi.valid(2)
});

export const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
})