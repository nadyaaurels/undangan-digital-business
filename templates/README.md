# Template Undangan Pernikahan (Contoh / Portofolio)

Tiga contoh undangan pernikahan digital berupa halaman web statis, dibuat untuk tahap validasi pasar (lihat [PRD](../PRD.md), bagian Go-to-Market). Tidak perlu server atau database: cukup unggah folder ini ke hosting statis.

Semua nama, alamat, nomor rekening, dan nomor WhatsApp di demo adalah **fiktif**.

## Isi folder

```
templates/
├── index.html              # Katalog template + alat "Buat tautan tamu"
├── assets/
│   ├── invitation.js       # Mesin undangan (dipakai semua template)
│   └── base.css            # Tata letak & gaya dasar
├── elegan-gold/            # Biru malam + emas, formal / ballroom
├── rustic-sage/            # Krem + hijau sage, garden party
└── minimalis-modern/       # Putih + terakota, intimate / editorial
```

Setiap template berisi `index.html` (data undangan) dan `theme.css` (warna, font, ornamen).

## Fitur setiap undangan

- Sampul dengan **nama tamu personal** dari URL: `.../elegan-gold/?to=Bapak+Ahmad`
- Tombol "Buka Undangan" dan musik latar (opsional)
- Hitung mundur dan tombol simpan ke Google Calendar
- Kutipan ayat atau quote, profil kedua mempelai, dan kisah cinta (timeline)
- Rangkaian acara dengan tombol petunjuk lokasi dan peta Google Maps
- Galeri foto
- RSVP & ucapan, dengan opsi tamu mengirim konfirmasi ke WhatsApp mempelai
- Amplop digital dengan tombol salin nomor rekening / alamat kado
- Navigasi bawah, animasi saat di-scroll, tampilan mobile-first

> **Catatan:** pada versi statis ini, RSVP & ucapan hanya tersimpan di browser tamu masing-masing (localStorage). Rekap terpusat untuk mempelai baru tersedia setelah ada backend (fase MVP). Selama tahap validasi, konfirmasi dikumpulkan lewat tombol "Kirim juga via WhatsApp".

## Mencoba di komputer

Jalankan dari folder repo:

```bash
python3 -m http.server 8000 --directory templates
```

Lalu buka http://localhost:8000.

## Membuat undangan untuk klien

1. Salin folder template yang dipilih, misalnya `elegan-gold` menjadi `budi-ani`.
2. Buka `budi-ani/index.html` dan ubah isi `window.INVITATION`:

| Kolom | Keterangan |
|---|---|
| `slug` | ID unik undangan, dipakai sebagai kunci penyimpanan |
| `groomFirst` | `true` = nama pria ditulis lebih dulu |
| `groom`, `bride` | Nama panggilan, nama lengkap, urutan anak, orang tua, Instagram, `photo` (URL foto; kosongkan untuk inisial) |
| `quote` | Ayat atau kutipan (hapus kolom ini untuk menyembunyikan) |
| `events` | Daftar acara: `name`, `start`/`end` (format `2027-05-15T08:00:00+07:00`), `venue`, `address`, `showMap`, `endText` (mis. "Selesai"), `mapUrl` (opsional, tautan Google Maps yang tepat) |
| `notes` | Catatan dress code dan sebagainya |
| `story` | Timeline kisah cinta (kosongkan `[]` untuk menyembunyikan) |
| `gallery` | Daftar foto `{ src, alt }`; jika kosong, tampil kotak contoh sebanyak `galleryPlaceholders` |
| `gifts`, `giftAddress` | Rekening / e-wallet dan alamat kirim kado |
| `rsvpWhatsApp` | Nomor WA mempelai dengan format `628…` |
| `music` | URL file MP3. Pakai musik **bebas royalti / berlisensi** |
| `wishes` | Ucapan awal yang ditampilkan (opsional) |
| `timeZone`, `timeZoneLabel` | Contoh: `Asia/Makassar` + `WITA`, `Asia/Jayapura` + `WIT` |

3. Ganti juga `<title>`, `og:title`, dan `og:description` di bagian `<head>` agar pratinjau tautan di WhatsApp sesuai.
4. Simpan foto di folder undangan (misalnya `budi-ani/foto/`) dan isi `photo`/`gallery` dengan path-nya. Kompres foto dulu (lebar sekitar 1200 px, format WebP/JPG) agar halaman tetap cepat.
5. Buat tautan per tamu lewat bagian **Buat tautan tamu** di `index.html`. Isi "Alamat dasar" dengan URL undangan klien.

## Hosting gratis

Folder `templates` bisa langsung dipublikasikan ke GitHub Pages, Netlify, Vercel, atau Cloudflare Pages tanpa proses build.
