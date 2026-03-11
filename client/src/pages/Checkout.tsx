import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, CreditCard, Ticket, CheckCircle2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { movies } from "@/lib/data";

// Payment logos placeholders
const paymentMethods = [
  { id: "momo", name: "MoMo E-Wallet", bg: "bg-pink-600" },
  { id: "zalopay", name: "ZaloPay", bg: "bg-blue-500" },
  { id: "atm", name: "ATM / Internet Banking", bg: "bg-gray-700" },
  { id: "visa", name: "Visa / Mastercard", bg: "bg-indigo-800" },
];

export default function Checkout() {
  const [match, params] = useRoute("/booking/:id/checkout");
  const [, setLocation] = useLocation();
  const movieId = params?.id ? parseInt(params.id) : 1;
  const movie = movies.find(m => m.id === movieId) || movies[0];

  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock data for final total
  const total = 325000;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-white/10 rounded-3xl p-8 max-w-md w-full text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-8">
            Your tickets for <strong className="text-white">{movie.title}</strong> have been booked successfully.
          </p>
          
          <div className="bg-white/5 rounded-2xl p-4 text-left mb-8 space-y-3 border border-white/5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking ID</span>
              <span className="font-mono font-bold">CNB-8A9F21</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Showtime</span>
              <span className="font-medium">Today, 08:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Seats</span>
              <span className="font-medium">E5, E6</span>
            </div>
          </div>

          <Button 
            className="w-full h-12 text-lg"
            onClick={() => setLocation("/profile")}
          >
            View E-Tickets
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-bold text-lg leading-tight">Checkout</h2>
          </div>
        </div>
        <div className="text-sm font-medium text-primary">Step 3/3</div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Payment Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card/30 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="text-primary" /> Payment Method
              </h3>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                {paymentMethods.map((method) => (
                  <Label
                    key={method.id}
                    htmlFor={method.id}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method.id 
                        ? "border-primary bg-primary/5" 
                        : "border-white/10 hover:border-white/30 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value={method.id} id={method.id} className="text-primary" />
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-6 rounded ${method.bg} flex items-center justify-center`}></div>
                        <span className="font-medium text-base">{method.name}</span>
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="bg-card/30 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Tag className="text-primary" /> Promotions
              </h3>
              <div className="flex gap-3">
                <Input placeholder="Enter voucher code" className="bg-black/40 h-12 text-lg" />
                <Button variant="secondary" className="h-12 px-6">Apply</Button>
              </div>
            </div>
          </div>

          {/* Final Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-white/10 rounded-3xl overflow-hidden sticky top-24">
              <div className="p-6 border-b border-white/10 bg-black/20">
                <h3 className="font-bold text-xl mb-4">Ticket Details</h3>
                <div className="flex gap-4">
                  <div className="w-20 h-28 rounded-lg overflow-hidden bg-white/10 shrink-0">
                    <img src={movie.image === 'action' ? '/assets/images/poster-action.png' : ''} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-lg leading-tight mb-1">{movie.title}</div>
                    <div className="text-sm text-muted-foreground mb-2">2D • Phụ đề Tiếng Việt</div>
                    <div className="text-sm font-medium">Cineplex Central</div>
                    <div className="text-sm text-primary">Today, 08:30 PM</div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seats (E5, E6)</span>
                  <span className="font-medium">{formatPrice(240000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">1x Solo Combo</span>
                  <span className="font-medium">{formatPrice(85000)}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-lg font-medium">Total Payment</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Button 
                  className="w-full h-14 text-lg font-bold"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Pay ${formatPrice(total)}`}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By completing this payment, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}