# Log Keputusan Teknis (Decisions Log)

| Tanggal | Topik | Keputusan | Rasional |
| :--- | :--- | :--- | :--- |
| 2026-10-19 | Struktur Folder Referensi | Berkas PDF disimpan di `referensi/Materi4-Persamaan_Kuadrat.pdf` | Memisahkan berkas sumber referensi asli dari kode aplikasi |
| 2026-10-19 | Framework & Bundler | React 18 + TypeScript + Vite | Performa tinggi, modular, dan ekosistem komponen kaya |
| 2026-10-19 | Formula Engine | KaTeX (`katex.renderToString`) | Rendering rumus matematika super cepat, tajam, dan bobot ringan |
| 2026-10-19 | Diagram Contoh 5.5 | SVG Vektor Mandiri (`Contoh55Svg.tsx`) | Menghasilkan garis dan teks dimensi yang tajam di layar resolusi tinggi |
| 2026-10-19 | Kebijakan Caching | Zero-Cache di `index.html` & `firebase.json` | Menjamin siswa/pengguna selalu mendapatkan update kode seketika |
| 2026-10-19 | Penilaian Evaluasi | Otomatisasi Skor 0-100 dengan Confetti | Memberikan umpan balik langsung dan motivasi belajar yang menyenangkan |
| 2026-10-19 | UI/UX & LaTeX Playwright Audit | Skor 9.87/10: Eliminasi unrendered LaTeX & perbaikan mobile layout overflow | Memastikan seluruh formula KaTeX terender presisi (285 formula) dan bebas horizontal overflow di seluruh resolusi (375px s.d. 1920px) |
| 2026-10-19 | Resolusi Glitch KaTeX Quad & Text | Normalisasi multiple backslash `\\quad` & `\\text` di `MathView.tsx` | Mencegah KaTeX menginterpretasikan `\\` ganda sebagai line break + variabel teks terpisah, menjaga formula tetap sebaris dan rapi |
| 2026-10-21 | Kurikulum & Evaluasi Komprehensif Persamaan Kuadrat | Integrasi Tab Bar (Buku Supermath + Quest, Roadmap 8 Pertemuan, Latihan Paket A & B, Ulangan Harian 10 Wajib @10 + 2 Opsional @5 max 110) | Menyediakan pengalaman belajar scaffolding terpadu untuk siswa lambat-ke-sedang dengan standar TKA & SNBT serta pengayaan siswa cepat |
| 2026-10-21 | Deployment GitHub Pages | Setup GitHub Actions (.github/workflows/deploy.yml) dan base: './' di vite.config.ts | Memfasilitasi rilis otomatis ke GitHub Pages fakhri24/persamaan-kuadrat |
