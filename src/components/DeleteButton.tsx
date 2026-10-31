'use client';

import { useTransition } from 'react';
import { deleteCertificate } from '@/app/actions/admin';

export function DeleteButton({
  id,
  deleteAction = deleteCertificate,
}: {
  id: string;
  deleteAction?: (id: string) => Promise<void>;
}) {
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
      className="text-red-400 hover:text-red-300 hover:underline text-[11px] disabled:opacity-50 cursor-pointer"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
