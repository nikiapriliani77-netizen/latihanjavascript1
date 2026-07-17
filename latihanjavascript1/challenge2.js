const nilai = [85, 60, 90, 75, 40, 100];

// Menggunakan perulangan 'for' untuk memeriksa setiap nilai
for (let i = 0; i < nilai.length; i++) {
    // Ketentuan pengkondisian (if-else)
    if (nilai[i] >= 70) {
        console.log(`Nilai ${nilai[i]} -> Lulus`);
    } else {
        console.log(`Nilai ${nilai[i]} -> Tidak Lulus`);
    }
}