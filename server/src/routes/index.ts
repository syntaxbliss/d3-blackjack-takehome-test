import { Router } from 'express';
import deckRouter from './deck.routes';

const router = Router();

router.use(deckRouter);

export default router;
