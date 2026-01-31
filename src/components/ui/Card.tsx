"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";

interface ProductCardProps {
    name: string;
    price?: string;
    image: string;
    description?: string;
    className?: string;
    index?: number;
    onAddToCart?: () => void;
}

export function ProductCard({ name, price, image, description, className, index = 0, onAddToCart }: ProductCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={cn("group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[450px] flex flex-col", className)}
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="relative h-64 overflow-hidden rounded-b-3xl"
            >
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div
                style={{ transform: "translateZ(20px)" }}
                className="p-8 text-center space-y-4 flex-grow flex flex-col items-center"
            >
                <h3 className="font-serif text-2xl font-bold text-chocolate group-hover:text-gold transition-colors">
                    {name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">{description}</p>
                <div className="mt-auto pt-4 space-y-4 w-full">
                    {price && <p className="font-medium text-xl text-gold">{price}</p>}
                    <Button
                        size="sm"
                        onClick={onAddToCart}
                        className="w-full opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300"
                    >
                        Add to Basket
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
