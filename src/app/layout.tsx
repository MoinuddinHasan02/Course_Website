import type { Metadata } from "next";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <ScrollProgress />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
