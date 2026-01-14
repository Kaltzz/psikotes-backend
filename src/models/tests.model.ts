export type Question = {
  id: number;
  imageUrl: string;
  correctAnswer: string;
  explanation: string;
};

export class TestsModel {
  static async findAll(): Promise<Question[]> {
    // sementara dummy (nanti DB PostgreSQL)
    return [
      {
        id: 1,
        imageUrl: "/assets/logoKurniawan.webp",
        correctAnswer: "A",
        explanation: "Jawaban A benar karena ...",
      },
    ];
  }
}
