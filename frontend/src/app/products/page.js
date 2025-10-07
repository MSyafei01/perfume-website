    import Header from '@/components/common/Header';
    import Footer from '@/components/common/Footer';
    import WhatsAppFloat from '@/components/common/WhatsAppFloat';
    import ProductGrid from '@/components/products/ProductGrid';

    export default function Products() {
    return (
        <main className="min-h-screen">
        <Header />
        <ProductGrid />
        <Footer />
        <WhatsAppFloat />
        </main>
    );
    }