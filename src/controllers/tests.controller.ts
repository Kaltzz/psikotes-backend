import { Request, Response } from "express";
import { fetchTests } from "../services/tests.service";
import { successResponse } from "../utils/tests.utils";

export const getTests = async (req: Request, res: Response) => {
    
    const pesan = await fetchTests()
    
    return successResponse(res, pesan, 'Berhasil') 
}