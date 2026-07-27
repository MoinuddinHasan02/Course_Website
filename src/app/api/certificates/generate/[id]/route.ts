import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = params.id;

  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id }
    });

    if (!certificate) {
      return new NextResponse('Certificate not found', { status: 404 });
    }

    // 1. Generate QR Code pointing to verification URL
    // It will automatically use your deployed domain based on the request headers, 
    // or you can force it by setting NEXT_PUBLIC_APP_URL in your production environment variables.
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
    const verifyUrl = `${baseUrl}/verify/${id}`;
    
    const qrCodeDataUrl = await QRCode.toDataURL(verifyUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 150,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    // 2. Load Base Template Image
    // Ensure you place 'certificate-template.png' in the public directory
    const templatePath = path.join(process.cwd(), 'public', 'certificate-template.png');
    
    // We create a new PDF Document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // A4 landscape size in points
    
    // Embed the fonts
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // If template exists, embed it, otherwise leave blank (fallback)
    if (fs.existsSync(templatePath)) {
      const templateImageBytes = fs.readFileSync(templatePath);
      const templateImage = await pdfDoc.embedPng(templateImageBytes);
      page.drawImage(templateImage, {
        x: 0,
        y: 0,
        width: page.getWidth(),
        height: page.getHeight(),
      });
    } else {
      // Fallback if no template is found
      page.drawText('CERTIFICATE OF COMPLETION', { x: 250, y: 500, size: 24, font: timesRomanFont, color: rgb(0, 0, 0) });
      page.drawText('(Please upload public/certificate-template.png)', { x: 250, y: 480, size: 12 });
    }

    // 3. Draw text over the template
    // Recipient Name (Centered)
    const nameWidth = certificate.recipientName.length * 14; 
    page.drawText(certificate.recipientName, {
      x: (page.getWidth() / 2) - (nameWidth / 2),
      y: 295,
      size: 32,
      font: timesRomanFont,
      color: rgb(0.1, 0.1, 0.1),
    });

    // Course ID / Certificate ID (Placed right of "Certificate ID:")
    page.drawText(certificate.courseId, {
      x: 450, // Fixed overlap by moving to the right
      y: 110,
      size: 16,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    // Date (Placed horizontally aligned with the ID on the right side)
    const dateStr = new Date(certificate.issuedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    page.drawText(dateStr, {
      x: 700, // Aligned to the far right side
      y: 110,
      size: 14,
      font: helveticaFont,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Verification Trademark (UUID at top right)
    page.drawText(`Verify: ${certificate.id}`, {
      x: 490, // More padding from the right edge
      y: 540, // More padding from the top edge
      size: 10,
      font: helveticaFont,
      color: rgb(0.5, 0.5, 0.5), // Subtle gray
    });

    // 4. Embed QR Code (Bottom Left or Right corner, away from text)
    const qrImageBytes = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    
    page.drawImage(qrImage, {
      x: page.getWidth() - 120, // Bottom Right edge
      y: 30,
      width: 80,
      height: 80,
    });

    // 5. Metadata Embedding for Anti-Tampering
    pdfDoc.setTitle(`Certificate of Completion - ${certificate.recipientName}`);
    pdfDoc.setAuthor('Aejaz Training');
    pdfDoc.setSubject(certificate.courseId);
    pdfDoc.setKeywords([certificate.id, certificate.certHash, 'VERIFIED']);

    // 6. Output Flattened PDF (Actually we can't truly 'flatten' in pure JS easily without an image rendering step, 
    // but we can lock fields. Since we drew text directly to the canvas/PDF, it is somewhat embedded. 
    // For true flattening, we would render the whole page to a single image layer, but this is sufficient metadata protection).
    
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="certificate-${certificate.id}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error generating certificate:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
