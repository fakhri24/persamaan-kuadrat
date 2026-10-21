export interface MeetingPlan {
  meetingNumber: number;
  title: string;
  focus: string;
  standardTarget: 'Dasar' | 'TKA' | 'SNBT';
  duration: string;
  essentialGoals: string[];
  scaffoldingSteps: string[];
  mainQuests: string[];
  sideQuests: string[];
  teacherTips: string;
}

export const roadmapData: MeetingPlan[] = [
  {
    meetingNumber: 1,
    title: 'Bentuk Umum & Pemfaktoran Persamaan Kuadrat',
    focus: 'Faktorisasi distributif, selisih kuadrat, dan trinomial a = 1 serta a > 1',
    standardTarget: 'Dasar',
    duration: '2 JP (2 x 45 Menit)',
    essentialGoals: [
      'Memahami bentuk baku ax² + bx + c = 0 (a ≠ 0) dan mengenali nilai a, b, c',
      'Menggunakan prinsip perkalian nol (A · B = 0 ⇒ A = 0 atau B = 0)',
      'Menyelesaikan pemfaktoran selisih kuadrat x² - k² = 0',
      'Menyelesaikan pemfaktoran trinomial x² + bx + c = 0 dan ax² + bx + c = 0',
    ],
    scaffoldingSteps: [
      'Langkah 1: Menstandarkan persamaan ke ruas kanan = 0',
      'Langkah 2: Menentukan faktor persekutuan atau selisih kuadrat',
      'Langkah 3: Mencari pasangan bilangan p dan q dengan p · q = ac dan p + q = b',
      'Langkah 4: Menentukan akar-akar x₁ dan x₂',
    ],
    mainQuests: [
      'Latihan 5.1 No. 1a: x² - 16 = 0',
      'Latihan 5.1 No. 1b: x² - 5x = 0',
      'Latihan 5.1 No. 1e: x² - 7x + 10 = 0',
      'Latihan 5.1 No. 1i: 2x² + 3x - 5 = 0',
    ],
    sideQuests: [
      'Latihan 5.1 No. 1h: x² + 7x - 60 = x + 12 (menyederhanakan ruas kanan dulu)',
      'Latihan 5.1 No. 1l: 6x² - 17x + 12 = 0 (faktor bilangan lebih besar)',
    ],
    teacherTips:
      'Untuk siswa lambat, gunakan visual diagram silang (cross-multiplication) atau tabel faktor ac sebelum memfaktorkan bentuk a > 1.',
  },
  {
    meetingNumber: 2,
    title: 'Kuadrat Sempurna, Rumus Al-Khawarizmi (ABC), & Makna Solusi',
    focus: 'Melengkapkan kuadrat sempurna, penggunaan Rumus ABC untuk akar irasional, dan konsep solusi persamaan',
    standardTarget: 'Dasar',
    duration: '2 JP (2 x 45 Menit)',
    essentialGoals: [
      'Memahami penurunan rumus kuadrat sempurna (x + b/2a)² = -c/a + (b/2a)²',
      'Menerapkan Rumus ABC x₁,₂ = (-b ± √(b² - 4ac)) / 2a dengan teliti',
      'Memahami makna akar sebagai penyelesaian (substitusi nilai akar untuk mencari variabel parameter)',
    ],
    scaffoldingSteps: [
      'Langkah 1: Membiasakan identifikasi a, b, c lengkap dengan tandanya (+ / -)',
      'Langkah 2: Menghitung nilai diskriminan D = b² - 4ac terlebih dahulu',
      'Langkah 3: Menarik akar kuadrat √D dan menyederhanakan pecahan',
      'Langkah 4: Substitusi nilai akar yang diketahui ke persamaan',
    ],
    mainQuests: [
      'Latihan 5.1 No. 2a: x² + x - 12 = 0 (dengan Rumus ABC)',
      'Latihan 5.1 No. 2d: x² - 2x - 5 = 0 (akar irasional bentuk 1 ± √6)',
      'Latihan 5.1 No. 6: ax² - 3x + 7 = 0 memiliki akar 2, tentukan nilai a',
    ],
    sideQuests: [
      'Latihan 5.1 No. 7: (3 - m)x² - 2mx + 12 = 0 memiliki akar 1, tentukan akar lainnya',
      'Latihan 5.1 No. 4: Persamaan rasional kuadrat 4(2x-3)/(x-2) = x + 9/(x-2)',
    ],
    teacherTips:
      'Tekankan bahwa Rumus ABC adalah "senjata pamungkas" yang pasti bisa dipakai jika pemfaktoran sulit ditemukan atau menghasilkan akar bentuk akar (irasional).',
  },
  {
    meetingNumber: 3,
    title: 'Diskriminan (D) & Karakteristik Jenis Akar',
    focus: 'Analisis nilai D = b² - 4ac untuk menentukan sifat riil berbeda, kembar, atau tidak riil (imajiner)',
    standardTarget: 'TKA',
    duration: '2 JP (2 x 45 Menit)',
    essentialGoals: [
      'Menghitung nilai Diskriminan D = b² - 4ac secara presisi',
      'Menyimpulkan jenis akar: D > 0 (2 riil berbeda), D = 0 (riil kembar), D < 0 (tidak riil)',
      'Menentukan nilai parameter koefisien k atau p agar memenuhi syarat jenis akar tertentu',
      'Memahami syarat khusus akar berlawanan (b = 0) dan berkebalikan (a = c)',
    ],
    scaffoldingSteps: [
      'Langkah 1: Mengaitkan D dengan tanda di dalam tanda akar pada rumus ABC',
      'Langkah 2: Membuat hubungan: jika isi akar positif ada 2 solusi, jika 0 ada 1 solusi kembar, jika negatif tidak riil',
      'Langkah 3: Menyusun persamaan D = 0 untuk kasus akar kembar dan mencari nilai parameter',
    ],
    mainQuests: [
      'Latihan 5.2 No. 1a: 2x² + 3x - 11 = 0 (D > 0, riil berlainan)',
      'Latihan 5.2 No. 1b: 3x² + 4x + 4 = 0 (D < 0, tidak riil)',
      'Latihan 5.2 No. 1c: 4x² - 16x + 16 = 0 (D = 0, riil kembar)',
      'Latihan 5.2 No. 4: kx² - kx + 3 = 0 memiliki akar kembar, tentukan nilai k',
    ],
    sideQuests: [
      'Latihan 5.2 No. 2: px² - (2p - 2)x + p = 0 memiliki 2 akar riil berbeda',
      'Latihan 5.2 No. 8: mx² + (m - 5)x - 20 = 0 dengan akar saling berlawanan',
    ],
    teacherTips:
      'Ingatkan siswa bahwa untuk syarat akar kembar kx² - kx + 3 = 0, nilai k = 0 harus dievaluasi karena syarat persamaan kuadrat adalah a ≠ 0.',
  },
  {
    meetingNumber: 4,
    title: 'Teorema Vieta & Bentuk Aljabar Simetris',
    focus: 'Jumlah dan hasil kali akar (x₁ + x₂ = -b/a, x₁x₂ = c/a) serta manipulasi bentuk aljabar kuadrat',
    standardTarget: 'TKA',
    duration: '2 JP (2 x 45 Menit)',
    essentialGoals: [
      'Menghitung nilai x₁ + x₂ dan x₁ · x₂ langsung tanpa mencari akarnya terlebih dahulu',
      'Menguasai identitas simetris utama: x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂',
      'Menyelesaikan bentuk pecahan simetris: 1/x₁ + 1/x₂ = (x₁ + x₂) / (x₁x₂)',
      'Menentukan nilai parameter variabel dari relasi selisih akar atau perkalian akar',
    ],
    scaffoldingSteps: [
      'Langkah 1: Identifikasi nilai -b/a dan c/a secara langsung',
      'Langkah 2: Menuliskan rumus identitas aljabar sebelum memasukkan angka',
      'Langkah 3: Substitusi nilai jumlah dan hasil kali ke dalam identitas aljabar',
    ],
    mainQuests: [
      'Latihan 5.3 No. 1: 2x² - 7x + 5 = 0, hitung 3x₁ + 3x₂ + x₁x₂',
      'Latihan 5.3 No. 2: ax² + 16x - 9 = 0 dengan x₁ + x₂ = 4, cari a',
      'Latihan 5.3 No. 12: x² - 8x - 4 = 0, hitung nilai x₁² + x₂²',
      'Evaluasi 5 No. 5: x² - kx - 2x + 2k = 0, jika 1/x₁ + 1/x₂ = 3/2, cari k',
    ],
    sideQuests: [
      'Latihan 5.3 No. 10: x² - mx + 8 = 0, jika p - q = 2, tentukan nilai m',
      'Latihan 5.3 No. 15: x² - (a - 1)x + 2 = 0, jika x₁ = 2x₂ dan a > 0',
      'Evaluasi 5 No. 7: x² - 2ax - 2x - 8 = 0, jika x₁²x₂ + x₁x₂² = -160, cari a',
    ],
    teacherTips:
      'Siswa lambat sering melakukan kesalahan fatal mengira x₁² + x₂² = (x₁ + x₂)². Selalu tegaskan suku tengah 2x₁x₂ yang harus dikurangkan.',
  },
  {
    meetingNumber: 5,
    title: 'Menyusun Persamaan Kuadrat Baru',
    focus: 'Menyusun PK dari akar yang diketahui dan akar baru yang berelasi simetris dengan akar persamaan lama',
    standardTarget: 'TKA',
    duration: '2 JP (2 x 45 Menit)',
    essentialGoals: [
      'Menyusun PK dengan rumus (x - x₁)(x - x₂) = 0 atau x² - (J)x + (K) = 0',
      'Menyusun PK baru dengan akar yang bertambah/berkurang linear: (x₁ + k) dan (x₂ + k)',
      'Menyusun PK baru dengan akar kelipatan: mx₁ dan mx₂',
    ],
    scaffoldingSteps: [
      'Langkah 1: Tentukan akar-akar baru yang diinginkan (misal α dan β)',
      'Langkah 2: Hitung jumlah akar baru (J = α + β) memanfaatkan Vieta PK lama',
      'Langkah 3: Hitung hasil kali akar baru (K = α · β)',
      'Langkah 4: Tuliskan bentuk akhir: x² - Jx + K = 0',
    ],
    mainQuests: [
      'Latihan 5.4 No. 1: Persamaan kuadrat dengan akar -3 dan 4',
      'Latihan 5.4 No. 3: x² - 3x + 1 = 0 ⇒ akar baru (x₁ + 4) dan (x₂ + 4)',
      'Evaluasi 5 No. 10: x² + 4x - 1 = 0 ⇒ akar baru (2x₁ + 3) dan (2x₂ + 3)',
    ],
    sideQuests: [
      'Latihan 5.4 No. 4: 3x² - 5x + 1 = 0 ⇒ akar baru 1/(x₁ - 1) dan 1/(x₂ - 1)',
      'Evaluasi 5 No. 13: x² - 2x - 4 = 0 ⇒ akar baru (p² + q) dan (p + q²)',
    ],
    teacherTips:
      'Kenalkan metode substitusi cepat (invers fungsi transformasi) untuk siswa sedang-cepat: jika akar baru x + 4, gantikan x pada persamaan lama dengan (x - 4).',
  },
  {
    meetingNumber: 6,
    title: 'Aplikasi Masalah Nyata & Pemodelan Geometri',
    focus: 'Penerapan persamaan kuadrat dalam masalah luas bidang, border jalan keliling, dan dalil Pythagoras',
    standardTarget: 'SNBT',
    duration: '2 JP (2 x 45 Menit)',
    essentialGoals: [
      'Menerjemahkan soal cerita kontekstual ke dalam model persamaan kuadrat',
      'Menyelesaikan masalah luas kebun/taman berbentuk persegi panjang',
      'Menyelesaikan masalah tangga bersandar pada tembok menggunakan Pythagoras',
      'Memilih solusi akar yang bermakna fisis (panjang dan jarak tidak boleh negatif)',
    ],
    scaffoldingSteps: [
      'Langkah 1: Membuat sketsa gambar geometri dari deskripsi soal',
      'Langkah 2: Menetapkan variabel x untuk besaran yang belum diketahui',
      'Langkah 3: Menyusun persamaan kuadrat sesuai rumus luas atau dalil Pythagoras',
      'Langkah 4: Menentukan akar-akar dan mengeliminasi akar yang bernilai negatif',
    ],
    mainQuests: [
      'Latihan 5.5 No. 1: Kebun luas 28 m², lebar 3 m kurangnya dari panjang',
      'Latihan 5.5 No. 2: Tangga 13 m disandarkan, tinggi tembok 7 m lebih panjang dari jarak kaki',
    ],
    sideQuests: [
      'Latihan 5.5 No. 3: Kolam 180 m² selisih p dan l adalah 3 m, dikelilingi jalan 2 m, hitung luas jalan',
      'Evaluasi 5 No. 14 / 15: Halaman gedung dengan jalan parkir berlebar sama di sekeliling taman',
    ],
    teacherTips:
      'Selalu ingatkan siswa untuk memeriksa kembali konteks dunia nyata. Jika x₁ = 9 dan x₂ = -12, panjang dinding tidak mungkin negatif sehingga pilih 9 meter.',
  },
  {
    meetingNumber: 7,
    title: 'Review Komprehensif & Simulasi UH (Paket A & Paket B)',
    focus: 'Penguatan konsep terpadu, pemecahan masalah bersama (Paket A) dan simulasi belajar mandiri (Paket B)',
    standardTarget: 'TKA',
    duration: '2 JP (2 x 45 Menit)',
    essentialGoals: [
      'Membahas bersama 10 butir soal simulasi terpadu Paket A dengan petunjuk langkah bertahap',
      'Menganalisis pola kesalahan umum aljabar dan strategi efisiensi waktu pengerjaan',
      'Mempersiapkan siswa mengerjakan Paket B secara mandiri untuk pemantapan di rumah',
    ],
    scaffoldingSteps: [
      'Sesi 1: Diskusi kelompok terpandu mengerjakan Paket A (Soal 1 s.d. 10)',
      'Sesi 2: Review jebakan tanda minus dan pecahan simetris',
      'Sesi 3: Pembagian Paket B sebagai latihan mandiri dan remedial pra-ulangan',
    ],
    mainQuests: [
      'Simulasi Paket A Lengkap (10 Butir Soal Terpandu Kelas)',
    ],
    sideQuests: [
      'Simulasi Paket B Mandiri (10 Butir Soal Varian Isomorfik di Rumah)',
    ],
    teacherTips:
      'Gunakan peer-tutoring di mana siswa yang cepat mendampingi teman sebangkunya saat membahas Paket A di kelas.',
  },
  {
    meetingNumber: 8,
    title: 'Pelaksanaan Ulangan Harian (10 Wajib + 2 Opsional)',
    focus: 'Evaluasi ketercapaian kompetensi: 10 soal wajib (maks 100) dan 2 soal opsional problem solving (+10 bonus)',
    standardTarget: 'TKA',
    duration: '2 JP (80 - 90 Menit)',
    essentialGoals: [
      'Mengukur ketuntasan kompetensi dasar persamaan kuadrat siswa lambat-ke-sedang (Soal 1–6)',
      'Mengukur kemampuan penalaran standar TKA & SNBT siswa sedang (Soal 7–10)',
      'Memberikan wadah pengayaan problem solving bagi siswa cepat (Soal 11 & 12 opsional)',
    ],
    scaffoldingSteps: [
      'Tahap 1: Pengerjaan 10 soal wajib secara tenang dan teliti',
      'Tahap 2: Siswa yang selesai lebih awal diarahkan mengerjakan Soal 11 & 12 untuk bonus nilai',
      'Tahap 3: Rekapitulasi skor otomatis dan evaluasi hasil belajar',
    ],
    mainQuests: [
      'Ulangan Harian Butir 1 s.d. 10 (Skor Maksimal 100)',
    ],
    sideQuests: [
      'Ulangan Harian Butir 11 & 12 Opsional (Bonus Maksimal +10 Poin)',
    ],
    teacherTips:
      'Pastikan siswa memahami bahwa soal 11 & 12 bersifat opsional (tidak mengurangi nilai jika kosong), sehingga tidak menimbulkan kepanikan pada siswa yang lambat.',
  },
];
