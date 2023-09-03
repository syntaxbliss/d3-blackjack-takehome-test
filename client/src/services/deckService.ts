import api from './api';
import { Card } from '../types';

export default class DeckService {
  static async createDeck(): Promise<Card[]> {
    try {
      const response = await api.post<{ deck: Card[] }>('/deck');

      return response.data.deck;
    } catch (err) {
      console.log('[DeckService @ createDeck]', err);
      throw new Error('Something went wrong...');
    }
  }
}
