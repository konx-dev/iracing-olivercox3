import { CookieJar } from 'tough-cookie';
import fs from 'fs';

export function loadCookies(filePath = 'cookies.json') {
  let cookieJar = new CookieJar();
  try {
    const savedCookies = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    cookieJar = CookieJar.fromJSON(savedCookies);
  } catch (error) {
    console.error('No stored cookies found. Please authenticate first. ', error);
  }
  return cookieJar;
}
