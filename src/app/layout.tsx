import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { ClientLayout } from "@/components/layout/client-layout";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Premium Eyewear in Lebanon`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "eyewear",
    "optical",
    "sunglasses",
    "eyeglasses",
    "contact lenses",
    "Bickfaya",
    "Lebanon",
    "Chidiac Optic",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
