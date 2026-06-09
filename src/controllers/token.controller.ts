// import { fetchToken, postToken, tokenNonactive } from "../services/token.service"
import {
  getTokenService,
  addTokenService,
  nonactiveTokenService,
  getAllTokenStatusService,
  refreshTokenService,
} from "../services/token.service";

export const getToken = async (req: any, res: any) => {
  const role = req.user.role;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const status = req.query.status;

  const tokenList = await getTokenService(
    role,
    page,
    limit,
    offset,
    status,
    startDate,
    endDate,
  );

  if (!tokenList.status) {
    return res.status(400).json(tokenList);
  }

  return res.status(201).json(tokenList);
};

export const addToken = async (req: any, res: any) => {
  const role = req.user.role;
  const token = await addTokenService(req.body, res, role);
  if (!token.status) {
    return res.status(400).json(token);
  }

  return res.status(201).json(token);
};

export const nonactiveToken = async (req: any, res: any) => {
  const id = Number(req.params.id);
  const statusActive = req.body;
  const token = await nonactiveTokenService(id, res, statusActive);

  if (!token.status) {
    return res.status(400).json(token);
  }

  return res.status(201).json(token);
};

export const getAllTokenStatusController = async (req: any, res: any) => {
  const role = req.user.role;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const token = await getAllTokenStatusService(role, startDate, endDate);

  if (!token.status) {
    return res.status(400).json(token);
  }

  return res.status(201).json(token);
};

export const refreshTokenController = async (req: any, res: any) => {
  const token = await refreshTokenService();

  if (!token.status) {
    return res.status(400).json(token);
  }

  return res.status(201).json(token);
};
