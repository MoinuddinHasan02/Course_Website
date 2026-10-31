import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = process.env.SERVER_SECRET_SALT || 'aejaz_training_prod_fallback_salt_2026_secure';
const key = new TextEncoder().encode(SECRET_KEY);

export type Role = 'ADMIN' | 'STUDENT';

export interface SessionPayload {
  userId: string;
  email: string;
  name?: string | null;
  role: Role;
  expires: string;
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function decrypt(input: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
