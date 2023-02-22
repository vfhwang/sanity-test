import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const client = createClient({ projectId, dataset, apiVersion });

// const sanityClient = (token?: string) => {
//   return projectId
//     ? createClient({ projectId, dataset, apiVersion, useCdn, token })
//     : null
// }

// export async function getProjectBySlug({
//   slug,
//   token,
// }: {
//   slug: string
//   token?: string
// }): Promise<ProjectPayload | undefined> {
//   return await sanityClient(token)?.fetch(projectBySlugQuery, { slug })
// }
