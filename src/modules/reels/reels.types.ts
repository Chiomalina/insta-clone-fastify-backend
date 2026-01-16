import { z } from "zod"

// First, we define the zod schemas for reel (deciding wha the client is allowed/expected)
// No id here because the db generates it
const createReelDtoSchema = z.object({
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),
    caption: z.string().nullable().optional(),
    views: z.number(),
})

// Reel schema for data stored/returned by the API.
// Includes fields that exists after creation (id)
const reelSchema = z.object({
    id: z.number(),
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),
    caption: z.string().nullable().optional(),
    views: z.number(),
})

// Response schema for GET / reels/grid.
// the endpoint returns an array of reels..
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
