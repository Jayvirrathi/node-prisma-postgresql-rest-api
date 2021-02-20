# REST API with Node.js, PostgreSQL with Prisma

> A Basic Node.js project

## Build Setup

```bash
# install dependencies
npm install
```

## Prerequisites

-   Nodejs
-   Postgresql

### Create and seed the database

```
npx prisma migrate dev --name init --preview-feature
```

Now, seed the database with the sample data in [`prisma/seed.ts`](./prisma/seed.ts) by running the following command:

```
npx prisma db seed --preview-feature
```

### Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

## Using the REST API

**Request:**

```json


GET /feed

GET /post/:id

GET /filterPosts?searchString={searchString}

GET /userPosts?authorEmail=elon@gmail.com

GET /userDraft?authorEmail=elon@gmail.com

POST user/

{
    "name": "elon",
    "email": "elon@gmail.com"
}

POST post/

{
    "title": "title",
	"content": "content",
    "authorEmail": "elon@gmail.com"
}

PUT /count/:id

PUT /publish/:id

PUT /unPublish/:id

DELETE /post/:id

```
