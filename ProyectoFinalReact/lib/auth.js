import { createHmac, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { cookies } from 'next/headers';

const scryptAsync = promisify(scrypt);
const COOKIE_NAME = 'session';

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = await scryptAsync(password, salt, 64);
  return `${salt}:${hash.toString('hex')}`;
}

export async function verifyPassword(password, stored) {
  try {
    const [salt, hash] = stored.split(':');
    const buf = await scryptAsync(password, salt, 64);
    return buf.toString('hex') === hash;
  } catch {
    return false;
  }
}

function sign(data) {
  return createHmac('sha256', process.env.AUTH_SECRET).update(data).digest('base64url');
}

export function createToken(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${data}.${sign(data)}`;
}

export function verifyToken(token) {
  try {
    const dot = token.lastIndexOf('.');
    const data = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    if (sign(data) !== sig) return null;
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function sessionCookieOptions(remember = false) {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    ...(remember ? { maxAge: 86400 } : {}),
    secure: process.env.NODE_ENV === 'production',
  };
}
