"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCart() {
    const { items, setIsCartOpen, isCartOpen } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AnimatePresence>
            {!isCartOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-8 right-8 z-40 bg-chocolate text-white p-4 rounded-full shadow-2xl shadow-chocolate/40 flex items-center justify-center border-2 border-white/10 hover:bg-gold hover:text-chocolate hover:border-white/50 transition-colors"
                    aria-label="Open Cart"
                >
                    <ShoppingBag size={24} />
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                            {itemCount}
                        </span>
                    )}
                </motion.button>
            )}
        </AnimatePresence>
    );
}
