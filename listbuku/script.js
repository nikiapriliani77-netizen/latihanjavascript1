// 1. Ambil data dari LocalStorage saat pertama kali dibuka
let books = JSON.parse(localStorage.getItem('data_buku')) || [
    { nama: "asd" },
    { nama: "asd" }
];

// Variabel penanda index buku yang sedang diedit (-1 artinya mode tambah)
let editIndex = -1;

// Ambil elemen dari HTML
const inputBuku = document.getElementsByName('nama_buku')[0];
const btnTambah = document.getElementById('tambah');
const listBuku = document.querySelector('.data-buku');

// 2. Fungsi simpan ke LocalStorage
function simpanData() {
    localStorage.setItem('data_buku', JSON.stringify(books));
}

// 3. Fungsi menampilkan daftar buku + tombol Edit & Hapus
function renderBooks() {
    listBuku.innerHTML = ''; // Kosongkan tampilan dulu

    books.forEach((book, index) => {
        const li = document.createElement('li');
        
        // Membungkus tombol ke dalam <div class="action-btn">
        li.innerHTML = `
            <span class="nama-buku">${book.nama}</span>
            <div class="action-btn">
                <button class="btn-edit" onclick="editBuku(${index})">Edit</button>
                <button class="btn-hapus" onclick="hapusBuku(${index})">Hapus</button>
            </div>
        `;
        listBuku.appendChild(li);
    });
}

// 4. Fungsi saat tombol "Tambah" / "Update" diklik
btnTambah.addEventListener('click', () => {
    const namaBaru = inputBuku.value.trim();

    if (namaBaru === '') {
        alert('Nama buku tidak boleh kosong!');
        return;
    }

    if (editIndex === -1) {
        // Mode Tambah Baru
        books.push({ nama: namaBaru });
    } else {
        // Mode Edit / Update
        books[editIndex].nama = namaBaru;
        editIndex = -1; // Kembalikan ke mode tambah
        btnTambah.innerText = 'Tambah';
    }

    simpanData();
    renderBooks();
    inputBuku.value = ''; // Kosongkan kolom input
});

// 5. Fungsi Hapus Buku
function hapusBuku(index) {
    if (confirm('Yakin ingin menghapus buku ini?')) {
        books.splice(index, 1); // Hapus 1 data dari array
        simpanData();
        renderBooks();
    }
}

// 6. Fungsi Edit Buku
function editBuku(index) {
    inputBuku.value = books[index].nama; // Pindahkan teks ke input
    editIndex = index;
    btnTambah.innerText = 'Update'; // Ubah tulisan tombol jadi Update
}

// Jalankan render awal saat halaman dimuat
renderBooks();