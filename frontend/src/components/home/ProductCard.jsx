    'use client';
    import { motion } from 'framer-motion';
    import { SOCIAL_LINKS } from '@/data/constants';
    import { createOrder } from '@/data/products';
    import { useState } from 'react';

    const ProductCard = ({ product }) => {
    const [isOrdering, setIsOrdering] = useState(false);

    const handleOrder = async (productName, productId, productPrice) => {
        try {
        setIsOrdering(true);
        
        // Create order data
        const orderData = {
            customer_name: 'Customer', // Bisa diganti dengan form input
            customer_phone: '08123456789', // Bisa diganti dengan form input  
            customer_email: 'customer@example.com',
            products: [
            {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            }
            ]
        };

        // Send order to backend
        const result = await createOrder(orderData);
        
        // Redirect to WhatsApp dengan link dari backend
        if (result.data && result.data.whatsapp_link) {
            window.open(result.data.whatsapp_link, '_blank');
        } else {
            // Fallback ke WhatsApp default
            const message = `Halo, saya ingin memesan ${productName}. Bisa info lebih lanjut?`;
            window.open(`${SOCIAL_LINKS.whatsapp}&text=${encodeURIComponent(message)}`, '_blank');
        }
        
        } catch (error) {
        console.error('Order failed:', error);
        // Fallback ke WhatsApp langsung jika API error
        const message = `Halo, saya ingin memesan ${productName}. Bisa info lebih lanjut?`;
        window.open(`${SOCIAL_LINKS.whatsapp}&text=${encodeURIComponent(message)}`, '_blank');
        } finally {
        setIsOrdering(false);
        }
    };

    return (
        <motion.div 
        className="bg-white rounded-2xl shadow-lg overflow-hidden perfume-card group"
        whileHover={{ y: -10 }}
        >
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
            {product.image ? (
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
            onClick={() => handleOrder(product.name, product.id, product.price)}
            disabled={isOrdering}
            className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
                isOrdering 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-primary/90 group-hover:bg-accent'
            }`}
            whileHover={!isOrdering ? { scale: 1.02 } : {}}
            whileTap={!isOrdering ? { scale: 0.98 } : {}}
            >
            {isOrdering ? 'Memproses...' : 'Pesan Sekarang'}
            </motion.button>
        </div>
        </motion.div>
    );
    };

    export default ProductCard;