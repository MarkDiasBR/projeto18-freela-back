export function schemaValidation(schema) {
    
    return (req, res, next) => {
    
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => `\n${detail.message}`);
            return res.status(422).send(`🚫 Unprocessable entity!\n${errors}`);
        }

        next();
    }
}