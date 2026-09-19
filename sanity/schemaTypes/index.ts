import { type SchemaTypeDefinition } from 'sanity'

// Keep the existing Studio schema in one place while the app is migrated to
// the typed Sanity config. This makes /internal/studio useful instead of
// silently rendering an empty schema.
// @ts-expect-error The legacy schema is plain JavaScript by design.
import legacySchema from '../../sanity-schema/schema.js'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: legacySchema as SchemaTypeDefinition[],
}
