import "reflect-metadata";
import { DataSource } from "typeorm";
import { envConfig } from "./env.config";
import path from "path";

const { DB_URL } = envConfig;

// Determine file extension based on environment
const isCompiled = __filename.endsWith(".js"); // true in production
const entityExt = isCompiled ? "js" : "ts";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: String(DB_URL),

  // REQUIRED for cloud DB (Neon / Render / Supabase)
  ssl: {
    rejectUnauthorized: false,
  },

  synchronize: false,  //When true, TypeORM automatically creates/updates database tables based on your entities.

// Very handy during development.

// ⚠️ In production, it’s safer to set it to false and use migrations to avoid data loss.
//   logging: false,

  // Dynamic entity path
  entities: [path.join(__dirname, `./entity/**/*.${entityExt}`)],

//  migrations: [],  //Optional: Path to your migration scripts (database schema changes).

// TypeORM can run migrations automatically with AppDataSource.runMigrations().


 subscribers: [],  //Optional: Path to subscriber classes.

// Subscribers allow you to listen to entity events like beforeInsert, afterUpdate, etc.

// Example: Log activity whenever a new user is created.
});






// What this does:
// ssl: {
//   rejectUnauthorized: false,
// }
// ✅ ssl

// Enables a secure (encrypted) connection between your backend and the database.

// Similar to how HTTPS works for websites.

// 👉 Without SSL:

// Data travels in plain text ❌ (not safe)

// 👉 With SSL:

// Data is encrypted ✅ (safe)

// ⚙️ What rejectUnauthorized: false means

// Normally, SSL checks if the database has a valid certificate.

// rejectUnauthorized: false tells Node.js:

// 👉 “Don’t verify the certificate — just connect anyway.”

// 🤔 Why is this needed for cloud DBs?

// Platforms like:

// Neon

// Render

// Supabase

// 👉 Often use self-signed or managed certificates.

// So without this:
// ❌ Connection fails with errors like:

// self signed certificate
// unable to verify certificate
// ⚠️ Is this safe?
// ✔️ Safe for:

// Development

// Trusted cloud providers (Neon, Supabase, etc.)

// ❗ Not ideal for:

// High-security production systems

// Better production version:

// ssl: true

// or

// ssl: {
//   ca: process.env.DB_CA_CERT, // proper certificate
// }
// 🧠 Simple Analogy

// Think of SSL like:

// 🔓 No SSL → sending a message on a postcard (anyone can read)

// 🔐 SSL → sending in a locked envelope

// ❗ rejectUnauthorized: false → accepting the envelope even if you don’t check the sender’s ID

// ✅ Summary

// ssl → encrypts database connection

// rejectUnauthorized: false → skips certificate validation

// Needed for many cloud DBs to avoid connection errors