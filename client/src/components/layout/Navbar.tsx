import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Film, User, Search, Ticket, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { movies } from "@/lib/data";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter movies based on search query
  const searchResults = searchQuery.trim() === "" 
    ? [] 
    : movies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);

  const handleSearchSelect = (movieId: number) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setLocation(`/movie/${movieId}`);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <a className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tighter">
              <Film className="w-8 h-8" />
              <span>CINEBOOK</span>
            </a>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
                Home
              </a>
            </Link>
            <Link href="/movies">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location.startsWith('/movies') ? 'text-primary' : 'text-muted-foreground'}`}>
                Movies
              </a>
            </Link>
            <Link href="/theaters">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location.startsWith('/theaters') ? 'text-primary' : 'text-muted-foreground'}`}>
                Theaters
              </a>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Box */}
          <div className="relative" ref={searchRef}>
            {isSearchOpen ? (
              <div className="flex items-center animate-in slide-in-from-right-4 fade-in duration-200">
                <div className="relative w-48 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    autoFocus
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-9 h-9 bg-black/40 border-white/20 focus-visible:ring-primary rounded-full text-sm"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {/* Search Results Dropdown */}
                {searchQuery.trim() !== "" && (
                  <div className="absolute top-full mt-2 w-full bg-card border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 animate-in fade-in zoom-in-95">
                    {searchResults.length > 0 ? (
                      searchResults.map(movie => (
                        <button
                          key={movie.id}
                          onClick={() => handleSearchSelect(movie.id)}
                          className="w-full text-left px-4 py-2 hover:bg-white/5 transition-colors flex flex-col"
                        >
                          <span className="font-medium text-sm line-clamp-1">{movie.title}</span>
                          <span className="text-xs text-muted-foreground">{movie.genre}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                        No movies found
                      </div>
                    )}
                    <div className="border-t border-white/5 mt-1 pt-1">
                      <button 
                        onClick={() => {
                          setLocation(`/movies`);
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="w-full text-center px-4 py-2 text-xs text-primary hover:bg-primary/10 transition-colors font-medium"
                      >
                        View all movies
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>
            )}
          </div>

          <Link href="/tickets">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
              <Ticket className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/auth">
            <Button variant="outline" className="border-white/20 hover:bg-white/10 hidden sm:flex gap-2">
              <span>Sign In</span>
            </Button>
          </Link>
          {/* Mobile menu trigger could go here */}
        </div>
      </div>
    </nav>
  );
}
