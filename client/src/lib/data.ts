export const movies = [
  {
    id: 1,
    title: "The Silent Echo",
    genre: "Action, Sci-Fi",
    duration: "142 min",
    rating: "T16",
    image: "action",
    description: "In a distant future where sound is currency, a lone rebel must find the source of the legendary Silent Echo to save humanity from a tyrannical regime.",
    director: "Jane Doe",
    cast: ["John Smith", "Alice Johnson", "Bob Brown"],
    imdb: 8.5,
    status: "now_showing",
    releaseDate: "2024-01-15",
    formats: ["2D", "3D", "IMAX"],
    technology: ["IMAX", "Dolby Atmos"],
    showtimeStatus: ""
  },
  {
    id: 2,
    title: "Neon Dreams",
    genre: "Sci-Fi, Thriller",
    duration: "128 min",
    rating: "T18",
    image: "scifi",
    description: "A detective navigates the neon-lit streets of a cyberpunk metropolis to uncover a conspiracy that blurs the lines between reality and simulation.",
    director: "Alan Smithee",
    cast: ["Eva Green", "Michael Chang"],
    imdb: 7.9,
    status: "now_showing",
    releaseDate: "2024-02-10",
    formats: ["2D", "3D", "4DX"],
    technology: ["4DX", "ScreenX", "Dolby Atmos"],
    showtimeStatus: "sneak_show"
  },
  {
    id: 3,
    title: "Whispering Woods",
    genre: "Horror, Mystery",
    duration: "105 min",
    rating: "T18",
    image: "horror",
    description: "A group of friends visiting a remote cabin discover that the surrounding woods hold dark, ancient secrets that are hungry for new visitors.",
    director: "Sam Raimi (Not really)",
    cast: ["Sarah Connor", "Ash Williams"],
    imdb: 6.8,
    status: "coming_soon",
    releaseDate: "2024-03-25",
    formats: ["2D", "3D"],
    technology: ["Dolby Atmos"],
    showtimeStatus: "last_chance"
  },
  {
    id: 4,
    title: "Autumn Leaves",
    genre: "Romance, Comedy",
    duration: "115 min",
    rating: "T13",
    image: "romcom",
    description: "Two strangers with nothing in common find themselves continually bumping into each other during a magical autumn in New York City.",
    director: "Nora Ephron",
    cast: ["Meg Ryan", "Tom Hanks"],
    imdb: 7.2,
    status: "coming_soon",
    releaseDate: "2024-03-10",
    formats: ["2D"],
    technology: [],
    showtimeStatus: ""
  },
  { id: 5, title: "Midnight Heist", genre: "Crime, Thriller", duration: "138 min", rating: "T16", image: "action", description: "A mastermind plans the most audacious casino heist in Vegas history.", director: "Christopher Nolan", cast: ["Tom Hardy", "Michael B. Jordan"], imdb: 8.2, status: "now_showing", releaseDate: "2024-01-20", formats: ["2D", "IMAX"], technology: ["IMAX"], showtimeStatus: "" },
  { id: 6, title: "Galaxy Defenders", genre: "Action, Sci-Fi", duration: "156 min", rating: "T13", image: "action", description: "An alien force threatens Earth and only a band of heroes can save it.", director: "Joss Whedon", cast: ["Chris Evans", "Scarlett Johansson"], imdb: 8.0, status: "now_showing", releaseDate: "2024-01-25", formats: ["3D", "IMAX"], technology: ["IMAX", "Dolby Atmos"], showtimeStatus: "" },
  { id: 7, title: "Love in Paris", genre: "Romance, Drama", duration: "132 min", rating: "T13", image: "romcom", description: "Two artists find unexpected love in the city of lights.", director: "Greta Gerwig", cast: ["Timothée Chalamet", "Florence Pugh"], imdb: 7.8, status: "now_showing", releaseDate: "2024-02-01", formats: ["2D"], technology: [], showtimeStatus: "" },
  { id: 8, title: "Dark Secrets", genre: "Horror, Mystery", duration: "118 min", rating: "T18", image: "horror", description: "A family uncovers terrifying secrets within the walls of their new home.", director: "Ari Aster", cast: ["Toni Collette", "Gabriel Byrne"], imdb: 7.5, status: "coming_soon", releaseDate: "2024-03-15", formats: ["2D", "3D"], technology: ["Dolby Atmos"], showtimeStatus: "" },
  { id: 9, title: "Quantum Leap", genre: "Sci-Fi, Adventure", duration: "145 min", rating: "T13", image: "scifi", description: "A scientist discovers a portal to alternate universes.", director: "Denis Villeneuve", cast: ["Oscar Isaac", "Jessica Chastain"], imdb: 8.1, status: "now_showing", releaseDate: "2024-02-08", formats: ["2D", "3D", "IMAX"], technology: ["IMAX", "Dolby Atmos"], showtimeStatus: "" },
  { id: 10, title: "Laugh Out Loud", genre: "Comedy", duration: "102 min", rating: "T13", image: "romcom", description: "A comedy troupe prepares for the biggest show of their lives.", director: "Taika Waititi", cast: ["Will Ferrell", "Kristen Wiig"], imdb: 7.3, status: "now_showing", releaseDate: "2024-01-30", formats: ["2D"], technology: [], showtimeStatus: "" },
  { id: 11, title: "The Last Knight", genre: "Action, Fantasy", duration: "148 min", rating: "T16", image: "action", description: "A warrior must stop an ancient evil from destroying the realm.", director: "Peter Jackson", cast: ["Henry Cavill", "Charlize Theron"], imdb: 7.9, status: "coming_soon", releaseDate: "2024-03-30", formats: ["2D", "3D", "IMAX"], technology: ["IMAX", "Dolby Atmos"], showtimeStatus: "" },
  { id: 12, title: "Silent Whispers", genre: "Horror, Thriller", duration: "110 min", rating: "T18", image: "horror", description: "A haunted voice leads a woman to uncover her family's dark past.", director: "Karyn Kusama", cast: ["Kaitlyn Dever", "Claire Foy"], imdb: 7.6, status: "now_showing", releaseDate: "2024-02-03", formats: ["2D"], technology: ["Dolby Atmos"], showtimeStatus: "" },
  { id: 13, title: "Cosmic Journey", genre: "Sci-Fi, Adventure", duration: "152 min", rating: "T13", image: "scifi", description: "Explorers journey to the edges of known space.", director: "James Cameron", cast: ["Zoe Saldana", "Sam Worthington"], imdb: 8.3, status: "now_showing", releaseDate: "2024-01-28", formats: ["3D", "IMAX"], technology: ["IMAX", "ScreenX", "Dolby Atmos"], showtimeStatus: "" },
  { id: 14, title: "Romantic Getaway", genre: "Romance, Comedy", duration: "108 min", rating: "T13", image: "romcom", description: "A vacation brings two rivals closer together.", director: "Jenny Bowen", cast: ["Anna Kendrick", "Justin Timberlake"], imdb: 7.0, status: "coming_soon", releaseDate: "2024-03-20", formats: ["2D"], technology: [], showtimeStatus: "" },
  { id: 15, title: "Underground", genre: "Crime, Drama", duration: "129 min", rating: "T16", image: "action", description: "A streetwise entrepreneur builds an illegal empire.", director: "Mario Van Peebles", cast: ["Michael B. Jordan", "Jurnee Smollett-Bell"], imdb: 7.7, status: "now_showing", releaseDate: "2024-02-05", formats: ["2D"], technology: [], showtimeStatus: "" },
  { id: 16, title: "Phantom Protocol", genre: "Action, Thriller", duration: "135 min", rating: "T16", image: "action", description: "A secret agent must uncover a plot within the agency.", director: "Brad Bird", cast: ["Tom Cruise", "Rebecca Ferguson"], imdb: 8.4, status: "now_showing", releaseDate: "2024-02-12", formats: ["2D", "IMAX"], technology: ["IMAX"], showtimeStatus: "sneak_show" },
  { id: 17, title: "Shadowed Heart", genre: "Horror, Romance", duration: "115 min", rating: "T16", image: "horror", description: "A love story between a human and a supernatural being.", director: "Cary Fukunaga", cast: ["Thomasin McKenzie", "Riz Ahmed"], imdb: 7.4, status: "coming_soon", releaseDate: "2024-03-22", formats: ["2D", "3D"], technology: ["Dolby Atmos"], showtimeStatus: "" },
  { id: 18, title: "Final Frontier", genre: "Sci-Fi, Adventure", duration: "160 min", rating: "T13", image: "scifi", description: "Humanity's last chance to find a new home.", director: "Christopher Nolan", cast: ["Matthew McConaughey", "Anne Hathaway"], imdb: 8.6, status: "coming_soon", releaseDate: "2024-03-28", formats: ["2D", "3D", "IMAX"], technology: ["IMAX", "Dolby Atmos"], showtimeStatus: "last_chance" },
  { id: 19, title: "Comedy Gold", genre: "Comedy, Drama", duration: "98 min", rating: "T13", image: "romcom", description: "A struggling comedian gets one last shot at stardom.", director: "Judd Apatow", cast: ["Adam Sandler", "Tilda Swinton"], imdb: 7.2, status: "now_showing", releaseDate: "2024-02-07", formats: ["2D"], technology: [], showtimeStatus: "" },
  { id: 20, title: "Revenge of Kings", genre: "Action, Drama", duration: "142 min", rating: "T16", image: "action", description: "A dethroned king seeks to reclaim his crown.", director: "David Leitch", cast: ["Henry Cavill", "Charlize Theron"], imdb: 8.0, status: "now_showing", releaseDate: "2024-02-09", formats: ["2D", "IMAX"], technology: ["IMAX"], showtimeStatus: "" },
  { id: 21, title: "Eternal Night", genre: "Horror, Fantasy", duration: "125 min", rating: "T18", image: "horror", description: "Vampires emerge from the shadows to reclaim the world.", director: "Fede Álvarez", cast: ["Nicolas Cage", "Ryan Reynolds"], imdb: 7.3, status: "coming_soon", releaseDate: "2024-03-25", formats: ["2D", "3D"], technology: ["Dolby Atmos"], showtimeStatus: "" },
  { id: 22, title: "Love & Thunder", genre: "Action, Romance", duration: "138 min", rating: "T13", image: "action", description: "A superhero discovers that love is his greatest power.", director: "Taika Waititi", cast: ["Chris Hemsworth", "Natalie Portman"], imdb: 7.8, status: "now_showing", releaseDate: "2024-01-31", formats: ["2D", "3D", "IMAX"], technology: ["IMAX", "Dolby Atmos"], showtimeStatus: "" },
  { id: 23, title: "Mystery at Midnight", genre: "Mystery, Thriller", duration: "118 min", rating: "T16", image: "scifi", description: "A detective must solve a case before midnight or lose everything.", director: "Oren Moverman", cast: ["Timothée Chalamet", "Marion Cotillard"], imdb: 7.5, status: "now_showing", releaseDate: "2024-02-06", formats: ["2D"], technology: [], showtimeStatus: "" },
  { id: 24, title: "Hearts Collide", genre: "Romance, Drama", duration: "112 min", rating: "T13", image: "romcom", description: "Two souls find connection against all odds.", director: "Emerald Fennell", cast: ["Saoirse Ronan", "Paul Mescal"], imdb: 7.7, status: "coming_soon", releaseDate: "2024-03-18", formats: ["2D"], technology: [], showtimeStatus: "" }
];

export const genres = [
  "Action",
  "Sci-Fi",
  "Horror",
  "Mystery",
  "Romance",
  "Comedy",
  "Drama",
  "Thriller",
  "Animation",
  "Documentary"
];

export const formats = [
  "2D",
  "3D",
  "IMAX",
  "4DX",
  "ScreenX"
];

export const technologies = [
  "IMAX",
  "4DX",
  "ScreenX",
  "Dolby Atmos"
];

export const sortOptions = [
  { id: "rating", label: "Rating (High to Low)" },
  { id: "rating-asc", label: "Rating (Low to High)" },
  { id: "release-newest", label: "Newest First" },
  { id: "release-oldest", label: "Oldest First" },
  { id: "title-asc", label: "Title (A to Z)" },
  { id: "title-desc", label: "Title (Z to A)" }
];

export const theaters = [
  { 
    id: 1, 
    name: "Cineplex Central", 
    distance: "2.5 km",
    address: "123 Nguyen Hue Blvd, District 1, Ho Chi Minh City",
    phone: "(028) 3822-1234",
    district: "District 1"
  },
  { 
    id: 2, 
    name: "Starlight Arena", 
    distance: "4.1 km",
    address: "456 Le Loi Street, District 3, Ho Chi Minh City",
    phone: "(028) 3829-5678",
    district: "District 3"
  },
  { 
    id: 3, 
    name: "Galaxy ScreenX", 
    distance: "6.8 km",
    address: "789 Tran Hung Dao Road, District 2, Ho Chi Minh City",
    phone: "(028) 3845-9012",
    district: "District 2"
  },
  { 
    id: 4, 
    name: "Premier Gold Class", 
    distance: "3.2 km",
    address: "321 Cach Mang Thang 8, Binh Thanh, Ho Chi Minh City",
    phone: "(028) 3512-3456",
    district: "Binh Thanh"
  },
  { 
    id: 5, 
    name: "Mega Cinema Hub", 
    distance: "5.5 km",
    address: "654 Dien Bien Phu, Tan Binh, Ho Chi Minh City",
    phone: "(028) 3844-7890",
    district: "Tan Binh"
  }
];

export const theaterDetails = [
  {
    id: 1,
    name: "Cineplex Central",
    amenities: ["Free WiFi", "Parking Available", "Massage Seats", "Kids Play Area"],
    rating: 4.8,
    reviews: 342,
    technologies: ["IMAX", "4DX", "Dolby Atmos"]
  },
  {
    id: 2,
    name: "Starlight Arena",
    amenities: ["Free WiFi", "Premium Parking", "Gold Class Seats"],
    rating: 4.6,
    reviews: 289,
    technologies: ["ScreenX", "Dolby Cinema"]
  },
  {
    id: 3,
    name: "Galaxy ScreenX",
    amenities: ["Valet Parking", "Premium Lounge", "Massage Seats"],
    rating: 4.9,
    reviews: 415,
    technologies: ["ScreenX", "4DX", "Dolby Atmos"]
  },
  {
    id: 4,
    name: "Premier Gold Class",
    amenities: ["Complimentary Parking", "Luxury Lounge", "Premium Seats", "WiFi"],
    rating: 4.7,
    reviews: 198,
    technologies: ["Gold Class", "Dolby Atmos"]
  },
  {
    id: 5,
    name: "Mega Cinema Hub",
    amenities: ["Free Parking", "Kids Zone", "WiFi", "Food Court"],
    rating: 4.5,
    reviews: 267,
    technologies: ["IMAX", "3D", "Dolby Atmos"]
  }
];

export const showtimes = [
  { time: "09:30 AM", type: "2D", available: true },
  { time: "11:45 AM", type: "3D", available: true },
  { time: "02:15 PM", type: "IMAX", available: true },
  { time: "05:00 PM", type: "2D", available: false },
  { time: "08:30 PM", type: "IMAX", available: true },
  { time: "11:00 PM", type: "2D", available: true }
];

export const concessions = [
  { id: 1, name: "Solo Combo", description: "1 Medium Popcorn + 1 Medium Drink", price: 85000, image: "concession-combo" },
  { id: 2, name: "Couple Combo", description: "1 Large Popcorn + 2 Medium Drinks", price: 125000, image: "concession-combo" },
  { id: 3, name: "Family Combo", description: "2 Large Popcorns + 4 Medium Drinks", price: 210000, image: "concession-combo" },
];
