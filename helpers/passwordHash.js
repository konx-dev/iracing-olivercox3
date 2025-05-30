export function hashPassword(username, password) {
  const textToHash = password + username.toLowerCase();

  const encoder = new TextEncoder();
  const data = encoder.encode(textToHash);

  // Compute the SHA-256 hash
  const hashBuffer = crypto.subtle.digest('SHA-256', data);

  // Convert the ArrayBuffer to Base64
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const binaryString = hashArray.map((byte) => String.fromCharCode(byte)).join('');
  const base64Hash = btoa(binaryString);

  return base64Hash;
}
