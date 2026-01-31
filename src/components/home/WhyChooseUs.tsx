"use client";

import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Clock, ChefHat, Star, Truck } from "lucide-react";

const features = [
    {
        icon: <Clock size={40} />,
        title: "Fresh Baked Daily",
        description: "Every item is baked fresh to ensure the best taste."
    },
    {
        icon: <ChefHat size={40} />,
        title: "Trusted Local Bakery",
        description: "A preferred choice in Krishna Colony and Bhiwani."
    },
    {
        icon: <Star size={40} />,
        title: "Custom Orders",
        description: "Special birthday cakes and celebration orders accepted."
    },
    {
        icon: <Truck size={40} />,
        title: "Easy Ordering",
        description: "Order directly on WhatsApp for convenience."
    }
];

export function WhyChooseUs() {
    return (
        <Section id="why-choose-us" className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-col items-center text-center space-y-4 group"
                    >
                        <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center text-chocolate group-hover:bg-gold group-hover:text-white transition-colors duration-500">
                            {feature.icon}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-chocolate">{feature.title}</h3>
                        <p className="text-sm text-gray-500 max-w-xs">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
