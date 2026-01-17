import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { highlightsService } from "./highlights.service"

const highlightsRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
) => {
    const service = highlightsService(fastify)

    // GET/tagged/grid returns a list for the grid view.
    // In tests: service.getAll() returns the mocked tagged array.
    fastify.get("/highlights", async (request, reply) => {
        const highlights = await service.getAll()
        return reply.code(200).send(highlights)
    })

    fastify.get<{
        Params: { id: string }
    }>("/highlights/:id", async (request, reply) => {
        const id = Number(request.params.id)

        if (Number.isNAN(id)) {
            return reply.code(400).send({ message: "Invalid id" })
        }

        const highlight = await service.getById(id)

        if (!highlight) {
            return reply.code(404).send({ message: "Highlight not found" })
        }
        return reply.code(200).send(highlight)
    })
}

export { highlightsRoutes }
