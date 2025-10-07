    'use client';
    import { motion } from 'framer-motion';
    import { perfumeHistory } from '@/data/history';
    import Image from 'next/image';

    const HistorySection = () => {
    return (
        <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
            >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Sejarah Parfum Legendaris
            </h1>
            <p className="text-text text-lg max-w-3xl mx-auto">
                Jelajahi perjalanan parfum-parfum ikonik yang telah menciptakan sejarah 
                dalam dunia wewangian dan menjadi legenda abadi.
            </p>
            </motion.div>

            {/* Timeline */}
            <div className="max-w-4xl mx-auto">
            {perfumeHistory.map((item, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center mb-16 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                >
                {/* Image - FIXED VERSION */}
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg hover-lift h-64">
                    {item.image ? (
                        <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400">Gambar {item.title}</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="md:w-1/2 md:px-8">
                    <div className={`text-center md:text-left ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <motion.span 
                        className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
                        whileHover={{ scale: 1.05 }}
                    >
                        {item.year}
                    </motion.span>
                    <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                    <p className="text-text leading-relaxed">{item.description}</p>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>

            {/* Additional Info */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto mt-20 p-8 bg-gradient-to-r from-primary to-purple-900 rounded-2xl text-white text-center"
            >
            <h3 className="text-2xl font-bold mb-4">Warisan dalam Setiap Tetes</h3>
            <p className="text-lg opacity-90">
                Setiap parfum legendaris membawa cerita dan warisan yang tak ternilai. 
                Mereka bukan sekadar wewangian, melainkan karya seni yang mengabadikan momen dalam sejarah.
            </p>
            </motion.div>
        </div>
        </section>
    );
    };

    export default HistorySection;