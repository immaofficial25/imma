import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "__Secure-imma.marketer-token"
    : "imma.marketer-token";

function base64UrlEncode(buffer) {
  return buffer
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(input) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  return Buffer.from(padded + "=".repeat(padLength), "base64");
}

function timingSafeEqualStrings(a, b) {
  const aBuf = Buffer.from(String(a));
  const bBuf = Buffer.from(String(b));
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function getAuthSecret() {
  const secret = process.env.MARKETER_AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("Missing MARKETER_AUTH_SECRET (or NEXTAUTH_SECRET fallback)");
  }
  return secret;
}

export async function hashMarketerPassword(password) {
  const value = String(password ?? "");
  const salt = crypto.randomBytes(16);
  const iterations = 120000;
  const keyLen = 32;
  const digest = "sha256";

  const derivedKey = await new Promise((resolve, reject) => {
    crypto.pbkdf2(value, salt, iterations, keyLen, digest, (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });

  return [
    "pbkdf2_sha256",
    String(iterations),
    base64UrlEncode(salt),
    base64UrlEncode(derivedKey),
  ].join("$");
}

export async function verifyMarketerPassword(password, passwordHash) {
  const raw = String(passwordHash ?? "");
  const parts = raw.split("$");
  if (parts.length !== 4) return false;
  const [algo, iterRaw, saltB64, hashB64] = parts;
  if (algo !== "pbkdf2_sha256") return false;

  const iterations = Number(iterRaw);
  if (!Number.isFinite(iterations) || iterations < 1) return false;

  const salt = base64UrlDecode(saltB64);
  const expected = base64UrlDecode(hashB64);

  const value = String(password ?? "");
  const derivedKey = await new Promise((resolve, reject) => {
    crypto.pbkdf2(value, salt, iterations, expected.length, "sha256", (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });

  if (!(derivedKey instanceof Buffer)) return false;
  if (derivedKey.length !== expected.length) return false;
  return crypto.timingSafeEqual(derivedKey, expected);
}

export function createMarketerSessionToken({ marketerId, ttlDays = 14 }) {
  const now = Date.now();
  const exp = now + ttlDays * 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ marketerId: String(marketerId), exp });
  const payloadB64 = base64UrlEncode(Buffer.from(payload, "utf8"));
  const sig = crypto
    .createHmac("sha256", getAuthSecret())
    .update(payloadB64)
    .digest();
  const sigB64 = base64UrlEncode(sig);
  return { token: `${payloadB64}.${sigB64}`, exp };
}

export function verifyMarketerSessionToken(token) {
  if (typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;

  const expectedSig = base64UrlEncode(
    crypto.createHmac("sha256", getAuthSecret()).update(payloadB64).digest()
  );
  if (!timingSafeEqualStrings(sigB64, expectedSig)) return null;

  let payload;
  try {
    payload = JSON.parse(base64UrlDecode(payloadB64).toString("utf8"));
  } catch {
    return null;
  }

  if (!payload || typeof payload !== "object") return null;
  if (typeof payload.marketerId !== "string" || !payload.marketerId.trim()) return null;
  if (typeof payload.exp !== "number" || !Number.isFinite(payload.exp)) return null;
  if (Date.now() > payload.exp) return null;

  return { marketerId: payload.marketerId, exp: payload.exp };
}

export function setMarketerAuthCookie(response, { token, exp }) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(exp),
  });
}

export function clearMarketerAuthCookie(response) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function getMarketerSessionFromCookies() {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value ?? null;
  if (!raw) return null;
  return verifyMarketerSessionToken(raw);
}
