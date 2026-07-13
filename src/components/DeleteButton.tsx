'use client';

import { useTransition } from 'react';

export function DeleteButton({ id, deleteAction }: { id: string, deleteAction: (id: string) => Promise<void> }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      startTransition(async () => {
        await deleteAction(id);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:underline text-sm disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
