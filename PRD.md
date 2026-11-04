# Product Requirements Document (PRD)
# Platform Undangan Digital

| | |
|---|---|
| **Versi dokumen** | 1.0 (Draft) |
| **Tanggal** | 4 November 2026 |
| **Status** | Draft untuk review |
| **Pemilik produk** | Nadya Aurelia Devi |

---

## 1. Ringkasan

Platform Undangan Digital adalah layanan web yang memungkinkan pengguna membuat, mengatur, dan membagikan undangan acara (pernikahan, khitanan, ulang tahun, aqiqah, syukuran, acara korporat) dalam bentuk halaman web interaktif yang bisa dibagikan lewat WhatsApp, Instagram, dan media sosial lainnya.

Produk ini menggantikan undangan cetak yang mahal, lambat, dan sulit dilacak, dengan undangan yang:
- bisa dibuat sendiri dalam hitungan menit dari template siap pakai,
- dipersonalisasi per tamu (nama tamu di URL/halaman),
- mendukung RSVP, ucapan & doa, amplop digital, galeri, peta lokasi, dan musik latar,
- memberi dashboard bagi tuan rumah untuk memantau kehadiran tamu.

## 2. Latar Belakang & Masalah

### 2.1 Masalah yang dihadapi calon pengguna
1. **Biaya undangan cetak tinggi** — Rp3.000–Rp15.000 per lembar, belum termasuk ongkos kirim.
2. **Distribusi lambat dan tidak terjangkau** — tamu luar kota/luar negeri sulit dijangkau tepat waktu.
3. **Tidak ada data kehadiran** — tuan rumah sulit memperkirakan jumlah tamu untuk katering dan kursi.
4. **Informasi tidak bisa diubah** — perubahan jam/lokasi memerlukan cetak ulang.
5. **Pengirim harus mengetik pesan satu per satu** — mengirim ratusan undangan via WhatsApp memakan waktu.

### 2.2 Peluang pasar
- Indonesia memiliki sekitar 1,5–2 juta pernikahan per tahun, ditambah acara keluarga dan korporat lainnya.
- Penetrasi smartphone dan WhatsApp sangat tinggi; undangan digital sudah diterima secara sosial, terutama oleh generasi milenial dan Gen Z.
- Pasar masih terfragmentasi: banyak penyedia kecil berbasis jasa manual (desain dikerjakan admin), sehingga ada ruang untuk produk *self-service* yang cepat, terjangkau, dan berkualitas.

## 3. Tujuan & Non-Tujuan

### 3.1 Tujuan bisnis
| ID | Tujuan | Target 12 bulan |
|---|---|---|
| B1 | Undangan berbayar terjual | 5.000 undangan |
| B2 | Pendapatan kotor | Rp500 juta |
| B3 | Konversi gratis → berbayar | ≥ 8% |
| B4 | Rating kepuasan pelanggan | ≥ 4,7 / 5 |
| B5 | Akuisisi organik (referral dari tamu undangan) | ≥ 30% pengguna baru |

### 3.2 Tujuan produk
- Pengguna dapat menerbitkan undangan pertama dalam **< 15 menit** tanpa bantuan admin.
- Halaman undangan terbuka dalam **< 3 detik** di jaringan 4G.
- Tuan rumah dapat mengirim undangan personal ke ratusan tamu dengan usaha minimal.

### 3.3 Non-tujuan (di luar cakupan versi 1)
- Aplikasi mobile native (Android/iOS) — v1 cukup web responsif.
- Marketplace vendor pernikahan (katering, dekorasi, MUA).
- Pengiriman WhatsApp otomatis via WhatsApp Business API (v1 memakai tautan `wa.me` per tamu).
- Fitur live streaming terintegrasi (cukup menyematkan tautan YouTube/Zoom).
- Undangan cetak / produk fisik.

## 4. Persona Pengguna

### Persona 1 — Calon Pengantin (pengguna utama)
- **Rina, 26 tahun**, karyawan swasta di Jakarta, menikah 4 bulan lagi.
- Ingin undangan yang estetik, hemat, dan bisa dikirim ke 400 tamu lewat WhatsApp.
- Kekhawatiran: tampilan "murahan", ribet, tamu tua kesulitan membuka.

### Persona 2 — Orang Tua / Keluarga Penyelenggara
- **Pak Budi, 52 tahun**, menyelenggarakan khitanan anaknya.
- Tidak terlalu paham teknologi; butuh alur sederhana dan bantuan CS via WhatsApp.

### Persona 3 — Tamu Undangan
- Membuka undangan dari chat WhatsApp di HP.
- Butuh info jelas: kapan, di mana, cara ke lokasi, konfirmasi hadir, dan (opsional) kirim hadiah.

### Persona 4 — Reseller / Wedding Organizer (WO)
- Membuat banyak undangan untuk kliennya.
- Butuh harga grosir, dashboard multi-klien, dan opsi *white-label*.

### Persona 5 — Admin Internal
- Mengelola template, pesanan, pembayaran, promo, dan dukungan pelanggan.

## 5. User Stories

### 5.1 Tuan rumah (pembuat undangan)
| ID | Sebagai… | Saya ingin… | Supaya… | Prioritas |
|---|---|---|---|---|
| US-01 | Pengguna baru | mendaftar dengan Google atau nomor WhatsApp (OTP) | bisa mulai tanpa mengingat kata sandi | P0 |
| US-02 | Tuan rumah | memilih template berdasarkan kategori acara dan tema | cepat mendapat desain yang sesuai | P0 |
| US-03 | Tuan rumah | mengisi data acara (nama mempelai, orang tua, tanggal, lokasi) lewat formulir bertahap | tidak bingung | P0 |
| US-04 | Tuan rumah | melihat pratinjau langsung saat mengedit | tahu hasil akhirnya | P0 |
| US-05 | Tuan rumah | mengunggah foto, galeri, dan cerita cinta (love story) | undangan lebih personal | P0 |
| US-06 | Tuan rumah | memilih/mengunggah musik latar | suasana lebih hidup | P1 |
| US-07 | Tuan rumah | memilih slug URL sendiri (mis. `/rina-dimas`) | mudah diingat | P0 |
| US-08 | Tuan rumah | mengimpor daftar tamu dari Excel/CSV atau kontak | tidak mengetik satu per satu | P0 |
| US-09 | Tuan rumah | membuat tautan personal per tamu dan teks pesan WhatsApp otomatis | pengiriman cepat dan sopan | P0 |
| US-10 | Tuan rumah | melihat rekap RSVP (hadir/tidak/ragu + jumlah orang) | bisa merencanakan katering | P0 |
| US-11 | Tuan rumah | mengekspor daftar tamu & RSVP ke Excel | dibagikan ke WO/keluarga | P1 |
| US-12 | Tuan rumah | menampilkan nomor rekening / e-wallet / QRIS untuk amplop digital | tamu jauh bisa memberi hadiah | P0 |
| US-13 | Tuan rumah | memoderasi ucapan tamu (sembunyikan/hapus) | menjaga isi tetap pantas | P1 |
| US-14 | Tuan rumah | mengubah info acara setelah terbit | tamu selalu mendapat info terbaru | P0 |
| US-15 | Tuan rumah | membuat QR code check-in untuk tamu | penerimaan tamu di lokasi lebih tertib | P2 |
| US-16 | Tuan rumah | mengundang anggota keluarga sebagai kolaborator | pengelolaan dibagi | P2 |

### 5.2 Tamu
| ID | Sebagai tamu, saya ingin… | Prioritas |
|---|---|---|
| UT-01 | melihat nama saya di halaman sampul undangan | P0 |
| UT-02 | melihat hitung mundur, jadwal akad/resepsi, dan lokasi | P0 |
| UT-03 | membuka Google Maps langsung ke lokasi | P0 |
| UT-04 | menambahkan acara ke kalender (Google/iCal) | P1 |
| UT-05 | mengisi RSVP tanpa login | P0 |
| UT-06 | menulis ucapan & doa | P0 |
| UT-07 | menyalin nomor rekening atau memindai QRIS dengan satu ketukan | P0 |
| UT-08 | menonton live streaming lewat tautan yang disediakan | P2 |

### 5.3 Reseller / WO
| ID | Kebutuhan | Prioritas |
|---|---|---|
| UR-01 | Membeli kuota undangan dengan harga grosir | P1 |
| UR-02 | Dashboard daftar klien dan status undangan | P1 |
| UR-03 | Menghapus branding platform (white-label) dan memakai domain sendiri | P2 |

### 5.4 Admin
| ID | Kebutuhan | Prioritas |
|---|---|---|
| UA-01 | Mengelola template (unggah, aktif/nonaktif, harga) | P0 |
| UA-02 | Melihat dan mengelola pesanan serta status pembayaran | P0 |
| UA-03 | Membuat kode promo/voucher | P1 |
| UA-04 | Melihat metrik bisnis (penjualan, konversi, template terlaris) | P1 |
| UA-05 | Menangani laporan konten tidak pantas | P1 |

## 6. Kebutuhan Fungsional

### 6.1 Akun & Autentikasi
- Login via Google OAuth dan OTP WhatsApp/email.
- Profil pengguna: nama, nomor WhatsApp, email.
- Satu akun bisa memiliki banyak undangan.

### 6.2 Katalog Template
- Filter berdasarkan kategori (Pernikahan, Khitanan, Aqiqah, Ulang Tahun, Syukuran, Korporat), gaya (Minimalis, Rustic, Islami, Adat Jawa/Sunda/Bali/Minang, Modern, Floral), dan warna.
- Halaman demo langsung untuk tiap template.
- Label harga paket (Gratis/Basic/Premium/Eksklusif).

### 6.3 Editor Undangan
- Formulir bertahap (wizard): Data Mempelai/Tuan Rumah → Acara → Media → Fitur Tambahan → Terbitkan.
- Pratinjau langsung (mobile view).
- Bagian (section) yang bisa diaktifkan/nonaktifkan dan diurutkan:
  Sampul, Pembuka/Ayat/Quote, Profil Mempelai, Love Story, Hitung Mundur, Detail Acara, Peta, Galeri, Video, RSVP, Ucapan & Doa, Amplop Digital, Protokol Kesehatan/Dress Code, Live Streaming, Penutup.
- Pengaturan bahasa undangan: Indonesia, Inggris, (opsional) Jawa/Sunda.
- Unggah gambar dengan kompresi otomatis (maks. 10 MB per file sebelum kompresi).
- Penyimpanan draf otomatis.

### 6.4 Penerbitan & Tautan
- URL: `https://<domain>/<slug>` dengan validasi slug unik.
- Tautan personal tamu: `https://<domain>/<slug>?to=<nama-tamu>` atau kode pendek per tamu.
- Pratinjau tautan (Open Graph) dengan foto sampul dan judul saat dibagikan di WhatsApp.
- Undangan gratis menampilkan watermark platform dan masa aktif terbatas.

### 6.5 Manajemen Tamu
- Tambah tamu manual, impor CSV/XLSX (template disediakan), atau tempel daftar nama.
- Pengelompokan tamu (Keluarga, Teman Kantor, VIP, sesi resepsi tertentu).
- Template pesan WhatsApp yang bisa disunting dengan variabel `{nama}`, `{link}`.
- Tombol "Kirim via WhatsApp" per tamu (membuka `wa.me`) dan penanda status *sudah dikirim*.
- Pelacakan *sudah dibuka* per tamu (berdasarkan akses tautan personal).

### 6.6 RSVP & Ucapan
- Formulir RSVP: nama, status kehadiran, jumlah orang (dibatasi sesuai pengaturan), pesan.
- Pembatasan spam: rate limit, honeypot/captcha ringan.
- Dashboard rekap: total hadir, tidak hadir, belum merespons, estimasi jumlah orang.
- Ucapan tampil di halaman undangan dengan moderasi oleh tuan rumah.

### 6.7 Amplop Digital
- Daftar rekening bank / e-wallet dengan tombol salin.
- Unggah gambar QRIS.
- Alamat pengiriman hadiah fisik (opsional).
- Catatan: v1 **tidak** memproses uang tamu; platform hanya menampilkan info pembayaran milik tuan rumah.

### 6.8 Pembayaran Paket (pengguna → platform)
- Integrasi payment gateway lokal (mis. Midtrans/Xendit/Tripay): QRIS, Virtual Account, e-wallet (GoPay, OVO, DANA, ShopeePay), kartu kredit.
- Invoice otomatis via email/WhatsApp.
- Upgrade paket kapan saja; fitur terbuka segera setelah pembayaran terkonfirmasi (webhook).
- Kode voucher/diskon.

### 6.9 Dashboard Admin
- CRUD template dan aset.
- Daftar pengguna, undangan, dan pesanan; pencarian & filter.
- Pengembalian dana manual dan catatan.
- Laporan penjualan harian/bulanan.
- Antrian laporan konten.

### 6.10 Program Reseller (P1–P2)
- Pembelian kuota/kredit undangan.
- Sub-akun klien.
- White-label & custom domain (P2).

## 7. Model Bisnis & Paket Harga (usulan)

| Fitur | Gratis | Basic | Premium | Eksklusif |
|---|:-:|:-:|:-:|:-:|
| **Harga (sekali bayar)** | Rp0 | Rp49.000 | Rp99.000 | Rp199.000 |
| Template | Terbatas (5) | Semua standar | Semua termasuk premium | Semua + 1x revisi desain oleh tim |
| Masa aktif | 7 hari | 3 bulan | 6 bulan | 12 bulan |
| Watermark platform | Ya | Tidak | Tidak | Tidak |
| Tamu personal | 20 | 300 | Tidak terbatas | Tidak terbatas |
| RSVP & ucapan | Ya | Ya | Ya | Ya |
| Galeri foto | 3 foto | 10 foto | 30 foto | Tidak terbatas |
| Musik latar | Pilihan pustaka | Pustaka | Unggah sendiri | Unggah sendiri |
| Amplop digital & QRIS | – | Ya | Ya | Ya |
| Video & live streaming | – | – | Ya | Ya |
| Ekspor Excel | – | – | Ya | Ya |
| QR check-in | – | – | – | Ya |
| Dukungan CS | Email | WhatsApp | WhatsApp prioritas | Pendamping khusus |

**Sumber pendapatan tambahan:**
- Jasa pembuatan undangan oleh tim (*done-for-you*): mulai Rp150.000.
- Add-on: perpanjangan masa aktif, custom domain, video undangan (story Instagram).
- Paket reseller/WO: harga grosir (mis. 10 undangan Premium Rp650.000).
- Template eksklusif dari desainer mitra (bagi hasil).

## 8. Kebutuhan Non-Fungsional

| Kategori | Kebutuhan |
|---|---|
| **Performa** | Halaman undangan LCP < 2,5 detik di 4G; ukuran halaman awal < 1,5 MB; gambar lazy-load dan format WebP/AVIF. |
| **Ketersediaan** | Uptime ≥ 99,5%; halaman undangan disajikan lewat CDN agar tetap cepat saat lonjakan akses (ratusan tamu membuka bersamaan). |
| **Skalabilitas** | Mampu melayani ≥ 10.000 kunjungan bersamaan pada halaman undangan. |
| **Kompatibilitas** | Mobile-first; mendukung Chrome/Safari 2 versi terakhir, in-app browser WhatsApp/Instagram, Android 8+. |
| **Keamanan** | HTTPS penuh; enkripsi data sensitif; validasi upload (tipe & ukuran file); proteksi CSRF/XSS; rate limiting pada RSVP & ucapan. |
| **Privasi** | Patuh UU No. 27/2022 tentang Pelindungan Data Pribadi (UU PDP); opsi undangan tidak terindeks mesin pencari; opsi proteksi kata sandi; pengguna bisa menghapus data. |
| **Aksesibilitas** | Kontras teks memadai, ukuran huruf terbaca untuk tamu lanjut usia, musik tidak autoplay sebelum interaksi (tombol "Buka Undangan"). |
| **SEO & sharing** | Meta Open Graph per undangan; halaman marketing teroptimasi SEO. |
| **Observabilitas** | Logging error, pemantauan uptime, analitik event produk. |
| **Backup** | Backup database harian, retensi 30 hari. |

## 9. Arsitektur & Teknologi (usulan awal)

- **Frontend:** Next.js (React) + Tailwind CSS; halaman undangan dirender statis/ISR untuk kecepatan.
- **Backend/API:** Next.js API routes atau Node.js (NestJS); alternatif Laravel bila tim lebih familiar PHP.
- **Database:** PostgreSQL.
- **Penyimpanan media:** Object storage (S3-compatible / Cloudflare R2) + CDN + transformasi gambar.
- **Autentikasi:** NextAuth/Auth.js atau Supabase Auth.
- **Pembayaran:** Midtrans atau Xendit (webhook untuk konfirmasi).
- **Notifikasi:** Email transaksional (Resend/SES); WhatsApp OTP via penyedia lokal.
- **Hosting:** Vercel/Cloudflare atau VPS dengan Docker.
- **Analitik:** Google Analytics 4 / PostHog.

### 9.1 Entitas data utama
- `User` (id, nama, email, no_wa, peran)
- `Template` (id, nama, kategori, gaya, tier, aset, status)
- `Invitation` (id, user_id, template_id, slug, data_konten JSON, paket, status, aktif_hingga)
- `Event` (id, invitation_id, nama_acara, waktu_mulai, waktu_selesai, lokasi, koordinat)
- `Guest` (id, invitation_id, nama, no_wa, grup, kode_unik, dikirim_at, dibuka_at)
- `RSVP` (id, invitation_id, guest_id?, nama, status, jumlah_orang, pesan, created_at)
- `Wish` (id, invitation_id, nama, pesan, disembunyikan, created_at)
- `GiftAccount` (id, invitation_id, tipe, nama_bank/e-wallet, nomor, atas_nama, qris_url)
- `Order` (id, user_id, invitation_id, paket, jumlah, status, gateway_ref, voucher_id)
- `Voucher` (id, kode, diskon, kuota, berlaku_hingga)

## 10. Alur Pengguna Utama

1. **Pembuatan undangan:**
   Landing page → Lihat template → Pilih template → Daftar/Login → Isi wizard → Pratinjau → Pilih paket → Bayar → Terbitkan → Dapat tautan.
2. **Pengiriman ke tamu:**
   Dashboard → Daftar Tamu → Impor CSV → Sunting template pesan → Klik "Kirim via WhatsApp" per tamu → Status tercatat.
3. **Pengalaman tamu:**
   Klik tautan di WhatsApp → Sampul dengan nama tamu → "Buka Undangan" (musik mulai) → Scroll informasi → Buka peta → Isi RSVP → Tulis ucapan → (opsional) salin rekening/QRIS.
4. **Pemantauan:**
   Dashboard → Rekap RSVP & ucapan → Ekspor Excel → Bagikan ke WO/katering.

## 11. Metrik Keberhasilan (KPI)

| Metrik | Definisi | Target |
|---|---|---|
| Activation rate | % pendaftar yang menerbitkan undangan | ≥ 40% |
| Time to publish | Median waktu dari daftar hingga terbit | < 15 menit |
| Paid conversion | % undangan terbit yang berbayar | ≥ 8% (awal), 15% (bulan ke-12) |
| ARPU | Rata-rata pendapatan per pengguna berbayar | ≥ Rp100.000 |
| RSVP rate | % tamu pembuka yang mengisi RSVP | ≥ 35% |
| Viral coefficient | Pengguna baru dari klik "Buat undanganmu" di halaman undangan | ≥ 30% akuisisi |
| CSAT | Survei pasca-acara | ≥ 4,7/5 |
| Refund rate | % pesanan yang dikembalikan | < 2% |

## 12. Strategi Go-to-Market (ringkas)

- **Saluran utama:** Instagram & TikTok (konten contoh undangan, before/after, tips pernikahan), kerja sama dengan WO, MUA, fotografer, dan vendor venue.
- **Loop viral:** setiap undangan (paket gratis/basic) memiliki footer "Buat undangan seperti ini" dengan kode diskon.
- **Program afiliasi:** komisi 15–20% untuk kreator konten dan reseller.
- **Promo musiman:** bulan-bulan favorit pernikahan (setelah Lebaran, Juni–Juli, Oktober–Desember).
- **Marketplace:** listing jasa di Shopee/Tokopedia untuk menjangkau pembeli yang terbiasa berbelanja di sana.
- **Layanan CS WhatsApp** responsif sebagai pembeda utama.

## 13. Rencana Rilis (Roadmap)

| Fase | Waktu | Cakupan |
|---|---|---|
| **MVP (v1.0)** | Bulan 1–3 | Auth, 15 template pernikahan, wizard editor, publish dengan slug, tamu personal + kirim WA, RSVP, ucapan, amplop digital, peta, musik, pembayaran gateway, admin dasar. |
| **v1.1** | Bulan 4–5 | Kategori acara lain (khitanan, aqiqah, ulang tahun), ekspor Excel, voucher, moderasi ucapan, analitik dibuka/belum, tambah kalender. |
| **v1.2** | Bulan 6–8 | Program reseller & afiliasi, QR check-in, kolaborator, template premium dari desainer mitra. |
| **v2.0** | Bulan 9–12 | White-label & custom domain, editor drag-and-drop bebas, multi-bahasa lanjutan, integrasi WhatsApp Business API untuk kirim massal, video undangan otomatis. |

## 14. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Persaingan harga ketat dengan penyedia lain | Margin turun | Fokus pada kualitas template, kecepatan self-service, dan CS; paket nilai tambah, bukan perang harga. |
| Lonjakan trafik saat hari H | Halaman lambat/down | Render statis + CDN, uji beban sebelum rilis. |
| Penyalahgunaan (penipuan berkedok undangan, link phishing, spam) | Reputasi & keamanan | Verifikasi akun, moderasi laporan, larangan file APK/skrip, peringatan keamanan pada halaman. |
| Hak cipta musik dan aset desain | Risiko hukum | Gunakan pustaka musik berlisensi/royalti-bebas; aset desain orisinal atau berlisensi; syarat & ketentuan untuk unggahan pengguna. |
| Kebocoran data tamu (nama, nomor HP) | Hukum (UU PDP) & kepercayaan | Enkripsi, kontrol akses, kebijakan retensi, opsi hapus data. |
| Tamu lanjut usia kesulitan | Pengalaman buruk | Desain sederhana, huruf besar, tombol jelas, info inti di atas. |
| Musiman (permintaan naik turun) | Arus kas tidak stabil | Diversifikasi kategori acara & segmen korporat, paket reseller. |

## 15. Asumsi & Ketergantungan

- Pengguna utama berbagi undangan melalui WhatsApp.
- Payment gateway lokal tersedia dan menyetujui jenis usaha ini.
- Tim awal: 1 product owner, 2 developer full-stack, 1 UI/UX & desainer template, 1 CS/marketing.
- Template awal dirancang in-house; desainer mitra direkrut mulai v1.2.

## 16. Pertanyaan Terbuka

1. Apakah model harga sekali bayar atau langganan (khusus reseller)?
2. Apakah perlu paket gratis permanen atau hanya uji coba 7 hari?
3. Apakah platform akan memproses transfer amplop digital (escrow) di masa depan? (implikasi regulasi OJK/BI)
4. Nama merek dan domain resmi?
5. Bahasa daerah apa saja yang diprioritaskan?
6. Apakah jasa *done-for-you* dikerjakan internal atau oleh freelancer mitra?

## 17. Lampiran

### 17.1 Glosarium
- **RSVP** — konfirmasi kehadiran tamu.
- **Amplop digital** — informasi rekening/e-wallet/QRIS untuk tamu yang ingin memberi hadiah uang.
- **Slug** — bagian unik URL undangan, mis. `rina-dimas`.
- **Tamu personal** — tautan undangan yang memuat nama tamu tertentu.
- **White-label** — undangan tanpa merek platform, memakai merek reseller.

### 17.2 Kriteria Penerimaan MVP (contoh)
- [ ] Pengguna baru dapat menerbitkan undangan dari template dalam < 15 menit pada uji pengguna (n ≥ 5).
- [ ] Tautan personal menampilkan nama tamu yang benar di sampul.
- [ ] RSVP tersimpan dan muncul di dashboard dalam < 5 detik.
- [ ] Pembayaran sukses mengaktifkan paket otomatis via webhook tanpa intervensi admin.
- [ ] Halaman undangan mendapat skor Lighthouse Performance ≥ 85 di mobile.
- [ ] Pratinjau tautan di WhatsApp menampilkan foto sampul dan judul.
