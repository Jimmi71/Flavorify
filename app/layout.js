import Nav from "@/components/Nav";
import ToastProvider from "@/providers/ToastProvider";
import "@/styles/globals.css";
import SessionProviderContext from "@/providers/SessionProviderContext";
import ReduxProvider from "@/providers/ReduxProvider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Flavorify",
  description: "Every bite is a flavor adventure",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProviderContext>
          <ReduxProvider>
            <ToastProvider />
            <Nav />
            <div className="flex-1">{children}</div>
            <Footer />
          </ReduxProvider>
        </SessionProviderContext>
      </body>
    </html>
  );
}
