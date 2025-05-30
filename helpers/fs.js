import fs from 'fs';
import { authenticate } from '@/api/auth';

export function checkFileAge(file) {
  if (fs.existsSync(file)) {
    // cookies file exists, check here.
    const stats = fs.statSync(file);

    const birthTime = stats.birthtime;

    const currentTime = new Date();

    // Calculate file age in milliseconds
    const fileAgeMs = currentTime - birthTime;
    const sixHoursMs = 1 * 60 * 60 * 1000; // Convert 1 hour to milliseconds

    if (fileAgeMs > sixHoursMs) {
      console.log('File is older than 6 hours, taking action.');
      // delete file
      fs.unlinkSync(file);

      // perform authentication
      authenticate();

      // exit
      return true;
    } else {
      console.log('File is recent, nothing to action.');
      return true;
    }
  } else {
    // no file found, return false and authenticate

    console.log('no file found, authentication required.');

    authenticate();

    return true;
  }
}
