Dashboard Kuliah MAX adalah aplikasi web yang dirancang untuk membantu mahasiswa dalam mengorganisir aktivitas perkuliahan mereka. Aplikasi ini menyediakan tiga fitur utama:

Manajemen Tugas: Membuat, mengedit, dan menandai status penyelesaian tugas kuliah
Jadwal Kuliah: Menyimpan dan mengelola jadwal perkuliahan
Info Cuaca: Menampilkan informasi cuaca terkini (simulasi)

Aplikasi ini menggunakan localStorage untuk menyimpan data sehingga tidak memerlukan server backend.

Fitur Utama
Manajemen Tugas:
    -Tambah tugas baru dengan nama, deskripsi, dan tenggat waktu
    -Edit dan hapus tugas
    -Tandai tugas sebagai selesai/belum
    -Tampilkan tenggat waktu dalam format yang mudah dibaca

Jadwal Kuliah:
    -Tambah jadwal mata kuliah dengan hari, waktu, dan lokasi
    -Edit dan hapus jadwal
    -Tampilkan jadwal dalam format yang terorganisir

Info Cuaca:
    -Menampilkan kondisi cuaca, suhu, kelembapan, dan kecepatan angin
    -Ikon visual sesuai kondisi cuaca
    -Tombol refresh untuk memperbarui data cuaca

Screenshot Dashboard


Teknologi dan Fitur ES6+ yang Digunakan
Aplikasi ini mengimplementasikan berbagai fitur modern JavaScript (ES6+):

Modules:
Menggunakan import/export untuk memisahkan kode ke dalam modul-modul
Contoh: import { TaskManager } from './modules/data.js';

Classes:
Menggunakan class untuk membuat manajer data (TaskManager, ScheduleManager, WeatherService)
Contoh: export class TaskManager { ... }

Arrow Functions:
Digunakan secara luas untuk fungsi callback
Contoh: document.querySelectorAll('.edit-task-btn').forEach(btn => { ... });

Template Literals:
Untuk membuat string dinamis dengan mudah
Contoh: `<span>${task.name || "Tugas Tanpa Nama"} ${statusBadge}</span>`

Destructuring Assignment:
Untuk mengekstrak nilai dari objek atau array
Contoh: const { location, temperature } = weatherData;

Spread Operator:
Untuk menyalin array/objek
Contoh: resolve({...this.tasks[index]});

Promises:
Untuk menangani operasi asinkron
Contoh: return new Promise((resolve) => { ... });

Async/Await:
Untuk menulis kode asinkron yang lebih bersih
Contoh: const loadTasks = async () => { ... };

Default Parameters:
Untuk memberikan nilai default pada parameter fungsi
Contoh: addTask(taskData = {})

LocalStorage API:
Untuk penyimpanan data persisten di browser
Contoh: localStorage.setItem('tasks', JSON.stringify(this.tasks));