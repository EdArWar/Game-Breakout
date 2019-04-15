import { SimpleCommand, SyncMacroCommand } from '@planet221b/pure-mvc';
import GameScene from '../view/scenes/GameScene';
import IncreaseScoreCommand from './game/IncreaseScoreCommand';

export default class RegisterGameCommands extends SyncMacroCommand<
  SimpleCommand
> {
  public execute(): void {
    this.facade.registerCommand(
      GameScene.BALL_COLLISION_BLOK_NOTIFICATION,
      IncreaseScoreCommand,
    );
  }
}
