    'use client';
    import { motion } from 'framer-motion';
    import { SOCIAL_LINKS } from '@/data/constants';

    const ProductCard = ({ product }) => {
    const handleOrder = (productName) => {
        const message = `Halo, saya ingin memesan ${productName}. Bisa info lebih lanjut?`;
        window.open(`${SOCIAL_LINKS.whatsapp}&text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <motion.div 
        className="bg-white rounded-2xl shadow-lg overflow-hidden perfume-card group"
        whileHover={{ y: -10 }}
        >

        {/* Product Image - FIXED VERSION */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
            {product.image ? (
            <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                <span className="text-gray-400 text-sm">No Image</span>
            </div>
            )}
            <div className="absolute top-4 right-4">
            {product.bestSeller && (
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                Best Seller
                </span>
            )}
            </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
            <h3 className="text-xl font-semibold text-primary mb-2">{product.name}</h3>
            <p className="text-text text-sm mb-4 line-clamp-2">{product.description}</p>
            
            {/* Price */}
            <div className="flex items-center justify-between mb-4">
            <div>
                <span className="text-2xl font-bold text-accent">{product.price}</span>
                {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                )}
            </div>
            <span className="text-xs bg-primary text-white px-2 py-1 rounded">{product.category}</span>
            </div>

            {/* Notes */}
            <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Notes:</p>
            <div className="flex flex-wrap gap-1">
                {product.notes.map((note, index) => (
                <span 
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                    {note}
                </span>
                ))}
            </div>
            </div>

            {/* Order Button */}
            <motion.button
            onClick={() => handleOrder(product.name)}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 group-hover:bg-accent"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            >
            Pesan Sekarang
            </motion.button>
        </div>
        </motion.div>
    );
    };

    export default ProductCard;