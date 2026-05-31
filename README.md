# FIKTI ROOM

Aplikasi monitoring ruangan berbasis Android yang dikembangkan untuk membantu mahasiswa memantau status kehadiran dosen secara realtime pada lingkungan Fakultas Ilmu Komputer dan Teknologi Informasi (FIKTI) Universitas Muhammadiyah Sumatera Utara.

## 📱 Tentang Aplikasi

FIKTI ROOM merupakan aplikasi mobile yang memungkinkan mahasiswa mengetahui status penggunaan ruangan kuliah serta kehadiran dosen secara realtime. Informasi diperbarui langsung melalui Firebase Realtime Database dan dapat dikelola oleh relator kelas yang bertugas.

Aplikasi ini dibuat sebagai proyek Mobile Application Development.

---

## ✨ Fitur Utama

### 👨‍🎓 Mode Mahasiswa

* Melihat daftar ruangan berdasarkan lantai.
* Melihat informasi dosen pengampu.
* Melihat mata kuliah yang sedang berlangsung.
* Mengetahui status kehadiran dosen secara realtime.
* Melihat detail informasi setiap ruangan.

### 👨‍💼 Mode Relator

* Login menggunakan password relator.
* Mengubah status kehadiran dosen.
* Memperbarui informasi ruangan secara realtime.
* Sinkronisasi data langsung ke Firebase.

### 🔄 Realtime Monitoring

* Data diperbarui secara langsung menggunakan Firebase Realtime Database.
* Perubahan yang dilakukan relator dapat langsung dilihat oleh mahasiswa tanpa perlu refresh aplikasi.

---

## 🏢 Ruangan yang Didukung

Aplikasi mendukung monitoring ruangan pada:

* Lantai 6
* Lantai 7

Setiap ruangan memiliki informasi:

* Nomor Ruangan
* Nama Dosen
* Mata Kuliah
* Status Kehadiran Dosen

---

## 🛠️ Teknologi yang Digunakan

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

### Mobile Development

* Apache Cordova

### Backend & Database

* Firebase Realtime Database

### Tools

* Visual Studio Code
* Git
* GitHub

---

## 📂 Struktur Project

```text
fikti-room/
│
├── www/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── resources/
├── config.xml
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔥 Firebase Realtime Database

Aplikasi menggunakan Firebase Realtime Database untuk menyimpan dan mengelola data ruangan secara realtime.

Contoh struktur data:

```json
{
  "rooms": {
    "601": {
      "room": "601",
      "floor": 6,
      "dosen": "Nama Dosen",
      "mk": "Mata Kuliah",
      "status": "menunggu"
    }
  }
}
```

---

## 🚀 Cara Menjalankan Project

### Clone Repository

```bash
git clone https://github.com/NazwaAzhira/fikti-room.git
```

### Masuk ke Folder Project

```bash
cd fikti-room
```

### Install Dependency

```bash
npm install
```

### Menambahkan Platform Android

```bash
cordova platform add android
```

### Build APK

```bash
cordova build android
```

---

## 👨‍💻 Tim Pengembang

Dikembangkan Oleh:

* Nazwa Azhira [2309010192]
* Annisa Fadiyah [2309010195]
* Dina Ade Riani [2309010221]
* Tiara Permata Putri [2309010193]
* Muhammad Alfair [2309010224]

---

## 🎓 Tujuan Pengembangan

Project ini dibuat sebagai tugas mata kuliah Pemrograman Mobile pada Fakultas Ilmu Komputer dan Teknologi Informasi (FIKTI), Universitas Muhammadiyah Sumatera Utara.

---

## 📄 Lisensi

Project ini dibuat untuk keperluan akademik dan pembelajaran.
