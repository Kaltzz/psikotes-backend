import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const mbtiSeed = async () => {
    const data = [
        { questionIndex: 1, question: "Saat berada di sebuah pesta, Anda:", options: ["Berinteraksi dengan banyak orang, termasuk yang belum dikenal.", "Berinteraksi hanya dengan beberapa orang yang sudah dikenal."] },
        { questionIndex: 2, question: "Apakah Anda termasuk orang yang", options: ["Cenderung realistis.", "Cenderung spekulatif."] },
        { questionIndex: 3, question: "Keadaan mana yang lebih buruk", options: ["Penuh dengan angan-angan.", "Terbatasi oleh fakta-fakta."] },
        { questionIndex: 4, question: "Apakah Anda lebih terkesan oleh", options: ["Teori-teori.", "Emosi dan perasaan."] },
        { questionIndex: 5, question: "Apakah Anda lebih tertarik pada orang yang", options: ["Meyakinkan Anda.", "Menyentuh perasaan Anda."] },
        { questionIndex: 6, question: "Apakah Anda lebih menyukai bekerja", options: ["Dengan tenggat waktu (deadline).", "Kapan saja Anda mau."] },
        { questionIndex: 7, question: "Apakah Anda cenderung memilih sesuatu", options: ["Dengan penuh perhitungan.", "Secara impulsif."] },
        { questionIndex: 8, question: "Di dalam pesta, apakah Anda:", options: ["Hadir sampai larut, dengan lebih bersemangat.", "Pulang lebih awal, dengan kehabisan energi."] },
        { questionIndex: 9, question: "Apakah Anda lebih tertarik pada", options: ["Orang yang konkret.", "Orang yang memiliki imajinasi."] },
        { questionIndex: 10, question: "Anda lebih tertarik pada", options: ["Hal-hal yang aktual.", "Hal-hal yang mungkin terjadi."] },
        { questionIndex: 11, question: "Dalam menilai orang, apakah Anda lebih dipengaruhi oleh", options: ["Hukum-hukum atau peraturan.", "Kemungkinan-kemungkinan."] },
        { questionIndex: 12, question: "Dalam mendekati orang lain, apakah Anda cenderung bersikap", options: ["Formal, objektif.", "Personal/pribadi."] },
        { questionIndex: 13, question: "Dalam melakukan sesuatu, apakah Anda cenderung", options: ["Terikat pada waktu.", "Santai."] },
        { questionIndex: 14, question: "Mana yang lebih mengganggu Anda; hal-hal yang", options: ["Belum terselesaikan.", "Sudah terselesaikan."] },
        { questionIndex: 15, question: "Dalam kelompok sosial Anda, apakah Anda", options: ["Selalu mengetahui perkembangan kondisi teman-teman Anda.", "Tidak mengikuti informasi keadaan teman-teman Anda."] },
        { questionIndex: 16, question: "Dalam melakukan hal-hal sehari-hari, apakah Anda cenderung", options: ["Melakukannya seperti kebanyakan orang.", "Melakukannya dengan cara Anda sendiri."] },
        { questionIndex: 17, question: "Menurut Anda, penulis sebaiknya", options: ["Menulis sejelas apa yang mereka maksudkan.", "Menulis dengan menggunakan analogi atau lambang-lambang."] },
        { questionIndex: 18, question: "Mana yang lebih menarik bagi Anda", options: ["Konsistensi pemikiran.", "Harmoni antar manusia."] },
        { questionIndex: 19, question: "Apakah Anda lebih suka membuat", options: ["Penilaian berdasarkan pemikiran yang logis.", "Penilaian berdasarkan norma-norma yang berlaku di masyarakat."] },
        { questionIndex: 20, question: "Apakah Anda lebih menyukai hal-hal di sekitar Anda", options: ["Tersusun dan terjadwal.", "Tidak tersusun dan tidak terjadwal."] },
        { questionIndex: 21, question: "Apakah Anda cenderung termasuk orang yang", options: ["Serius dan berkemauan keras.", "Santai (easy going)."] },
        { questionIndex: 22, question: "Saat menelepon seseorang, apakah Anda", options: ["Tidak merencanakan apa yang akan dibicarakan.", "Melatih/mengulang hal-hal yang akan dibicarakan."] },
        { questionIndex: 23, question: "Fakta, menurut Anda", options: ["Menyatakan hal yang terjadi.", "Menggambarkan prinsip-prinsip."] },
        { questionIndex: 24, question: "Menurut Anda, seorang visioner", options: ["Mengganggu.", "Mengagumkan."] },
        { questionIndex: 25, question: "Apakah Anda cenderung", options: ["Berkepala dingin.", "Ramah dan hangat."] },
        { questionIndex: 26, question: "Mana yang lebih buruk", options: ["Ketidakadilan.", "Tanpa belas kasih."] },
        { questionIndex: 27, question: "Apakah seseorang sebaiknya menjalani kejadian dalam hidupnya sebagai", options: ["Suatu akibat dari kegiatan dan/atau pilihan yang dibuat sebelumnya.", "Sesuatu yang terjadi secara kebetulan."] },
        { questionIndex: 28, question: "Apakah Anda merasa lebih suka", options: ["Dibelikan sesuatu barang.", "Memiliki pilihan untuk membeli."] },
        { questionIndex: 29, question: "Saat bersama orang lain, Anda lebih suka", options: ["Memulai pembicaraan.", "Menunggu orang lain berbicara pada Anda."] },
        { questionIndex: 30, question: "Nalar, menurut Anda", options: ["Tak perlu dipertanyakan.", "Patut dipertanyakan."] },
        { questionIndex: 31, question: "Anak-anak seringkali", options: ["Kurang membuat diri mereka berguna bagi orang lain.", "Tidak cukup melatih/mengembangkan fantasi mereka."] },
        { questionIndex: 32, question: "Dalam membuat keputusan, apakah Anda lebih suka menggunakan", options: ["Standar/Peraturan.", "Perasaan."] },
        { questionIndex: 33, question: "Apakah Anda cenderung orang yang", options: ["Tegas.", "Lemah lembut."] },
        { questionIndex: 34, question: "Mana yang lebih patut dihormati", options: ["Kemampuan untuk mengorganisasi dan mengatur.", "Kemampuan untuk beradaptasi."] },
        { questionIndex: 35, question: "Apakah Anda lebih menekankan pentingnya", options: ["Kepastian.", "Kemungkinan."] },
        { questionIndex: 36, question: "Interaksi yang baru dengan orang lain yang belum dikenal membuat Anda", options: ["Bersemangat dan bergairah.", "Merasa lelah dan kehabisan energi."] },
        { questionIndex: 37, question: "Apakah Anda lebih cenderung orang yang", options: ["Praktis.", "Penuh angan-angan."] },
        { questionIndex: 38, question: "Apakah Anda lebih sering", options: ["Memperhatikan apa yang bisa dilakukan orang lain.", "Memperhatikan apa yang menjadi pusat perhatian orang lain."] },
        { questionIndex: 39, question: "Mana yang lebih memuaskan Anda", options: ["Mendiskusikan suatu topik secara mendalam.", "Mencapai sebuah persetujuan atas suatu topik/masalah."] },
        { questionIndex: 40, question: "Mana yang lebih berperan dalam diri Anda", options: ["Kepala/pikiran Anda.", "Hati Anda."] },
        { questionIndex: 41, question: "Apakah Anda lebih menyukai pekerjaan yang berbasis", options: ["Kontrak.", "Permanen."] },
        { questionIndex: 42, question: "Anda cenderung lebih suka mengerjakan", options: ["Hal yang sudah tersusun/terjadwal.", "Hal apa pun yang muncul di hadapan Anda."] },
        { questionIndex: 43, question: "Mana yang lebih Anda sukai", options: ["Memiliki banyak teman dengan sesekali kontak.", "Memiliki sedikit teman dengan intensitas kontak yang mendalam."] },
        { questionIndex: 44, question: "Apakah Anda lebih dipengaruhi oleh", options: ["Fakta.", "Teori-teori/prinsip."] },
        { questionIndex: 45, question: "Anda lebih tertarik pada sifat pekerjaan", options: ["Produksi dan Distribusi.", "Desain dan Penelitian."] },
        { questionIndex: 46, question: "Mana yang lebih merupakan suatu pujian bagi Anda", options: ["\"Anda orang yang sangat logis\".", "\"Anda orang yang sangat berperasaan\"."] },
        { questionIndex: 47, question: "Hal yang Anda hargai dari diri Anda adalah bahwa Anda termasuk orang yang", options: ["Pasti, dapat diprediksi.", "Loyal dan rajin."] },
        { questionIndex: 48, question: "Apakah Anda lebih menyukai", options: ["Hal-hal yang sudah terselesaikan dan tidak dapat diubah kembali.", "Hal-hal yang belum terselesaikan dan bersifat sementara."] },
        { questionIndex: 49, question: "Apakah Anda lebih merasa nyaman", options: ["Sebelum suatu keputusan diambil.", "Setelah suatu keputusan diambil."] },
        { questionIndex: 50, question: "Apakah Anda", options: ["Mudah membangun pembicaraan yang mendalam dengan orang yang belum dikenal.", "Kurang merasa nyaman berbicara dengan orang yang belum dikenal."] },
        { questionIndex: 51, question: "Apakah Anda lebih mempercayai", options: ["Pengalaman Anda.", "Prediksi/Perkiraan Anda."] },
        { questionIndex: 52, question: "Apakah Anda merasa bahwa Anda", options: ["Cenderung praktis.", "Cenderung cerdik."] },
        { questionIndex: 53, question: "Orang seperti apa yang menurut Anda lebih patut dihargai, apakah mereka yang", options: ["Memiliki alasan yang jelas.", "Memiliki perasaan yang kuat."] },
        { questionIndex: 54, question: "Apakah Anda cenderung", options: ["Berpikir adil.", "Bersimpati pada orang lain."] },
        { questionIndex: 55, question: "Akan lebih baik jika manusia", options: ["Mengatur agar hal dan peristiwa terjadi seperti yang diinginkan.", "Membiarkan peristiwa terjadi apa adanya."] },
        { questionIndex: 56, question: "Dalam hubungan antar manusia, suatu kejadian sebaiknya", options: ["Dapat diatur kemunculannya.", "Terjadi secara kebetulan dan tak terduga."] },
        { questionIndex: 57, question: "Saat telepon berbunyi, Anda", options: ["Bergegas mengangkatnya.", "Berharap orang lain akan mengangkatnya."] },
        { questionIndex: 58, question: "Mana yang lebih Anda hargai dari diri Anda", options: ["Kemampuan untuk berpikir realistis.", "Imajinasi yang kuat."] },
        { questionIndex: 59, question: "Apakah Anda lebih tertarik pada", options: ["Hal-hal yang mendasar.", "Makna atau nuansa yang dikandung oleh sesuatu."] },
        { questionIndex: 60, question: "Kesalahan mana yang lebih berat", options: ["Terlalu berperasaan.", "Terlalu objektif."] },
        { questionIndex: 61, question: "Apakah Anda melihat diri Anda sebagai orang yang", options: ["Keras kepala.", "Berhati lembut."] },
        { questionIndex: 62, question: "Situasi mana yang lebih menarik bagi Anda", options: ["Terstruktur dan terjadwal.", "Tidak terstruktur dan tidak terjadwal."] },
        { questionIndex: 63, question: "Apakah Anda termasuk orang yang cenderung", options: ["Rutin dan teratur.", "Mudah berubah, tidak terduga."] },
        { questionIndex: 64, question: "Apakah Anda cenderung", options: ["Mudah didekati orang lain.", "Penyendiri, pendiam."] },
        { questionIndex: 65, question: "Dalam menulis, apakah Anda lebih menyukai tulisan yang bersifat", options: ["Literal, mengungkapkan fakta.", "Figuratif, mengandung banyak makna."] },
        { questionIndex: 66, question: "Mana yang lebih sulit bagi Anda", options: ["Mendekatkan diri dengan orang lain.", "Mendayagunakan orang lain."] },
        { questionIndex: 67, question: "Anda berharap Anda lebih memiliki", options: ["Kemampuan untuk berpikir logis.", "Perasaan yang lebih halus dan peka."] },
        { questionIndex: 68, question: "Kesalahan mana yang lebih besar", options: ["Bersikap tidak membedakan orang lain.", "Bersikap kritis."] },
        { questionIndex: 69, question: "Apakah Anda lebih menyukai", options: ["Peristiwa yang sudah direncanakan.", "Peristiwa yang tidak direncanakan."] },
        { questionIndex: 70, question: "Apakah Anda cenderung lebih", options: ["Terencana.", "Spontan."] },
    ];

for (const item of data) {
    await prisma.mbtiQuestion.create({
        data: {
            questionIndex: item.questionIndex,
            question: item.question,
            options: {
                create: item.options.map((sentences, index) => ({
                    sentences: sentences,
                    optionType: index + 1
                }))
            }
        }
    })
}

}

export {mbtiSeed}