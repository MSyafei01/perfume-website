    import Header from '@/components/common/Header';
    import Footer from '@/components/common/Footer';
    import WhatsAppFloat from '@/components/common/WhatsAppFloat';
    import HeroSection from '@/components/home/HeroSection';
    import BestSeller from '@/components/home/BestSeller';

    export default function Home() {
    return (
        <main className="min-h-screen">
        <Header />
        <HeroSection />
        <BestSeller />
        <Footer />
        <WhatsAppFloat />
        </main>
    );
    }