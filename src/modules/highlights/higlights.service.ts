import type { FastifyInstance } from "fastify"
import type { Highlight } from "./highlights.types"

export const highlightsService = (fastify: FastifyInstance) => {
    return {
        // Used by GET /highlights
        // In tests: fastify.transactions.highlighs.getAll() is mocked to return an arra
        async getAll(): Promise<Highlight[]> {
            fastify.log.info("Fetching all highlights")
            return fastify.transactions.Highlight.getAll()
        },

        // Used by GET /highlights/:id
        // In tests: fastify.transactions.highlighs.getById(id) is mocked to return a highlight or undefined
        async getByAll(id: number): Promise<Highlight | undefined> {
            fastify.log.info("Fetching all highlight by id")
            return fastify.transactions.Highlight.getById(id)
        },
    }
}
