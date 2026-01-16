import { z } from "zod"

// First, we define the zod schemas
const createReelDtoSchema = z.object({
    id: z.number(),
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),
    caption: z.string().nullable().optional(),
    views: z.number(),
})

const reelSchema = z.object({
    id: z.number(),
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),
    caption: z.string().nullable().optional(),
    views: z.number(),
})

// This will be useful for validating the response from the `GET /posts` endpoint.
const reelsGridSchema = z.array(reelSchema)

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
type CreateReelDto = z.infer<typeof createReelDtoSchema>
type Reel = z.infer<typeof reelSchema>
type ReelsGrid = z.infer<typeof reelsGridSchema>

export {
    createReelDtoSchema,
    reelSchema,
    reelsGridSchema,
    CreateReelDto,
    Reel,
    ReelsGrid,
}
