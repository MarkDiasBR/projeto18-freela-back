import db from '../database/connection.js';

export async function createImageRepository(url) {
	return (
        await db.query(`
            INSERT 
            INTO "public"."images" ("url")
            VALUES ($1)
            RETURNING "id"; 
        `, [url])
    );
}

export async function createPostRepository(userId, imageId, description) {
    if (description) {
        return (
            await db.query(`
                INSERT 
                INTO "public"."posts" ("userId", "imageId", "description")
                VALUES ($1, $2, $3); 
            `, [userId, imageId, description])
        )
    } else {
        return (
            await db.query(`
                INSERT 
                INTO "public"."posts" ("userId", "imageId")
                VALUES ($1, $2); 
            `, [userId, imageId])
        )
    }
}