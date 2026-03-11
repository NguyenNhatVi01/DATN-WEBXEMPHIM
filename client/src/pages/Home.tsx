import { useState } from "react";
import { Link } from "wouter";
import { Play, Calendar, MapPin, Search, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { movies } from "@/lib/data";

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

export default function Home() {
  const [activeTab, setActiveTab] = useState("now_showing");
  
  const featuredMovie = movies[0];
  const displayedMovies = movies.filter(m => 
    activeTab === "all" || m.status === activeTab
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-10" />
          <img 
            src={heroBg} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="container mx-auto px-4 z-20">
          <div className="max-w-2xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">PREMIERE</Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
              {featuredMovie.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {featuredMovie.imdb}</span>
              <span>|</span>
              <span>{featuredMovie.genre}</span>
              <span>|</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredMovie.duration}</span>
              <span>|</span>
              <Badge variant="outline" className="border-white/20 text-white">{featuredMovie.rating}</Badge>
            </div>
            <p className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
              {featuredMovie.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/movie/${featuredMovie.id}`}>
                <Button size="lg" className="h-14 px-8 text-lg font-semibold gap-2">
                  <Ticket className="w-5 h-5" /> Book Tickets
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm gap-2">
                <Play className="w-5 h-5" /> Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search / Booking Filter */}
      <section className="container mx-auto px-4 -mt-16 relative z-30">
        <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground px-1">Movie</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Select Movie..." className="pl-10 bg-black/40 border-white/10 h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground px-1">Theater</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Select Theater..." className="pl-10 bg-black/40 border-white/10 h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground px-1">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="date" className="pl-10 bg-black/40 border-white/10 h-12" />
              </div>
            </div>
            <Button size="lg" className="h-12 w-full">Search Showtimes</Button>
          </div>
        </div>
      </section>

      {/* Movie List Section */}
      <section className="container mx-auto px-4 mt-20">
        <Tabs defaultValue="now_showing" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Explore Movies</h2>
            <TabsList className="bg-white/5 border border-white/10 p-1">
              <TabsTrigger value="now_showing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Now Showing</TabsTrigger>
              <TabsTrigger value="coming_soon" className="data-[state=active]:bg-white/10">Coming Soon</TabsTrigger>
              <TabsTrigger value="special" className="data-[state=active]:bg-white/10">Special Screenings</TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayedMovies.map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <div className="group cursor-pointer relative">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 border border-white/10 bg-black/50">
                    {/* Fallback color if image is missing */}
                    <div className="absolute inset-0 bg-muted/20 animate-pulse" />
                    <img 
                      src={imageMap[movie.image]} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 relative z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-4">
                      <Button className="w-full gap-2" variant="secondary">
                        <Ticket className="w-4 h-4" /> Get Tickets
                      </Button>
                    </div>
                    <Badge className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-md border-white/20">
                      {movie.rating}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">{movie.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                    <span>{movie.genre}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" /> {movie.imdb}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {displayedMovies.length === 0 && (
            <div className="text-center py-20 text-muted-foreground border border-white/10 rounded-2xl bg-white/5">
              No movies found in this category right now.
            </div>
          )}
        </Tabs>
      </section>

      {/* Promos Section */}
      <section className="container mx-auto px-4 mt-24">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Offers & Promotions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden relative h-48 border border-white/10 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-purple-600/80 z-10" />
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-2 bg-white text-black hover:bg-white/90">Member Exclusive</Badge>
              <h3 className="text-2xl font-bold text-white mb-2">Buy 1 Get 1 Free</h3>
              <p className="text-white/80">Every Wednesday for Gold members.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden relative h-48 border border-white/10 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 z-10" />
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-2 bg-white text-black hover:bg-white/90">F&B Deal</Badge>
              <h3 className="text-2xl font-bold text-white mb-2">Free Upsize</h3>
              <p className="text-white/80">Upgrade your combo for free when paying with Momo.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Need to import Ticket separately to fix missing import above
import { Ticket } from "lucide-react";