// Kunci jawaban CFIT per subtest
const answerKey: Record<number, Record<number, string[]>> = {
    1: { // Subtest 1 - 13 soal
        1: ["B"],
        2: ["C"],
        3: ["B"],
        4: ["D"],
        5: ["E"],
        6: ["B"],
        7: ["D"],
        8: ["B"],
        9: ["F"],
        10: ["C"],
        11: ["B"],
        12: ["B"],
        13: ["E"],
    },
    2: { // Subtest 2 - 14 soal (2 jawaban)
        1: ["B", "E"],
        2: ["A", "E"],
        3: ["A", "D"],
        4: ["C", "E"],
        5: ["B", "E"],
        6: ["A", "D"],
        7: ["B", "E"],
        8: ["B", "E"],
        9: ["A", "D"],
        10: ["B", "D"],
        11: ["A", "E"],
        12: ["C", "D"],
        13: ["B", "C"],
        14: ["A", "B"],
    },
    3: { // Subtest 3 - 13 soal
        1: ["E"],
        2: ["E"],
        3: ["E"],
        4: ["B"],
        5: ["C"],
        6: ["B"], // ???
        7: ["E"],
        8: ["E"],
        9: ["A"],
        10: ["A"],
        11: ["F"],
        12: ["C"],
        13: ["C"],
    },
    4: { // Subtest 4 - 10 soal
        1: ["B"],
        2: ["A"],
        3: ["D"],
        4: ["D"],
        5: ["A"],
        6: ["B"],
        7: ["C"],
        8: ["D"],
        9: ["A"],
        10: ["D"],
    }
}

export const scoringCfit = (jawabanCfit: {
    id: number
    subtest: number
    questionId: number
    answers: string[]
}[]) => {

    // Scoring per subtest
    const subtestScores: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 }

    for (const jawaban of jawabanCfit) {
        const { subtest, questionId, answers } = jawaban

        // Jawaban kosong = 0
        if (!answers || answers.length === 0) continue

        const kunci = answerKey[subtest]?.[questionId]
        if (!kunci) continue

        // Cek jawaban benar
        const isCorrect = subtest === 2
            // Subtest 2: harus 2 jawaban benar semua (order tidak penting)
            ? answers.length === kunci.length &&
              kunci.every(k => answers.includes(k))
            // Subtest 1, 3, 4: 1 jawaban
            : answers[0] === kunci[0]

        if (isCorrect) {
            if (subtestScores[subtest] === undefined) {
                subtestScores[subtest] = 0
            }
            subtestScores[subtest] += 1
        }
    }

    const totalScore = Object.values(subtestScores).reduce((a, b) => a + b, 0)

    return {
        subtestScores: {
            subtest1: subtestScores[1],
            subtest2: subtestScores[2],
            subtest3: subtestScores[3],
            subtest4: subtestScores[4],
        },
        totalScore
    }
}