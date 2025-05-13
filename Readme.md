
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

n8n Setup and Configuration
Starting n8n
In the directory containing your docker-compose.yml, run:
docker-compose up -d

Accessing n8n

Open http://localhost:5678 in your browser.
Log in using the credentials defined in your docker-compose.yml.

Important: The default credentials are insecure and must be changed for production use. Update them in the docker-compose.yml file before deploying.
Stopping, Restarting, and Updating n8n

Stop n8n:docker-compose down


Restart n8n:docker-compose up -d


Update n8n:
Pull the latest image:docker-compose pull


Restart the container:docker-compose up -d





Configuration Reference
Your docker-compose.yml configures n8n with:

Persistent Data: Maps ./n8n_data on your host to /home/node/.n8n in the container for data persistence.
Authentication: Basic authentication is enabled. Ensure you set secure credentials in the configuration.
Ports: Exposes n8n on port 5678.

Security Notes

Change Default Credentials: Update the default username and password in docker-compose.yml to secure your instance.
Use HTTPS: If exposing n8n to the internet, configure HTTPS to encrypt traffic.
Additional Security: Consider firewall rules, network restrictions, or a reverse proxy for enhanced security.

