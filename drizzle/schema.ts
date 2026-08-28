import { int, varchar, text, timestamp, json } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';

// Wilayat Table
export const wilayat = mysqlTable('wilayat', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  englishName: varchar('english_name', { length: 100 }).notNull(),
  description: text('description'),
  population: varchar('population', { length: 50 }),
  area: varchar('area', { length: 50 }),
  latitude: varchar('latitude', { length: 20 }),
  longitude: varchar('longitude', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// News Channels Table
export const newsChannels = mysqlTable('news_channels', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  englishName: varchar('english_name', { length: 100 }).notNull(),
  description: text('description'),
  type: varchar('type', { length: 50 }), // تلفزيون، راديو، رقمي
  language: varchar('language', { length: 100 }),
  website: varchar('website', { length: 255 }),
  status: varchar('status', { length: 20 }).default('نشط'),
  category: varchar('category', { length: 100 }),
  logo: varchar('logo', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Wilayat Channels Junction Table
export const wilayatChannelsJunction = mysqlTable('wilayat_channels', {
  id: int('id').primaryKey().autoincrement(),
  wilayatId: int('wilayat_id').notNull(),
  channelId: int('channel_id').notNull(),
  isPrimary: int('is_primary').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// Local Channels Table (Channels specific to Wilayat)
export const localChannels = mysqlTable('local_channels', {
  id: int('id').primaryKey().autoincrement(),
  wilayatId: int('wilayat_id').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  type: varchar('type', { length: 50 }),
  website: varchar('website', { length: 255 }),
  socialMedia: json('social_media'),
  status: varchar('status', { length: 20 }).default('نشط'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// News/Articles Table
export const newsArticles = mysqlTable('news_articles', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  content: text('content'),
  wilayatId: int('wilayat_id'),
  channelId: int('channel_id'),
  category: varchar('category', { length: 100 }),
  imageUrl: varchar('image_url', { length: 255 }),
  sourceUrl: varchar('source_url', { length: 255 }),
  priority: int('priority').default(0),
  status: varchar('status', { length: 20 }).default('نشر'),
  author: varchar('author', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Users Table
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  openId: varchar('open_id', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }),
  loginMethod: varchar('login_method', { length: 50 }),
  role: varchar('role', { length: 20 }).default('user'),
  lastSignedIn: timestamp('last_signed_in').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Wilayat = typeof wilayat.$inferSelect;
export type NewsChannel = typeof newsChannels.$inferSelect;
export type NewsArticle = typeof newsArticles.$inferSelect;
export type User = typeof users.$inferSelect;

export type InsertWilayat = typeof wilayat.$inferInsert;
export type InsertNewsChannel = typeof newsChannels.$inferInsert;
export type InsertNewsArticle = typeof newsArticles.$inferInsert;
export type InsertUser = typeof users.$inferInsert;
