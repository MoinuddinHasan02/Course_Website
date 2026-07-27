import { prisma } from '@/lib/prisma';
import { adminLogout, issueCertificate, deleteCertificate } from '@/app/actions/admin';
import Link from 'next/link';
import { DeleteButton } from '@/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <form action={adminLogout}>
            <button type="submit" className="bg-red-500/10 text-red-500 px-4 py-2 rounded hover:bg-red-500/20 transition-colors">
              Logout
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-card p-6 rounded-xl border border-border shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">Issue Certificate</h2>
            <form action={issueCertificate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Recipient Name</label>
                <input type="text" name="recipientName" required className="w-full p-2 rounded bg-background border border-border" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Student ID / Roll No</label>
                <input type="text" name="studentId" required className="w-full p-2 rounded bg-background border border-border" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Course ID</label>
                <input type="text" name="courseId" defaultValue="PRIMAVERA-P6" required className="w-full p-2 rounded bg-background border border-border" />
              </div>

              <button type="submit" className="w-full bg-primary text-primary-foreground p-2 rounded hover:bg-primary/90">
                Generate & Issue
              </button>
            </form>
          </div>

          <div className="md:col-span-2 bg-card p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Issued Certificates</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4">Recipient</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4">Issued On</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-muted-foreground">No certificates issued yet.</td>
                    </tr>
                  )}
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 px-4">{cert.recipientName}</td>
                      <td className="py-3 px-4">{cert.courseId}</td>
                      <td className="py-3 px-4">{new Date(cert.issuedAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4 flex flex-wrap gap-3 items-center">
                        <Link href={`/verify/${cert.id}`} target="_blank" className="text-blue-500 hover:underline text-sm">
                          Verify
                        </Link>
                        <a href={`/api/certificates/generate/${cert.id}`} target="_blank" className="text-primary hover:underline text-sm">
                          Download PDF
                        </a>
                        <Link href={`/admin/edit/${cert.id}`} className="text-amber-500 hover:underline text-sm">
                          Edit
                        </Link>
                        <DeleteButton id={cert.id} deleteAction={deleteCertificate} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
