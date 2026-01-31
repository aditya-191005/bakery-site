"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Plus, Minus, Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const UPSELL_ITEMS = [
    {
        id: "candle-pack",
        name: "Birthday Candles",
        price: 50,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: "balloons",
        name: "Party Balloons",
        price: 150,
        image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: "toffees",
        name: "Assorted Toffees",
        price: 100,
        image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?q=80&w=200&auto=format&fit=crop"
    }
];

export function CartDrawer() {
    const { items, addItem, removeItem, updateQuantity, total, isCartOpen, setIsCartOpen } = useCart();

    const generateWhatsAppOrder = () => {
        let message = "Hello! I would like to place an order:%0A%0A";

        items.forEach((item, index) => {
            message += `${index + 1}. *${item.name}* (x${item.quantity})%0A`;
            if (item.details) message += `   _${item.details}_%0A`;
            message += `   Price: ₹${item.price * item.quantity}%0A%0A`;
        });

        message += `*Total Estimated Price: ₹${total}*%0A`;
        message += "%0APlease confirm availability and final price.";

        const phoneNumber = "918930707307";
        return `https://wa.me/${phoneNumber}?text=${message}`;
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-cream/95 backdrop-blur-xl shadow-2xl z-[70] border-l border-white/20 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-chocolate/10 flex items-center justify-between">
                            <h2 className="font-serif text-2xl font-bold text-chocolate flex items-center gap-3">
                                <ShoppingBag className="text-gold" /> Your Basket
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-chocolate/5 rounded-full transition-colors text-chocolate/60 hover:text-chocolate"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                    <ShoppingBag size={64} className="text-chocolate/20" />
                                    <p className="text-lg font-medium text-chocolate/60">Your basket is empty</p>
                                    <Button variant="outline" onClick={() => {
                                        setIsCartOpen(false);
                                        window.location.href = "#menu";
                                    }}>
                                        Go shop some sweets
                                    </Button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-2xl p-4 shadow-sm border border-chocolate/5 flex gap-4"
                                    >
                                        {item.image && (
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-chocolate truncate">{item.name}</h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-chocolate/30 hover:text-red-500 transition-colors ml-2"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            {item.details && (
                                                <p className="text-xs text-chocolate/60 mb-2 line-clamp-2">{item.details}</p>
                                            )}
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="font-bold text-gold">₹{item.price}</p>
                                                <div className="flex items-center gap-3 bg-chocolate/5 rounded-full px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-chocolate shadow-sm hover:scale-110 transition active:scale-95"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-chocolate shadow-sm hover:scale-110 transition active:scale-95"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}

                            {/* Upsell Section */}
                            {items.length > 0 && (
                                <div className="mt-8 pt-6 border-t border-chocolate/5">
                                    <h4 className="font-bold text-chocolate mb-4 text-sm uppercase tracking-wider opacity-70">
                                        Complete the Party
                                    </h4>
                                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                        {UPSELL_ITEMS.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => addItem({
                                                    name: item.name,
                                                    price: item.price,
                                                    image: item.image
                                                })}
                                                className="flex-shrink-0 w-32 bg-white border border-chocolate/5 rounded-xl p-3 flex flex-col items-center gap-2 hover:border-gold/50 transition-colors shadow-sm text-center group"
                                            >
                                                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-cream">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs font-bold text-chocolate leading-tight">{item.name}</p>
                                                    <p className="text-xs text-gold font-bold">+₹{item.price}</p>
                                                </div>
                                                <div className="mt-1 w-full py-1 bg-chocolate/5 text-[10px] font-bold text-chocolate rounded-full group-hover:bg-chocolate group-hover:text-white transition-colors">
                                                    Add
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-chocolate/10 bg-white/50 backdrop-blur-md">
                                <div className="flex justify-between items-center mb-6 text-xl">
                                    <span className="font-medium text-chocolate/70">Total</span>
                                    <span className="font-bold text-chocolate font-serif text-2xl">₹{total}</span>
                                </div>
                                <a
                                    href={generateWhatsAppOrder()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full"
                                >
                                    <Button size="lg" className="w-full rounded-full shadow-xl shadow-gold/20 flex items-center justify-center gap-2">
                                        <Send size={20} /> Checkout on WhatsApp
                                    </Button>
                                </a>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
