import { useState } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { Play, Star, Clock, Calendar, Info, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { movies, theaters, showtimes } from "@/lib/data";

// Import generated images
import actionPoster from "@/assets/images/poster-action.png";
import scifiPoster from "@/assets/images/poster-scifi.png";
import horrorPoster from "@/assets/images/poster-horror.png";
import romcomPoster from "@/assets/images/poster-romcom.png";
import heroBg from "@/assets/images/hero-bg.png";

const imageMap: Record<string, string> = {
  action: actionPoster,
  scifi: scifiPoster,
  horror: horrorPoster,
  romcom: romcomPoster,
};

export default function MovieDetails() {
  const [match, params] = useRoute("/movie/:id");
  const [, setLocation] = useLocation();
  const [selectedDate, setSelectedDate] = useState(0);
  
  // Find movie by id or use default
  const movieId = params?.id ? parseInt(params.id) : 1;
  const movie = movies.find(m => m.id === movieId) || movies[0];

  // Mock upcoming dates
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30 z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={heroBg} 
            alt="Trailer Background" 
            className="w-full h-full object-cover opacity-60"
          />
          {/* Centered play button for trailer */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button className="w-20 h-20 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-transform hover:scale-105 backdrop-blur-sm">
              <Play className="w-8 h-8 ml-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-40 relative z-30">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-48 md:w-72 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in slide-in-from-bottom-8">
            <img 
              src={imageMap[movie.image]} 
              alt={movie.title}
              className="w-full aspect-[3/4] object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 mt-4 md:mt-20">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <Badge variant="outline" className="border-primary text-primary bg-primary/10">
                {movie.rating}
              </Badge>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {movie.imdb} / 10</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {movie.duration}</span>
              <span>{movie.genre}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-2 text-white/90">Synopsis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.description}
                </p>
              </div>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">Director:</span>
                  <span className="col-span-2 font-medium">{movie.director}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-muted-foreground">Cast:</span>
                  <span className="col-span-2 font-medium">{movie.cast.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Showtimes & Booking */}
        <div className="mt-16 bg-card/30 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" /> Book Tickets
          </h2>

          {/* Date Selector */}
          <div className="flex overflow-x-auto gap-3 pb-4 mb-8 scrollbar-hide">
            {dates.map((date, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(i)}
                className={`flex flex-col items-center justify-center min-w-20 p-3 rounded-xl border transition-all ${
                  selectedDate === i 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-medium uppercase mb-1">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="text-xl font-bold">
                  {date.getDate()}
                </span>
                <span className="text-xs">
                  {date.toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </button>
            ))}
          </div>

          {/* Theaters & Showtimes */}
          <div className="space-y-6">
            {theaters.map((theater) => (
              <div key={theater.id} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    {theater.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">{theater.distance}</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {showtimes.map((st, i) => (
                    <Button 
                      key={i}
                      variant="outline" 
                      className={`h-12 border-white/10 relative overflow-hidden group ${
                        !st.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary/50'
                      }`}
                      disabled={!st.available}
                      onClick={() => setLocation(`/booking/${movie.id}/seats`)}
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-semibold">{st.time}</span>
                        <span className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors">{st.type}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">User Reviews</h2>
          <div className="grid gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    U{i}
                  </div>
                  <div>
                    <h4 className="font-medium">MovieFan{i}23</h4>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">2 days ago</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  "Absolutely brilliant! The visual effects were stunning and the storyline kept me on the edge of my seat throughout the entire movie. Highly recommend seeing this in IMAX."
                </p>
              </div>
            ))}
            <Button variant="outline" className="w-full border-white/10 mt-2">
              View All Reviews
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}