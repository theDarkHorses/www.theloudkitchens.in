import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Lato, Raleway } from "next/font/google";


const lato = Lato({
  variable: "--lato",
  weight: ["100", "300", "400", "700", "900"],
});
const raleway = Raleway({
  variable: "--raleway",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata = {
  title: 'TheLoudKitchens',
  description: 'Jai Sri Ram.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body  className={`${lato.variable} ${raleway.variable} container`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
