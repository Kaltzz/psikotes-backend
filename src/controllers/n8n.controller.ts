import {
  triggerN8NService,
  n8nCfitService,
  n8nKraepelinService,
  n8nDiscService,
  n8nPapikostikService,
  n8nMsdtService,
  n8nMbtiService,
  getAllCfitAnswersService,
  getAllMbtiAnswersService,
  getAllMsdtAnswersService,
  getAllPapikostickAnswersService,
  getAllDiscAnswersService,
  getAllKraepelinAnswersService,
  postPapikostickScoringService,
  postDiscScoringService,
  postMsdtScoringService,
  postMbtiScoringService,
  postKraepelinScoringService,
} from "../services/n8n.service";

export const triggerN8N = async (req: any, res: any) => {
  const pesertaId = req.params.pesertaId;
  const tests = req.body.tests;

  res.status(200).json({
    status: true,
    message: "N8N trigger initiated",
  });

  // Trigger N8N di background (non-blocking)
  triggerN8NService(Number(pesertaId), tests)
    .then((result) => {
      if (result.status) {
        // console.log(` N8N triggered for peserta ${pesertaId} dan ${result.message}`);
      } else {
        // console.error(` N8N trigger failed for peserta ${pesertaId}`);
      }
    })
    .catch((error) => {
      // console.error(` Unexpected error:`, error);
    });
};

export const n8nCfit = async (req: any, res: any) => {
  const pesertaId = req.params.pesertaId;
  const n8n = await n8nCfitService(req, res, pesertaId);

  if (!n8n.status) {
    return res.status(400).json(n8n);
  }

  return res.status(201).json(n8n);
};

export const n8nKraepelin = async (req: any, res: any) => {
  const pesertaId = req.params.pesertaId;
  const n8n = await n8nKraepelinService(req, res, pesertaId);

  if (!n8n.status) {
    return res.status(400).json(n8n);
  }

  return res.status(201).json(n8n);
};

export const n8nDisc = async (req: any, res: any) => {
  const pesertaId = req.params.pesertaId;
  const n8n = await n8nDiscService(req, res, pesertaId);

  if (!n8n.status) {
    return res.status(400).json(n8n);
  }
  return res.status(201).json(n8n);
};

export const n8nPapikostik = async (req: any, res: any) => {
  const pesertaId = req.params.pesertaId;
  const n8n = await n8nPapikostikService(req, res, pesertaId);

  if (!n8n.status) {
    return res.status(400).json(n8n);
  }

  return res.status(201).json(n8n);
};

export const n8nMsdt = async (req: any, res: any) => {
  const pesertaId = req.params.pesertaId;
  const n8n = await n8nMsdtService(req, res, pesertaId);

  if (!n8n.status) {
    return res.status(400).json(n8n);
  }

  return res.status(201).json(n8n);
};

export const n8nMbti = async (req: any, res: any) => {
  const pesertaId = req.params.pesertaId;
  const n8n = await n8nMbtiService(req, res, pesertaId);

  if (!n8n.status) {
    return res.status(400).json(n8n);
  }

  return res.status(201).json(n8n);
};

export const getAllCfitAnswers = async (req: any, res: any) => {
  const date = req.query.date;

  const answers = await getAllCfitAnswersService(date);

  if (!answers.status) {
    return res.status(400).json(answers);
  }

  return res.status(201).json(answers);
};

export const getAllKraepelinAnswers = async (req: any, res: any) => {
  const date = req.query.date;

  const answers = await getAllKraepelinAnswersService(date);

  if (!answers.status) {
    return res.status(400).json(answers);
  }

  return res.status(201).json(answers);
};

export const getAllDiscAnswers = async (req: any, res: any) => {
  const date = req.query.date;

  const answers = await getAllDiscAnswersService(date);

  if (!answers.status) {
    return res.status(400).json(answers);
  }

  return res.status(201).json(answers);
};

export const getAllPapikostickAnswers = async (req: any, res: any) => {
  const date = req.query.date;

  const answers = await getAllPapikostickAnswersService(date);

  if (!answers.status) {
    return res.status(400).json(answers);
  }

  return res.status(201).json(answers);
};

export const getAllMsdtAnswers = async (req: any, res: any) => {
  const date = req.query.date;

  const answers = await getAllMsdtAnswersService(date);

  if (!answers.status) {
    return res.status(400).json(answers);
  }

  return res.status(201).json(answers);
};

export const getAllMbtiAnswers = async (req: any, res: any) => {
  const date = req.query.date;

  const answers = await getAllMbtiAnswersService(date);

  if (!answers.status) {
    return res.status(400).json(answers);
  }

  return res.status(201).json(answers);
};

export const postPapikostickScoring = async (req: any, res: any) => {
  const score = req.body;
  const scoring = await postPapikostickScoringService(score);

  if (!scoring.status) {
    return res.status(400).json(scoring);
  }

  return res.status(201).json(scoring);
};

export const postDiscScoring = async (req: any, res: any) => {
  const score = req.body;
  const scoring = await postDiscScoringService(score);

  if (!scoring.status) {
    return res.status(400).json(scoring);
  }

  return res.status(201).json(scoring);
};

export const postMsdtScoring = async (req: any, res: any) => {
  const score = req.body;
  const scoring = await postMsdtScoringService(score);

  if (!scoring.status) {
    return res.status(400).json(scoring);
  }

  return res.status(201).json(scoring);
};

export const postMbtiScoring = async (req: any, res: any) => {
  const score = req.body;

  const scoring = await postMbtiScoringService(score);

  if (!scoring.status) {
    return res.status(400).json(scoring);
  }

  return res.status(201).json(scoring);
};

export const kraepelinScoring = async (req: any, res: any) => {
  const score = req.body;

  const scoring = await postKraepelinScoringService(score);

  if (!scoring.status) {
    return res.status(400).json(scoring);
  }

  return res.status(201).json(scoring);
};
