import db from '../database/connection.js';

export async function createImage(req, res) {
    const { url } = req.body;

    try {
        const promise = await db.query(`
            INSERT 
            INTO "public"."images" ("url")
            VALUES ($1)
            RETURNING "id"; 
        `, [url]);

        res.status(201).send(promise.rows[0]);
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}