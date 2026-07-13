'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const [certId, setCertId] = useState('');
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      router.push(`/verify/${certId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-card border border-border shadow-lg rounded-2xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-foreground">Verify Certificate</h1>
        <p className="text-muted-foreground mb-8">
          Enter the unique Certificate ID to verify its authenticity in our global registry.
        </p>

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="e.g. f81d4fae-7dec-11d0-a765-00a0c91e6bf6"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground p-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Verify Authenticity
          </button>
        </form>
      </div>
    </div>
  );
}
