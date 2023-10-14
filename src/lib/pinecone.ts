import { Pinecone } from '@pinecone-database/pinecone'

export const pinecone = new Pinecone({
  environment: 'asia-southeast1-gcp-free',
  apiKey: process.env.PINECONE_API_KEY!,
})
