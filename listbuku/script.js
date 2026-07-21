// 1. Ambil data dari LocalStorage saat pertama kali dibuka. 
// Jika belum ada data tersimpan, pakai array default.
let books = JSON.parse(localStorage.getItem('data_buku')) || [
  { nama: "asd" },
  { nama: "asd" }
];

// Ambil elemen DOM dari HTML
const inputBuku = document.getElementById('nama_buku');
const btnTambah = document.getElementById('tambah');
const listBuku = document.getElementById('data-buku');

// 2. Fungsi simpan ke LocalStorage
function simpanData() {
  localStorage.setItem('data_buku', JSON.stringify(books));
}

// 3. Fungsi untuk menampilkan isi array ke HTML
function renderBooks() {
  listBuku.innerHTML = ''; // Kosongkan tampilan dulu

  books.forEach((book) => {
    const li = document.createElement('li');
    li.textContent = book.nama;
    listBuku.appendChild(li);
  });
}

// 4. Event listener saat tombol "Tambah" diklik
btnTambah.addEventListener('click', function() {
  const textInput = inputBuku.value.trim();

  if (textInput !== '') {
    // Masukkan data baru ke Array pakai .push()
    books.push({ nama: textInput });

    // SIMPAN PERUBAHAN KE LOCALSTORAGE
    simpanData();

    inputBuku.value = ''; // Kosongkan input
    renderBooks();       // Update tampilan
  }
});

// Render pertama kali saat halaman dimuat
renderBooks();