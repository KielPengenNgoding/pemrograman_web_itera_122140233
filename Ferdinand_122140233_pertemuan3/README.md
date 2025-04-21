# Aplikasi Manajemen Buku Pribadi

Aplikasi manajemen buku pribadi yang memungkinkan pengguna mencatat buku-buku yang dimiliki, sedang dibaca, atau ingin dibeli. Aplikasi ini dikembangkan menggunakan React dengan pendekatan modern (functional components dan hooks).

![Screenshot Aplikasi](screenshot.png)

## Fitur Aplikasi

- **Manajemen Buku**
  - Menambahkan buku baru dengan judul, penulis, dan status (dimiliki/sedang dibaca/wishlist)
  - Mengedit informasi buku yang sudah ada
  - Menghapus buku dari koleksi

- **Pencarian dan Filter**
  - Filter buku berdasarkan status (dimiliki, sedang dibaca, wishlist)
  - Pencarian buku berdasarkan judul atau nama penulis

- **Statistik Koleksi**
  - Melihat jumlah total buku dalam koleksi
  - Grafik distribusi buku berdasarkan status
  - Penulis favorit (penulis dengan jumlah buku terbanyak)

## Teknologi yang Digunakan

- **React** - Library JavaScript untuk membangun antarmuka pengguna
- **Vite** - Build tool dan development server yang cepat
- **React Router** - Library untuk navigasi antar halaman
- **React Hooks** - useState, useEffect, useContext, dan custom hooks
- **Context API** - Untuk state management di seluruh aplikasi
- **localStorage** - Untuk penyimpanan data di browser
- **PropTypes** - Type checking untuk props komponen
- **Jest & React Testing Library** - Framework pengujian

## Fitur React yang Diimplementasikan

### 1. React Hooks
- **useState** - Mengelola state untuk form, tampilan modal, dan komponen lainnya
- **useEffect** - Untuk efek samping seperti sinkronisasi dengan localStorage
- **useContext** - Mengakses global state dari context

### 2. Custom Hooks
- **useLocalStorage** - Hook untuk menyederhanakan penggunaan localStorage
- **useBookStats** - Hook untuk menghitung dan menyediakan statistik koleksi buku

### 3. Context API
- Implementasi `BookContext` untuk state management di seluruh aplikasi
- Menyediakan akses ke data buku dan fungsi-fungsi manipulasi data

### 4. React Router
- Navigasi multipage tanpa refresh penuh
- Route untuk halaman utama dan halaman statistik

## Cara Instalasi

1. Clone repositori ini:
   ```bash
   git clone https://github.com/username/book-management-app.git
   cd book-management-app
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

4. Buka browser dan akses `http://localhost:5173`

## Pengujian

Untuk menjalankan unit test:
```bash
npm test
```

## Struktur Folder

```
src/
├── components/           # Komponen UI reusable
│   ├── BookForm/         # Form untuk menambah/edit buku
│   ├── BookList/         # Tampilan daftar buku
│   ├── BookFilter/       # Filter dan pencarian
│   ├── EmptyState/       # Tampilan saat tidak ada data
│   └── Navbar/           # Navigasi aplikasi
├── pages/                # Halaman-halaman utama
│   ├── Home/             # Halaman utama dengan list dan form
│   └── Stats/            # Halaman statistik koleksi
├── hooks/                # Custom hooks
│   ├── useLocalStorage.js # Interaksi dengan localStorage
│   └── useBookStats.js   # Kalkulasi statistik koleksi
├── context/              # Context untuk state management
│   └── BookContext.js    # Provider dan hooks untuk data buku
├── __tests__/            # Unit tests
├── App.jsx               # Komponen utama dan setup routing
├── index.css             # Global styles
└── main.jsx              # Entry point
```

## Pengembangan Lebih Lanjut

Beberapa fitur yang dapat ditambahkan untuk pengembangan lebih lanjut:

- Integrasi dengan API perpustakaan untuk mengisi data buku otomatis
- Fitur barcode scanner untuk menambahkan buku dengan cepat
- Ekspor dan impor data koleksi
- Integrasi dengan media sosial untuk berbagi koleksi
- Sistem rating dan review untuk buku yang sudah dibaca
- Statistik lanjutan dan visualisasi data koleksi