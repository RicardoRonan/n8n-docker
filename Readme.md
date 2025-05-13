# n8n Docker Compose Quickstart

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Docker](https://img.shields.io/badge/Docker-Compose-blue)](https://docs.docker.com/compose/)

<!-- Add a header image here, e.g., ![n8n Docker Compose](path/to/image.png) -->

Run [n8n](https://n8n.io/), a powerful workflow automation tool, with Docker Compose for easy deployment and persistent data storage.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Security doubled](#security)
- [Managing n8n](#managing-n8n)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project provides a straightforward Docker Compose setup to deploy n8n, enabling you to automate workflows with persistent data. It’s designed for quick setup, secure configuration, and easy maintenance. 🚀

## Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/RicardoRonan/n8n-docker
   cd n8n-docker-compose
   ```

2. **Create a Data Directory**

   Ensure persistent storage for n8n data:

   ```bash
   mkdir n8n_data
   ```

3. **Start n8n**

   Run the following command in the directory with `docker-compose.yml`:

   ```bash
   docker-compose up -d
   ```

4. **Access n8n**

   - Open `http://localhost:5678` in your browser.
   - Log in with the credentials defined in `docker-compose.yml`.

   > **Warning**: Default credentials are insecure. Update them in `docker-compose.yml` before production use.

## Configuration

The `docker-compose.yml` configures n8n with:

- **Persistent Data**: Maps `./n8n_data` on your host to `/home/node/.n8n` in the container.
- **Authentication**: Basic authentication enabled. Set secure credentials.
- **Ports**: Exposes n8n on port `5678`.

### Sample `docker-compose.yml`

```yaml
version: "3.8"
services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=<your-username>
      - N8N_BASIC_AUTH_PASSWORD=<your-password>
    volumes:
      - ./n8n_data:/home/node/.n8n
    restart: unless-stopped
```

> **Note**: Replace `<your-username>` and `<your-password>` with secure values.

## Security doubled

To secure your n8n instance:

- **Update Credentials**: Change the default username and password in `docker-compose.yml`. 🔒
- **Enable HTTPS**: Use HTTPS for internet-exposed instances to encrypt traffic.
- **Network Security**: Implement firewall rules or a reverse proxy for additional protection.

## Managing n8n

- **Stop n8n**:

  ```bash
  docker-compose down
  ```

- **Restart n8n**:

  ```bash
  docker-compose up -d
  ```

- **Update n8n**:

  1. Pull the latest image:

     ```bash
     docker-compose pull
     ```

  2. Restart the container:

     ```bash
     docker-compose up -d
     ```


Please include documentation and adhere to the project’s style guide.

## License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.