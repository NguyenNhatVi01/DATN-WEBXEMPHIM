import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { movies, concessions } from "@/lib/data";

import comboImg from "@/assets/images/concession-combo.png";

export default function Concessions() {
  const [match, params] = useRoute("/booking/:id/concessions");
  const [, setLocation] = useLocation();
  const movieId = params?.id ? parseInt(params.id) : 1;
  const movie = movies.find(m => m.id === movieId) || movies[0];

  const [cart, setCart] = useState<Record<number, number>>({});

  const addToCart = (id: number) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const calculateSubtotal = () => {
    return Object.entries(cart).reduce((total, [idStr, quantity]) => {
      const id = parseInt(idStr);
      const item = concessions.find(c => c.id === id);
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  // Mock previous step data
  const ticketTotal = 240000;
  const total = ticketTotal + calculateSubtotal();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Booking Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-bold text-lg leading-tight">{movie.title}</h2>
            <p className="text-xs text-muted-foreground">Add Snacks & Drinks</p>
          </div>
        </div>
        <div className="text-sm font-medium">Step 2/3</div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Main F&B Area */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <ShoppingBag className="text-primary" /> Popcorn & Drinks
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concessions.map((item) => (
              <div key={item.id} className="bg-card/30 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-primary/50 transition-colors group">
                <div className="aspect-video relative overflow-hidden bg-black/50">
                  <img 
                    src={comboImg} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white font-bold text-xl">
                    {formatPrice(item.price)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    {cart[item.id] ? (
                      <div className="flex items-center gap-3 bg-white/5 rounded-full p-1 border border-white/10">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold w-4 text-center">{cart[item.id]}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary"
                          onClick={() => addToCart(item.id)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                        onClick={() => addToCart(item.id)}
                      >
                        Add to Order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-card/40 border border-white/10 rounded-2xl p-6 sticky top-24 backdrop-blur-xl">
            <h3 className="font-bold text-xl mb-4 border-b border-white/10 pb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {/* Tickets Mock Info */}
              <div className="flex justify-between items-start text-sm">
                <span className="text-muted-foreground">Tickets (2x VIP)</span>
                <span className="font-medium">{formatPrice(ticketTotal)}</span>
              </div>
              
              {/* Concessions */}
              {Object.keys(cart).length > 0 && (
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <div className="text-xs font-semibold uppercase text-muted-foreground mb-2">Concessions</div>
                  {Object.entries(cart).map(([idStr, quantity]) => {
                    const item = concessions.find(c => c.id === parseInt(idStr));
                    if (!item) return null;
                    return (
                      <div key={idStr} className="flex justify-between items-start text-sm">
                        <span className="text-muted-foreground">{quantity}x {item.name}</span>
                        <span className="font-medium">{formatPrice(item.price * quantity)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-black/40 p-4 rounded-xl mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                className="w-full h-12 text-lg font-semibold"
                onClick={() => setLocation(`/booking/${movie.id}/checkout`)}
              >
                Continue to Checkout
              </Button>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setLocation(`/booking/${movie.id}/checkout`)}
              >
                Skip F&B
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}