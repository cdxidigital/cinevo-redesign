import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = path.dirname(fileURLToPath(import.meta.url));
const PORT = 48185;

function start() {
  const child = spawn(process.execPath, [path.join(root, "index.cjs"), "--no-open"], {
    env: { ...process.env, CINEVO_NODE_PORT: String(PORT) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  return child;
}

async function waitReady(child) {
  let buf = "";
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("node did not start")), 8000);
    child.stdout.on("data", (c) => {
      buf += c.toString();
      if (buf.includes("Pairing code:")) {
        clearTimeout(t);
        const m = /Pairing code: ([A-Z0-9-]+)/.exec(buf);
        resolve(m ? m[1] : "");
      }
    });
    child.stderr.on("data", (c) => {
      buf += c.toString();
    });
    child.on("exit", (code) => reject(new Error(`exited ${code}: ${buf}`)));
  });
}

test("loopback health, pair, and 401 without bearer", async (t) => {
  const child = start();
  t.after(() => child.kill("SIGTERM"));
  const code = await waitReady(child);
  const base = `http://127.0.0.1:${PORT}`;

  const health = await (await fetch(`${base}/health`)).json();
  assert.equal(health.ok, true);
  assert.equal(health.loopback, true);

  const denied = await fetch(`${base}/v1/status`);
  assert.equal(denied.status, 401);

  const bad = await fetch(`${base}/v1/pair`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: "NOPE-00" }),
  });
  assert.equal(bad.status, 401);

  const pair = await fetch(`${base}/v1/pair`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  assert.equal(pair.status, 200);
  const session = await pair.json();
  assert.ok(session.token);

  const status = await fetch(`${base}/v1/status`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  assert.equal(status.status, 200);
  const body = await status.json();
  assert.ok(body.deviceId);
  assert.ok(Array.isArray(body.connections));
  const pairPlain = await fetch(`${base}/v1/pair`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: code.replace("-", "") }),
  });
  // First pair already rotated the code; a second pair with the old code must fail.
  assert.equal(pairPlain.status, 401);
});

