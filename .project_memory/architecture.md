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
   - Paket A (guided) dan Paket B (mandiri) memakai 10 tipe soal yang sama dengan angka berbeda; keduanya bebas dari duplikasi persamaan Latihan 5.1–5.5.
   - Kunci pilihan ganda disebar (bukan menumpuk di A) untuk menjaga validitas penilaian.
   - Ulangan Harian memakai angka baru untuk No. 10 (tangga 20 m/+4 → 16 m) dan No. 11 (pecahan rasional → 2 atau 5), serta soal kecukupan data baru untuk No. 12.
   - Latihan 5.1 No. 4 memakai kunci "3 atau 7" sesuai pembahasan (sebelumnya hanya "7").

8. **Aksesibilitas & Navigasi**:
   - Tab utama memakai `role="tablist"`/`role="tab"` + `aria-selected` dan mendukung navigasi panah kiri/kanan, Home, End.
   - Header tab dapat digulir horizontal pada layar sempit (tinggi tetap ±66 px).
   - Feedback jawaban memakai `role="status"`/`aria-live="polite"`; `color-scheme: dark` diterapkan agar kontrol native (radio/checkbox) ikut bertema.
   - Tombol "kembali ke atas" disembunyikan pada tab latihan/UH agar tidak menutupi tombol aksi kartu.

9. **Materi Cetak (PDF)**:
   - `scripts/generate-paket-a-pdf.mjs` menghasilkan PDF A4 **2 halaman** dari `paketAData`: 50% kiri soal, 50% kanan ruang pengerjaan, identitas hanya Nama Siswa dan Kelas.
   - Matematika dirender saat pembuatan PDF memakai KaTeX dengan font ter-embed, sehingga file mandiri tanpa dependensi jaringan.
   - Output: `public/downloads/paket-a-soal.pdf`. Tombol "Unduh soal Paket A (PDF, 2 halaman)" tampil di tab Paket A.
   - Regenerasi: `npm run pdf:paket-a`.

10. **Protokol Operasional (Continuous Deployment & Memory Sync)**:
   - **Sinkronisasi Memori Otomatis**: Setiap keputusan arsitektur dan penambahan fitur wajib langsung dicatat ke `.project_memory/decisions.md` dan `architecture.md`.
   - **Auto Push & Deploy**: Setiap perubahan yang telah diverifikasi (`npm run build`) harus langsung di-commit dan di-push ke branch `main` pada remote `origin` (`https://github.com/fakhri24/persamaan-kuadrat.git`).
   - **GitHub Pages CI/CD**: Workflow GitHub Actions (`.github/workflows/deploy.yml`) akan secara otomatis mem-build dan men-deploy ke live URL GitHub Pages `https://fakhri24.github.io/persamaan-kuadrat/`.
