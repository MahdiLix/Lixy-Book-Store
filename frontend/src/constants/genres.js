export const GENRES = [
  "Fiction",
  "Love",
  "Novel",
  "History",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "Poetry",
  "Mystery",
  "Thriller",
  "Children",
  "Religious",
  "Self-help",
  "Other",
];

export const TOP_GENRES = [
  ...GENRES.filter((_genre, i) => i < 6), 
  "Other"
]