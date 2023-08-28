import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

// vitest-environment-prisma

// postgresql://docker:docker@localhost:5432/apisolid?schema=public
const prisma = new PrismaClient()

function generateSchema(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const url = generateSchema(schema)

    process.env.DATABASE_URL = url

    // run prisma migrate
    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        console.log(`teardown db... for ${schema}`)
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
