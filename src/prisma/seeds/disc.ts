import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const discSeed = async () => {
  const data = [
    { questionIndex: 1, options: ["Gampangan, Mudah setuju", "Percaya, Mudah percaya pada orang", "Petualang, Mengambil resiko", "Toleran, Menghormati"] },
    { questionIndex: 2, options: ["Lembut suara, Pendiam", "Optimistik, Visioner", "Pusat Perhatian, Suka gaul", "Pendamai, Membawa Harmoni"] },
    { questionIndex: 3, options: ["Menyemangati orang", "Berusaha sempurna", "Bagian dari kelompok", "Ingin membuat tujuan"] },
    { questionIndex: 4, options: ["Menjadi frustrasi", "Menyimpan perasaan saya", "Menceritakan sisi saya", "Siap beroposisi"] },
    { questionIndex: 5, options: ["Hidup, Suka bicara", "Gerak cepat, Tekun", "Usaha menjaga keseimbangan", "Usaha mengikuti aturan"] },
    { questionIndex: 6, options: ["Kelola waktu secara efisien", "Sering terburu-buru, Merasa tertekan", "Masalah sosial itu penting", "Suka selesaikan apa yang saya mulai"] },
    { questionIndex: 7, options: ["Tolak perubahan mendadak", "Cenderung janji berlebihan", "Tarik diri di tengah tekanan", "Tidak takut bertempur"] },
    { questionIndex: 8, options: ["Penyemangat yang baik", "Pendengar yang baik", "Penganalisa yang baik", "Delegator yang baik"] },
    { questionIndex: 9, options: ["Hasil adalah penting", "Lakukan dengan benar, Akurasi penting", "Dibuat menyenangkan", "Mari kerjakan bersama"] },
    { questionIndex: 10, options: ["Akan berjalan terus tanpa kontrol diri", "Akan membeli sesuai dorongan hati", "Akan menunggu, Tanpa tekanan", "Akan mengusahakan yang kuinginkan"] },
    { questionIndex: 11, options: ["Ramah, Mudah bergabung", "Unik, Bosan rutinitas", "Aktif mengubah sesuatu", "Ingin hal-hal yang pasti"] },
    { questionIndex: 12, options: ["Non-konfrontasi, Menyerah", "Dipenuhi hal detail", "Perubahan pada menit terakhir", "Menuntut, Kasar"] },
    { questionIndex: 13, options: ["Ingin kemajuan", "Puas dengan segalanya", "Terbuka memperlihatkan perasaan", "Rendah hati, Sederhana"] },
    { questionIndex: 14, options: ["Tenang, Pendiam", "Bahagia, Tanpa beban", "Menyenangkan, Baik hati", "Tak gentar, Berani"] },
    { questionIndex: 15, options: ["Menggunakan waktu berkualitas dgn teman", "Rencanakan masa depan, Bersiap", "Bepergian demi petualangan baru", "Menerima ganjaran atas tujuan yg dicapai"] },
    { questionIndex: 16, options: ["Aturan perlu dipertanyakan", "Aturan membuat adil", "Aturan membuat bosan", "Aturan membuat aman"] },
    { questionIndex: 17, options: ["Pendidikan, Kebudayaan", "Prestasi, Ganjaran", "Keselamatan, keamanan", "Sosial, Perkumpulan kelompok"] },
    { questionIndex: 18, options: ["Memimpin, Pendekatan langsung", "Suka bergaul, Antusias", "Dapat diramal, Konsisten", "Waspada, Hati-hati"] },
    { questionIndex: 19, options: ["Tidak mudah dikalahkan", "Kerjakan sesuai perintah, Ikut pimpinan", "Mudah terangsang, Riang", "Ingin segalanya teratur, Rapi"] },
    { questionIndex: 20, options: ["Saya akan pimpin mereka", "Saya akan melaksanakan", "Saya akan meyakinkan mereka", "Saya dapatkan fakta"] },
    { questionIndex: 21, options: ["Memikirkan orang dahulu", "Kompetitif, Suka tantangan", "Optimis, Positif", "Pemikir logis, Sistematik"] },
    { questionIndex: 22, options: ["Menyenangkan orang, Mudah setuju", "Tertawa lepas, Hidup", "Berani, Tak gentar", "Tenang, Pendiam"] },
    { questionIndex: 23, options: ["Ingin otoritas lebih", "Ingin kesempatan baru", "Menghindari konflik", "Ingin petunjuk yang jelas"] },
    { questionIndex: 24, options: ["Dapat diandalkan, Dapata dipercaya", "Kreatif, Unik", "Garis dasar, Orientasi hasil", "Jalankan standar yang tinggi, Akurat"] }
  ];

  for (const item of data) {
    await prisma.discQuestion.create({
      data: {
        questionIndex: item.questionIndex,
        option: {
          create: item.options.map((sentence, index) => ({
            sentences: sentence,
            optionIndex: index + 1
          }))
        }
      }
    });
  }
};

export { discSeed }