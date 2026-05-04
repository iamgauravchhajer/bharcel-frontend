# 🚀 Bharcel: The Modern Deployment Platform

Bharcel is a high-performance, open-source deployment platform designed to simplify the lifecycle of modern web applications. Much like Vercel or Netlify, Bharcel automates the process of cloning repositories, building projects, and serving them via unique, live URLs—all while providing real-time logs and AI-driven failure analysis.

---

## 🏗️ System Architecture

Bharcel is built on a distributed, microservices-oriented architecture to ensure high availability and scalability.

- **API Gateway (Express)**: Handles user authentication, project management, and job orchestration.
- **Background Worker (BullMQ)**: A high-concurrency worker service that processes build jobs, manages Docker containers, and publishes build artifacts.
- **Message Broker (Redis)**: Powering our reliable queue system for asynchronous job processing.
- **Database (MongoDB)**: Stores user metadata, deployment history, and project configurations.
- **Frontend (Vite/React)**: A sleek, modern dashboard for monitoring deployments and system stats.
- **Docker Integration**: Isolated build environments ensure that your code builds consistently every single time.

---

## 🚦 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Redis](https://redis.io/) (if running locally without Docker)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas cluster)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Keshavcodes3/Bharcel.git
   cd Bharcel
   ```

2. **Install Dependencies:**
   Install backend, worker, and frontend packages:
   ```bash
   # Root directory
   npm install
   cd Backend && npm install
   cd ../worker && npm install
   cd ../Frontend && npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory and add the following mandatory variables:
   ```env
   # Core
   MONGO_URI=your_mongodb_uri
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=your_redis_password
   
   # Security
   JWT_SECRET=your_32_char_secret
   ENCRYPTION_KEY=your_32_char_encryption_key
   
   # GitHub Integration
   GITHUB_CLIENT_ID=your_id
   GITHUB_CLIENT_SECRET=your_secret
   
   # AI Services (Groq)
   GROQ_API_KEY=your_groq_api_key
   ```

---

## 🛠️ Running the Project

### 1. Local Development (Recommended for quick testing)
To start the entire system (API + Worker) concurrently:
```bash
cd Backend
npm run dev:all
```
Then, start the frontend:
```bash
cd Frontend
npm run dev
```

### 2. Services Breakdown
- **Backend Server**: Manages routes, auth, and pushes jobs to Redis.
- **Worker**: Listens to the `deployments` queue, clones your code, and runs builds.
- **Frontend**: The user interface for creating projects and viewing live URLs.

---

## 🐳 Docker Setup

For a production-like environment, use Docker Compose to orchestrate all services including MongoDB and Redis.

**Start the Platform:**
```bash
docker compose up --build
```

**Stop the Platform:**
```bash
docker compose down
```

**Containers Managed:**
- `vercel-api`: The core Express service.
- `vercel-worker`: The deployment processor.
- `vercel-mongodb`: Database storage.
- `vercel-redis`: The job queue broker.

---

## 📦 Key Technology Stack

| Package | Purpose |
| :--- | :--- |
| **Express** | Fast, unopinionated web framework for the API gateway. |
| **Mongoose** | Elegant MongoDB object modeling for project and user data. |
| **BullMQ** | Professional-grade job queue for reliable background processing. |
| **IORedis** | Robust Redis client for handling queue connections. |
| **Socket.io** | Real-time, bidirectional logging and status updates. |
| **Bcryptjs** | Secure password hashing for user authentication. |
| **Zod** | Schema-based validation for incoming API requests. |

---

## 🔄 Deployment Flow

When you submit a repository to Bharcel, the system executes a precise 8-step pipeline:

1. **Submission**: User submits a repo URL and branch.
2. **Queuing**: API validates the request and adds a job to the Redis queue.
3. **Pickup**: An idle Worker picks the job and updates the status to `building`.
4. **Cloning**: The Worker clones the repository into a secure build directory.
5. **Install**: Dependencies are resolved using the project's lockfiles.
6. **Build**: Code is compiled or bundled (e.g., `npm run build`).
7. **Publish**: Build artifacts (e.g., `/dist`) are moved to the storage volume.
8. **Live URL**: A unique subdomain URL is generated and the status is set to `success`.

---

## 👤 User & Admin Roles

### Member Panel
- **Create Deployments**: Link any public or private GitHub repository.
- **Real-time Logs**: Watch your build progress live via WebSockets.
- **Deployment History**: Access previous builds and retry failed jobs.
- **Unique URLs**: Every successful build gets a dedicated `http://projectId.vercel-clone.local` URL.

### Admin Panel
- **User Management**: Promote users to admins or demote/disable accounts.
- **System Stats**: Monitor global success rates and average build times.
- **Global Logs**: Oversee all system deployments to ensure platform health.
- **Usage Control**: Set and monitor platform-wide deployment limits.

---

## 📉 Limits & Tracking
To ensure platform stability, Bharcel tracks:
- **Deployment Count**: Daily limits based on the user's plan (Free/Pro).
- **Project Limits**: Maximum number of projects per account.
- **Build Duration**: Jobs are timed to prevent zombie processes.
- **Resource Usage**: CPU and Memory isolation per build container.

---

## 🆘 Troubleshooting

- **Jobs Stuck in "Queued"?**
  Ensure the worker process is running (`npm run worker`). Check Redis logs for connection timeouts.
- **Redis Connection Issues?**
  Verify `REDIS_PASSWORD` matches your instance and ensure the host is reachable from your environment.
- **Docker "Permisson Denied"?**
  Ensure your user has access to the Docker socket (`/var/run/docker.sock`).

---

## ⌨️ Command Cheat Sheet

| Action | Command |
| :--- | :--- |
| **Start Everything (Dev)** | `npm run dev:all` (in Backend) |
| **Start Worker Only** | `npm run worker` (in Backend) |
| **Start Frontend** | `npm run dev` (in Frontend) |
| **Docker Compose Build** | `docker compose up --build` |
| **Test Redis** | `redis-cli ping` |

---

Developed with ❤️ by the Bharcel Team.
