import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || "postgresql://postgres:TuHqCGusrbZfTXxePAIXEpwBLNWVwkAQ@postgres.railway.internal:5432/railway"
      }
    }
  })
}

// Ignore global for TypeScript but we are in JS, so globalThis is fine
const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
