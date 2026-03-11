import { useState } from "react";
import { MapPin, Phone, Heart, Navigation, Zap, Users, Wifi, ParkingCircle, Award, Star, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { theaters, theaterDetails, showtimes } from "@/lib/data";

export default function Theaters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState("all");
  const [selectedTheater, setSelectedTheater] = useState(theaters[0]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Mock districts
  const districts = ["All Districts", "District 1", "District 2", "District 3", "Binh Thanh", "Tan Binh"];

  // Mock dates for schedule
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  // Mock crowdedness levels (0-100)
  const getCrowdedness = (theaterId: number, dateIdx: number): number => {
    return 30 + (theaterId * 15 + dateIdx * 10) % 70;
  };

  const crowdLevel = getCrowdedness(selectedTheater.id, selectedDate);
  const crowdLabel = crowdLevel > 75 ? "Very Busy" : crowdLevel > 50 ? "Moderate" : "Spacious";
  const crowdColor = crowdLevel > 75 ? "bg-red-500" : crowdLevel > 50 ? "bg-yellow-500" : "bg-green-500";

  const toggleFavorite = (theaterId: number) => {
    setFavorites(prev =>
      prev.includes(theaterId) ? prev.filter(id => id !== theaterId) : [...prev, theaterId]
    );
  };

  // Filter theaters
  const filteredTheaters = theaters.filter(theater => {
    const matchesSearch = theater.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrictFilter === "all" || theater.district === selectedDistrictFilter;
    return matchesSearch && matchesDistrict;
  });

  const currentTheater = theaterDetails.find(t => t.id === selectedTheater.id) || theaterDetails[0];

  return (
    <div className="min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-primary/20 to-transparent pt-12 pb-8 border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Find Our Theaters</h1>
          <p className="text-muted-foreground text-lg">Locate and explore our premium cinema locations</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Theater List */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search */}
            <div className="sticky top-24 space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search theaters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/30 border-white/10 h-11"
                />
              </div>

              {/* District Filter */}
              <div className="bg-card/30 border border-white/10 rounded-xl p-3 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">District</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {districts.map(district => (
                    <button
                      key={district}
                      onClick={() => setSelectedDistrictFilter(district === "All Districts" ? "all" : district)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        (selectedDistrictFilter === "all" && district === "All Districts") ||
                        selectedDistrictFilter === district
                          ? "bg-primary text-white font-medium"
                          : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {district}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theater List */}
              <div className="bg-card/30 border border-white/10 rounded-xl p-3 space-y-2 max-h-96 overflow-y-auto">
                {filteredTheaters.length > 0 ? (
                  filteredTheaters.map(theater => (
                    <button
                      key={theater.id}
                      onClick={() => setSelectedTheater(theater)}
                      className={`w-full text-left p-3 rounded-lg transition-all border ${
                        selectedTheater.id === theater.id
                          ? "bg-primary/20 border-primary text-white"
                          : "border-white/10 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm line-clamp-1">{theater.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{theater.distance}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(theater.id);
                          }}
                          className="text-red-500 hover:scale-110 transition-transform"
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(theater.id) ? "fill-red-500" : ""}`} />
                        </button>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">No theaters found</p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Theater Header */}
            <div className="bg-gradient-to-r from-card/50 to-black/50 border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedTheater.name}</h2>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {selectedTheater.address}
                  </p>
                </div>
                <Button
                  variant={favorites.includes(selectedTheater.id) ? "default" : "outline"}
                  size="lg"
                  className="gap-2 border-white/10"
                  onClick={() => toggleFavorite(selectedTheater.id)}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(selectedTheater.id) ? "fill-white" : ""}`} />
                  {favorites.includes(selectedTheater.id) ? "Favorited" : "Add to Favorites"}
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-black/40 rounded-lg p-3 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Call</p>
                    <p className="text-sm font-mono font-bold truncate">{selectedTheater.phone}</p>
                  </div>
                </div>
                <div className="bg-black/40 rounded-lg p-3 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="text-sm font-bold">{selectedTheater.distance}</p>
                  </div>
                </div>
                <Button variant="outline" className="border-white/10 bg-white/5 col-span-2 md:col-span-1 gap-2">
                  <Navigation className="w-4 h-4" /> Get Directions
                </Button>
              </div>
            </div>

            {/* Amenities & Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Amenities */}
              <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Zap className="text-primary" /> Amenities
                </h3>
                <div className="space-y-3">
                  {currentTheater.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-3 text-sm">
                      {amenity.includes("Parking") && <ParkingCircle className="w-5 h-5 text-primary" />}
                      {amenity.includes("Massage") && <Award className="w-5 h-5 text-primary" />}
                      {amenity.includes("WiFi") && <Wifi className="w-5 h-5 text-primary" />}
                      {amenity.includes("Kids") && <Users className="w-5 h-5 text-primary" />}
                      {!amenity.includes("Parking") && !amenity.includes("Massage") && 
                       !amenity.includes("WiFi") && !amenity.includes("Kids") && 
                       <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crowdedness & Info */}
              <div className="bg-card/30 border border-white/10 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">Crowdedness</h3>
                  <p className="text-sm text-muted-foreground mb-2">Today at {selectedDate === 0 ? "Now" : "Selected time"}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{crowdLabel}</span>
                      <span className="text-muted-foreground">{crowdLevel}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div className={`h-full ${crowdColor} transition-all`} style={{ width: `${crowdLevel}%` }} />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" /> Theater Rating
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <span className="text-sm font-bold">{currentTheater.rating}</span>
                    <span className="text-xs text-muted-foreground">({currentTheater.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Calendar className="text-primary" /> Showtimes Schedule
              </h3>

              {/* Date Selector */}
              <div className="flex overflow-x-auto gap-2 pb-6 mb-6 scrollbar-hide">
                {dates.map((date, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(i)}
                    className={`flex flex-col items-center justify-center min-w-20 p-3 rounded-xl border transition-all ${
                      selectedDate === i
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                        : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                    }`}
                  >
                    <span className="text-xs font-medium uppercase mb-1">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="text-lg font-bold">{date.getDate()}</span>
                  </button>
                ))}
              </div>

              {/* Movies Schedule */}
              <div className="space-y-4">
                {showtimes.slice(0, 3).map((st, idx) => (
                  <div key={idx} className="bg-black/40 rounded-xl p-4 border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-white mb-1">Movie Title {idx + 1}</h4>
                        <Badge variant="outline" className="text-xs border-white/20 bg-white/5">
                          {st.type}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">142 min</span>
                    </div>

                    {/* Showtimes */}
                    <div className="flex flex-wrap gap-2">
                      {["09:30 AM", "12:30 PM", "03:30 PM", "06:30 PM", "09:30 PM"].map((time, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="border-white/20 hover:border-primary/50 text-xs"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3">Private Screening</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Rent the entire theater for your special event or group gathering.
                </p>
                <Button className="w-full gap-2">Book Private Hall</Button>
              </div>

              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-600/30 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3">Pre-Order Services</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Reserve parking or pre-order snacks to skip the lines.
                </p>
                <Button variant="outline" className="w-full border-blue-400/50 hover:bg-blue-600/10 gap-2">
                  Pre-Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
