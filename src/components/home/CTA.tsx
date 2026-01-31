"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function CTA() {
    return (
        <section className="py-24 relative overflow-hidden bg-chocolate text-cream text-center">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    <h2 className="font-serif text-4xl md:text-6xl font-bold">
                        Ready to Make Your Celebration <span className="text-gold">Sweeter?</span>
                    </h2>
                    <p className="text-cream/80 text-lg md:text-xl">
                        Whether it&apos;s a wedding, birthday, or just a Tuesday treat, we have something special for you.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                        <motion.div
                            animate={{ boxShadow: ["0 0 0 0px rgba(212, 175, 55, 0.2)", "0 0 0 20px rgba(212, 175, 55, 0)"] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="rounded-full"
                        >
                            <Button size="lg" className="bg-gold text-chocolate hover:bg-white hover:text-chocolate px-12">
                                Order on WhatsApp
                            </Button>
                        </motion.div>

                        <Button variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-chocolate">
                            Call Us Now
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
