    'use client';
    import { useState } from 'react';
    import Link from 'next/link';
    import { motion } from 'framer-motion';

    const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Produk', href: '/products' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
        >
        <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
            >
                <div className="w-8 h-8 bg-gradient-to-r from-accent to-yellow-400 rounded-full"></div>
                <span className="text-xl font-bold text-primary">Luxury<span className="text-accent">Perfume</span></span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
                {menuItems.map((item, index) => (
                <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Link 
                    href={item.href}
                    className="text-text hover:text-accent font-medium transition-colors duration-300 relative group"
                    >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </motion.div>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <div className="w-6 h-0.5 bg-primary mb-1.5"></div>
                <div className="w-6 h-0.5 bg-primary mb-1.5"></div>
                <div className="w-6 h-0.5 bg-primary"></div>
            </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-gray-200"
            >
                {menuItems.map((item, index) => (
                <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Link 
                    href={item.href}
                    className="block py-3 text-text hover:text-accent font-medium transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                    >
                    {item.name}
                    </Link>
                </motion.div>
                ))}
            </motion.div>
            )}
        </nav>
        </motion.header>
    );
    };

    export default Header;