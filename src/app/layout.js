import { Sniglet } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { Analytics } from "@vercel/analytics/react";
import { stackServerApp } from "@/stack";
import "./globals.sass";
import { UserButton } from '@stackframe/stack';
import { SpeedInsights } from "@vercel/speed-insights/next"
import 'bulma/css/bulma.min.css';

export const metadata = {
  title: "Tacktile",
  description: "A Fun Todo App",
};

const sniglet = Sniglet({
    weight: '400',
    subsets: ['latin']
});

export default async function RootLayout({ children }) {
    const user = await stackServerApp.getUser();

    return (
    <html lang="en">
      <body className={sniglet.className}>
      <SpeedInsights />
        <StackProvider app={stackServerApp}>
            <StackTheme>
              <nav className="level">
                <h1 className="level-left">
                    <a href="/" name="Home">Tacktile<img className="tack" src="/tack.png" alt="Tack" /></a>
                </h1>
                <div className="login level-right">
                    <div className="level-item">
                        <UserButton/>
                        Hi, {user?.displayName || 'friend'}!
                    </div>
                </div>
              </nav>
              {children}
              <Analytics />
            </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
