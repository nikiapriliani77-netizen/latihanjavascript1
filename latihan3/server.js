const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------
// VARIABEL DIPISAH (BERDIRI SENDIRI-SENDIRI)
// ----------------------------------------------------
let books = [
  { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata" },
  { id: 2, title: "Bumi Manusia", author: "Pramoedya Ananta Toer" },
  { id: 3, title: "Laut Pasang", author: "Lillpudu" }
];

let authors = [
  "Andrea Hirata",
  "Pramoedya Ananta Toer",
  "Lillpudu"
];

// 1. HALAMAN UTAMA
app.get('/', (req, res) => {
  res.render('index', { books });
});

// 2. TAMBAH BUKU
app.get('/tambah', (req, res) => {
  res.render('tambah');
});

app.post('/tambah', (req, res) => {
  const { title, author } = req.body;
  if (title && author) {
    const newBook = {
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
      title: title,
      author: author
    };
    books.push(newBook);

    // Otomatis masukkan penulis ke daftar jika namanya belum ada
    if (!authors.includes(author)) {
      authors.push(author);
    }
  }
  res.redirect('/');
});

// 3. EDIT BUKU
app.get('/edit/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (!book) return res.redirect('/');
  
  res.render('edit', { type: 'book', book });
});

app.post('/edit/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  
  const book = books.find(b => b.id === bookId);
  if (book) {
    book.title = title;
    book.author = author;

    // Jika nama penulis belum ada di array authors, tambahkan
    if (author && !authors.includes(author)) {
      authors.push(author);
    }
  }
  res.redirect('/');
});

// 4. HAPUS BUKU (Hanya menghapus dari array books)
app.get('/hapus/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(b => b.id !== bookId);
  
  // Mengembalikan ke halaman asal tempat tombol diklik (index / books)
  const backUrl = req.get('Referrer') || '/';
  res.redirect(backUrl);
});

// 5. DAFTAR BUKU
app.get('/books', (req, res) => {
  res.render('books', { books });
});

// 6. DAFTAR PENULIS (Menggunakan variabel authors terpisah)
app.get('/authors', (req, res) => {
  res.render('authors', { authors });
});

// EDIT PENULIS (Hanya mengubah nama di array authors & nama di daftar buku)
app.get('/edit-author/:name', (req, res) => {
  const oldAuthor = req.params.name;
  res.render('edit', { type: 'author', oldAuthor });
});

app.post('/edit-author/:name', (req, res) => {
  const oldAuthor = req.params.name;
  const { newAuthor } = req.body;

  if (newAuthor) {
    // 1. Update nama di array authors
    const index = authors.indexOf(oldAuthor);
    if (index !== -1) {
      authors[index] = newAuthor;
    }

    // 2. Update nama penulis di array books yang terkait
    books.forEach(book => {
      if (book.author === oldAuthor) {
        book.author = newAuthor;
      }
    });
  }
  res.redirect('/authors');
});

// HAPUS PENULIS (Hanya menghapus dari array authors saja)
app.get('/hapus-author/:name', (req, res) => {
  const authorToDelete = req.params.name;
  authors = authors.filter(a => a !== authorToDelete);
  res.redirect('/authors');
});

// JALANKAN SERVER
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});