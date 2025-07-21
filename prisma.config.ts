import { PrismaD1 } from '@prisma/adapter-d1'
import { defineConfig } from 'prisma/config'
import 'dotenv/config'

type Env = {
  CLOUDFLARE_D1_TOKEN: string
  CLOUDFLARE_ACCOUNT_ID: string
  CLOUDFLARE_DATABASE_ID: string
}

export default defineConfig({
  earlyAccess: true,
  schema: './prisma/schema.prisma',
  adapter: async () => {
    const { CLOUDFLARE_D1_TOKEN, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID } = process.env as Env
    return new PrismaD1({
      CLOUDFLARE_D1_TOKEN,
      CLOUDFLARE_ACCOUNT_ID,
      CLOUDFLARE_DATABASE_ID,
    })
  },
  migrations: {
    path: './prisma/migrations',
  },
})