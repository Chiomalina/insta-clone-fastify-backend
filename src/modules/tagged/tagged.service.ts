import type { FastifyInstance } from "fastify"
import type { TaggedGrid } from "./tagged.types"

export const taggedService = (fastify: FastifyInstance) => {
    return {
        async getAll(): Promise<TaggedGrid> {
            fastify.log.info("Fetching all tagged posts for grid")
            const tags = fastify.transactions.tagged.getAllForGrid()
            return tags
        },
    }
}
