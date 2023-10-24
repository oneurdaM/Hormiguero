import {Poppins} from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import SiteHeader from "@/(client-components)/(Header)/SiteHeader";
import FooterNav from "@/components/FooterNav";
import Footer from "@/components/Footer";
import {ReactQueryProvider} from "./react-query-provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300","400","500","600","700"],
});

export const metadata = {
  title: 'Centro Cultural El Hormiguero',
  description: 'Centro cultural El Hormiguero',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ReactQueryProvider>
          {/* <ClientCommons />*/}
          <SiteHeader />
          {children}
          <FooterNav />
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
