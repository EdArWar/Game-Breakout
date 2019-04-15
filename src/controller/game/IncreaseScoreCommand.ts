import { SimpleCommand } from '@planet221b/pure-mvc';
import GameVOProxy from '../../model/GameVOProxy';

export default class IncreaseScoreCommand extends SimpleCommand {
  public execute(): void {
    const gameVOProxy: GameVOProxy = this.facade.retrieveProxy(
      GameVOProxy.NAME,
    );

    gameVOProxy.increaseScore();
  }
}
