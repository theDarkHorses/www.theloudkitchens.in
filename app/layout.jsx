import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Lato, Raleway } from "next/font/google";
import Footer from './components/Footer';
import ReduxProvider from './store/provider';
import ToastProvider from './components/ToastProvider';
import NextTopLoader from 'nextjs-toploader';

const lato = Lato({
  variable: "--lato",
  subsets: ["latin-ext", "latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap"
});

const raleway = Raleway({
  variable: "--raleway",
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
});

export const metadata = {
  title: 'TheLoudKitchens',
  description: 'The Loud Kitchens is a cloud kitchens startup initiated by the students of nit srinagar.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className=' overflow-hidden scroll-smooth'>
        <body className={`${lato.variable} ${raleway.variable} h-[calc(100vh_-_62px)] pb-[58px] no-scrollbar overflow-x-hidden overflow-y-scroll  bg-app`}>
          <NextTopLoader color="#ac2323"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3.5}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #ac2323,0 0 5px #ac2323"
          />
          <ReduxProvider>
            <ToastProvider >
              {children}
              <Footer />
            </ToastProvider>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
