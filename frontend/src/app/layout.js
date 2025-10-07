    import { Inter } from 'next/font/google'
    import './globals.css'

    const inter = Inter({ subsets: ['latin'] })

    export const metadata = {
    title: 'Luxury Perfume Collection - Parfum Premium Terlengkap',
    description: 'Temukan koleksi parfum premium ternama dengan harga terbaik. Chanel, Dior, Tom Ford, dan banyak lagi.',
    keywords: 'parfum, perfume, luxury, chanel, dior, tom ford, beli parfum',
    }

    export default function RootLayout({ children }) {
    return (
        <html lang="id">
        <body className={inter.className}>
            {children}
        </body>
        </html>
    )
    }