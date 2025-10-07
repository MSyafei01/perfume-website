    import Header from '@/components/common/Header';
    import Footer from '@/components/common/Footer';
    import WhatsAppFloat from '@/components/common/WhatsAppFloat';
    import ContactForm from '@/components/contact/ContactForm';
    import SocialLinks from '@/components/contact/SocialLinks';

    export default function Contact() {
    return (
        <main className="min-h-screen">
        <Header />
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Hubungi Kami
                </h1>
                <p className="text-text text-lg max-w-2xl mx-auto">
                Butuh bantuan memilih parfum yang tepat? Tim kami siap membantu Anda 
                menemukan aroma yang sempurna.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <ContactForm />
                <SocialLinks />
            </div>
            </div>
        </div>
        <Footer />
        <WhatsAppFloat />
        </main>
    );
    }