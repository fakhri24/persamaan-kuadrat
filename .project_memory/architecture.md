# Architectural Decisions: Website Persamaan Kuadrat (Bab 5)

## Ringkasan Proyek
Website pembelajaran interaktif materi matematika SMA Kelas X **Bab 5 Persamaan Kuadrat**, disalin secara persis kata-per-kata dari dokumen referensi buku cetak `referensi/Materi4-Persamaan_Kuadrat.pdf` (22 halaman).

## Keputusan Kunci
1. **Tech Stack**:
   - React 18 + TypeScript + Vite + Tailwind CSS.
   - KaTeX untuk rendering rumus matematika presisi LaTeX di browser.
   - Lucide Icons untuk ikon antarmuka.
   - Canvas Confetti untuk perayaan skor evaluasi.

2. **Kaidah Konten**:
   - Salinan kata-per-kata (verbatim) tanpa pengurangan dari naskah buku.
   - Semua rumus dan bentuk berbingkai disajikan di dalam kotak (*CalloutBox*) bergaris batas elegan.
   - Kotak judul dengan panah chevron dekoratif pada "Latihan 5.5" diubah menjadi heading modern tanpa panah.
   - Gambar Contoh 5.5 digenerate ulang sebagai SVG vektor presisi tinggi (`Contoh55Svg.tsx`).
   - Gambar utama (Hero) menggunakan fotografi HD taman/halaman rumah nyata (`courtyard-garden.jpg`).

3. **Interaktivitas & Gamifikasi**:
   - Seluruh latihan (Latihan 5.1 s.d. 5.5) dan Evaluasi 5 dilengkapi input interaktif, validasi jawaban instan, dan tombol toggle pembahasan langkah demi langkah.
   - Evaluasi 5 (17 butir soal) memiliki Kartu Skor Nilai otomatis (0–100) dan efek confetti.

4. **Navigasi & UX**:
   - Single-page layout dengan *continuous vertical scroll*.
   - Floating / Sticky Table of Contents dengan *scrollSpy* aktif.
   - Peta Konsep interaktif dengan tombol lompat halus (*smooth scroll*).
   - Dukungan tema ganda (*Light* & *Dark* mode) dengan penyimpanan di `localStorage`.

5. **Kebijakan Caching (Zero-Cache)**:
   - Diterapkan konfigurasi `no-cache, no-store, must-revalidate` pada meta tag `index.html` dan `firebase.json`.

6. **Rendering Matematika (KaTeX-only)**:
   - Seluruh bank soal dinamis (Paket A, Paket B, Ulangan Harian) menyimpan matematika sebagai string LaTeX di dalam delimiter `$...$` (inline) dan `$$...$$` (blok).
   - Komponen `MathText` mem-parse delimiter tersebut dan merender setiap segmen memakai `MathView` (KaTeX); teks biasa tetap dipertahankan dengan `whitespace-pre-line`.
   - Opsi pilihan ganda dirender dari field `math` saja (KaTeX). Field `text` hanya dipakai untuk `aria-label`/fallback aksesibilitas sehingga tidak ada ekspresi yang tampil dua kali.
   - `MathView` blok melakukan *auto-fit* (skala minimum 0,85) agar rumus muat di layar kecil; bila masih lebih lebar, diberikan fade + `title` "Geser ke samping" sebagai isyarat gulir, bukan pemotongan senyap.

7. **Bank Soal & Kesetaraan**:
   - Paket A (guided) kini berupa **10 soal pilihan ganda dengan 5 opsi (A–E)**; kunci disebar merata (A–E masing-masing 2 soal). Paket A bebas dari duplikasi persamaan Latihan 5.1–5.5.
   - Paket A No. 2 secara eksplisit meminta penyelesaian dengan **rumus ABC atau melengkapkan kuadrat**; pembahasannya menampilkan kedua cara.
   - Paket B (mandiri) kini juga berupa **10 soal pilihan ganda 5 opsi (A–E)** dengan kunci disebar merata (A–E masing-masing 2 soal), tetapi kontennya divariasikan: B1 `2x² − 7x + 3 = 0` (a ≠ 1; akar 1/2 dan 3), B3 menanyakan koefisien `a`, B6 `2x² − 8x + 3 = 0` (a ≠ 1; `p² + q² = 13`), B9 akar `(x₁ − 3)` dan `(x₂ − 3)`, serta B10 berupa pemodelan luas lahan (bukan Pythagoras).
   - Ulangan Harian memakai angka baru untuk No. 10 (tangga 20 m/+4 → 16 m) dan No. 11 (pecahan rasional → 2 atau 5), serta soal kecukupan data baru untuk No. 12.
   - Latihan 5.1 No. 4 memakai kunci "3 atau 7" sesuai pembahasan (sebelumnya hanya "7").

8. **Aksesibilitas & Navigasi**:
   - Tab utama memakai `role="tablist"`/`role="tab"` + `aria-selected` dan mendukung navigasi panah kiri/kanan, Home, End.
   - Header tab dapat digulir horizontal pada layar sempit (tinggi tetap ±66 px).
   - Feedback jawaban memakai `role="status"`/`aria-live="polite"`; `color-scheme: dark` diterapkan agar kontrol native (radio/checkbox) ikut bertema.
   - Tombol "kembali ke atas" disembunyikan pada tab latihan/UH agar tidak menutupi tombol aksi kartu.

9. **Materi Cetak (PDF Paket A & B)**:
   - `scripts/generate-paket-a-pdf.mjs` dan `scripts/generate-paket-b-pdf.mjs` menghasilkan PDF A4 **2 halaman** dari `paketAData`/`paketBData`: setiap baris berisi **kotak soal (kiri) + kotak ruang pengerjaan (kanan)** 50:50 dengan garis bawah sejajar.
   - Setiap soal memuat 5 opsi (A–E). Identitas hanya Nama Siswa dan Kelas; tanpa kunci jawaban.
   - Label "RUANG PENGERJAAN" tidak ditampilkan; kotak kerja **polos putih tanpa garis bantu**, hanya dibatasi border kotak. PDF A No. 10 tetap memuat ilustrasi tembok/tangga (pola bata, label TEMBOK, dimensi t/17 m/x).
   - PDF B No. 10 **tidak menampilkan rumus/model** `l(l+4)=96`; siswa membangun model luas sendiri dari stimulus. PDF B No. 7 memakai stimulus ringkas seperti PDF A.
   - Matematika dirender dengan KaTeX font ter-embed; output `public/downloads/paket-a-soal.pdf` dan `public/downloads/paket-b-soal.pdf`; regenerasi `npm run pdf:paket-a` / `npm run pdf:paket-b`. Tombol unduh mengikuti paket aktif.

10. **Penyesuaian Paket B (sudah dieksekusi 2026-11-07)**:
   - B1: `2x² − 7x + 3 = 0` (a = 2, dapat difaktorkan) → `x = 1/2` atau `x = 3`.
   - B3: `ax² + 5x − 6 = 0` dengan `x = −2` → `a = 4` (yang dicari koefisien `a`, bukan `b`).
   - B6: `2x² − 8x + 3 = 0` (a = 2, tanpa faktor bersama) → `p + q = 4`, `pq = 3/2`, `p² + q² = 13`.
   - B9: akar baru `(x₁ − 3)` dan `(x₂ − 3)` dari `x² − 2x − 1 = 0` → `x² + 4x + 2 = 0`.
   - B10: stimulus pemodelan luas lahan (taman baca, panjang 4 m lebih dari lebar, luas 96 m²) → panjang 12 m; diagram tangga dihapus dari Paket B. `mathPrompt` B10 juga dihapus agar siswa membangun model luas sendiri (hint tidak lagi menuliskan persamaan).
   - Seluruh 10 soal Paket B kini PG 5 opsi; kunci disebar A–E masing-masing 2 soal.
   - PDF Paket B tersedia 2 halaman (`paket-b-soal.pdf`) dengan generator `generate-paket-b-pdf.mjs`; tombol unduh di UI mengikuti paket aktif.
   - Konsekuensi: Paket B tidak lagi memuat item Pythagoras; item tersebut tetap ada di Paket A No. 10 dan UH No. 10. Klaim "isomorfik" pada header dan roadmap diganti menjadi "setara dengan variasi konteks".

11. **Protokol Operasional (Continuous Deployment & Memory Sync)**:
   - **Sinkronisasi Memori Otomatis**: Setiap keputusan arsitektur dan penambahan fitur wajib langsung dicatat ke `.project_memory/decisions.md` dan `architecture.md`.
   - **Auto Push & Deploy**: Setiap perubahan yang telah diverifikasi (`npm run build`) harus langsung di-commit dan di-push ke branch `main` pada remote `origin` (`https://github.com/fakhri24/persamaan-kuadrat.git`).
   - **GitHub Pages CI/CD**: Workflow GitHub Actions (`.github/workflows/deploy.yml`) akan secara otomatis mem-build dan men-deploy ke live URL GitHub Pages `https://fakhri24.github.io/persamaan-kuadrat/`.
