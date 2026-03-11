#!/usr/bin/env node --input-type=module

/**
 * 【MCS_Web】LINE Notification Script
 * Sends push messages to the owner via Yuzu-san LINE bot.
 *
 * Usage:
 *   node scripts/line-notify.js "你的訊息內容"
 *   node scripts/line-notify.js "標題" "詳細內容"
 *
 * Environment variables (from .env.local):
 *   LINE_CHANNEL_ACCESS_TOKEN - Yuzu-san bot channel access token
 *   OWNER_LINE_USER_ID - Owner's LINE user ID
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Load .env.local
function loadEnv() {
  try {
    const envPath = resolve(__dirname, "..", ".env.local");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env.local not found, rely on process.env
  }
}

loadEnv();

const TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const USER_ID = process.env.OWNER_LINE_USER_ID;

if (!TOKEN || !USER_ID) {
  console.error("Missing LINE_CHANNEL_ACCESS_TOKEN or OWNER_LINE_USER_ID");
  process.exit(1);
}

async function sendLineMessage(text) {
  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      to: USER_ID,
      messages: [{ type: "text", text }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LINE API error ${res.status}: ${err}`);
  }
  return true;
}

async function sendFlexMessage(title, body) {
  const flex = {
    type: "flex",
    altText: `【MCS_Web】${title}`,
    contents: {
      type: "bubble",
      size: "mega",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "【MCS_Web】",
            color: "#E8751A",
            size: "sm",
            weight: "bold",
          },
          {
            type: "text",
            text: title,
            weight: "bold",
            size: "lg",
            margin: "sm",
            wrap: true,
          },
        ],
        backgroundColor: "#0F2440",
        paddingAll: "16px",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: body,
            wrap: true,
            size: "sm",
            color: "#333333",
          },
        ],
        paddingAll: "16px",
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: `${new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}`,
            size: "xs",
            color: "#999999",
            align: "end",
          },
        ],
        paddingAll: "12px",
      },
      styles: {
        header: {
          backgroundColor: "#0F2440",
        },
      },
    },
  };

  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      to: USER_ID,
      messages: [flex],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LINE API error ${res.status}: ${err}`);
  }
  return true;
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node scripts/line-notify.js "message"');
  console.log('       node scripts/line-notify.js "title" "body"');
  process.exit(0);
}

try {
  if (args.length === 1) {
    // Simple text with 【MCS_Web】 prefix
    await sendLineMessage(`【MCS_Web】${args[0]}`);
  } else {
    // Flex message with title + body
    await sendFlexMessage(args[0], args[1]);
  }
  console.log("LINE notification sent successfully!");
} catch (err) {
  console.error("Failed to send LINE notification:", err.message);
  process.exit(1);
}
