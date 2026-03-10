const DATABASE_URL =
  process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/weaxle78'

export const sql = new Bun.SQL(DATABASE_URL)
