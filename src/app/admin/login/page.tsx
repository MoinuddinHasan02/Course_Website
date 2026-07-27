'use client';

import { useActionState } from 'react';
import { adminLogin } from '@/app/actions/admin';

export default function AdminLogin() {
  const [state, formAction, pending] = useActionState(adminLogin, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-xl border border-border shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-foreground">Admin Login</h1>
        
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              className="w-full p-2 rounded bg-background border border-border focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full p-2 rounded bg-background border border-border focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {state?.error && (
            <p className="text-red-500 text-sm">{state.error}</p>
          )}

          <button 
            type="submit" 
            disabled={pending}
            className="w-full bg-primary text-primary-foreground p-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {pending ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-xs text-center text-muted-foreground">
          Note: If no admin exists, the first login will create the admin account.
        </p>
      </div>
    </div>
  );
}
