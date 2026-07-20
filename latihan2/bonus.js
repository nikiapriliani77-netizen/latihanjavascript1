const authors = [
  {
    id: 1,
    name: "Robert C. Martin",
    country: "USA"
  },
  {
    id: 2,
    name: "James Clear",
    country: "USA"
  },
  {
    id: 3,
    name: "Marijn Haverbeke",
    country: "Netherlands"
  },
  {
    id: 4,
    name: "Andrea Hirata",
    country: "Indonesia"
  }
];

const books = [
  {
    id: 1,
    title: "Clean Code",
    authorId: 1,
    categoryId: 1,
    year: 2008,
    available: true
  },
  {
    id: 2,
    title: "Atomic Habits",
    authorId: 2,
    categoryId: 2,
    year: 2018,
    available: false
  },
  {
    id: 3,
    title: "Eloquent JavaScript",
    authorId: 3,
    categoryId: 1,
    year: 2019,
    available: true
  },
  {
    id: 4,
    title: "Laskar Pelangi",
    authorId: 4,
    categoryId: 3,
    year: 2005,
    available: true
  }
];

const categories = [
    {
        id: 1,
        name: "Programming"
    },
    {
        id: 2,
        name: "Self Improvement"
    },
    {
        id: 3,
        name: "Novel"
    }
];

console.log("=== Nama Kategori Setiap Buku ===");

books.forEach(book => {
  const category = categories.find(c => c.id === book.categoryId);

  console.log(book.title + " - " + category.name);
});
console.log("\n=== Jumlah Buku Tiap Kategori ===");

categories.forEach(category => {
  const jumlah = books.filter(book => book.categoryId === category.id).length;

  console.log(category.name + " : " + jumlah);
});
let kategoriTerbanyak = "";
let jumlahTerbanyak = 0;

categories.forEach(category => {
  const jumlah = books.filter(book => book.categoryId === category.id).length;

  if (jumlah > jumlahTerbanyak) {
    jumlahTerbanyak = jumlah;
    kategoriTerbanyak = category.name;
  }
});

console.log("\nKategori dengan buku terbanyak:");
console.log(kategoriTerbanyak + " (" + jumlahTerbanyak + " buku)");