"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    description?: string;
    quantity: number;
    image?: string;
    isCustom?: boolean;
    details?: string; // For custom cakes (shape, flavor, etc.)
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "id" | "quantity">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    total: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load from local storage
    useEffect(() => {
        const savedCart = localStorage.getItem("cart-items");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from local storage", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Sync to local storage whenever items change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart-items", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (newItem: Omit<CartItem, "id" | "quantity">) => {
        setItems((prev) => {
            const existing = prev.find(
                (item) => item.name === newItem.name && item.details === newItem.details
            );
            if (existing) {
                return prev.map((item) =>
                    item === existing
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...newItem, id: Math.random().toString(36).substr(2, 9), quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: Math.max(1, item.quantity + delta) };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                total,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
