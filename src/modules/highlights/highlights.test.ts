import Fastify from "fastify"
import { highlightsRoutes } from "./highlights.routes"

describe("GET /highlights", () => {
    it("should return a list of highlights with a 200 status code", async () => {
        const app = Fastify()
        const mockHighlights = [
            {
                id: 1,
                cover_image_url: "http://example.com/highlights-image1.png",
                title: "Highlight 1",
            },
            {
                id: 2,
                cover_image_url: "http://example.com/highlights-image2.png",
                title: "Highlight 2",
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
                getAll: jest.fn(),
                create: jest.fn(),
            },
            highlights: {
                getAll: jest.fn().mockResolvedValue(mockHighlights),
                getById: jest.fn(),
                create: jest.fn(),
            },
        })

        app.register(highlightsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/highlights",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockHighlights)
    })
})

describe("GET /highlights/:id", () => {
    it("should return single highlight ids with a 200 status code", async () => {
        const app = Fastify()

        const mockHighlight = [
            {
                id: 1,
                cover_image_url: "http://example.com/highlights-image1.png",
                title: "Highlight 1",
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
                getAll: jest.fn(),
                create: jest.fn(),
            },
            highlights: {
                getAll: jest.fn(),
                getById: jest.fn().mockResolvedValue(mockHighlight),
                create: jest.fn(),
            },
        })

        app.register(highlightsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/highlights/1",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockHighlight)
    })
})

it("should return 404 if highlight is not found", async () => {
    const app = Fastify()

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
            getAll: jest.fn(),
            create: jest.fn(),
        },
        highlights: {
            getAll: jest.fn(),
            getById: jest.fn().mockResolvedValue(undefined),
            create: jest.fn(),
        },
    })

    app.register(highlightsRoutes)

    const response = await app.inject({
        method: "GET",
        url: "/highlights/999",
    })

    expect(response.statusCode).toBe(404)
})

it("should return 404 if id is not a number", async () => {
    const app = Fastify()

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
            getAll: jest.fn(),
            create: jest.fn(),
        },
        highlights: {
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
        },
    })

    app.register(highlightsRoutes)

    const response = await app.inject({
        method: "GET",
        url: "/highlights/abc",
    })

    expect(response.statusCode).toBe(400)
})
