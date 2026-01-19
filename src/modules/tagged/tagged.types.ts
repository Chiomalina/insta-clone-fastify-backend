import { z } from "zod"
import { postSchema } from "../posts/posts.types"

// Minimal "user" schema for the person who tagged you
const taggerSchema = z.object({
    id: z.number(),
    username: z.string(),
    avatar_url: z.string().url().nullable().optional(),
})

// A "tagged post" = original post fields + who tagged you
const taggedPostSchema = postSchema.extend({
    tagged_by: taggerSchema,
})

// Response schema for GET /tagged/grid
const taggedGridSchema = z.array(taggedPostSchema)

// Types
type Tagger = z.infer<typeof taggerSchema>
type TaggedPost = z.infer<typeof taggedPostSchema>
type TaggedGrid = z.infer<typeof taggedGridSchema>

export {
    taggerSchema,
    taggedPostSchema,
    taggedGridSchema,
    Tagger,
    TaggedPost,
    TaggedGrid,
}
