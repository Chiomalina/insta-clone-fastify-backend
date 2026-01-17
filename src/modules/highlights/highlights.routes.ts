import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { highlightsService } from "./highlights.service"

const highlightsRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
) => {
    const service = highlightsService(fastify)

    /**
     * GET / highlights returns all highlights for the profile highlights list view.
     * InTest:
     * -service.getAll() is mocked to return an array of highlights-routs response with 200 and the full list
     */
    fastify.get("/highlights", async (request, reply) => {
        const highlights = await service.getAll()
        return reply.code(200).send(highlights)
    })

    /**
     * GET / highlights/:id returns a single highlight by its id.
     * It validate that the id is a number  -> 400 if Invalid
     * Fetches highlight from the service layer -> 200 with the highlight if found
     */
    fastify.get<{
        Params: { id: string }
    }>("/highlights/:id", async (request, reply) => {
        const id = Number(request.params.id)

        // Validate dynamic route param
        if (Number.isNaN(id)) {
            return reply.code(400).send({ message: "Invalid id" })
        }

        const highlight = await service.getById(id)

        // Handle missing resources
        if (!highlight) {
            return reply.code(404).send({ message: "Highlight not found" })
        }
        return reply.code(200).send(highlight)
    })
}

export { highlightsRoutes }
