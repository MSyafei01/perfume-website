    const API_BASE_URL = 'http://localhost:8000/api';

    const fallbackProducts = [
    {
        id: 1,
        name: "Chanel No. 5",
        description: "Parfum legendaris dengan aroma bunga yang elegan dan timeless",
        price: "Rp 1.250.000",
        originalPrice: "Rp 1.600.000",
        image: "/images/perfumes/chanel-no5.jpg",
        category: "Floral",
        bestSeller: true,
        notes: ["Bergamot", "Ylang-Ylang", "Sandalwood"]
    },
    {
        id: 2,
        name: "Dior Sauvage",
        description: "Aroma segar dan maskulin dengan sentuhan amberwood",
        price: "Rp 1.100.000",
        originalPrice: "Rp 1.400.000",
        image: "/images/perfumes/dior-sauvage.jpg",
        category: "Woody",
        bestSeller: true,
        notes: ["Pepper", "Lavender", "Amberwood"]
    },
    {
        id: 3,
        name: "Tom Ford Noir",
        description: "Parfum sophisticated dengan aroma oriental yang misterius",
        price: "Rp 2.500.000",
        originalPrice: "Rp 3.000.000",
        image: "/images/perfumes/tomford-noir.jpg",
        category: "Oriental",
        bestSeller: true,
        notes: ["Bergamot", "Vanilla", "Patchouli"]
    },
    {
        id: 4,
        name: "Versace Eros",
        description: "Aroma fresh dan energik dengan karakter mediteranian",
        price: "Rp 950.000",
        originalPrice: "Rp 1.200.000",
        image: "/images/perfumes/versace-eros.jpg",
        category: "Fresh",
        bestSeller: false,
        notes: ["Mint", "Green Apple", "Tonka Bean"]
    },
    {
        id: 5,
        name: "Yves Saint Laurent Libre",
        description: "Parfum feminin yang powerful dengan lavender dan musk",
        price: "Rp 1.350.000",
        originalPrice: "Rp 1.600.000",
        image: "/images/perfumes/ysl-libre.jpg",
        category: "Floral",
        bestSeller: false,
        notes: ["Lavender", "Musk", "Vanilla"]
    },
    {
        id: 6,
        name: "Creed Aventus",
        description: "Parfum premium dengan aroma buah dan smoky yang iconic",
        price: "Rp 3.500.000",
        originalPrice: "Rp 4.200.000",
        image: "/images/perfumes/creed-aventus.jpg",
        category: "Fruity",
        bestSeller: false,
        notes: ["Pineapple", "Birch", "Musk"]
    }
    ];

        // Fetch semua products dari API
    export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform data dari API ke format frontend
        return data.data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: `Rp ${formatPrice(product.price)}`,
        originalPrice: product.original_price ? `Rp ${formatPrice(product.original_price)}` : null,
        image: product.image,
        category: product.category,
        bestSeller: product.best_seller,
        notes: product.notes || [],
        stock: product.stock
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        // Return fallback data jika API error
        return fallbackProducts;
    }
    };

    // Fetch best sellers dari API
    export const fetchBestSellers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products?best_sellers=1`);
        
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        return data.data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: `Rp ${formatPrice(product.price)}`,
        originalPrice: product.original_price ? `Rp ${formatPrice(product.original_price)}` : null,
        image: product.image,
        category: product.category,
        bestSeller: product.best_seller,
        notes: product.notes || []
        }));
    } catch (error) {
        console.error('Error fetching best sellers:', error);
        return fallbackProducts.filter(product => product.bestSeller);
    }
    };

    // Helper function untuk format harga
    const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('id-ID').format(numPrice);
    };

    // Create order di backend
    export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
    };

    export { fallbackProducts as products };
    export const bestSellers = fallbackProducts.filter(product => product.bestSeller);
    export const categories = [...new Set(fallbackProducts.map(product => product.category))];
    
