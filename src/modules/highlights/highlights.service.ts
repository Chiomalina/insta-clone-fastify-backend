import type { FastifyInstance } from "fastify"
import type { Highlight } from "./highlights.types"

export const highlightsService = (fastify: FastifyInstance) => {
    return {
        async getAll(): Promise<Highlight[]> {
            fastify.log.info("Fetching all highlights")
            return fastify.transactions.highlights.getAll()
        },

        async getById(id: number): Promise<Highlight | undefined> {
            fastify.log.info({ id }, "Fetching highlight by id")
            return fastify.transactions.highlights.getById(id)
        },
    }
}
