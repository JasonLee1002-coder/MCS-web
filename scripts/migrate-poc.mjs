/**
 * 建立 poc_reports 資料表（一次性執行）
 * 用法：node scripts/migrate-poc.mjs
 */
import { readFileSync } from 'fs'
import { resolve } from 'path'
import pg from 'pg'

const envContent = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8')
const env = {}
for (const line of envContent.split('\n')) {
  const [key, ...vals] = line.split('=')
  if (key?.trim() && vals.length) env[key.trim()] = vals.join('=').trim().replace(/^"|"$/g, '')
}

const client = new pg.Client({ connectionString: env['DATABASE_URL'] })
await client.connect()

await client.query(`
  CREATE TABLE IF NOT EXISTS poc_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'report',
    author TEXT NOT NULL DEFAULT 'CLO',
    html_content TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`)

console.log('✅ poc_reports 資料表建立完成')
await client.end()
