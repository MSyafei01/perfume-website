    import Header from '@/components/common/Header';
    import Footer from '@/components/common/Footer';
    import WhatsAppFloat from '@/components/common/WhatsAppFloat';
    import HistorySection from '@/components/about/HistorySection';

    export default function About() {
    return (
        <main className="min-h-screen">
        <Header />
        <HistorySection />
        <Footer />
        <WhatsAppFloat />
        </main>
    );
    }