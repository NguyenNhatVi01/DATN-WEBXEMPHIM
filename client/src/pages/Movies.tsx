import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, Filter, Star, Ticket, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { movies, genres, formats, technologies, sortOptions } from "@/lib/data";

// Import images
import actionPoster from "@/assets/images/poster-action.png";
import scifiPoster from "@/assets/images/poster-scifi.png";
import horrorPoster from "@/assets/images/poster-horror.png";
import romcomPoster from "@/assets/images/poster-romcom.png";

const imageMap: Record<string, string> = {
  action: actionPoster,
  scifi: scifiPoster,
  horror: horrorPoster,
  romcom: romcomPoster,
};

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState("rating");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Toggle filter selections
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleFormat = (format: string) => {
    setSelectedFormats(prev =>
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
  };

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedFormats([]);
    setSelectedTechnologies([]);
    setSelectedStatus("");
    setSortBy("rating");
  };

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let results = [...movies];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.cast.some(actor => actor.toLowerCase().includes(query))
      );
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      results = results.filter(movie =>
        selectedGenres.some(genre =>
          movie.genre.split(",").map(g => g.trim()).includes(genre)
        )
      );
    }

    // Format filter
    if (selectedFormats.length > 0) {
      results = results.filter(movie =>
        selectedFormats.some(format => movie.formats.includes(format))
      );
    }

    // Technology filter
    if (selectedTechnologies.length > 0) {
      results = results.filter(movie =>
        selectedTechnologies.some(tech => movie.technology.includes(tech))
      );
    }

    // Status filter
    if (selectedStatus) {
      if (selectedStatus === "sneak") {
        results = results.filter(m => m.showtimeStatus === "sneak_show");
      } else if (selectedStatus === "last") {
        results = results.filter(m => m.showtimeStatus === "last_chance");
      }
    }

    // Sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.imdb - a.imdb;
        case "rating-asc":
          return a.imdb - b.imdb;
        case "release-newest":
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case "release-oldest":
          return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return results;
  }, [searchQuery, selectedGenres, selectedFormats, selectedTechnologies, selectedStatus, sortBy]);

  const activeFiltersCount = 
    selectedGenres.length + selectedFormats.length + selectedTechnologies.length + (selectedStatus ? 1 : 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-primary/20 to-transparent pt-12 pb-8 border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Browse Movies</h1>
          <p className="text-muted-foreground text-lg">Discover and book your favorite films</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="bg-card/30 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search movies or actors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-black/40 border-white/10 h-11"
                  />
                </div>
              </div>

              {/* Filter Header with Clear Button */}
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" /> Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Clear all ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Genre Filter */}
              <div className="bg-card/30 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">Genre</h4>
                <div className="space-y-3">
                  {genres.map(genre => (
                    <Label key={genre} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => toggleGenre(genre)}
                        className="rounded border-white/20"
                      />
                      <span className="text-sm group-hover:text-primary transition-colors">{genre}</span>
                    </Label>
                  ))}
                </div>
              </div>

              {/* Format Filter */}
              <div className="bg-card/30 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">Format</h4>
                <div className="space-y-3">
                  {formats.map(format => (
                    <Label key={format} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox
                        checked={selectedFormats.includes(format)}
                        onCheckedChange={() => toggleFormat(format)}
                        className="rounded border-white/20"
                      />
                      <span className="text-sm group-hover:text-primary transition-colors">{format}</span>
                    </Label>
                  ))}
                </div>
              </div>

              {/* Technology Filter */}
              <div className="bg-card/30 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" /> Technology
                </h4>
                <div className="space-y-3">
                  {technologies.map(tech => (
                    <Label key={tech} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox
                        checked={selectedTechnologies.includes(tech)}
                        onCheckedChange={() => toggleTechnology(tech)}
                        className="rounded border-white/20"
                      />
                      <span className="text-sm group-hover:text-primary transition-colors">{tech}</span>
                    </Label>
                  ))}
                </div>
              </div>

              {/* Showtime Status */}
              <div className="bg-card/30 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">Showtime Status</h4>
                <RadioGroup value={selectedStatus} onValueChange={setSelectedStatus}>
                  <Label className="flex items-center gap-3 cursor-pointer mb-3">
                    <RadioGroupItem value="" id="status-all" className="text-primary" />
                    <span className="text-sm">All Showtimes</span>
                  </Label>
                  <Label className="flex items-center gap-3 cursor-pointer mb-3">
                    <RadioGroupItem value="sneak" id="status-sneak" className="text-primary" />
                    <span className="text-sm">🎬 Sneak Show</span>
                  </Label>
                  <Label className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem value="last" id="status-last" className="text-primary" />
                    <span className="text-sm">⏰ Last Chance</span>
                  </Label>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6 flex gap-3 items-center">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 border-white/10 hover:bg-white/5 gap-2"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="w-5 h-5" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearAllFilters}
                  className="text-primary hover:bg-primary/10"
                >
                  Clear
                </Button>
              )}
            </div>

            {/* Mobile Filters Panel */}
            {showMobileFilters && (
              <div className="lg:hidden mb-6 bg-card/30 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6 animate-in slide-in-from-top-4">
                {/* Mobile Filter Content */}
                <div>
                  <h4 className="font-semibold text-sm mb-4 uppercase">Genre</h4>
                  <div className="flex flex-wrap gap-2">
                    {genres.map(genre => (
                      <Badge
                        key={genre}
                        variant={selectedGenres.includes(genre) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedGenres.includes(genre) 
                            ? "bg-primary" 
                            : "border-white/20 hover:border-white/40"
                        }`}
                        onClick={() => toggleGenre(genre)}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <h4 className="font-semibold text-sm mb-4 uppercase">Format</h4>
                  <div className="flex flex-wrap gap-2">
                    {formats.map(format => (
                      <Badge
                        key={format}
                        variant={selectedFormats.includes(format) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedFormats.includes(format)
                            ? "bg-primary"
                            : "border-white/20 hover:border-white/40"
                        }`}
                        onClick={() => toggleFormat(format)}
                      >
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sorting */}
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/20 border border-white/10 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-white">{filteredMovies.length}</span> movies
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-sm font-medium hover:border-white/30 transition-colors cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Movies Grid */}
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMovies.map(movie => (
                  <Link key={movie.id} href={`/movie/${movie.id}`}>
                    <div className="group cursor-pointer relative h-full">
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 border border-white/10 bg-black/50">
                        <img
                          src={imageMap[movie.image]}
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-4">
                          <Button className="w-full gap-2" variant="secondary">
                            <Ticket className="w-4 h-4" /> Get Tickets
                          </Button>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                          <Badge className="bg-black/60 backdrop-blur-md border-white/20">
                            {movie.rating}
                          </Badge>
                          {movie.showtimeStatus === "sneak_show" && (
                            <Badge className="bg-amber-500/80 text-black border-0 text-xs font-bold">
                              🎬 SNEAK
                            </Badge>
                          )}
                          {movie.showtimeStatus === "last_chance" && (
                            <Badge className="bg-red-500/80 text-white border-0 text-xs font-bold">
                              ⏰ LAST
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
                          {movie.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="line-clamp-1">{movie.genre}</span>
                          <span className="flex items-center gap-1 shrink-0 ml-2">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {movie.imdb}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-2">
                          {movie.formats.slice(0, 2).map(format => (
                            <Badge key={format} variant="outline" className="text-[10px] border-white/20">
                              {format}
                            </Badge>
                          ))}
                          {movie.formats.length > 2 && (
                            <Badge variant="outline" className="text-[10px] border-white/20">
                              +{movie.formats.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card/20 border border-white/10 rounded-3xl">
                <p className="text-muted-foreground text-lg mb-4">No movies found matching your filters</p>
                <Button onClick={clearAllFilters} variant="outline" className="border-white/10">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
