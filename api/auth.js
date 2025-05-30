import axios from 'axios';
import fs from 'fs';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

// Create a cookie jar instance
const cookieJar = new CookieJar();
const client = wrapper(axios.create({ jar: cookieJar }));

export async function authenticate() {
  try {
    await client.post(
      'https://members-ng.iracing.com/auth',
      { email: process.env.USER_EMAIL, password: process.env.USER_PW_HASH },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Save cookies to a file for persistence
    fs.writeFileSync('cookies.json', JSON.stringify(cookieJar.toJSON(), null, 2));
    console.log('Auth successful: Cookies saved successfully.');
  } catch (error) {
    console.error('Auth failed: ', error.response?.data || error.message);
  }
}
