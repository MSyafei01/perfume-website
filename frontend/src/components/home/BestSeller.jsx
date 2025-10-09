    'use client';
    import { motion } from 'framer-motion';
    import { fetchBestSellers } from '@/data/products';
    import ProductCard from '@/components/home/ProductCard';
    import { useState, useEffect } from 'react';  // ← PASTIKAN IMPORT useEffect

    const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBestSellers = async () => {
        try {
            setLoading(true);
            const products = await fetchBestSellers();
            setBestSellers(products);
        } catch (error) {
            console.error('Failed to load best sellers:', error);
        } finally {
            setLoading(false);
        }
        };

        loadBestSellers();
    }, []);


    if (loading) {
        return (
        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Best Seller
                </h2>
                <p className="text-text">Loading products...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(item => (
                <div key={item} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                ))}
            </div>
            </div>
        </section>
        );
    }


    return (
        <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
            >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Best Seller
                <span className="block text-accent text-lg font-normal mt-2">
                Parfum Paling Dicari
                </span>
            </h2>
            <p className="text-text max-w-2xl mx-auto">
                Temukan koleksi parfum terlaris kami yang telah menjadi favorit banyak pelanggan
            </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product, index) => (
                <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                >
                <ProductCard product={product} />
                </motion.div>
            ))}
            </div>

            {bestSellers.length === 0 && (
            <div className="text-center py-8">
                <p className="text-text">Tidak ada produk best seller saat ini.</p>
            </div>
            )}

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
            >
            <a 
                href="/products"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover-lift"
            >
                Lihat Semua Produk
            </a>
            </motion.div>
        </div>
        </section>
    );
    };

export default BestSeller;