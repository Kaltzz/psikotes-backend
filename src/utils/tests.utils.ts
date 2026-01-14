import { Response } from "express";

export const successResponse = (
  res: Response,
  data: any,
  message = "Success"
) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const failedResponse = (
  res: Response,
  data: any, 
  message = "Failed"
) => {
  return res.status(401).json({
    success: false,
    message,
    data 
  })
}
