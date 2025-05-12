/**
 * Script: send-ngrok-url-to-clay.js
 * 
 * This script fetches the current ngrok public URL from the local ngrok API
 * and sends it to a Clay.com webhook endpoint, but only if the URL has changed
 * since the last time it was sent (to avoid duplicates).
 * 
 * Usage:
 *   1. Install dependencies: npm install axios
 *   2. Set your Clay webhook URL below.
 *   3. Run: node send-ngrok-url-to-clay.js
 * 
 * Optionally, run this script on a schedule or as a background process to
 * automatically update Clay whenever the ngrok URL changes.
 */

const axios = require("axios");
const fs = require("fs");
const path = require("path");

// File to store the last sent ngrok URL
const LAST_URL_FILE = path.join(__dirname, ".last_ngrok_url");

// TODO: Replace with your actual Clay webhook endpoint
const CLAY_WEBHOOK_URL = "https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-3fae6801-1f6f-4bec-b829-77132363e3ca";

// Get ngrok tunnel info
async function getNgrokUrl() {
  try {
    // Correct ngrok API endpoint
    const response = await axios.get("http://127.0.0.1:4040/api/tunnels");
    // Find the first public HTTP or HTTPS tunnel
    const tunnel = response.data.tunnels.find(
      t => t.public_url && (t.public_url.startsWith("http://") || t.public_url.startsWith("https://"))
    );
    if (!tunnel) {
      console.error("No active ngrok tunnels found.");
      return null;
    }
    return tunnel.public_url;
  } catch (err) {
    console.error("Error fetching ngrok URL:", err.message);
    return null;
  }
}

// Helper functions to manage the last sent URL
function getLastSentUrl() {
  try {
    if (fs.existsSync(LAST_URL_FILE)) {
      return fs.readFileSync(LAST_URL_FILE, "utf8").trim();
    }
  } catch (err) {
    console.error("Error reading last sent URL:", err.message);
  }
  return null;
}

function setLastSentUrl(url) {
  try {
    fs.writeFileSync(LAST_URL_FILE, url, "utf8");
  } catch (err) {
    console.error("Error writing last sent URL:", err.message);
  }
}

// Send the ngrok URL to Clay
async function notifyClay() {
  const url = await getNgrokUrl();
  if (!url) return;

  const lastUrl = getLastSentUrl();
  if (lastUrl === url) {
    console.log("ngrok URL unchanged, not sending to Clay.");
    return;
  }

  try {
    // Send the URL as a key-value pair in the JSON body
    await axios.post(CLAY_WEBHOOK_URL, { ngrok_url: url });
    setLastSentUrl(url);
    console.log("Sent to Clay:", url);
  } catch (err) {
    console.error("Error sending to Clay:", err.message);
  }
}

// Run once, or wrap in setInterval for periodic updates
notifyClay();
