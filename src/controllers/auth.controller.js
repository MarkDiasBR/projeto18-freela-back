import { createImageRepository, createPostRepository, getUserRepository, deletePostLikeRepository, postPostLikeRepository } from '../repositories/auth.repository.js';

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
        const promise = await deletePostLikeRepository(postId, userId);

        if (promise.rowCount === 0) {
            await postPostLikeRepository(postId, userId);
        }

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}