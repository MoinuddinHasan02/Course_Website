import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function VerifyResultPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  
  const certificate = await prisma.certificate.findUnique({
    where: { id }
  });

  if (!certificate) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg p-8 bg-card border border-red-500 shadow-lg rounded-2xl text-center">
          <div className="text-red-500 mb-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-500 mb-2">⚠ Invalid Certificate</h1>
          <p className="text-foreground mb-8">
            This certificate ID could not be verified in our registry. It may be invalid, expired, or fraudulent.
          </p>
          <Link href="/verify" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90">
            Verify Another
          </Link>
        </div>
      </div>
    );
  }

  const dateStr = new Date(certificate.issuedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl p-8 bg-card border border-green-500 shadow-lg rounded-2xl text-center">
        <div className="text-green-500 mb-4 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-500 mb-2">✓ Official Verification</h1>
        <p className="text-lg text-foreground mb-6">
          This certificate was securely issued by <strong>Aejaz Training</strong> to <strong className="text-xl block mt-2">{certificate.recipientName}</strong>
        </p>
        
        <div className="bg-muted p-4 rounded-lg text-left inline-block w-full mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground block">Course</span>
              <span className="font-semibold">{certificate.courseId}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground block">Date of Issue</span>
              <span className="font-semibold">{dateStr}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground block">Certificate ID</span>
              <span className="font-mono text-xs break-all">{certificate.id}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground block">Cryptographic Hash</span>
              <span className="font-mono text-xs break-all text-green-600 truncate block" title={certificate.certHash}>
                {certificate.certHash.substring(0, 16)}...
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href={`/api/certificates/generate/${certificate.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Digital Certificate
          </a>
          <Link href="/verify" className="border border-border text-foreground px-6 py-2 rounded-lg font-semibold hover:bg-muted/50">
            Verify Another
          </Link>
        </div>
      </div>
    </div>
  );
}
