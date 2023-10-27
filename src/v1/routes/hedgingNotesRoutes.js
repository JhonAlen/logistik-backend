import express from 'express';
import hedgingNotesController from '../../controllers/hedgingNotesController.js';

const router = express.Router();

router

    .post("/search", hedgingNotesController.searchHedgingNotes)
    .post("/detail", hedgingNotesController.detailHedgingNotes)

export default router;