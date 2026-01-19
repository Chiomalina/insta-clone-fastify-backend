import type { FastifyInstance } from "fastify"
import type { CreatePostDto, Post } from "./posts.types"
import { fileStorageService } from "../../common/file-storage.service"

type CreatePostData = {
    img_url: string // URL of the uploaded image coming from storage service
    caption: string
}

type CreatePostServiceArgs = {
    caption: string
    imageFile: { buffer: Buffer; filename: string }
}

const postsService = (fastify: FastifyInstance) => {
    return {
        create: async (data: CreatePostServiceArgs) => {
            fastify.log.info(`Creating a new post`)

            let img_url = data.caption // Fallback if no image, or placeholder

            if (data.imageFile) {
                // If an image is provided, save it and get the img_url
                img_url = await fileStorageService.saveImage(
                    data.imageFile.buffer,
                    data.imageFile.filename
                )
            }

            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const post = fastify.transactions.posts.create({
                img_url,
                caption: data.caption,
            })
            return post
        },

        getAll: async (): Promise<Post[]> => {
            fastify.log.info("Fetching all posts")
            const posts = fastify.transactions.posts.getAll()
            return posts
        },
    }
}

export { postsService }
