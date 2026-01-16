import type { Database } from "better-sqlite3"
import type { CreatePostDto, Post } from "src/modules/posts/posts.types"
import type { CreateReelDto, Reel } from "src/modules/reels/reels.types"

// This factory function creates and returns our transaction helpers.
const createTransactionHelpers = (db: Database) => {
    // We use prepared statements for security and performance.
    const statements = {
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare(
            "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
        ),

        // reels
        getAllReels: db.prepare("SELECT * FROM reels"),
        createReel: db.prepare(
            "INSERT INTO reels (video_url, thumbnail_url, caption, views) values (@video_url, @thumbnail_url, @caption, @views) RETURNING *"
        ),
    }

    const posts = {
        getById: (id: number): Post | undefined => {
            return statements.getPostById.get(id) as Post | undefined
        },
        getAll: () => {
            return statements.getAllPosts.all() as Post[]
        },
        create: (data: CreatePostDto): Post => {
            return statements.createPost.get(data) as Post
        },
    }

    const reels = {
        getAll: () => {
            return statements.getAllReels.all() as Reel[]
        },
        create: (data: CreateReelDto): Reel => {
            return statements.createReel.get(data) as Reel
        },
    }

    return {
        posts,
        reels,
    }
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
export { createTransactionHelpers }
