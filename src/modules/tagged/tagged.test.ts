import Fastify from "fastify"
import { taggedRoutes } from "./tagged.routes"

describe("GET /tagged/grid", () => {
    it("should return a list of tagged posts with a 200 status code", async () => {
        const app = Fastify()
        const mockTagged = [
            {
                id: 1,
                post_id: 11,
                tagged_user_id: 5,
                caption: "Tagged 1",
                thumbnail_url: "http://example.com/tagged-thumb1.png",
            },
            {
                id: 2,
                post_id: 12,
                tagged_user_id: 5,
                caption: "Tagged 2",
                thumbnail_url: "http://example.com/tagged-thumb2.png",
            },
        ]

        // To satisfy TypeScript, our mock must match the full shape of the
        // 'transactions' dependency, including all methods on 'posts'.
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
                getAll: jest.fn().mockResolvedValue(mockTagged),
                create: jest.fn(),
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
        expect(JSON.parse(response.payload)).toEqual(mockTagged)
    })
})
