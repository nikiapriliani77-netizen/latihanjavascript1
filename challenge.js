// 1. Inisialisasi data buku (contoh data perpustakaan)
const books = [
  {
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    year: 2005,
    available: true
  },
  {
    title: "Bumi",
    author: "Tere Liye",
    year: 2014,
    available: false
  },
  {
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    year: 2018,
    available: true
  },
  {
    title: "Atomic Habits (Terjemahan)",
    author: "James Clear",
    year: 2021,
    available: true
  },
  {
    title: "Selamat Tinggal",
    author: "Tere Liye",
    year: 2020,
    available: false
  },
  {
    title: "Selena",
    author: "Tere Liye",
    year: 2022,
    available: true
  }
];

// --- 1. Menampilkan seluruh buku ---
console.log("=== DAFTAR SELURUH BUKU ===");
books.forEach((book, index) => {
  console.log(`${index + 1}. ${book.title} - ${book.author} (${book.year}) [${book.available ? "Tersedia" : "Dipinjam"}]`);
});
console.log("\n----------------------------------------\n");


// --- 2. Menampilkan hanya buku yang tersedia ---
console.log("=== DAFTAR BUKU YANG TERSEDIA ===");
let nomorTersedia = 1;
books.forEach((book) => {
  if (book.available === true) {
    console.log(`${nomorTersedia}. ${book.title} - ${book.author}`);
    nomorTersedia++;
  }
});
console.log("\n----------------------------------------\n");


// --- 3 & 4. Menghitung jumlah buku & jumlah buku yang sedang dipinjam ---
const totalBuku = books.length;
let totalDipinjam = 0;

books.forEach((book) => {
  if (book.available === false) {
    totalDipinjam++;
  }
});

console.log("=== STATISTIK PERPUSTAKAAN ===");
console.log(`Jumlah Total Buku        : ${totalBuku}`);
console.log(`Jumlah Buku Sedang Dipinjam : ${totalDipinjam}`);
console.log("\n----------------------------------------\n");


// --- 5. Menampilkan buku terbit setelah tahun 2020 (tahun > 2020) ---
console.log("=== DAFTAR BUKU TERBIT SETELAH TAHUN 2020 ===");
let nomorBaru = 1;
books.forEach((book) => {
  if (book.year > 2020) {
    console.log(`${nomorBaru}. ${book.title} (${book.year}) - ${book.author}`);
    nomorBaru++;
  }
});