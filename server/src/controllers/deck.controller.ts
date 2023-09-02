import { Request, Response } from 'express';
import _ from 'lodash';
import { Card, Suit } from '../../types';

export default class DeckController {
  static createDeck(req: Request, res: Response) {
    const suits = Object.values(Suit);
    const numbers = Array.from({ length: 13 }, (_, i) => i + 1);

    const allCards: Card[] = [];

    for (let i = 0; i < 6; i++) {
      suits.forEach(suit => {
        numbers.forEach(number => {
          const card: Card = { number, suit };

          allCards.push(card);
        });
      });
    }

    const deck = _.shuffle(allCards);

    res.json({ deck });
  }
}
