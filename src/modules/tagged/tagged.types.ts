import { z } from "zod"

// First, we define the zod schemas for reel (deciding wha the client is allowed/expected)
// No id here because the db generates it
const createTaggedDtoSchema = z.object({
    thumbnail_url: z.string().url(),
    caption: z.string().nullable().optional(),
})

// Tagged schema for data stored/returned by the API.
// Includes fields that exists after creation (id)
const taggedSchema = z.object({
    id: z.number(),
    thumbnail_url: z.string().url(),
    caption: z.string().nullable().optional(),
})

// Response schema for GET / tagged/grid.
// the endpoint returns an array of tagges posts..
const taggedGridSchema = z.array(taggedSchema)

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
type CreateTaggedDto = z.infer<typeof createTaggedDtoSchema>
type Tagged = z.infer<typeof taggedSchema>
type TaggedGrid = z.infer<typeof taggedGridSchema>

export {
    createTaggedDtoSchema,
    taggedSchema,
    taggedGridSchema,
    CreateTaggedDto,
    Tagged,
    TaggedGrid,
}
