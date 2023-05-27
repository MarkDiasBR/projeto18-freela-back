import { createImageRepository, createPostRepository, getUserRepository, 
    getPostLikeRepository, deletePostLikeRepository, postPostLikeRepository,
    getFollowerRepository, deleteFollowerRepository, postFollowerRepository,
    getAllFollowersRepository, getAllFollowingRepository } from '../repositories/auth.repository.js';

export async function createImage(req, res) {
    const { url } = req.body;

    try {
        const promise = await createImageRepository(url);

        res.status(201).send(promise.rows[0]);
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}

export async function createPost(req, res) {
    const { description, imageUrl } = req.body;
    const userId = res.locals.session.userId;

    try {
        const promise = await createImageRepository(imageUrl);

        const { id: imageId } = promise.rows[0];

        await createPostRepository(userId, imageId, description);

        res.status(201).send('OK');
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}

export async function getUser(req, res) {
    const userId = res.locals.session.userId;

    try {
        const promise = await getUserRepository(userId);

        res.status(200).send(promise.rows);
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}

export async function putPostLike(req, res) {
    const { postId } = req.params;
    const { userId } = res.locals.session;

    try {
        const promise = await getPostLikeRepository(postId, userId);

        if (promise.rowCount === 1) {
            await deletePostLikeRepository(postId, userId);
        } else {
            await postPostLikeRepository(postId, userId);
        }

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}

export async function putFollower(req, res) {
    const { userId: followerId } = res.locals.session;
    const { userId } = req.params;

    try {
        const promise = await getFollowerRepository(followerId, userId);

        if (promise.rowCount === 1) {
            await deleteFollowerRepository(followerId, userId);
        } else {
            await postFollowerRepository(followerId, userId);
        }

        res.sendStatus(200);       
    } catch (err) {
        throw err;
    }
}

export async function getFollowers(req, res) {
    const { userId } = res.locals.session;

    try {
        const promise = await getAllFollowersRepository(userId);

        res.status(200).send(promise.rows[0]);
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}

export async function getFollowing(req, res) {
    const { userId } = res.locals.session;

    try {
        const promise = await getAllFollowingRepository(userId);
        console.log(promise)
        res.status(200).send(promise.rows[0]);
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}