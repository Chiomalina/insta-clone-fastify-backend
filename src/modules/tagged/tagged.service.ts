import type { FastifyInstance } from "fastify"
import type { Tagged } from "./tagged.types"

export const taggedService = (fastify: FastifyInstance) => {
    return {
        async getAll(): Promise<Tagged[]> {
            fastify.log.info("Fetching all tags")
            const tags = fastify.transactions.tagged.getAll()
            return tags
        },
    }
}
