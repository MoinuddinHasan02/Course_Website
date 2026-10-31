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

    // 1. Generate QR Code pointing to the verification page
    // In production, force the domain to https://www.aejaz.in
    const host = request.headers.get('host') || 'www.aejaz.in';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (host.includes('aejaz.in') ? `https://${host}` : 'https://www.aejaz.in');
    const verifyUrl = `${baseUrl}/verify/${id}`;
    
    // High-correction QR code, 1-module margin so it sits neatly in the template's box
    const qrCodeDataUrl = await QRCode.toDataURL(verifyUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 250,
      color: {
        dark: '#0a1628',
        light: '#ffffff'
      }
    });

    // 2. Load the navy & gold certificate template
    const templatePath = path.join(process.cwd(), 'public', 'certificate-template.png');
    
    // The certificate layout is calibrated for 935pt x 683pt landscape
    const pageWidth = 935;
    const pageHeight = 683;
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    
    // Standard PDF fonts
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // Embed template background
    if (fs.existsSync(templatePath)) {
      const templateImageBytes = fs.readFileSync(templatePath);
      const templateImage = await pdfDoc.embedPng(templateImageBytes);
      page.drawImage(templateImage, {
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
      });
    }

    // Colors matching the certificate template
    const gold = rgb(0.85, 0.65, 0.18);        // Rich gold #D9A62E
    const navyBlue = rgb(0.039, 0.086, 0.157);  // Deep navy #0a1628

    const centerX = (text: string, font: typeof helveticaBold, fontSize: number, frameX: number, frameW: number) => {
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      return frameX + (frameW - textWidth) / 2;
    };

    // ── 1. "AEJAZ TRAINING" (below top "A" logo) ──
    const aejazText = 'A E J A Z   T R A I N I N G';
    const aejazSize = 10;
    page.drawText(aejazText, {
      x: centerX(aejazText, helveticaBold, aejazSize, 0, pageWidth),
      y: 554,
      size: aejazSize,
      font: helveticaBold,
      color: gold,
    });

    // ── 2. "Certificate of Completion" ──
    const certTitle = 'Certificate of Completion';
    const certTitleSize = 40;
    page.drawText(certTitle, {
      x: centerX(certTitle, timesRomanBold, certTitleSize, 0, pageWidth),
      y: 502,
      size: certTitleSize,
      font: timesRomanBold,
      color: navyBlue,
    });

    // ── 3. "PRIMAVERA P6 TRAINING PROGRAM" ──
    const programText = 'P R I M A V E R A   P 6   T R A I N I N G   P R O G R A M';
    const programSize = 8.5;
    page.drawText(programText, {
      x: centerX(programText, helveticaBold, programSize, 0, pageWidth),
      y: 462,
      size: programSize,
      font: helveticaBold,
      color: gold,
    });

    // ── 4. "THIS CERTIFICATE IS PROUDLY PRESENTED TO" ──
    const presentedText = 'THIS CERTIFICATE IS PROUDLY PRESENTED TO';
    const presentedSize = 9.5;
    page.drawText(presentedText, {
      x: centerX(presentedText, helvetica, presentedSize, 0, pageWidth),
      y: 444,
      size: presentedSize,
      font: helvetica,
      color: gold,
    });

    // ── 5. RECIPIENT NAME (centered between the gold divider lines) ──
    const nameText = certificate.recipientName;
    const nameSize = 34;
    page.drawText(nameText, {
      x: centerX(nameText, timesRomanBold, nameSize, 0, pageWidth),
      y: 395,
      size: nameSize,
      font: timesRomanBold,
      color: navyBlue,
    });

    // ── 6. Description with "Primavera P6 Training for Planning Engineers" BOLD ──
    const descSize = 9;
    const desc1Part1 = 'for successfully completing the ';
    const desc1Part2 = 'Primavera P6 Training for Planning Engineers';
    const desc1Part3 = 'program \u2014';
    
    const spaceW = helvetica.widthOfTextAtSize(' ', descSize) * 1.4; // Clean readable word space
    const w1 = helvetica.widthOfTextAtSize(desc1Part1, descSize);
    const w2 = helveticaBold.widthOfTextAtSize(desc1Part2, descSize);
    const w3 = helvetica.widthOfTextAtSize(desc1Part3, descSize);
    const line1TotalW = w1 + w2 + spaceW + w3;
    const line1StartX = (pageWidth - line1TotalW) / 2;

    page.drawText(desc1Part1, {
      x: line1StartX,
      y: 345,
      size: descSize,
      font: helvetica,
      color: gold,
    });
    page.drawText(desc1Part2, {
      x: line1StartX + w1,
      y: 345,
      size: descSize,
      font: helveticaBold,
      color: gold,
    });
    page.drawText(desc1Part3, {
      x: line1StartX + w1 + w2 + spaceW,
      y: 345,
      size: descSize,
      font: helvetica,
      color: gold,
    });

    const desc2 = 'covering project planning, scheduling, resource & cost loading, progress tracking, and delay';
    page.drawText(desc2, {
      x: centerX(desc2, helvetica, descSize, 0, pageWidth),
      y: 328,
      size: descSize,
      font: helvetica,
      color: gold,
    });

    const desc3 = 'analysis \u2014 with hands-on exposure to real EPC and Oil & Gas project scenarios.';
    page.drawText(desc3, {
      x: centerX(desc3, helvetica, descSize, 0, pageWidth),
      y: 311,
      size: descSize,
      font: helvetica,
      color: gold,
    });

    // ── 7. Pill badges text (inside the 3 navy pills) ──
    const pillSize = 7.5;
    const pillY = 258;
    const pill1Text = 'EPC FOCUSED';
    page.drawText(pill1Text, {
      x: centerX(pill1Text, helveticaBold, pillSize, 248, 132),
      y: pillY,
      size: pillSize,
      font: helveticaBold,
      color: gold,
    });

    const pill2Text = 'OIL & GAS CASE STUDIES';
    page.drawText(pill2Text, {
      x: centerX(pill2Text, helveticaBold, pillSize, 401, 132),
      y: pillY,
      size: pillSize,
      font: helveticaBold,
      color: gold,
    });

    const pill3Text = '45\u201360 DAY PROGRAM';
    page.drawText(pill3Text, {
      x: centerX(pill3Text, helveticaBold, pillSize, 554, 133),
      y: pillY,
      size: pillSize,
      font: helveticaBold,
      color: gold,
    });

    // ── 8. Trainer signature area (bottom left) ──
    const trainerName = 'Mohammed Aejaz Ahmed';
    const trainerNameSize = 11.5;
    page.drawText(trainerName, {
      x: centerX(trainerName, helveticaBold, trainerNameSize, 105.6, 210.7),
      y: 135,
      size: trainerNameSize,
      font: helveticaBold,
      color: gold,
    });

    const trainerTitle = 'Trainer \u2022 Planning & Project Control Engineer';
    const trainerTitleSize = 7.5;
    page.drawText(trainerTitle, {
      x: centerX(trainerTitle, helvetica, trainerTitleSize, 105.6, 210.7),
      y: 120,
      size: trainerTitleSize,
      font: helvetica,
      color: gold,
    });

    const websiteText = 'www.aejaz.in';
    const websiteSize = 9.5;
    page.drawText(websiteText, {
      x: centerX(websiteText, helveticaBold, websiteSize, 105.6, 210.7),
      y: 72,
      size: websiteSize,
      font: helveticaBold,
      color: gold,
    });

    // ── 9. CERTIFICATE ID & ISSUED ON (directly BELOW the A*** seal badge) ──
    const certIdText = `CERTIFICATE ID:  ${certificate.courseId}`;
    const certIdSize = 9.5;
    page.drawText(certIdText, {
      x: centerX(certIdText, helveticaBold, certIdSize, 0, pageWidth),
      y: 86,
      size: certIdSize,
      font: helveticaBold,
      color: gold,
    });

    const dateStr = new Date(certificate.issuedAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
    const issuedText = `ISSUED ON  ${dateStr}`;
    const issuedSize = 8.5;
    page.drawText(issuedText, {
      x: centerX(issuedText, helvetica, issuedSize, 0, pageWidth),
      y: 70,
      size: issuedSize,
      font: helvetica,
      color: gold,
    });

    // ── 10. QR CODE (fits perfectly inside the rounded square box) ──
    // Template box bounds: x=[723.33, 808.77] (w=85.44), y=[102.95, 188.39] (h=85.44)
    const qrImageBytes = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    const qrSize = 74;
    const qrX = 723.33 + (85.44 - qrSize) / 2; // = 729.05
    const qrY = 102.95 + (85.44 - qrSize) / 2; // = 108.67
    
    page.drawImage(qrImage, {
      x: qrX,
      y: qrY,
      width: qrSize,
      height: qrSize,
    });

    // "SCAN TO VERIFY" (centered above the box)
    const scanText = 'SCAN TO VERIFY';
    const scanSize = 6.5;
    page.drawText(scanText, {
      x: centerX(scanText, helveticaBold, scanSize, 723.33, 85.44),
      y: 195.5,
      size: scanSize,
      font: helveticaBold,
      color: gold,
    });

    // "Verify: <uuid>" (centered below the box)
    const verifyText = `Verify: ${certificate.id}`;
    const verifySize = 5.5;
    page.drawText(verifyText, {
      x: centerX(verifyText, helvetica, verifySize, 723.33 - 25, 85.44 + 50),
      y: 89,
      size: verifySize,
      font: helvetica,
      color: gold,
    });

    // ── 11. PDF Metadata ──
    pdfDoc.setTitle(`Certificate of Completion - ${certificate.recipientName}`);
    pdfDoc.setAuthor('Aejaz Training');
    pdfDoc.setSubject(certificate.courseId);
    pdfDoc.setKeywords([certificate.id, certificate.certHash, 'VERIFIED']);

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
