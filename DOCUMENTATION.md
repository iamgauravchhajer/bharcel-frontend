# 🌌 Bharcel — Technical Documentation

Bharcel is a production-grade, open-source deployment platform designed to emulate the Vercel/Netlify workflow. It enables developers to connect GitHub repositories, trigger builds on push, and serve globally accessible sites with isolated build environments and object storage.

---

## 🏗 System Architecture

Bharcel is built as a **stateless, distributed monorepo** consisting of four primary layers:

### 1. API Server (Backend)
- **Role**: The orchestrator. Handles user authentication, project management, and deployment triggers.
- **Technology**: Node.js, Express, Mongoose (MongoDB).
- **Hosting**: Serves static files directly from MinIO using both subdomain (`*.localhost`) and path-based routing.

### 2. Build Worker (Worker)
- **Role**: The execution engine. Consumes build jobs from Redis, clones code, and performs containerized builds.
- **Technology**: BullMQ, Docker (Sibling Containers), Git.
- **Isolation**: Each build runs in a strictly limited `node:18-alpine` container (1GB RAM, 1.0 CPU).

### 3. Object Storage (MinIO)
- **Role**: The source of truth. Stores immutable build artifacts (HTML, JS, CSS) partitioned by `projectId/commitSha`.
- **Technology**: S3-compatible API.

### 4. Message Queue (Redis)
- **Role**: The communication bridge. Manages job persistence, retries, and concurrency control between the API and Workers.

---

## 🔄 Core Workflows

### 1. The Deployment Pipeline
1.  **Trigger**: A user submits a repo via the Dashboard or a GitHub Webhook is received.
2.  **Encryption**: Build-time environment variables are encrypted using **AES-256-CBC** before being stored in MongoDB.
3.  **Queueing**: A job is pushed to the `deployments` queue in Redis.
4.  **Worker Pick-up**: A worker instance pulls the job and marks the deployment as `building`.
5.  **Cloning**: The worker clones the repository at the specific commit/branch.
6.  **Docker Spawn**: The worker spawns a sibling Docker container, mounting the source code and injecting the decrypted `.env.build` file.
7.  **Build**: Container runs `npm install && npm run build`.
8.  **Ingestion**: Worker scans the output directory (`dist`, `build`, etc.), detects MIME types, and uploads everything to MinIO.
9.  **Completion**: Database is updated to `live`, and the scratch space is wiped.

### 2. Content Serving (Routing)
Bharcel uses a high-performance Express middleware to resolve and serve content:
-   **Subdomain Resolution**: `http://my-site.localhost:3000`
    -   Middleware extracts `my-site` as the `projectId`.
    -   Checks MongoDB for the active `commitHash`.
    -   Streams the requested path (e.g., `/assets/index.js`) directly from MinIO to the client.
-   **SPA Support**: If a path isn't found (e.g., `/dashboard` in a React app), the server automatically serves `index.html` from MinIO, allowing client-side routing to take over.

---

## ⚙️ Configuration (What to Add)

To run Bharcel, you must configure the following in your `.env` file:

### 🔑 Critical Keys
| Variable | Description |
| :--- | :--- |
| `ENCRYPTION_KEY` | **MUST be 32 characters**. Used to encrypt build-time secrets. |
| `JWT_SECRET` | Used to sign user session tokens. |
| `GITHUB_WEBHOOK_SECRET` | HMAC secret for verifying GitHub push events. |

### 🌐 Infrastructure
-   **MongoDB**: `MONGO_URI` (Use local `mongodb://mongodb:27017/vercel-clone` for Docker).
-   **Redis**: `REDIS_HOST`, `REDIS_PORT`.
-   **MinIO**: `MINIO_ENDPOINT`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`.

### 📡 Networking (For GitHub Webhooks)
If running locally, you **must** use a tunnel like Ngrok:
1.  Run `ngrok http 3000`.
2.  Set `BASE_URL` in `.env` to your ngrok URL.
3.  In GitHub Repo Settings -> Webhooks, set the Payload URL to `https://your-ngrok.app/api/webhook/github`.

---

## 🛠 Setup & Execution

### The Docker Way (Recommended)
This starts the API, Worker, Mongo, Redis, and MinIO in a unified network.
```bash
docker-compose down
docker-compose up --build
```

### The Manual Way (Development)
1.  **Install Dependencies**:
    ```bash
    npm run install:all
    ```
2.  **Start Services**:
    -   Terminal 1: `npm run dev:api`
    -   Terminal 2: `npm run dev:worker`
    -   Terminal 3: `npm run dev:frontend`

---

## 🛡 Security & Reliability Features

1.  **Build Isolation**: Build containers have no access to the host filesystem (except the specific project directory) and are resource-throttled to prevent malicious scripts from hanging the host.
2.  **Encrypted Secrets**: No build-time environment variables are stored in plain text. They are only decrypted inside the ephemeral build container.
3.  **Atomic Queueing**: BullMQ ensures that if a worker crashes mid-build, the job is eventually marked as failed or retried, preventing "stuck" deployments.
4.  **MIME Integrity**: The system correctly identifies `text/css`, `application/javascript`, and `image/*` during upload to ensure browsers render sites correctly.
