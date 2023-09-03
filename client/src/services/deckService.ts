import api from './api';
import { Card } from '../types';

export default class DeckService {
  // FIXME
  static async createDeck(): Promise<Card[]> {
    try {
      const response = await api.post<{ deck: Card[] }>('/deck');

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(response.data.deck);
        }, 3000);
      });
    } catch (err) {
      console.log('[DeckService @ createDeck]', err);
      throw new Error('Something went wrong...');
    }
  }
  // static async createDeck(): Promise<Card[]> {
  //   try {
  //     const response = await api.post<{ deck: Card[] }>('/deck');

  //     return response.data.deck;
  //   } catch (err) {
  //     console.log('[DeckService @ createDeck]', err);
  //     throw new Error('Something went wrong...');
  //   }
  // }
}
