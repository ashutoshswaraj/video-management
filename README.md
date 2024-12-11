# Docker Compose Project

This project uses Docker Compose to run a _backend, **frontend, and **MongoDB_ for development purposes.

---

## Prerequisites

Ensure the following are installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Services

### Backend

- _Context_: ./backend
- _Ports_: 5000:5000
- _Volumes_:
  - Syncs local backend code to /app
  - Prevents overwriting node_modules in the container
- _Environment_: NODE_ENV=development
- _Command_: npm run dev (hot reloading enabled)
- _Depends On_: mongodb

### Frontend

- _Context_: ./frontend/my-app
- _Ports_: 3000:3000
- _Volumes_:
  - Syncs local frontend code to /app
  - Prevents overwriting node_modules in the container
- _Environment_: WATCHPACK_POLLING=true
- _Command_: npm start (React development server)

### MongoDB

- _Image_: mongo:5.0
- _Container Name_: video-management-mongodb
- _Ports_: 27017:27017
- _Volume_: Persistent data stored in mongo-data

---

## How to Run

1. Clone the repository and navigate to the project directory.
2. Ensure the backend and frontend/my-app directories contain their Dockerfile.
3. Start the services:
   ```bash
   docker-compose up --build
   ```
