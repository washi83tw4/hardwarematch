import "./globals.css";

export const metadata = {
  title: "HardwareMatch Pro",
  description: "Montagem Automática e Validação de Compatibilidade de PC em Tempo Real",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}