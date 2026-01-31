"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, ChevronLeft, Send, Cake, Ruler, Utensils, Droplet, MessageSquare, Receipt, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";

// Configuration for the builder steps
const STEPS = [
    { id: "shape", title: "Choose Shape", icon: <Cake /> },
    { id: "size", title: "Select Size", icon: <Ruler /> },
    { id: "flavor", title: "Pick Flavor", icon: <Utensils /> },
    { id: "cream", title: "Cream Type", icon: <Droplet /> },
    { id: "message", title: "Personalize", icon: <MessageSquare /> },
];

const OPTIONS = {
    shape: [
        { id: "round", label: "Classic Round", price: 0 },
        { id: "square", label: "Modern Square", price: 0 },
        { id: "heart", label: "Heart Shape", price: 50 },
    ],
    size: [
        { id: "0.5kg", label: "0.5 kg (Small)", price: 350 },
        { id: "1kg", label: "1.0 kg (Medium)", price: 650 },
        { id: "2kg", label: "2.0 kg (Large)", price: 1200 },
    ],
    flavor: [
        { id: "chocolate", label: "Chocolate", price: 0, color: "#5D4037" },
        { id: "vanilla", label: "Vanilla", price: 0, color: "#F3E5AB" },
        { id: "pineapple", label: "Pineapple", price: 0, color: "#FFD700" },
        { id: "butterscotch", label: "Butterscotch", price: 0, color: "#E3963E" },
    ],
    cream: [
        { id: "whipped", label: "Whipped Cream", price: 0, color: "#FFFFFF" },
        { id: "butter", label: "Buttercream", price: 100, color: "#FFFDD0" },
    ],
};

type SelectionState = {
    shape: string;
    size: string;
    flavor: string;
    cream: string;
    message: string;
};

const INITIAL_STATE: SelectionState = {
    shape: "",
    size: "",
    flavor: "",
    cream: "",
    message: "",
};


export function CakeBuilder() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState<SelectionState>(INITIAL_STATE);
    const receiptRef = useRef(null);
    const { addItem } = useCart();

    const handleSelection = (key: keyof SelectionState, value: string) => {
        setSelections((prev) => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const calculateTotal = () => {
        let total = 0;
        if (selections.shape) total += OPTIONS.shape.find(o => o.id === selections.shape)?.price || 0;
        if (selections.size) total += OPTIONS.size.find(o => o.id === selections.size)?.price || 0;
        if (selections.flavor) total += OPTIONS.flavor.find(o => o.id === selections.flavor)?.price || 0;
        if (selections.cream) total += OPTIONS.cream.find(o => o.id === selections.cream)?.price || 0;
        return total;
    }

    const isStepValid = () => {
        const stepId = STEPS[currentStep].id as keyof SelectionState;
        if (stepId === "message") return true;
        return !!selections[stepId];
    };

    const handleWhatsAppClick = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#FFF8E7', '#5D4037']
        });
    };

    const handleAddToCart = () => {
        const { shape, size, flavor, cream, message } = selections;

        handleWhatsAppClick();

        const shapeLabel = OPTIONS.shape.find(o => o.id === shape)?.label;
        const sizeLabel = OPTIONS.size.find(o => o.id === size)?.label;
        const flavorLabel = OPTIONS.flavor.find(o => o.id === flavor)?.label;
        const creamLabel = OPTIONS.cream.find(o => o.id === cream)?.label;

        const details = `${shapeLabel}, ${sizeLabel}, ${flavorLabel}, ${creamLabel}. Message: "${message}"`;

        addItem({
            name: "Custom Cake",
            price: calculateTotal(),
            isCustom: true,
            details: details,
            image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=600&auto=format&fit=crop"
        });

        // Reset
        setSelections(INITIAL_STATE);
        setCurrentStep(0);
    };

    return (
        <Section id="custom-cake" className="bg-cream scroll-mt-20 overflow-visible z-30 relative">
            <div className="text-center mb-16 space-y-4">
                <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-gold font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                >
                    <Sparkles className="text-gold" size={16} /> Design Your Cake
                </motion.h3>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="font-serif text-5xl md:text-6xl font-bold text-chocolate"
                >
                    KAKA Bakery Special
                </motion.h2>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Build Area */}
                <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-chocolate/5 flex flex-col">
                    {/* Progress */}
                    <div className="bg-chocolate/5 p-6 overflow-x-auto">
                        <div className="flex items-center justify-between min-w-[500px] lg:min-w-full">
                            {STEPS.map((step, index) => {
                                const isActive = index === currentStep;
                                const isCompleted = index < currentStep;

                                return (
                                    <div key={step.id} className="flex flex-col items-center relative z-10 group">
                                        <motion.div
                                            animate={{
                                                scale: isActive ? 1.1 : 1,
                                                backgroundColor: isActive ? "#D4AF37" : isCompleted ? "#5D4037" : "#FFFFFF",
                                                borderColor: isActive ? "#D4AF37" : isCompleted ? "#5D4037" : "rgba(93, 64, 55, 0.2)"
                                            }}
                                            className={cn(
                                                "w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 text-white shadow-lg transition-colors duration-300",
                                                !isActive && !isCompleted && "text-chocolate/40"
                                            )}
                                        >
                                            {isCompleted ? <Check size={20} /> : step.icon}
                                        </motion.div>
                                        <span className={cn(
                                            "text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                                            isActive ? "text-chocolate" : "text-chocolate/40"
                                        )}>
                                            {step.title}
                                        </span>
                                        {index !== STEPS.length - 1 && (
                                            <div className="absolute top-6 left-1/2 w-full h-[2px] -z-10 bg-chocolate/10">
                                                <motion.div
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: index < currentStep ? "100%" : "0%" }}
                                                    className="h-full bg-chocolate transition-all duration-500"
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="p-8 lg:p-12 flex-grow bg-pattern flex flex-col justify-between">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <h3 className="text-3xl font-serif font-bold text-chocolate mb-8">
                                    {STEPS[currentStep].title}
                                </h3>

                                {currentStep < 4 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {OPTIONS[STEPS[currentStep].id as keyof typeof OPTIONS]?.map((option) => {
                                            const isSelected = selections[STEPS[currentStep].id as keyof SelectionState] === option.id;

                                            return (
                                                <motion.button
                                                    key={option.id}
                                                    whileHover={{ scale: 1.02, translateY: -2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleSelection(STEPS[currentStep].id as keyof SelectionState, option.id)}
                                                    className={cn(
                                                        "flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 group text-left",
                                                        isSelected
                                                            ? "border-gold bg-gold text-white shadow-lg shadow-gold/30"
                                                            : "border-chocolate/10 hover:border-gold/50 bg-white"
                                                    )}
                                                >
                                                    <div>
                                                        <span className={cn("font-bold text-lg block", isSelected ? "text-white" : "text-chocolate")}>{option.label}</span>
                                                        {option.price > 0 && <span className={cn("text-sm", isSelected ? "text-white/80" : "text-chocolate/60")}>+₹{option.price}</span>}
                                                    </div>
                                                    {isSelected && <div className="bg-white/20 p-1 rounded-full"><Check size={20} /></div>}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="max-w-full">
                                        <label className="block text-lg font-bold text-chocolate mb-4">
                                            Add a special message on the cake (Optional)
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={selections.message}
                                            onChange={(e) => handleSelection("message", e.target.value)}
                                            placeholder="Happy Birthday!"
                                            className="w-full p-6 border-2 border-chocolate/10 rounded-2xl focus:border-gold focus:ring-0 outline-none resize-none bg-white text-xl placeholder:text-chocolate/30 transition-all shadow-inner"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex justify-between items-center mt-12 pt-8 border-t border-chocolate/10">
                            <Button
                                variant="ghost"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className={cn(currentStep === 0 && "invisible")}
                            >
                                <ChevronLeft size={20} /> Back
                            </Button>

                            {currentStep === STEPS.length - 1 ? (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        onClick={handleAddToCart}
                                        className="bg-green-600 hover:bg-green-700 text-white rounded-full px-10 py-4 flex items-center gap-2 font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                                    >
                                        <Check size={20} /> Add to Basket
                                    </Button>
                                </motion.div>
                            ) : (
                                <Button onClick={nextStep} disabled={!isStepValid()} size="lg" className="rounded-full px-8">
                                    Next Step <ChevronRight size={20} />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Live Receipt */}
                <div className="lg:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 rounded-[2rem] shadow-2xl border-4 border-double border-chocolate/10 sticky top-24"
                    >
                        <div className="text-center border-b border-dashed border-chocolate/20 pb-6 mb-6">
                            <h4 className="font-serif text-2xl font-bold text-chocolate uppercase tracking-widest flex items-center justify-center gap-2">
                                <Receipt size={24} /> Your Order
                            </h4>
                            <p className="text-chocolate/50 text-sm mt-2">Kaka Bakery Estimate</p>
                        </div>

                        <div className="space-y-4 text-chocolate/80">
                            <div className="flex justify-between items-center py-2 border-b border-chocolate/5">
                                <span className="font-medium">Shape</span>
                                <span className="font-bold">{OPTIONS.shape.find(o => o.id === selections.shape)?.label || "-"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-chocolate/5">
                                <span className="font-medium">Size</span>
                                <span className="font-bold">{OPTIONS.size.find(o => o.id === selections.size)?.label || "-"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-chocolate/5">
                                <span className="font-medium">Flavor</span>
                                <span className="font-bold">{OPTIONS.flavor.find(o => o.id === selections.flavor)?.label || "-"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-chocolate/5">
                                <span className="font-medium">Cream</span>
                                <span className="font-bold">{OPTIONS.cream.find(o => o.id === selections.cream)?.label || "-"}</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t-2 border-chocolate flex justify-between items-end">
                            <span className="font-bold text-xl">Total Estimate</span>
                            <span className="font-serif text-4xl font-bold text-gold">₹{calculateTotal()}</span>
                        </div>

                        <div className="mt-8 bg-chocolate/5 p-4 rounded-xl text-xs text-chocolate/60 text-center leading-relaxed">
                            * Final price may vary slightly based on seasonal availability and specific customisations confirmed via WhatsApp.
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}
