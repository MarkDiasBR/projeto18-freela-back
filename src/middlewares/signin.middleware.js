import db from '../database/connection.js';
import bcrypt from 'bcrypt';

export default async function signinValidation(req, res, next) {

    const { email, password } = req.body;
    let user;

    try {
        const promise = await db.query(`
            SELECT * 
            FROM public.users 
            WHERE email=$1
            LIMIT 1;
        `, [email]);

        if (promise.rowCount === 0) return res.status(401).send('🚫 E-mail is not registered!');  
        
        user = promise.rows[0];
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) return res.status(401).send('🚫 Password is incorrect!');

    delete user.password;
    delete user.name;
    res.locals.user = user;

    next();
}