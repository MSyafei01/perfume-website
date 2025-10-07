    'use client';
    import { motion } from 'framer-motion';
    import Link from 'next/link';

    const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-purple-900 to-primary overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
            >
            <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                Temukan Aroma
                <span className="block gradient-text">Yang Membuatmu Berkesan</span>
            </motion.h1>

            <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                Koleksi parfum premium ternama dengan kualitas terbaik. 
                Setiap tetes adalah cerita, setiap aroma adalah kenangan.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                <Link 
                href="/products"
                className="bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transition-all duration-300 hover-lift shadow-lg"
                >
                Jelajahi Koleksi
                </Link>
                <Link 
                href="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300"
                >
                Tentang Kami
                </Link>
            </motion.div>
            </motion.div>

            {/* Floating Perfume Bottles */}
            <motion.div
            className="absolute -bottom-20 left-10 opacity-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            >
            <div className="w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            </motion.div>
            <motion.div
            className="absolute top-20 right-10 opacity-20"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
            <div className="w-24 h-24 bg-accent/30 rounded-full blur-xl"></div>
            </motion.div>
        </div>
        </section>
    );
    };

    export default HeroSection;