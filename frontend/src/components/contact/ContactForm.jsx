    'use client';
    import { useState } from 'react';
    import { motion } from 'framer-motion';
    import { SOCIAL_LINKS } from '@/data/constants';

    const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = `Halo, saya ${formData.name} (${formData.email}, ${formData.phone}). ${formData.message}`;
        window.open(`${SOCIAL_LINKS.whatsapp}&text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        >
        <h2 className="text-2xl font-bold text-primary mb-6">Kirim Pesan</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                Nama Lengkap
            </label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                placeholder="Masukkan nama lengkap Anda"
            />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                Email
                </label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                placeholder="email@example.com"
                />
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                Nomor WhatsApp
                </label>
                <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                placeholder="+62 812-3456-7890"
                />
            </div>
            </div>

            <div>
            <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                Pesan
            </label>
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Tulis pesan Anda di sini..."
            ></textarea>
            </div>

            <motion.button
            type="submit"
            className="w-full bg-accent text-white py-4 rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-300 hover-lift"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            >
            Kirim via WhatsApp
            </motion.button>
        </form>
        </motion.div>
    );
    };

    export default ContactForm;