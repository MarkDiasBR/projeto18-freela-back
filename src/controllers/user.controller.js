import db from '../database/connection.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signup(req, res) {
    const { fullname, name, email, password, roleId } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    try {
        await db.query(`
            INSERT INTO public.users (fullname, name, email, password, "roleId") 
            VALUES ($1, $2, $3, $4, $5)
        `, [fullname, name, email, hash, roleId]);

        return res.status(201).send('✅ User created SUCESSFULLY!');
    } catch (err) {
        return res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}

export async function signin(req, res) {
    const user = res.locals.user;

    try {
        const token = uuid();

        await db.query(`
            INSERT
            INTO public.sessions ("userId", token)
            VALUES ($1, $2);
        `, [user.id, token])
        return res.send({ name: user.name, token });
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}