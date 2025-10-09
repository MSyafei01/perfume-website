    'use client';
    import { useState, useMemo, useEffect } from 'react';  // ← TAMBAH useEffect DI SINI
    import { motion } from 'framer-motion';
    import { fetchProducts } from '@/data/products';
    import ProductCard from '@/components/home/ProductCard';

    const ProductGrid = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
        try {
            setLoading(true);
            const productsData = await fetchProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false);
        }
        };

        loadProducts();
    }, []);

    
    const categories = ['All', ...new Set(products.map(product => product.category))];

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;
        
        if (selectedCategory !== 'All') {
        filtered = products.filter(product => product.category === selectedCategory);
        }

        return filtered.sort((a, b) => {
        switch (sortBy) {
            case 'price':
            const priceA = parseFloat(a.price.replace(/[^\d]/g, ''));
            const priceB = parseFloat(b.price.replace(/[^\d]/g, ''));
            return priceA - priceB;
            case 'name':
            return a.name.localeCompare(b.name);
            default:
            return 0;
        }
        });
    }, [selectedCategory, sortBy, products]);

    if (loading) {
    return (
        <section className="py-20 bg-secondary min-h-screen">
            <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Koleksi Parfum Premium
                </h1>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(item => (
                <div key={item} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                </div>
                ))}
            </div>
            </div>
        </section>
        );
    }

    return (
        <section className="py-20 bg-secondary min-h-screen">
        <div className="container mx-auto px-4">
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
            {filteredAndSortedProducts.length === 0 && !loading && (
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