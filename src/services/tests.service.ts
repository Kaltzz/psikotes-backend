import { TestsModel } from "../models/tests.model"

export const fetchTests = async () => {
  // business logic bisa ditaruh di sini
  return await TestsModel.findAll();
};
