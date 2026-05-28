// src/store/dataStore.js
// ---------------------------------------------------------------------------
// Single source of truth for all in-memory data.
// Every route module imports { games, reviews, notifications, userProfile }
// from here so they all share the same array references.
// ---------------------------------------------------------------------------

const games = [
  {
    appid: "3057270",
    name: "Seafarer's Gambit",
    release_year: 2024,
    release_date: "Jul 5, 2024",
    genres: ["Action", "Adventure", "Indie", "RPG", "Strategy"],
    categories: ["Single-player", "Family Sharing", "Multiplayer"],
    platforms: ["windows", "mac"],
    tags: ["multiplayer", "survival", "sailing", "action", "open-world"],
    rating: 8.5,
    discounted: true,
    price: 3.99,
    originalPrice: 9.99,
    recommendations: 120,
    downloads: 450000,
    popularity: 88,
    isEarlyAccess: false,
    isVROnly: false,
    developer: "Bouncy Rocket Studios",
    publisher: "Bouncy Rocket Studios",
    isDeleted: false,
    history: [],
    screenshots: [],
    trailers: []
  },
  {
    appid: "3822840",
    name: "Capitalist Misadventures",
    release_year: 2025,
    release_date: "Jul 25, 2025",
    genres: ["Casual", "Indie", "Simulation", "Strategy"],
    categories: ["Single-player", "Save Anytime", "Family Sharing"],
    platforms: ["windows"],
    tags: ["capitalism", "funny", "multiplayer", "indie"],
    rating: 9.2,
    discounted: false,
    price: 7.99,
    originalPrice: 7.99,
    recommendations: 85,
    downloads: 120000,
    popularity: 76,
    isEarlyAccess: true,
    isVROnly: false,
    developer: "Caramelo Studios",
    publisher: "Caramelo Studios",
    isDeleted: false,
    history: [],
    screenshots: [],
    trailers: []
  },
  {
    appid: "3216640",
    name: "The Beast and the Princess",
    release_year: 2025,
    release_date: "Jun 17, 2025",
    genres: ["Adventure", "Indie", "Strategy"],
    categories: [
      "Single-player",
      "Steam Achievements",
      "Full controller support",
      "Custom Volume Controls",
      "Adjustable Difficulty"
    ],
    platforms: ["windows", "mac", "linux"],
    tags: ["story-rich", "anime", "co-op", "adventure", "horror"],
    rating: 9.0,
    discounted: false,
    price: 0.0,
    originalPrice: 0.0,
    recommendations: 250,
    downloads: 850000,
    popularity: 95,
    isEarlyAccess: false,
    isVROnly: false,
    developer: "MangaGamer",
    publisher: "MangaGamer",
    isDeleted: false,
    history: [],
    screenshots: [],
    trailers: []
  },
  {
    appid: "244210",
    name: "Cyberpunk VR Quest",
    release_year: 2023,
    release_date: "Dec 12, 2023",
    genres: ["Action", "Indie", "RPG"],
    categories: ["Single-player", "VR Only", "Tracked Controller Support"],
    platforms: ["windows"],
    tags: ["vr", "cyberpunk", "action", "first-person"],
    rating: 7.8,
    discounted: true,
    price: 19.99,
    originalPrice: 29.99,
    recommendations: 340,
    downloads: 230000,
    popularity: 80,
    isEarlyAccess: false,
    isVROnly: true,
    developer: "Cyber Labs Interactive",
    publisher: "Cyber Labs Interactive",
    isDeleted: false,
    history: [],
    screenshots: [],
    trailers: []
  }
];

const reviews = [
  {
    _id: "review_1",
    user: {
      _id: "6650b2849b20b22a5c531d04",
      name: "Anisha Chhajer Admin",
      email: "anisha_admin@test.com"
    },
    gameAppid: "3057270",
    rating: 5,
    comment: "Absolutely incredible game! The strategy elements are top notch.",
    recommend: true,
    createdAt: new Date().toISOString()
  }
];

const notifications = [
  { id: "notif_1", message: "A new version of Seafarer's Gambit is out!", read: false },
  { id: "notif_2", message: "Special promotion on Indie games started.", read: true }
];

const userProfile = {
  _id: "6650b2849b20b22a5c531d04",
  name: "Anisha Chhajer Admin",
  email: "anisha_admin@test.com",
  role: "admin",
  preferences: ["RPG", "Strategy"]
};

// ---------------------------------------------------------------------------
// Helper: paginate + sort any array based on query params
// ---------------------------------------------------------------------------
const paginateAndSort = (array, req) => {
  let list = [...array];

  if (req.query.sort) {
    const s = req.query.sort;
    if (s === "price")       list.sort((a, b) => a.price - b.price);
    else if (s === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (s === "downloads") list.sort((a, b) => b.downloads - a.downloads);
    else if (s === "releaseDate") list.sort((a, b) => a.release_year - b.release_year);
    else if (s === "title")  list.sort((a, b) => a.name.localeCompare(b.name));
    else if (s === "popularity") list.sort((a, b) => b.popularity - a.popularity);
  }

  const page  = parseInt(req.query.page,  10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip  = (page - 1) * limit;

  return {
    data: list.slice(skip, skip + limit),
    pagination: {
      page,
      limit,
      total: list.length,
      pages: Math.ceil(list.length / limit)
    }
  };
};

module.exports = { games, reviews, notifications, userProfile, paginateAndSort };
