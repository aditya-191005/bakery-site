"use client";

import { Section } from "@/components/ui/Section";
import Image from "next/image";
import { motion } from "framer-motion";

export function Gallery() {
    return (
        <Section id="gallery" className="bg-cream overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <div className="md:w-1/3 space-y-6">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-chocolate leading-tight">
                        The Art of <br /> <span className="text-gold italic">Celebration</span>
                    </h2>
                    <p className="text-chocolate/80">
                        We don&apos;t just bake cakes; we create centerpieces for life&apos;s most beautiful moments. From intimate gatherings to grand weddings, our creations are designed to impress.
                    </p>
                    <div className="h-1 w-20 bg-gold mt-4" />
                </div>

                {/* Gallery Grid */}
                <div className="md:w-2/3 h-[600px] grid grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-full rounded-2xl overflow-hidden row-span-2"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=800&auto=format&fit=crop"
                            alt="Baking Process"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-full rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop"
                            alt="Celebration Cake"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative h-full rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop"
                            alt="Pastries"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}
