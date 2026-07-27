import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Primavera P6 Training | Aejaz Training",
  description: "Master Real Project Planning, Scheduling & Delay Analysis in 45 Days with Mohammed Aejaz Ahmed.",
  keywords: ["Primavera P6", "Project Planning", "Scheduling", "Delay Analysis", "Construction Management", "Mohammed Aejaz Ahmed"],
  authors: [{ name: "Mohammed Aejaz Ahmed" }],
  openGraph: {
    title: "Primavera P6 Training | Aejaz Training",
    description: "Master Real Project Planning, Scheduling & Delay Analysis in 45 Days with Mohammed Aejaz Ahmed.",
    type: "website",
    url: "https://www.aejaz.in/", 
    siteName: "Aejaz Training",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primavera P6 Training | Aejaz Training",
    description: "Master Real Project Planning, Scheduling & Delay Analysis in 45 Days with Mohammed Aejaz Ahmed.",
  },
  verification: {
    google: "xFyd1QFT9XpfzDK1rD9zFPXULCS8oOIHcEhwvjua3Tg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Primavera P6 Training for Planning Engineers",
    "description": "Master Real Project Planning, Scheduling & Delay Analysis in 45-60 Days. Learn from a leading expert with ADNOC & Aramco project experience.",
    "provider": {
      "@type": "Organization",
      "name": "Aejaz Training",
      "sameAs": "https://www.linkedin.com/in/aejaz-ahmed-a4710472/"
    },
    "coursePrerequisites": "Basic understanding of projects",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT45D"
    },
    "offers": {
      "@type": "Offer",
      "category": "Paid"
    }
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans bg-background text-foreground antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
