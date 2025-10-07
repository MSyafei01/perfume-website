    import Link from 'next/link';
    import { COMPANY_INFO, SOCIAL_LINKS } from '@/data/constants';

    const Footer = () => {
    return (
        <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-accent to-yellow-400 rounded-full"></div>
                <span className="text-xl font-bold">Luxury<span className="text-accent">Perfume</span></span>
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                Menyediakan koleksi parfum premium ternama dengan kualitas terbaik dan harga kompetitif. 
                Temukan aroma yang sempurna untuk setiap momen berharga Anda.
                </p>
                <div className="flex space-x-4">
                <a href={SOCIAL_LINKS.whatsapp} className="text-gray-300 hover:text-accent transition-colors">
                    WhatsApp
                </a>
                <a href={SOCIAL_LINKS.tiktok} className="text-gray-300 hover:text-accent transition-colors">
                    TikTok
                </a>
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-accent transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-accent transition-colors">About</Link></li>
                <li><Link href="/products" className="text-gray-300 hover:text-accent transition-colors">Produk</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact</Link></li>
                </ul>
            </div>

            {/* Contact Info */}
            <div>
                <h3 className="font-semibold mb-4">Kontak</h3>
                <ul className="space-y-2 text-gray-300">
                <li>{COMPANY_INFO.phone}</li>
                <li>{COMPANY_INFO.email}</li>
                <li>{COMPANY_INFO.address}</li>
                </ul>
            </div>
            </div>

            <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Luxury Perfume Collection. All rights reserved | Collaboration SYABAQI.</p>
            </div>
        </div>
        </footer>
    );
    };

    export default Footer;