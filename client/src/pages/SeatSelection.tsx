import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Monitor, ArrowLeft, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { movies } from "@/lib/data";
import { toast } from "@/hooks/use-toast";

export default function SeatSelection() {
  const [match, params] = useRoute("/booking/:id/seats");
  const [, setLocation] = useLocation();
  const movieId = params?.id ? parseInt(params.id) : 1;
  const movie = movies.find(m => m.id === movieId) || movies[0];

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Mock seat layout: rows A-H, cols 1-12
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = Array.from({ length: 12 }, (_, i) => i + 1);

  // Randomly set some seats as booked for mock
  const [bookedSeats] = useState<string[]>(() => {
    const booked = [];
    for (let i = 0; i < 20; i++) {
      const row = rows[Math.floor(Math.random() * rows.length)];
      const col = Math.floor(Math.random() * cols.length) + 1;
      booked.push(`${row}${col}`);
    }
    return booked;
  });

  // Seat pricing
  const standardPrice = 100000;
  const vipPrice = 140000;
  const sweetboxPrice = 250000;

  const getSeatType = (row: string) => {
    if (row === 'H') return 'sweetbox';
    if (row === 'E' || row === 'F' || row === 'G') return 'vip';
    return 'standard';
  };

  const getSeatPrice = (row: string) => {
    const type = getSeatType(row);
    if (type === 'sweetbox') return sweetboxPrice;
    if (type === 'vip') return vipPrice;
    return standardPrice;
  };

  const toggleSeat = (seatId: string, row: string) => {
    if (bookedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        toast({
          title: "Maximum seats reached",
          description: "You can only book up to 8 seats per transaction.",
          variant: "destructive"
        });
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const totalPrice = selectedSeats.reduce((total, seatId) => {
    return total + getSeatPrice(seatId.charAt(0));
  }, 0);

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
            <p className="text-xs text-muted-foreground">Cineplex Central • Today, 08:30 PM</p>
          </div>
        </div>
        <div className="text-sm font-medium">Step 1/3</div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Main Seat Map Area */}
        <div className="flex-1">
          {/* Screen curve */}
          <div className="mb-12 relative flex justify-center">
            <div className="w-full max-w-2xl h-12 border-t-4 border-primary/50 rounded-[100%] rounded-b-none relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -top-6 text-sm text-primary font-bold tracking-widest uppercase flex items-center gap-2">
              <Monitor className="w-4 h-4" /> Screen
            </div>
          </div>

          {/* Seat Grid */}
          <div className="w-full overflow-x-auto pb-8">
            <div className="min-w-fit mx-auto flex flex-col gap-3">
              {rows.map((row) => (
                <div key={row} className="flex items-center justify-center gap-2 md:gap-4">
                  <div className="w-6 text-center text-sm font-bold text-muted-foreground mr-2">{row}</div>
                  
                  <div className="flex gap-2">
                    {/* Left block (1-3) */}
                    <div className="flex gap-2 mr-6 md:mr-10">
                      {cols.slice(0, 3).map(col => {
                        const seatId = `${row}${col}`;
                        const isBooked = bookedSeats.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);
                        const type = getSeatType(row);
                        
                        return (
                          <button
                            key={seatId}
                            disabled={isBooked}
                            onClick={() => toggleSeat(seatId, row)}
                            className={`
                              w-8 h-8 md:w-10 md:h-10 rounded-t-lg rounded-b-sm text-xs font-medium transition-all
                              flex items-center justify-center
                              ${isBooked ? 'bg-white/10 text-transparent cursor-not-allowed' : ''}
                              ${!isBooked && !isSelected && type === 'standard' ? 'bg-blue-900/40 border border-blue-500/50 text-blue-200 hover:bg-blue-800/60' : ''}
                              ${!isBooked && !isSelected && type === 'vip' ? 'bg-purple-900/40 border border-purple-500/50 text-purple-200 hover:bg-purple-800/60' : ''}
                              ${!isBooked && !isSelected && type === 'sweetbox' ? 'bg-pink-900/40 border border-pink-500/50 text-pink-200 hover:bg-pink-800/60' : ''}
                              ${isSelected ? 'bg-primary text-white shadow-[0_0_15px_rgba(225,29,72,0.5)] scale-110' : ''}
                            `}
                          >
                            {isSelected ? <Check className="w-4 h-4" /> : col}
                          </button>
                        );
                      })}
                    </div>

                    {/* Middle block (4-9) */}
                    <div className="flex gap-2 mr-6 md:mr-10">
                      {cols.slice(3, 9).map(col => {
                        const seatId = `${row}${col}`;
                        const isBooked = bookedSeats.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);
                        const type = getSeatType(row);
                        
                        // Treat Sweetbox as double seats
                        if (type === 'sweetbox' && col % 2 === 0) return null; // Skip even cols for sweetbox to make them wide
                        
                        return (
                          <button
                            key={seatId}
                            disabled={isBooked}
                            onClick={() => {
                              if (type === 'sweetbox') {
                                toggleSeat(`${row}${col}`, row);
                                // For mock simplicity, we just select one "seat" that visually takes 2 spaces
                              } else {
                                toggleSeat(seatId, row);
                              }
                            }}
                            className={`
                              ${type === 'sweetbox' ? 'w-[4.5rem] md:w-[5.5rem]' : 'w-8 md:w-10'} 
                              h-8 md:h-10 rounded-t-lg rounded-b-sm text-xs font-medium transition-all
                              flex items-center justify-center
                              ${isBooked ? 'bg-white/10 text-transparent cursor-not-allowed' : ''}
                              ${!isBooked && !isSelected && type === 'standard' ? 'bg-blue-900/40 border border-blue-500/50 text-blue-200 hover:bg-blue-800/60' : ''}
                              ${!isBooked && !isSelected && type === 'vip' ? 'bg-purple-900/40 border border-purple-500/50 text-purple-200 hover:bg-purple-800/60' : ''}
                              ${!isBooked && !isSelected && type === 'sweetbox' ? 'bg-pink-900/40 border border-pink-500/50 text-pink-200 hover:bg-pink-800/60' : ''}
                              ${isSelected ? 'bg-primary text-white shadow-[0_0_15px_rgba(225,29,72,0.5)] scale-105' : ''}
                            `}
                          >
                            {isSelected ? <Check className="w-4 h-4" /> : (type === 'sweetbox' ? `${col},${col+1}` : col)}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right block (10-12) */}
                    <div className="flex gap-2">
                      {cols.slice(9, 12).map(col => {
                        const seatId = `${row}${col}`;
                        const isBooked = bookedSeats.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);
                        const type = getSeatType(row);
                        
                        return (
                          <button
                            key={seatId}
                            disabled={isBooked}
                            onClick={() => toggleSeat(seatId, row)}
                            className={`
                              w-8 h-8 md:w-10 md:h-10 rounded-t-lg rounded-b-sm text-xs font-medium transition-all
                              flex items-center justify-center
                              ${isBooked ? 'bg-white/10 text-transparent cursor-not-allowed' : ''}
                              ${!isBooked && !isSelected && type === 'standard' ? 'bg-blue-900/40 border border-blue-500/50 text-blue-200 hover:bg-blue-800/60' : ''}
                              ${!isBooked && !isSelected && type === 'vip' ? 'bg-purple-900/40 border border-purple-500/50 text-purple-200 hover:bg-purple-800/60' : ''}
                              ${!isBooked && !isSelected && type === 'sweetbox' ? 'bg-pink-900/40 border border-pink-500/50 text-pink-200 hover:bg-pink-800/60' : ''}
                              ${isSelected ? 'bg-primary text-white shadow-[0_0_15px_rgba(225,29,72,0.5)] scale-110' : ''}
                            `}
                          >
                            {isSelected ? <Check className="w-4 h-4" /> : col}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-t bg-blue-900/40 border border-blue-500/50"></div>
              <span className="text-sm">Standard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-t bg-purple-900/40 border border-purple-500/50"></div>
              <span className="text-sm">VIP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 rounded-t bg-pink-900/40 border border-pink-500/50"></div>
              <span className="text-sm">Sweetbox</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-t bg-white/10"></div>
              <span className="text-sm">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-t bg-primary"></div>
              <span className="text-sm">Selected</span>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-card/40 border border-white/10 rounded-2xl p-6 sticky top-24 backdrop-blur-xl">
            <h3 className="font-bold text-xl mb-4 border-b border-white/10 pb-4">Booking Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">Seats</span>
                <div className="text-right max-w-[150px]">
                  {selectedSeats.length > 0 ? (
                    <span className="font-semibold text-primary">{selectedSeats.join(", ")}</span>
                  ) : (
                    <span className="text-sm italic">None selected</span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Count</span>
                <span className="font-medium">{selectedSeats.length} Tickets</span>
              </div>
              
              {selectedSeats.length > 0 && (
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Subtotal</span>
                    <span className="font-semibold">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-black/40 p-4 rounded-xl mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Button 
              className="w-full h-12 text-lg font-semibold"
              disabled={selectedSeats.length === 0}
              onClick={() => setLocation(`/booking/${movie.id}/concessions`)}
            >
              Continue to F&B
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}