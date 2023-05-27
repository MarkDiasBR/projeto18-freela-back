import { createImageRepository, createPostRepository } from '../repositories/user.repository.js';

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