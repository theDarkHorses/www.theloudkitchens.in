import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 'wgh9ycuy',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-10-15',
})