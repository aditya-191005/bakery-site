"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends HTMLMotionProps<"section"> {
    children: React.ReactNode;
    containerClass?: string;
    fullWidth?: boolean;
}

export function Section({
    children,
    className,
    containerClass,
    fullWidth = false,
    ...props
}: SectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn("py-20 relative overflow-hidden", className)}
            {...props}
        >
            <div className={cn("mx-auto px-4 md:px-8", fullWidth ? "w-full" : "max-w-7xl", containerClass)}>
                {children}
            </div>
        </motion.section>
    );
}
