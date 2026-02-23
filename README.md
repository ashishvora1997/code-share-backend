# ShareCodeNow Backend

A **lightweight, secure, and time-limited code sharing backend** built with **Node.js, Express, and PostgreSQL**. It powers the ShareCodeNow frontend by handling code snippet creation, retrieval, updates, and automatic expiration.

**Live API:** [https://code-share-api-7o2d.onrender.com](https://code-share-api-7o2d.onrender.com)

---

## Features

* **Create Snippets** – Save code snippets with a unique UUID
* **Retrieve Snippets** – Get snippets via ID if they haven’t expired
* **Update Snippets** – Edit existing code snippets
* **Automatic Expiration** – Snippets expire 24 hours after creation
* **Cleanup Job** – Cron job deletes expired snippets every 5 minutes
* **CORS Support** – Restrict API access to allowed frontend origins

---

## API Endpoints

Base URL: `https://code-share-api-7o2d.onrender.com/snippets`

| Method | Endpoint   | Description                        | Request Body               |
| ------ | ---------- | ---------------------------------- | -------------------------- |
| POST   | `/`        | Create a new snippet               | `{ "code": "<code>" }`     |
| GET    | `/:id`     | Get snippet by ID (if not expired) | –                          |
| PUT    | `/:id`     | Update snippet by ID               | `{ "code": "<new_code>" }` |
| DELETE | `/cleanup` | Delete all expired snippets        | –                          |

**Response Example (GET /:id)**

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "code": "console.log('Hello World');",
  "expiresAt": "2026-02-24T12:00:00.000Z",
  "createdAt": "2026-02-23T12:00:00.000Z",
  "updatedAt": "2026-02-23T12:00:00.000Z"
}
```

---

## Technology Stack

* **Node.js** – JavaScript runtime
* **Express** – Web framework for REST APIs
* **Sequelize** – ORM for PostgreSQL
* **PostgreSQL** – Database for storing snippets
* **node-cron** – Scheduled cleanup of expired snippets
* **dotenv** – Environment variable management
* **cors** – Cross-Origin Resource Sharing

---

## Database Schema

**Table:** `code_snippets`

| Column      | Type | Description                                      |
| ----------- | ---- | ------------------------------------------------ |
| `id`        | UUID | Unique identifier for each snippet (primary key) |
| `code`      | TEXT | Code content                                     |
| `expiresAt` | DATE | Expiration timestamp (24h after creation)        |
| `createdAt` | DATE | Timestamp when snippet was created               |
| `updatedAt` | DATE | Timestamp of last update                         |

---

## Project Structure

```
code-share-backend/
├── controllers/
│   └── snippetController.js   # Handles CRUD and cleanup logic
├── jobs/
│   └── cleanupJob.js          # Cron job for deleting expired snippets
├── models/
│   └── snippetModel.js        # Sequelize model definition
├── postgres/
│   └── postgres.js            # PostgreSQL connection setup
├── routes/
│   └── snippetRoutes.js       # API routes
├── index.js                   # Server entry point
├── package.json
└── .env.example               # Environment variables template
```

---

## Setup and Installation

### Prerequisites

* Node.js 18+
* PostgreSQL database

### Environment Variables

Create a `.env` file:

```
DATABASE_URL=postgres://username:password@localhost:5432/code_share
DIALECT=postgres
CORS_ORIGINS=http://localhost:5173,http://localhost:3001,https://myapp.example.com
PORT=5001
```

### Installation

```bash
# Clone the repository
git clone https://github.com/ashishvora1997/code-share-backend.git

# Install dependencies
npm install

# Start development server with nodemon
npm run start
```

The server runs on `http://localhost:5001` by default.

---

## Automatic Cleanup

Expired snippets are deleted automatically via:

1. **On-demand cleanup** – `DELETE /snippets/cleanup` endpoint
2. **Scheduled job** – Runs every 5 minutes using `node-cron`

---

## CORS Configuration

Only origins listed in the `CORS_ORIGINS` environment variable can access the API. Example:

```
CORS_ORIGINS=http://localhost:5173,https://code-share-frontend.onrender.com
```

---

## Error Handling

* 404 – Snippet not found or expired
* 500 – Internal server errors

All errors are returned in JSON format:

```json
{
  "message": "Internal Server Error"
}
```

---

## Future Enhancements

* Authentication for private shares
* Custom expiration times
* Versioning or undo functionality
* Rate limiting for security

---

## License

MIT License – free to use for any purpose

**Live API:** [https://code-share-api-7o2d.onrender.com](https://code-share-api-7o2d.onrender.com)
