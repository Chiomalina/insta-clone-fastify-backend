import Fastify from "fastify"
import { taggedRoutes } from "./tagged.routes"

describe("GET /tagged/grid", () => {
    it("should return a list of tagged posts with a 200 status code", async () => {
        const app = Fastify()

        const mockTaggedGrid = [
            {
                id: 11,
                img_url: "http://example.com/post1.png",
                caption: "A sample post",
                created_at: "2026-01-18 10:00:00",
                tagged_by: {
                    id: 5,
                    username: "chioma_dev",
                    avatar_url: "http://example.com/avatar1.png",
                },
            },
            {
                id: 12,
                img_url: "http://example.com/post2.png",
                caption: null,
                created_at: "2026-01-18 11:00:00",
                tagged_by: {
                    id: 6,
                    username: "john_dev",
                    avatar_url: null,
                },
            },
        ]

        // Mock transactions dependency (must match the full TransactionHelpers shape)
        app.decorate("transactions", {
            posts: {
                create: jest.fn(),
                getAll: jest.fn(),
                getById: jest.fn(),
            },
            reels: {
                getAll: jest.fn(),
                create: jest.fn(),
            },
            tagged: {
                getAllForGrid: jest.fn().mockReturnValue(mockTaggedGrid),
            },
            highlights: {
                getAll: jest.fn(),
                getById: jest.fn(),
                create: jest.fn(),
            },
        })

        app.register(taggedRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/tagged/grid",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockTaggedGrid)
    })
})
