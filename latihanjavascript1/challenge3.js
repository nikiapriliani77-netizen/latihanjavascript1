const products = [
  {
    name: "Indomie",
    price: 3500,
    stock: 10
  },
  {
    name: "Susu",
    price: 18000,
    stock: 0
  },
  {
    name: "Roti",
    price: 12000,
    stock: 5
  }
];

// Menggunakan perulangan untuk memeriksa setiap produk
for (let i = 0; i < products.length; i++) {
  const product = products[i];
  let status = "";

  // Ketentuan penentuan status berdasarkan stock
  if (product.stock > 0) {
    status = "Tersedia";
  } else if (product.stock === 0) {
    status = "Habis";
  }

  // Menampilkan informasi produk
  console.log(product.name);
  console.log(`Harga : ${product.price}`);
  console.log(`Status : ${status}`);

  // Menampilkan garis pembatas di antara produk (kecuali setelah produk terakhir)
  if (i < products.length - 1) {
    console.log("\n-----------------\n");
  }
}