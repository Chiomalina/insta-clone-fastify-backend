import type { FastifyInstance } from "fastify"
import type { CreateReelDto, Reel } from "./reels.types"

const reelsService = (fastify: FastifyInstance) => {
    return {
        async getAll(): Promise<Reel[]> {
            fastify.log.info("Fetching all reels")
            const reels = fastify.transactions.reels.getAll()
            return reels
        },
    }
}

export { reelsService }
