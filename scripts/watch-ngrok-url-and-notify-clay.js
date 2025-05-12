/**
 * watch-ngrok-url-and-notify-clay.js
 * 
 * Watches the ngrok public URL and notifies Clay.com via webhook
 * whenever the URL changes.
 * 
 * Usage:
 *   1. npm install axios
 *   2. node watch-ngrok-url-and-notify-clay.js
 */

const axios = require("axios");

// Replace with your actual Clay webhook endpoint
const CLAY_WEBHOOK_URL = "https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-3fae6801-1f6f-4bec-b829-77132363e3ca";
const NGROK_API_URL = "http://localhost:5678";
const POLL_INTERVAL_MS = 10000; // 10 seconds

let lastUrl = null;

async function getNgrokUrl() {
  try {
    const response = await axios.get(NGROK_API_URL);
    const tunnel = response.data.tunnels.find(t => t.public_url && (t.public_url.startsWith("http://") || t.public_url.startsWith("https://")));
    return tunnel ? tunnel.public_url : null;
  } catch (err) {
    return null;
  }
}

async function notifyClay(url) {
  try {
    await axios.post(CLAY_WEBHOOK_URL, { ngrok_url: url });
    console.log(`[${new Date().toISOString()}] Sent to Clay: ${url}`);
  } catch (err) {
    console.error("Error sending to Clay:", err.message);
  }
}

async function watchNgrokUrl() {
  setInterval(async () => {
    const url = await getNgrokUrl();
    if (url && url !== lastUrl) {
      await notifyClay(url);
      lastUrl = url;
    }
  }, POLL_INTERVAL_MS);
}

console.log("Watching ngrok public URL...");
watchNgrokUrl();