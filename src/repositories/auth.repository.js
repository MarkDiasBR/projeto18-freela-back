import db from '../database/connection.js';

export async function createImageRepository(imageUrl) {
    try {
        return (
            await db.query(`
                INSERT 
                INTO "public"."images" ("url")
                VALUES ($1)
                RETURNING "id"; 
            `, [imageUrl])
        )
    } catch (err) {
        throw err;
    }    
}

export async function createPostRepository(userId, imageId, description) {
    try {
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
    } catch (err) {
        throw err;
    }
}

export async function getUserRepository(userId) {
    try {
        return (
            await db.query(`
                SELECT
                    users.id AS "userId",
                    images.url AS "imageUrl",
                    users.fullname,
                    users.name,
                    users.bio,
                    json_agg(json_build_object(
                        'imageUrl', post_images.url,
                        'createdAt', posts."createdAt",
                        'description', posts.description,
                        'likes', (
                            SELECT json_agg(json_build_object(
                                'userId', "postLikes"."userId"
                            ))
                            FROM "postLikes"
                            WHERE posts.id = "postLikes"."postId"
                        )
                    ) ORDER BY posts."createdAt" DESC) AS posts
                FROM
                    users
                    JOIN images ON users."avatarId" = images.id
                    JOIN posts ON users.id = posts."userId"
                    LEFT JOIN images AS post_images ON posts."imageId" = post_images.id
                WHERE "userId" = $1
                GROUP BY
                    users.id,
                    images.url,
                    users.fullname,
                    users.name,
                    users.bio; 
            `, [userId])
        )
    } catch (err) {
        throw err;
    }    
}

export async function getPostLikeRepository(postId, userId) {
    try {
        return (
            await db.query(`
                SELECT
                FROM "postLikes" 
                WHERE "postId" = $1 AND "userId" = $2;
            `, [postId, userId])
        )
    } catch (err) {
        throw err;
    }    
}

export async function deletePostLikeRepository(postId, userId) {
    try {
        return (
            await db.query(`
                DELETE
                FROM "postLikes"
                WHERE "postId"=$1 AND "userId"=$2;
            `, [postId, userId])
        )
    } catch (err) {
        throw err;
    }    
}

export async function postPostLikeRepository(postId, userId) {
    try {
        return (
            await db.query(`
                INSERT 
                INTO "postLikes" ("postId", "userId")
                VALUES ($1, $2);
            `, [postId, userId])
        )
    } catch (err) {
        throw err;
    }    
}

export async function getFollowerRepository(followerId, userId) {
    try {
        return (
            await db.query(`
                SELECT
                FROM "userFollowers" 
                WHERE "followerId" = $1 AND "userId" = $2;
            `, [followerId, userId])
        )
    } catch (err) {
        throw err;
    }    
}

export async function deleteFollowerRepository(followerId, userId) {
    try {
        return (
            await db.query(`
                DELETE
                FROM "userFollowers"
                WHERE "followerId"=$1 AND "userId"=$2;
            `, [followerId, userId])
        )
    } catch (err) {
        throw err;
    }    
}

export async function postFollowerRepository(followerId, userId) {
    try {
        return (
            await db.query(`
                INSERT 
                INTO "userFollowers" ("followerId", "userId")
                VALUES ($1, $2);
            `, [followerId, userId])
        )
    } catch (err) {
        throw err;
    }    
}

export async function getAllFollowersRepository(userId) {
    try {
        return (
            await db.query(`
                SELECT json_agg(json_build_object(
                    'userId', users.id,
                    'name', users.name,
                    'fullname', users.fullname,
                    'bio', users.bio,
                    'avatarUrl', images.url
                ) ORDER BY name ASC) AS followers
                FROM "userFollowers"
                JOIN users ON "userFollowers"."followerId" = users.id
                JOIN images ON users."avatarId" = images.id
                WHERE "userId" = $1;
            `, [userId])
        )
    } catch (err) {
        throw err;
    }    
}