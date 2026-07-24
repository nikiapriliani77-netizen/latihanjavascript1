const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------
// DATA DENGAN STRUKTUR OBJECT & RELASI ID
// ----------------------------------------------------
let authors = [
  { id: 1, name: "Robert C. Martin", country: "USA" },
  { id: 2, name: "James Clear", country: "USA" },
  { id: 3, name: "Marijn Haverbeke", country: "Netherlands" },
  { id: 4, name: "Andrea Hirata", country: "Indonesia" }
];

let books = [
  { id: 1, title: "Clean Code Tes", authorId: 1, year: 2008, available: true },
  { id: 2, title: "Atomic Habits", authorId: 2, year: 2018, available: false },
  { id: 3, title: "Eloquent JavaScript", authorId: 3, year: 2019, available: true },
  { id: 4, title: "Laskar Pelangi", authorId: 4, year: 2005, available: true }
];

// ====================================================
// 🌐 REST API ENDPOINTS (DIPANGGIL OLEH CLIENT FETCH)
// ====================================================

// GET API Books (Murni Data Buku)
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET API Authors (Murni Data Penulis)
app.get('/api/authors', (req, res) => {
  res.json(authors);
});

// ====================================================
// 📄 ROUTING HALAMAN WEB
// ====================================================

// 1. HALAMAN UTAMA (Client-side Rendering via Fetch API)
app.get('/', (req, res) => {
  res.render('index'); 
});

// 2. TAMBAH BUKU
app.get('/tambah', (req, res) => {
  res.render('tambah', { authors }); // Mengirim daftar authors untuk pilihan dropdown
});

app.post('/tambah', (req, res) => {
  const { title, authorId, year, available } = req.body;
  if (title && authorId) {
    const newBook = {
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
      title: title,
      authorId: parseInt(authorId),
      year: parseInt(year) || new Date().getFullYear(),
      available: available === 'true' || available === true
    };
    books.push(newBook);
  }
  res.redirect('/');
});

// 3. EDIT BUKU
app.get('/edit/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (!book) return res.redirect('/');
  
  res.render('edit', { type: 'book', book, authors });
});

app.post('/edit/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, authorId, year, available } = req.body;
  
  const book = books.find(b => b.id === bookId);
  if (book) {
    book.title = title;
    book.authorId = parseInt(authorId);
    book.year = parseInt(year);
    book.available = available === 'true' || available === true;
  }
  res.redirect('/');
});

// 4. HAPUS BUKU
app.get('/hapus/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(b => b.id !== bookId);
  
  const backUrl = req.get('Referrer') || '/';
  res.redirect(backUrl);
});

// 5. DAFTAR BUKU (Server Side Render versi /books)
app.get('/books', (req, res) => {
  // Menggabungkan nama author ke dalam objek buku secara temporary untuk tampilan SSR
  const booksWithAuthorName = books.map(book => {
    const authorObj = authors.find(a => a.id === book.authorId);
    return {
      ...book,
      author: authorObj ? authorObj.name : 'Penulis Tidak Diketahui'
    };
  });
  res.render('books', { books: booksWithAuthorName });
});

// 6. DAFTAR PENULIS
app.get('/authors', (req, res) => {
  res.render('authors', { authors });
});

// EDIT PENULIS (Berdasarkan ID Penulis)
app.get('/edit-author/:id', (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);
  if (!author) return res.redirect('/authors');

  res.render('edit', { type: 'author', author });
});

app.post('/edit-author/:id', (req, res) => {
  const authorId = parseInt(req.params.id);
  const { name, country } = req.body;

  const author = authors.find(a => a.id === authorId);
  if (author) {
    author.name = name;
    if (country) author.country = country;
  }
  res.redirect('/authors');
});

// HAPUS PENULIS (Berdasarkan ID)
app.get('/hapus-author/:id', (req, res) => {
  const authorId = parseInt(req.params.id);
  authors = authors.filter(a => a.id !== authorId);
  res.redirect('/authors');
});

// JALANKAN SERVER
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});