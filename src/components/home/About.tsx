"use client";

import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
    return (
        <Section id="about" className="bg-white">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="md:w-1/2 relative"
                >
                    <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-cream">
                        <Image
                            src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000&auto=format&fit=crop"
                            alt="Baking at KAKA Bakery"
                            fill
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="md:w-1/2 space-y-6"
                >
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-chocolate">
                        Welcome to <span className="text-gold">KAKA Bakery</span>
                    </h2>
                    <p className="text-lg text-chocolate/70 leading-relaxed">
                        KAKA Bakery is one of the well-known local bakeries in Bhiwani, serving fresh cakes, pastries, and bakery items daily.
                    </p>
                    <p className="text-lg text-chocolate/70 leading-relaxed">
                        We specialize in birthday cakes, custom cakes, and celebration orders. With quality ingredients and trusted service, KAKA Bakery has been a preferred choice for customers in Krishna Colony and nearby areas.
                    </p>
                    <div className="pt-4">
                        <p className="font-serif text-xl font-bold text-chocolate">
                            Fresh Cakes & Bakes for Every Celebration
                        </p>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
