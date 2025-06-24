import { createClient } from '@sanity/client'

export default createClient({
  projectId: 'n6hxzull', // Your project ID
  dataset: 'production', // Your dataset name
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-01-01', // use a UTC date string
}) 