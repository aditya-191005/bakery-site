"use client";

import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/ui/Card";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

const menuItems = {
    cakes: [
        { name: "Chocolate Cake", price: 350, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop", description: "Rich and moist chocolate delight." },
        { name: "Black Forest Cake", price: 380, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=600&auto=format&fit=crop", description: "Classic with cherries and cream." },
        { name: "Pineapple Cake", price: 300, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=600&auto=format&fit=crop", description: "Fresh pineapple chunks and cream." },
        { name: "Butterscotch Cake", price: 350, image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=600&auto=format&fit=crop", description: "Crunchy caramel goodness." },
        { name: "Vanilla Cake", price: 300, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=600&auto=format&fit=crop", description: "Simple and elegant vanilla sponge." },
        { name: "Red Velvet Cake", price: 450, image: "https://images.unsplash.com/photo-1586788224331-947f68671cf1?q=80&w=600&auto=format&fit=crop", description: "Velvety smooth with cheese frosting." },
        { name: "Custom Photo Cake", price: 800, image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=600&auto=format&fit=crop", description: "Your photo on a delicious cake." },
        { name: "Theme Cake", price: 1000, image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=600&auto=format&fit=crop", description: "Special themes for special days." },
    ],
    pastries: [
        { name: "Chocolate Pastry", price: 50, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop", description: "Slice of heaven." },
        { name: "Pineapple Pastry", price: 40, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop", description: "Tropical delight." },
        { name: "Black Forest Pastry", price: 45, image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop", description: "Classic favourite." },
        { name: "Butterscotch Pastry", price: 45, image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=600&auto=format&fit=crop", description: "Crunchy bite." },
    ],
    bakery: [
        { name: "Fresh Bread", price: 40, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop", description: "Baked fresh daily." },
        { name: "Rusk", price: 60, image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=600&auto=format&fit=crop", description: "Perfect tea-time partner." },
        { name: "Cookies", price: 100, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=600&auto=format&fit=crop", description: "Assorted handmade cookies." },
        { name: "Veg Patties", price: 30, image: "/images/veg_patties.png", description: "Crispy and savory." },
        { name: "Cream Rolls", price: 20, image: "/images/cream_roll.png", description: "Sweet puff pastry." },
        { name: "Bakery Biscuits", price: 120, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop", description: "Traditional bakery style." },
    ]
};

type Category = keyof typeof menuItems;

export function Menu() {
    const { addItem } = useCart();
    const [activeCategory, setActiveCategory] = useState<Category>("cakes");

    const handleAddToCart = (product: any) => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#FFF8E7', '#5D4037']
        });

        addItem({
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description
        });
    };

    return (
        <Section id="menu" className="bg-cream-dark">
            <div className="text-center mb-16 space-y-4">
                <h3 className="text-gold font-medium uppercase tracking-widest text-sm">
                    Fresh from Oven
                </h3>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-chocolate">
                    Our Menu
                </h2>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {Object.keys(menuItems).map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category as Category)}
                            className={cn(
                                "px-6 py-2 rounded-full text-lg font-serif transition-all duration-300",
                                activeCategory === category
                                    ? "bg-chocolate text-gold shadow-lg"
                                    : "bg-white text-chocolate/70 hover:bg-white/80"
                            )}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-[600px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {menuItems[activeCategory].map((product, index) => (
                            <ProductCard
                                key={product.name}
                                name={product.name}
                                price={`₹${product.price}`}
                                image={product.image}
                                description={product.description}
                                index={index}
                                onAddToCart={() => handleAddToCart(product)}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </Section>
    );
}
