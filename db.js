const books = [
  {
    id: "1",
    name: "The Great Gatsby",
    genre: "Classic",
    author: { id: "A1", name: "F. Scott Fitzgerald", age: 44, books: [] },
  },
  {
    id: "2",
    name: "1984",
    genre: "Dystopian",
    author: { id: "A2", name: "George Orwell", age: 46, books: [] },
  },
  {
    id: "3",
    name: "To Kill a Mockingbird",
    genre: "Drama",
    author: { id: "A3", name: "Harper Lee", age: 89, books: [] },
  },
];

const authors = [
  { id: "A1", name: "F. Scott Fitzgerald", age: 44, books: [books[0]] },
  { id: "A2", name: "George Orwell", age: 46, books: [books[1]] },
  { id: "A3", name: "Harper Lee", age: 89, books: [books[2]] },
];
