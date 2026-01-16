import Fastify from "fastify"
import { reelsRoutes } from "./reels.routes"

describe("GET /tagged/grid", () => {
    it("should return a list of tagged posts with a 200 status code", async () => {
        const app = Fastify()
        const mockTagged = [
            {
                id: 1,
                post_id: 10,
                tagged_user_id: 7,
                username: "jane",
                thumbnail_url: "http://example.com/thumb10.png",
                caption: "Tagged post 1",
            },
            {
                id: 2,
                video_url:
                    "http://example.com/video2.mp4](http://example.com/video2.mp4)",
                thumbnail_url:
                    "http://example.com/thumb2.png](http://example.com/thumb2.png)",
                caption: "Reel 2",
                views: 200,
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
                getAll: jest.fn().mockResolvedValue(mockReels),
                create: jest.fn(),
            },
        })

        app.register(reelsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/reels/grid",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockReels)
    })
})
