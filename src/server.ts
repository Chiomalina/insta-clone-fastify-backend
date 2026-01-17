import Fastify from "fastify"
import { databasePlugin } from "./core/database/database.plugin"
import { postsRoutes } from "./modules/posts/posts.routes"
import { reelsRoutes } from "./modules/reels/reels.routes"
import { taggedRoutes } from "./modules/tagged/tagged.routes"

const fastify = Fastify({
    logger: true,
})

// Register our database plugin
fastify.register(databasePlugin)

// Register our new posts routes
fastify.register(postsRoutes)

// Register our new reels routes
fastify.register(reelsRoutes)

// Register our new tagged routes
fastify.register(taggedRoutes)

// Register our new reels routes
fastify.register(reelsRoutes)

// Declare a default route
fastify.get("/", async function (request, reply) {
    reply.send({ hello: "world" })
})

const port = 3000

fastify.listen({ port }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
