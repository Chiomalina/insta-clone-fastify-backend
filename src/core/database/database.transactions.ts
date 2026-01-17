import type { Database } from "better-sqlite3"
import type { CreatePostDto, Post } from "src/modules/posts/posts.types"
import type { CreateReelDto, Reel } from "src/modules/reels/reels.types"
import type { CreateTaggedDto, Tagged } from "src/modules/tagged/tagged.types"
import type {
    CreateHighlightDto,
    Highlight,
} from "src/modules/highlights/highlights.types"

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
            "INSERT INTO reels (video_url, thumbnail_url, caption, views) VALUES (@video_url, @thumbnail_url, @caption, @views) RETURNING *"
        ),

        // tagged
        getAllTagged: db.prepare("SELECT * FROM tagged"),
        createTagged: db.prepare(
            "INSERT INTO tagged (thumbnail_url, caption) VALUES (@thumbnail_url, @caption) RETURNING *"
        ),

        // highlight
        getAllHighlights: db.prepare("SELECT * FROM highlights"),
        getHighlightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
        createHighlight: db.prepare(
            "INSERT INTO highlights (cover_image_url, title) VALUES (@cover_image_url, @title) RETURNING *"
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

    const tagged = {
        getAll: () => {
            return statements.getAllTagged.all() as Tagged[]
        },
        create: (data: CreateTaggedDto): Tagged => {
            return statements.createTagged.get(data) as Tagged
        },
    }

    const highlights = {
        getAll: (): Highlight[] => {
            return statements.getAllHighlights.all() as Highlight[]
        },
        getById: (id: number): Highlight | undefined => {
            return statements.getHighlightById.get(id) as Highlight | undefined
        },
        create: (data: CreateHighlightDto): Highlight => {
            return statements.createHighlight.get(data) as Highlight
        },
    }

    return {
        posts,
        reels,
        tagged,
        highlights,
    }
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
export { createTransactionHelpers }
