import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { reelsService } from "./reels.service"

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = reelsService(fastify)

    // GET/reels/grid returns a list for the grid view.
    // In tests: service.getAll() returns the mocked reels array.
    fastify.get("/reels/grid", async (request, reply) => {
        const reels = await service.getAll()
        return reply.code(200).send(reels)
    })
}

export { reelsRoutes }
