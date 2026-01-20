# Instagram Clone Fastify Backend
The backend for the Instagram clone project is a mobular, type-safe backend API for an instagram like application, built with Fastify, TypeScript, and SQLite.
This backend powers posts, reels, tagged posts, highlights, image uploads, and profile grids for the frontend client.

The project emphasizes clean architecture, test-driven development, and real-world backend patterns suitable for modern full-stack applications.

----

## Project Purpose
This backend serves as the core API for an instagram clone, handling:
* Image uploads and static file serving
* CRUD operations for social content
* profile based grid views
* Validation, eror handling, and database consistency
* Deployment ready configuration for cloud platforms

It is designed to be **frontend agonistic, scalable,** and **easy to extend.**

## ✨ Features
* 📷 Create posts with image uploads

* 🎞 Reels grid with thumbnails and view counts

* 🏷 Tagged posts support

* ⭐ Highlights & highlight stories

* 🧱 Modular service & transaction layers

* ✅ Zod-based request/response validation

* 🧪 Jest test suite with mocked transactions

* 🗄 SQLite database with auto-seeding

* 🌐 Static file hosting for uploaded images

* 🚀 Production deployment support (Heroku / Render / Railway)

----

## 🧰Tech Stack
* Runtime & Language
    * TypeScript
    * Node.js
* Backend Framework
    * Fastify
* Database
    * SQLite (better-sqlite3)
* Validation
    * Zod
* Testing
    * Jest
* File Uploads
    * @fastify/multipart
    * @fastify/static
* Architecture & Tooling
    * Fastify plugins
    * Transaction helpers 
    * Modular services
    * Amparo (project structure & discipline)

* Deployment
    * Heroku (production)
    * Local SQLite for development

----

## 🏗 Architecture Overview
The backend follow a clean, modular architectur:
```
src/
├── modules/
│   ├── posts/
│   │   ├── posts.routes.ts
│   │   ├── posts.service.ts
│   │   ├── posts.test.ts
│   │   └── posts.types.ts
│   ├── reels/
│   │   ├── reels.routes.ts
│   │   ├── reels.service.ts
│   │   ├── reels.tests.ts
│   │   └── reels.types.ts
│   ├── tagged/
│   │   ├── tagged.routes.ts
│   │   ├── tagged.service.ts
│   │   ├── tagged.test.ts
│   │   └── tagged.types.ts
│   └── highlights/
│       ├── highlights.routes.ts
│       ├── highlights.service.ts
│       ├── highlights.test.ts
│       └── highlights.types.ts
│
├── common/
│   └── file-storage.service.ts
│
├── database/
│   ├── database.plugin.ts
│   └── database.transactions.ts
│
├── server.ts
└── app.ts

```

----

## Key Concepts
* **Routes**
    * Handle HTTP requests and responses only
* **Services**
    * Contain business login  
* **Transactions**
    * Abstract database access (easy to mock in tests)
* **Schemas (Zod)**
    * Validate inputs, outputs, and enforce contracts 
* **Plugins**
    * Register database, static assests, and multipart handling

-----

## 🧪 Testing Strategy
