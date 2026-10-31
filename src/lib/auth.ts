import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { encrypt, decrypt, SessionPayload, Role } from './jwt';

export { encrypt, decrypt };
export type { SessionPayload, Role };

export async function createSession(user: { id: string; email: string; name?: string | null; role: Role }) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days session
  const session = await encrypt({
    userId: user.id,
    email: user.email,
    name: user.name || '',
    role: user.role,
    expires: expires.toISOString(),
  });

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

// Backward-compatible alias for existing code
export async function login(userId: string, email = 'admin@aejaz.in', role: Role = 'ADMIN') {
  await createSession({ id: userId, email, role });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('session', '', {
    expires: new Date(0),
    path: '/',
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await requireAuth();
  if (session.role !== 'ADMIN') {
    redirect('/student');
  }
  return session;
}

export async function requireStudent(): Promise<SessionPayload> {
  const session = await requireAuth();
  return session;
}
