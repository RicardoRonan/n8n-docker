
# n8n Docker Compose Quickstart

This project provides a simple way to run [n8n](https://n8n.io/) using Docker Compose with persistent data storage.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

---

## Setup Instructions

1. **Clone or Prepare the Project Directory**

   Place the provided `docker-compose.yml` file in your project directory.

2. **Create a Data Directory**

   This ensures your n8n data persists across container restarts:

   ```sh
   mkdir n8n_data

Start n8n

Run in the directory containing your docker-compose.yml:

Access n8n

Open http://localhost:5678
Login with:
Username: admin <vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'> -</vscode_annotation> Password: admin123
Stopping, Restarting, and Updating n8n
Stop n8n:
docker-compose down
Restart n8n:
docker-compose up -d
Update n8n:
Configuration Reference
Your docker-compose.yml configures n8n with:

Persistent data:
Maps ./n8n_data on your host to /home/node/.n8n in the container.
Authentication:
Basic auth enabled with default credentials (admin / admin123).
Change these for production!
Ports:
Exposes n8n on port 5678.
Security Notes
Change the default username and password in docker-compose.yml for production use.
Consider using HTTPS and additional security measures if exposing n8n to the internet.