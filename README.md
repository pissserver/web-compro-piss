# Pasar Induk Surabaya Sidotopo

Website profil Pasar Induk Surabaya Sidotopo, dibangun dengan React, TypeScript, dan Vite.

## Fitur

- Halaman profil responsif dengan pilihan tema terang dan gelap.
- Informasi pasar, statistik, komoditas, fasilitas, dan aktivitas.
- Video profil dengan kontrol pemutar bawaan.
- Informasi kontak, tautan media sosial, dan lokasi pasar.

## Teknologi

- React 19 dan TypeScript
- Vite
- Tailwind CSS
- Framer Motion dan Lenis
- Lucide React

## Menjalankan secara lokal

Persyaratan: Node.js 22 atau lebih baru dan npm.

```bash
npm ci
npm run dev
```

Buka URL yang ditampilkan Vite (secara default `http://localhost:5173`).

Perintah lain yang tersedia:

```bash
npm run build
npm run preview
```

`npm run build` menjalankan pemeriksaan TypeScript dan membuat hasil produksi di `dist/`. `npm run preview` menyajikan hasil build secara lokal.

## Menjalankan dengan Docker

Persyaratan: Docker dengan Docker Compose.

### Development dengan hot reload

Untuk melihat perubahan source secara langsung tanpa membangun ulang image setiap kali:

```bash
docker compose -f compose.dev.yaml up --build
```

Buka [http://localhost:3000](http://localhost:3000). Source proyek di-mount ke container dan Vite memperbarui halaman saat file berubah. Polling file watcher diaktifkan agar perubahan terdeteksi dengan baik melalui Docker Desktop di Windows. Hentikan dengan `Ctrl+C`, atau jalankan:

```bash
docker compose -f compose.dev.yaml down
```

### Mode produksi

Mode ini menyajikan hasil build statis melalui Nginx:

```bash
docker compose up --build -d
```

Buka [http://localhost:3000](http://localhost:3000). Untuk menghentikan layanan:

```bash
docker compose down
```

Compose memetakan port host `3000` ke port container `3000`. Jika port 3000 sedang digunakan, hentikan layanan lain yang menggunakannya sebelum menjalankan mode development atau produksi.

## Git LFS

Video `.mp4` disimpan menggunakan Git LFS. Pasang dan aktifkan Git LFS sebelum meng-clone repositori agar aset video dapat diunduh dengan benar:

```bash
git lfs install
git clone <URL-repositori>
cd company-profile
git lfs pull
```

Video profil berukuran besar, sehingga clone awal, unduhan LFS, dan image Docker memerlukan ruang penyimpanan serta waktu lebih banyak.

## Struktur proyek

```text
src/
  assets/       Gambar dan video
  data/         Konten, navigasi, dan informasi pasar
  hooks/        Hooks React
  App.tsx       Komposisi halaman dan section
  styles.css    Gaya dan tema
public/         Aset statis dan favicon
nginx/          Konfigurasi server untuk Docker
Dockerfile      Build multi-stage aplikasi dan image Nginx
compose.yaml    Pemetaan layanan ke port 3000
```

## Informasi pasar

- Alamat: Jl. Sidotopo Lor No.68A, Sidotopo, Kec. Semampir, Surabaya, Jawa Timur 60152
- Telepon: +62 852 2505 7885
- Email: pasarinduk.sidotopo@gmail.com
