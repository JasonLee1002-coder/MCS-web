import { pgTable, uuid, text, jsonb, timestamp, integer } from 'drizzle-orm/pg-core'

/** 每個訪客 session 的對話記錄（含角色 + 訊息陣列） */
export const conversations = pgTable('mcs_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: text('session_id').notNull(),
  role: text('role').notNull(),   // venue | brand | franchise | custom
  messages: jsonb('messages').notNull().default([]),
  leadName: text('lead_name'),
  leadContact: text('lead_contact'),
  notifiedAt: timestamp('notified_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

/** POC 內部報告（結案備忘、會議記錄、分析報告） */
export const pocReports = pgTable('poc_reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  category: text('category').notNull().default('report'), // report | closure | analysis | meeting
  author: text('author').notNull().default('CLO'),        // 發布長官
  htmlContent: text('html_content').notNull(),
  slug: text('slug').notNull().unique(),                  // URL 友善名稱
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

/** ai-advisor v5.3 長期記憶（跨 session，以 session_id 識別訪客） */
export const aiMemories = pgTable('mcs_ai_memories', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: text('session_id').notNull(),
  category: text('category').notNull().default('general'),
  // 'preference'（偏好）| 'need'（需求）| 'constraint'（限制）| 'general'
  subject: text('subject'),
  content: text('content').notNull(),
  confidence: integer('confidence').notNull().default(1),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
