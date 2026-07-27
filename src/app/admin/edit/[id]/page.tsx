import { prisma } from '@/lib/prisma';
import { updateCertificate } from '@/app/actions/admin';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  
  const certificate = await prisma.certificate.findUnique({
    where: { id }
  });

  if (!certificate) {
    notFound();
  }

  const updateCertificateWithId = updateCertificate.bind(null, id);

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold border-l-2 border-border pl-4">Edit Certificate</h1>
        </div>

        <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
          <form action={updateCertificateWithId} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Certificate ID (UUID)</label>
              <input type="text" disabled value={certificate.id} className="w-full p-2 rounded bg-muted border border-border text-muted-foreground cursor-not-allowed" />
              <p className="text-xs text-muted-foreground mt-1">UUIDs cannot be modified once generated.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Recipient Name</label>
              <input type="text" name="recipientName" defaultValue={certificate.recipientName} required className="w-full p-2 rounded bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-shadow" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Student ID / Roll No</label>
              <input type="text" name="studentId" defaultValue={certificate.studentId} required className="w-full p-2 rounded bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-shadow" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Course ID</label>
              <input type="text" name="courseId" defaultValue={certificate.courseId} required className="w-full p-2 rounded bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-shadow" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Date of Issue</label>
              <input type="date" name="issuedAt" defaultValue={certificate.issuedAt.toISOString().split('T')[0]} required className="w-full p-2 rounded bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-shadow" />
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <Link href="/admin" className="px-6 py-2 rounded font-medium border border-border hover:bg-muted/50 transition-colors">
                Cancel
              </Link>
              <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded font-medium hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
