import { z } from "zod"

// DTO schema for creating a single highlight.
// No 'id' here because the db generates it.
const createHighlightDtoSchema = z.object({
    cover_image_url: z.string().url(),
    title: z.string().nullable().optional(),
})

// Schema for a highlight returned from the db / API.
const highlightSchema = z.object({
    id: z.number(),
    cover_image_url: z.string().url(),
    title: z.string().nullable().optional(),
})

// Response schema for GET /highlights.
// Returns an array of highlights.
const highlightsSchema = z.array(highlightSchema)

// Infer TypScript types from Zod schemas
type CreateHighlightDto = z.infer<typeof createHighlightDtoSchema>
type Highlight = z.infer<typeof highlightSchema>
type HighlightsList = z.infer<typeof highlightsSchema>

export {
    createHighlightDtoSchema,
    highlightSchema,
    highlightsSchema,
    CreateHighlightDto,
    Highlight,
    HighlightsList,
}
