"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const rotateImage = useTransform(scrollYProgress, [0, 1], [0, 10]);

    return (
        <section ref={ref} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-cream pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink/30 rounded-full blur-[120px] opacity-60 animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold/20 rounded-full blur-[120px] opacity-50" />
            </div>

            <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
                {/* Text Content */}
                <motion.div
                    style={{ y: yText }}
                    className="md:w-1/2 text-center md:text-left space-y-8 relative z-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-gold font-bold tracking-[0.2em] text-sm uppercase mb-6 flex items-center gap-4 justify-center md:justify-start">
                            <span className="h-[1px] w-12 bg-gold/50" />
                            KAKA BAKERY
                            <span className="h-[1px] w-12 bg-gold/50 md:hidden" />
                        </h2>
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] font-bold text-chocolate leading-[0.9] tracking-tighter mix-blend-multiply">
                            Fresh Cakes <br />
                            <span className="block pl-4 md:pl-12 text-transparent bg-clip-text bg-gradient-to-r from-chocolate to-gold">& Bakes</span>
                            <span className="block text-4xl md:text-5xl mt-4 font-normal italic font-sans text-chocolate/80">for every celebration.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-chocolate/70 text-lg md:text-xl max-w-lg mx-auto md:mx-0 font-light leading-relaxed"
                    >
                        Fresh Cakes & Bakes for Every Celebration. The trusted choice in Bhiwani.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
                    >
                        <a href="#menu">
                            <Button size="lg">Explore Menu</Button>
                        </a>
                        <a href="#custom-cake">
                            <Button variant="outline" size="lg">Make Your Own Cake</Button>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Visuals */}
                <div className="md:w-1/2 relative h-[500px] w-full flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        <div className="relative w-80 h-96 md:w-96 md:h-[500px] rounded-t-full overflow-hidden border-4 border-white shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop"
                                alt="Signature Dark Chocolate Cake"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Floating Elements (Badges / Small images) */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-6 -left-6 md:-left-12 bg-cream p-4 rounded-xl shadow-lg max-w-[150px]"
                        >
                            <p className="font-serif text-3xl font-bold text-gold">100%</p>
                            <p className="text-xs text-chocolate/70 uppercase tracking-wide">Fresh Ingredients</p>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute top-10 -right-6 md:-right-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl hidden md:block"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=400&auto=format&fit=crop"
                                alt="Strawberry Cake details"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
