// Deploying database to vercel
import type { FastifyInstance } from "fastify"
import fp from "fastify-plugin"
import Database from "better-sqlite3"
import {
    createTransactionHelpers,
    type TransactionHelpers,
} from "./database.transactions"

declare module "fastify" {
    interface FastifyInstance {
        db: Database.Database
        transactions: TransactionHelpers
    }
}

async function databasePluginHelper(fastify: FastifyInstance) {
    //const db = new Database("./database.db")
    const dbPath =
        process.env.DB_PATH ??
        (process.env.NODE_ENV === "production"
            ? "/tmp/database.db"
            : "./database.db")
    const db = new Database(dbPath)
    //fastify.log.info("SQLite database connection established.")
    fastify.log.info({ dbPath }, "SQLite database connection established.")

    // --- Schema setup (must run BEFORE createTransactionHelpers) ---
    db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_url TEXT NOT NULL,
      thumbnail_url TEXT NOT NULL,
      caption TEXT,
      views INTEGER NOT NULL DEFAULT 0
    );

    -- users table (for who tagged you)
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      avatar_url TEXT
    );

    -- tagged_posts join table
    CREATE TABLE IF NOT EXISTS tagged_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      tagged_by_user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (tagged_by_user_id) REFERENCES users(id)
    );

    -- Highlights table (name must match database.transactions.ts: "highlights")
    CREATE TABLE IF NOT EXISTS highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cover_image_url TEXT NOT NULL,
      title TEXT UNIQUE
    );
  `)

    // --- Optional seed data (prevents empty UI; avoids duplicates) ---
    db.exec(`
      INSERT OR IGNORE INTO users (username, avatar_url)
      SELECT 'chioma_dev', 'http://example.com/avatar1.png'
      WHERE NOT EXISTS (SELECT 1 FROM users);

      INSERT INTO posts (img_url, caption)
      SELECT 'http://example.com/post1.png', 'A sample post'
      WHERE NOT EXISTS (SELECT 1 FROM posts);

      INSERT INTO tagged_posts (post_id, tagged_by_user_id)
      SELECT
        (SELECT id FROM posts ORDER BY id ASC LIMIT 1),
        (SELECT id FROM users ORDER BY id ASC LIMIT 1)
      WHERE NOT EXISTS (SELECT 1 FROM tagged_posts);

      INSERT OR IGNORE INTO highlights (cover_image_url, title)
      SELECT 'http://example.com/highlights-image1.png', 'Highlight 1'
      WHERE NOT EXISTS (SELECT 1 FROM highlights);
  `)

    const transactions = createTransactionHelpers(db)

    fastify.decorate("db", db)
    fastify.decorate("transactions", transactions)

    fastify.addHook("onClose", (instance, done) => {
        try {
            instance.db.close()
            instance.log.info("SQLite database connection closed.")
        } catch (err) {
            instance.log.warn(
                { err },
                "Failed to close SQLite database cleanly,"
            )
        }
        done()
    })
}

const databasePlugin = fp(databasePluginHelper)

export { databasePlugin }
