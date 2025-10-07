    'use client';
    import { motion } from 'framer-motion';
    import { bestSellers } from '@/data/products';
    import ProductCard from '@/components/home/ProductCard';

    const BestSeller = () => {
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