// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Lester John Evangelista | Portfolio",
  description: "Personal portfolio website showcasing projects, skills, and contact information.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
