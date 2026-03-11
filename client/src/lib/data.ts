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
    showtimeStatus: "" // empty, sneak_show, last_chance
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
  }
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
  { id: 1, name: "Cineplex Central", distance: "2.5 km" },
  { id: 2, name: "Starlight Arena", distance: "4.1 km" },
  { id: 3, name: "Galaxy ScreenX", distance: "6.8 km" }
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
