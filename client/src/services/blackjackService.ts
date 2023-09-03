import { Card, Participant } from '../types';

export default class BlackjackService {
  static calculateScore(hand: Card[]): number {
    let score = 0;

    hand.forEach(card => {
      if (card.number > 10) {
        score += 10;
      } else if (card.number >= 2) {
        score += card.number;
      } else {
        if (score + 11 > 21) {
          score += 1;
        } else {
          score += 11;
        }
      }
    });

    return score;
  }

  static getWinner(dealerHand: Card[], playerHand: Card[]): Participant | null {
    const dealerScore = this.calculateScore(dealerHand);
    const playerScore = this.calculateScore(playerHand);
    const dealerBusted = dealerScore > 21;
    const playerBusted = playerScore > 21;

    if (dealerBusted && playerBusted) {
      return null;
    } else if (dealerBusted && !playerBusted) {
      return Participant.PLAYER;
    } else if (!dealerBusted && playerBusted) {
      return Participant.DEALER;
    }

    if (dealerScore > playerScore) {
      return Participant.DEALER;
    } else if (playerScore > dealerScore) {
      return Participant.PLAYER;
    }

    return null;
  }
}
