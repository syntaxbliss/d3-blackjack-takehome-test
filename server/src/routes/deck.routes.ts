import { Router } from 'express';
import DeckController from '../controllers/deck.controller';

const deckRouter = Router();
const baseUrl = '/deck';

deckRouter.post(baseUrl, DeckController.createDeck);

export default deckRouter;
