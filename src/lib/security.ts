import crypto from 'crypto';

const SALT = process.env.SERVER_SECRET_SALT || 'default_fallback_salt_never_use_in_prod';

export function generateHMAC(studentId: string, courseId: string): string {
  const data = `${studentId}:${courseId}`;
  return crypto.createHmac('sha256', SALT).update(data).digest('hex');
}

export function verifyHMAC(studentId: string, courseId: string, hash: string): boolean {
  const expectedHash = generateHMAC(studentId, courseId);
  return crypto.timingSafeEqual(Buffer.from(expectedHash, 'hex'), Buffer.from(hash, 'hex'));
}
