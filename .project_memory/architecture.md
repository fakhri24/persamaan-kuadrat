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

6. **Protokol Operasional (Continuous Deployment & Memory Sync)**:
   - **Sinkronisasi Memori Otomatis**: Setiap keputusan arsitektur dan penambahan fitur wajib langsung dicatat ke `.project_memory/decisions.md` dan `architecture.md`.
   - **Auto Push & Deploy**: Setiap perubahan yang telah diverifikasi (`npm run build`) harus langsung di-commit dan di-push ke branch `main` pada remote `origin` (`https://github.com/fakhri24/persamaan-kuadrat.git`).
   - **GitHub Pages CI/CD**: Workflow GitHub Actions (`.github/workflows/deploy.yml`) akan secara otomatis mem-build dan men-deploy ke live URL GitHub Pages `https://fakhri24.github.io/persamaan-kuadrat/`.
