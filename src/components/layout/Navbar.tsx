"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

const navLinks = [
    { name: "Home", href: "#" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#footer" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { items, setIsCartOpen } = useCart();

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Desktop / Floating Pill Navbar */}
            <motion.header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none",
                    isScrolled ? "pt-4" : "pt-8"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            >
                <div
                    className={cn(
                        "pointer-events-auto relative flex items-center gap-2 px-3 py-3 rounded-full border transition-all duration-300",
                        "bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/5 ring-1 ring-black/5",
                        isScrolled ? "scale-90 bg-white/40" : "scale-100"
                    )}
                >
                    {/* Brand Icon/Name for Dock */}
                    <Link href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-4 py-2 mr-2">
                        <h1 className="font-serif text-xl font-bold text-chocolate tracking-tight group">
                            KAKA<span className="text-gold group-hover:text-chocolate transition-colors"> BAKERY</span>
                        </h1>
                    </Link>

                    {/* Desktop Items */}
                    <nav className="hidden md:flex items-center p-1 bg-white/5 rounded-full border border-white/10" onMouseLeave={() => setHoveredIndex(null)}>
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onClick={(e) => {
                                    if (link.name === "Home") {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                className={cn("relative px-6 py-2.5 text-sm font-medium transition-colors rounded-full", hoveredIndex === index ? "text-chocolate" : "text-chocolate/70")}
                            >
                                <span className="relative z-10">{link.name}</span>
                                {hoveredIndex === index && (
                                    <motion.div
                                        layoutId="navbar-hover"
                                        className="absolute inset-0 bg-white rounded-full shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>


                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-3 text-chocolate bg-white/20 rounded-full ml-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-24 left-4 right-4 bg-white/80 backdrop-blur-2xl z-40 rounded-3xl p-6 shadow-2xl border border-white/40 md:hidden flex flex-col gap-4 text-center ring-1 ring-black/5"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    setIsMobileMenuOpen(false);
                                    if (link.name === "Home") {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                className="text-chocolate font-serif text-xl py-3 border-b border-chocolate/5 last:border-0 hover:bg-white/50 rounded-xl transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
                            className="w-full mt-2 rounded-xl py-4 text-lg font-bold bg-chocolate text-white flex items-center justify-center gap-2"
                        >
                            <ShoppingBag size={20} /> View Basket ({itemCount})
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
