import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { taggedService } from "./tagged.service"

const taggedRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = taggedService(fastify)

    // GET/tagged/grid returns a list for the grid view.
    // In tests: service.getAll() returns the mocked tagged array.
    fastify.get("/tagged/grid", async (request, reply) => {
        const tagged = await service.getAll()
        return reply.code(200).send(tagged)
    })
}

export { taggedRoutes }
