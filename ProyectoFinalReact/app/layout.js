import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import BootstrapBundle from "@/components/BootstrapBundle";

export const metadata = {
  title: "Portfolio Eneas Menéndez",
  description: "Portfolio profesional de Eneas Menéndez",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div id="page-wrapper">
          {children}
        </div>
        <BootstrapBundle />
      </body>
    </html>
  );
}