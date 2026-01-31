"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
    return (
        <footer id="footer" className="bg-chocolate text-cream pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h2 className="font-serif text-4xl font-bold">KAKA<span className="text-gold"> BAKERY</span></h2>
                        <p className="text-cream/80 leading-relaxed max-w-xs">
                            Fresh Cakes & Bakes for Every Celebration. KAKA Bakery is one of the well-known local bakeries in Bhiwani.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Instagram size={20} />} />
                            <SocialIcon icon={<Facebook size={20} />} />
                            <SocialIcon icon={<Twitter size={20} />} />
                        </div>
                    </div>

                    {/* Links */}
                    <div className="md:px-10">
                        <h3 className="font-serif text-xl font-bold mb-6 text-gold">Explore</h3>
                        <ul className="space-y-4 text-cream/80">
                            <li><Link href="#about" className="hover:text-gold transition-colors">About Us</Link></li>
                            <li><Link href="#menu" className="hover:text-gold transition-colors">Menu</Link></li>
                            <li><Link href="#custom-cake" className="hover:text-gold transition-colors">Custom Cakes</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-serif text-xl font-bold mb-6 text-gold">Visit Us</h3>
                        <ul className="space-y-4 text-cream/80">
                            <li className="flex items-start gap-4">
                                <MapPin className="text-gold shrink-0 mt-1" size={20} />
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=KAKA+Bakery+Near+Sabzi+Mandi+Bhiwani"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-gold transition-colors"
                                >
                                    Shop No. 27/8, Near Sabzi Mandi,<br />Krishna Colony, Bhiwani, Haryana – 127021
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="text-gold shrink-0" size={20} />
                                <a href="tel:+918930707307" className="hover:text-gold transition-colors">
                                    +91 89307 07307
                                </a>
                            </li>
                            <li className="flex items-start gap-4">
                                <Clock className="text-gold shrink-0 mt-1" size={20} />
                                <span>9:00 AM – 10:00 PM (All Days)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/60">
                    <p>© {new Date().getFullYear()} KAKA Bakery. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <a
            href="#"
            className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-chocolate transition-all duration-300"
        >
            {icon}
        </a>
    );
}
