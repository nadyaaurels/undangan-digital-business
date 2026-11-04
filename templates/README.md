# Template Undangan Pernikahan (Contoh / Portofolio)

Empat contoh undangan pernikahan digital berupa halaman web statis, dibuat untuk tahap validasi pasar (lihat [PRD](../PRD.md), bagian Go-to-Market). Tidak perlu server atau database: cukup unggah folder ini ke hosting statis.

Semua nama, alamat, nomor rekening, dan nomor WhatsApp di demo adalah **fiktif**.

## Isi folder

```
templates/
├── index.html              # Katalog template + alat "Buat tautan tamu"
├── assets/
│   ├── invitation.js       # Mesin undangan (dipakai semua template)
│   ├── illustrations.js    # Ilustrasi SVG pasangan pengantin & gunungan
│   └── base.css            # Tata letak, animasi & gaya dasar
├── adat-jawa/              # Busana adat Jawa, pintu gebyok, gunungan, melati
├── elegan-gold/            # Biru malam + emas, formal / ballroom
├── rustic-sage/            # Krem + hijau sage, pengantin berhijab
└── pastel-dreamy/          # Pink-lilac, playful, untuk pasangan muda
```

Setiap template berisi `index.html` (data undangan) dan `theme.css` (warna, font, ornamen).

## Fitur setiap undangan

- **Ilustrasi pasangan pengantin** (adat Jawa, atau jas & gaun dengan/tanpa hijab) yang bergerak: bergoyang, berkedip, cunduk mentul bergetar, hati melayang
- Sampul dengan **nama tamu personal** dari URL: `.../adat-jawa/?to=Bapak+Ahmad`
- Animasi pembuka: pintu terbuka (gebyok / tirai daun / awan), lalu partikel jatuh sesuai tema (melati, kilau, daun, hati)
- Tombol "Buka Undangan" dan musik latar (opsional)
- Hitung mundur dan tombol simpan ke Google Calendar
- Kutipan ayat atau quote, profil kedua mempelai, dan kisah cinta (timeline)
- Rangkaian acara dengan tombol petunjuk lokasi dan peta Google Maps
- Galeri foto
- RSVP & ucapan, dengan opsi tamu mengirim konfirmasi ke WhatsApp mempelai
- Amplop digital dengan tombol salin nomor rekening / alamat kado
- Navigasi bawah dengan penanda bagian aktif, animasi scroll bervariasi (naik, zoom, geser, blur), tampilan mobile-first
- Menghormati pengaturan *reduce motion* di HP tamu (animasi dimatikan otomatis)

> **Catatan:** pada versi statis ini, RSVP & ucapan hanya tersimpan di browser tamu masing-masing (localStorage). Rekap terpusat untuk mempelai baru tersedia setelah ada backend (fase MVP). Selama tahap validasi, konfirmasi dikumpulkan lewat tombol "Kirim juga via WhatsApp".

## Mencoba di komputer

Jalankan dari folder repo:

```bash
python3 -m http.server 8000 --directory templates
```

Lalu buka http://localhost:8000.

## Membuat undangan untuk klien

1. Salin folder template yang dipilih, misalnya `adat-jawa` menjadi `budi-ani`.
2. Buka `budi-ani/index.html` dan ubah isi `window.INVITATION`:

| Kolom | Keterangan |
|---|---|
| `slug` | ID unik undangan, dipakai sebagai kunci penyimpanan |
| `groomFirst` | `true` = nama pria ditulis lebih dulu |
| `theme` | `illustration`: `'jawa'` atau `'modern'`; `hijab`: `true/false` (ilustrasi modern); `ornament`: `'gunungan'` atau `'none'`; `particles`: jumlah partikel jatuh (`0` = mati) |
| `labels` | Judul tiap bagian, mis. `events: ['Rantaman Adicara', 'Rangkaian Acara']` (judul, subjudul) |
| `groom`, `bride` | Nama panggilan, nama lengkap, urutan anak, orang tua, Instagram, `photo` (URL foto; kosongkan untuk memakai ilustrasi) |
| `quote` | Ayat atau kutipan, `translation` opsional (hapus kolom ini untuk menyembunyikan) |
| `events` | Daftar acara: `name`, `main` (acara utama untuk hitung mundur), `start`/`end` (format `2027-05-15T08:00:00+07:00`), `venue`, `address`, `showMap`, `endText` (mis. "Selesai"), `mapUrl` (opsional, tautan Google Maps yang tepat) |
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

## Mengubah warna busana ilustrasi

Warna ilustrasi diatur di `theme.css` lewat CSS variable, sehingga bisa disesuaikan dengan warna seragam klien tanpa menyentuh gambar. Contoh: `--kebaya` (kebaya), `--beskap`, `--blangkon`, `--jarik`, `--suit` (jas), `--gown` (gaun), `--hijab`, `--skin` (warna kulit), dan `--hair` (rambut). Daftar lengkapnya ada di bagian atas `assets/base.css`.
