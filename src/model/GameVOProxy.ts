import { BaseProxy } from './BaseProxy';
import GameVO from './vo/GameVO';

export default class GameVOProxy extends BaseProxy<GameVO> {
  public static NAME: string = 'GameVOProxy';
  public static CHENGE_SCORE_NOTIFICATION: string = `${
    GameVOProxy.NAME
  }ChangeScorenotification`;
  constructor() {
    super(GameVOProxy.NAME, new GameVO());
  }

  public increaseScore(): void {
    this.vo.score++;
    this.sendNotification(GameVOProxy.CHENGE_SCORE_NOTIFICATION);
  }
}
