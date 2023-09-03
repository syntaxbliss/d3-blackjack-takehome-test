import api from './api';
import { Card } from '../types';

export default class DeckService {
  // Belating the response 5 seconds to mimic a server delay
  static async createDeck(): Promise<Card[]> {
    try {
      const response = await api.post<{ deck: Card[] }>('/deck');

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(response.data.deck);
        }, 5000);
      });
    } catch (err) {
      console.log('[DeckService @ createDeck]', err);
      throw new Error('Something went wrong...');
    }
  }
}
