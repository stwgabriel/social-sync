import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  // createClient throws on an empty projectId; fall back to a placeholder so
  // the app runs without Sanity configured (fetchSanityData already returns
  // null when the env vars are missing).
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
})

// Helper function to generate image URLs from Sanity image references
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Typed fetch function for Sanity data
export async function fetchSanityData<T>(query: string, params = {}): Promise<T | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    return null
  }

  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error("Error fetching Sanity data:", error)
    return null
  }
}
