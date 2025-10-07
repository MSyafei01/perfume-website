    'use client';
    import { motion } from 'framer-motion';
    import { COMPANY_INFO, SOCIAL_LINKS } from '@/data/constants';

    const SocialLinks = () => {
    const contactMethods = [
        {
        name: 'WhatsApp',
        description: 'Konsultasi & Pemesanan',
        value: COMPANY_INFO.phone,
        link: SOCIAL_LINKS.whatsapp,
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
            </svg>
        ),
        color: 'bg-green-500 hover:bg-green-600'
        },
        {
        name: 'TikTok Shop',
        description: 'Beli via TikTok Shop',
        value: COMPANY_INFO.tiktok,
        link: SOCIAL_LINKS.tiktok,
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
        ),
        color: 'bg-black hover:bg-gray-800'
        },
        {
        name: 'Email',
        description: 'Info & Kerjasama',
        value: COMPANY_INFO.email,
        link: SOCIAL_LINKS.email,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: 'bg-blue-500 hover:bg-blue-600'
        }
    ];

    return (
        <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
        >
        <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Kontak Kami</h2>
            <p className="text-text mb-8">
            Hubungi kami melalui berbagai platform yang tersedia. 
            Tim customer service kami siap membantu Anda 24/7.
            </p>
        </div>

        <div className="space-y-4">
            {contactMethods.map((method, index) => (
            <motion.a
                key={method.name}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center p-4 rounded-xl text-white ${method.color} transition-all duration-300 hover-lift shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
            >
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mr-4">
                {method.icon}
                </div>
                <div className="flex-1">
                <h3 className="font-semibold text-lg">{method.name}</h3>
                <p className="text-white/90 text-sm">{method.description}</p>
                <p className="text-white/80 text-sm mt-1">{method.value}</p>
                </div>
            </motion.a>
            ))}
        </div>

        {/* Additional Info */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-primary to-purple-900 rounded-xl p-6 text-white mt-8"
        >
            <h3 className="font-semibold text-lg mb-2">Jam Operasional</h3>
            <p className="text-white/90">Senin - Minggu: 08:00 - 22:00 WIB</p>
            <p className="text-white/80 text-sm mt-2">
            Response cepat via WhatsApp dalam 5 menit
            </p>
        </motion.div>
        </motion.div>
    );
    };

    export default SocialLinks;