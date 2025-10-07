    'use client';
    import { useState, useMemo } from 'react';
    import { motion } from 'framer-motion';
    import { products } from '@/data/products';
    import ProductCard from '@/components/home/ProductCard';

    const ProductGrid = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name');

    const categories = ['All', ...new Set(products.map(product => product.category))];

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;
        
        if (selectedCategory !== 'All') {
        filtered = products.filter(product => product.category === selectedCategory);
        }

        return filtered.sort((a, b) => {
        switch (sortBy) {
            case 'price':
            return parseFloat(a.price.replace(/[^\d]/g, '')) - parseFloat(b.price.replace(/[^\d]/g, ''));
            case 'name':
            return a.name.localeCompare(b.name);
            default:
            return 0;
        }
        });
    }, [selectedCategory, sortBy]);

    return (
        <section className="py-20 bg-secondary min-h-screen">
        <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
            >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Koleksi Parfum Premium
            </h1>
            <p className="text-text text-lg max-w-2xl mx-auto">
                Temukan aroma yang sempurna untuk kepribadian Anda. 
                Setiap parfum dipilih dengan cermat untuk kualitas terbaik.
            </p>
            </motion.div>

            {/* Filters */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
            >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                        ? 'bg-accent text-white shadow-lg'
                        : 'bg-white text-primary hover:bg-gray-100'
                    }`}
                >
                    {category}
                </button>
                ))}
            </div>

            {/* Sort Filter */}
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
            </select>
            </motion.div>

            {/* Product Grid */}
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
            {filteredAndSortedProducts.map((product, index) => (
                <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                <ProductCard product={product} />
                </motion.div>
            ))}
            </motion.div>

            {/* Empty State */}
            {filteredAndSortedProducts.length === 0 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
            >
                <p className="text-text text-lg">Tidak ada produk dalam kategori ini.</p>
            </motion.div>
            )}
        </div>
        </section>
    );
    };

    export default ProductGrid;