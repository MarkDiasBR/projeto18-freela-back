import db from '../database/connection.js';

export async function authValidation(req, res, next) {
    
    const { authorization } = req.headers;
    
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.status(401).send('🚫 Access denied!');

    try {
        const session = await db.query(`
            SELECT *
            FROM public.sessions
            WHERE token = $1;
        `, [token]);        

        if (session.rowCount===0) {
            return res.status(401).send('🚫 Access denied!');
        }

        res.locals.session = session.rows[0];
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }

    next();
}