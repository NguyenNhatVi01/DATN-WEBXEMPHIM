import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Movies from "@/pages/Movies";
import MovieDetails from "@/pages/MovieDetails";
import SeatSelection from "@/pages/SeatSelection";
import Concessions from "@/pages/Concessions";
import Checkout from "@/pages/Checkout";
import Profile from "@/pages/Profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/movies" component={Movies} />
      <Route path="/movie/:id" component={MovieDetails} />
      <Route path="/booking/:id/seats" component={SeatSelection} />
      <Route path="/booking/:id/concessions" component={Concessions} />
      <Route path="/booking/:id/checkout" component={Checkout} />
      <Route path="/profile" component={Profile} />
      {/* Map tickets route to profile for now */}
      <Route path="/tickets" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
          <Navbar />
          <main className="flex-1 w-full">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;