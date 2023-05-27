import db from '../database/connection.js';

export async function postUserRepository(fullname, name, email, hash, bio) {
    try {
        if (bio) {
            return (
                await db.query(`
                    INSERT INTO public.users (fullname, name, email, password, bio) 
                    VALUES ($1, $2, $3, $4, $5)
                `, [fullname, name, email, hash, bio])
            )
        } else {
            return (
                await db.query(`
                    INSERT INTO public.users (fullname, name, email, password) 
                    VALUES ($1, $2, $3, $4)
                `, [fullname, name, email, hash])
            )
        }
    } catch (err) {
        throw (err)
    }
}

export async function deleteSessionRepository(id) {
    try {
        return (
            await db.query(`
                DELETE
                FROM public.sessions
                WHERE "userId"=$1;
            `, [id])
        )
    } catch (err) {
        throw (err)
    }
}

export async function postSessionRepository(id, token) {
    try {
        return (
            db.query(`
                INSERT
                INTO public.sessions ("userId", "token")
                VALUES ($1, $2);
            `, [id, token])
        )
    } catch (err) {
        throw (err)
    }
}