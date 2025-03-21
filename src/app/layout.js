import { Sniglet } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { Analytics } from "@vercel/analytics/react";
import { stackServerApp } from "@/stack";
import "./globals.css";
import { UserButton } from '@stackframe/stack';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
    const user = await stackServerApp.getUser();

    return (
    <html lang="en">
      <body>
      <SpeedInsights />
      <StackProvider app={stackServerApp}><StackTheme>
          <nav>
              <UserButton/>
              Hi, {user?.displayName || 'friend'}!
          </nav>
          {children}
          <Analytics />
      </StackTheme></StackProvider></body>
    </html>
  );
}
