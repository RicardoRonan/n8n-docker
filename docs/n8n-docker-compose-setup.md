# n8n Docker Compose Setup Guide

This guide explains how to set up and run [n8n](https://n8n.io/) using Docker Compose with the provided `docker-compose.yml` file.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- (Optional) [ngrok](https://ngrok.com/download) if you want to expose your local n8n instance to the internet
- (Optional) [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) for automation scripts

---

## 1. Clone or Prepare Your Project Directory

Create a directory for your n8n project and place the provided `docker-compose.yml` file inside it.

```sh
mkdir n8n-docker
cd n8n-docker
# Place docker-compose.yml here
```

---

## 2. Create a Data Directory

This ensures your n8n data persists across container restarts.

```sh
mkdir n8n_data
```

---

## 3. Start n8n

Run the following command in the directory containing your `docker-compose.yml`:

```sh
docker-compose up -d
```

- This will download the n8n image (if not already present), create the container, and start the service in detached mode.

---

## 4. Access n8n

- Open your browser and go to: [http://localhost:5678](http://localhost:5678)
- Login with:
  - **Username:** `admin`
  - **Password:** `admin123`

---

## 5. Expose n8n to the Internet (Optional)

If you want to access n8n from outside your local machine, use [ngrok](https://ngrok.com/):

```sh
ngrok http 5678
```

- ngrok will provide a public URL that tunnels to your local n8n instance.

---

## 6. Automatically Send ngrok Public URL to Clay.com

If your ngrok URL changes (e.g., after restart), you can automatically notify Clay.com via a webhook.

### Steps:

1. **Install Node.js dependencies:**
   ```sh
   cd scripts
   npm install axios
   ```

2. **Edit the script `/scripts/send-ngrok-url-to-clay.js`:**
   - Replace `https://webhook.clay.com/YOUR_ENDPOINT` with your actual Clay webhook URL.

3. **Run the script:**
   ```sh
   node send-ngrok-url-to-clay.js
   ```

   - This will fetch the current ngrok public URL and send it to Clay.
   - You can run this script manually after starting ngrok, or automate it (e.g., with a cron job or by wrapping it in a loop).

4. **(Optional) Automate on URL Change:**
   - To keep Clay updated, you can run the script on a schedule or use a watcher to detect ngrok restarts.

---

## 7. Stopping and Restarting n8n

- **Stop n8n:**
  ```sh
  docker-compose down
  ```
- **Restart n8n:**
  ```sh
  docker-compose up -d
  ```

Your workflows and settings are saved in the `n8n_data` directory.

---

## 8. Updating n8n

To update to the latest n8n version:

```sh
docker-compose pull
docker-compose up -d
```

---

## 9. Troubleshooting

- **Check logs:**
  ```sh
  docker-compose logs n8n
  ```
- **Check if port 5678 is already in use:**  
  Make sure no other service is running on port 5678.

---

## 10. Security Notes

- Change the default username and password in the `docker-compose.yml` for production use.
- Consider using HTTPS and additional security measures if exposing n8n to the internet.

---

## 11. Useful Commands

| Action                  | Command                        |
|-------------------------|-------------------------------|
| Start n8n               | `docker-compose up -d`        |
| Stop n8n                | `docker-compose down`         |
| View logs               | `docker-compose logs n8n`     |
| Update n8n image        | `docker-compose pull`         |
| Restart n8n             | `docker-compose restart n8n`  |

---

**That's it!**  
You now have a portable, repeatable setup for running n8n with Docker Compose, and an automated way to notify Clay.com of your current ngrok public URL.