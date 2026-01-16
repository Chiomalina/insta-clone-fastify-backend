import Fastify from "fastify"
import { postsRoutes } from "./posts.routes"
import type { TransactionHelpers } from "src/core/database/database.transactions"

describe("POST /posts", () => {
    it("should create a new post and return it with a 201 status code", async () => {
        const app = Fastify()

        const newPostPayload = {
            img_url: "http://example.com/new-image.jpg",
            caption: "A brand new post from our test!",
        }

        const createdPost = { ...newPostPayload, id: 1 }

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn().mockReturnValue(createdPost),
            },
        })

        app.register(postsRoutes)

        const response = await app.inject({
            method: "POST",
            url: "/posts",
            payload: newPostPayload,
        })

        expect(response.statusCode).toBe(201)
        expect(JSON.parse(response.payload)).toEqual(createdPost)
    })
})

describe("GET /posts", () => {
    it("should get all posts and return them with a 200 status code", async () => {
        const app = Fastify()

        const allPosts = [
            {
                id: 1,
                img_url: "http://example.com/image1.jpg",
                caption: "Post 1",
                created_at: "2026-01-16 10:00:00",
            },
            {
                id: 2,
                img_url: "http://example.com/image2.jpg",
                caption: "Post 2",
                created_at: "2026-01-16 10:00:00",
            },
        ]

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn().mockReturnValue(allPosts),
                create: jest.fn(),
            },
        } as unknown as TransactionHelpers)

        app.register(postsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/posts",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(allPosts)
    })
})
