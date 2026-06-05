import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const cfitSeed = async () => {
//     const totalQuestions = 13; // Total soal contoh
//     const totalOptions = 6; // Total opsi per soal
//     const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'] as const;

//     // Loop untuk setiap soal
//     for (let questionNumber = 1; questionNumber <= totalQuestions; questionNumber++) {
//         // Buat array opsi untuk soal ini
//         const options = optionLabels.slice(0, totalOptions).map((label, index) => ({
//             label: label,
//             imagePath: `/cfitImages/soal-cfit/subtest1/soal/1-soal-${questionNumber}-answers-${index + 1}.webp`
//         }));

//         // Create question dengan semua opsinya
//         await prisma.cfitQuestion.create({
//             data: {
//                 subtest: 1,
//                 order: questionNumber,
//                 isPractice: false,
//                 imagePath: `/cfitImages/soal-cfit/subtest1/soal/1-soal-${questionNumber}-question.webp`,
//                 options: {
//                     create: options
//                 }
//             }
//         });

//         console.log(`✓ Soal ${questionNumber} berhasil ditambahkan dengan ${totalOptions} opsi`);
//     }

//     console.log(`\n✓ Selesai! Total ${totalQuestions} soal dengan ${totalQuestions * totalOptions} opsi telah ditambahkan.`);
// };

const cfitSeed = async () => {
  const totalQuestions = 2;
  const optionLabels = ["A", "B", "C", "D", "E"] as const;

  for (let q = 1; q <= totalQuestions; q++) {
    const options = optionLabels.map((label, i) => ({
      label,
      imagePath: `/cfitImages/soal-cfit/subtest2/contoh/2-contoh-${q}-answers-${i + 1}.webp`,
    }));

    await prisma.cfitQuestion.create({
      data: {
        subtest: 2,
        order: q,
        isPractice: true,
        imagePath: "",
        options: {
          create: options,
        },
      },
    });

    // console.log(`✓ Subtest 2 - Soal ${q} ditambahkan`);
  }
};

export { cfitSeed };
