const express = require('express');
const { PrismaClient } = require('@prisma/client');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.post(`/user`, async (req, res) => {
    const result = await prisma.user.create({
        data: {
            ...req.body
        }
    });
    res.json(result);
});

app.post(`/post`, async (req, res) => {
    const { title, content, authorEmail } = req.body;
    const result = await prisma.post.create({
        data: {
            title,
            content,
            published: false,
            author: { connect: { email: authorEmail } }
        }
    });
    res.json(result);
});

app.put('/count/:id', async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.update({
        where: {
            id: parseInt(id)
        },
        data: {
            viewCount: {
                increment: 1
            }
        }
    });
    res.json(post);
});

app.put('/publish/:id', async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.update({
        where: {
            id: parseInt(id)
        },
        data: { published: true }
    });
    res.json(post);
});

app.put('/unPublish/:id', async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.update({
        where: {
            id: parseInt(id)
        },
        data: { published: false }
    });
    res.json(post);
});

app.delete(`/post/:id`, async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(post);
});

app.get(`/post/:id`, async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    res.json(post);
});

app.get(`/userPosts/`, async (req, res) => {
    const { authorEmail } = req.query;
    const post = await prisma.post.findMany({
        where: {
            author: { email: authorEmail }
        }
    });
    res.json(post);
});

app.get(`/userDraft/`, async (req, res) => {
    const { authorEmail } = req.query;
    const post = await prisma.post.findMany({
        where: {
            author: { email: authorEmail },
            published: false
        }
    });
    res.json(post);
});

app.get('/feed', async (req, res) => {
    const posts = await prisma.post.findMany({
        where: { published: true },
        include: { author: true }
    });
    res.json(posts);
});

app.get('/filterPosts', async (req, res) => {
    const { searchString } = req.query;
    const draftPosts = await prisma.post.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: searchString
                    }
                },
                {
                    content: {
                        contains: searchString
                    }
                }
            ]
        }
    });
    res.json(draftPosts);
});

const server = app.listen(3000, () =>
    console.log('🚀 Server ready at: http://localhost:3000\n')
);
