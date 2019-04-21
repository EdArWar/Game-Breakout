import GameVOProxy from '../../model/GameVOProxy';
import PlayerVOProxy from '../../model/PlayerVOProxy';
import BaseSceneMediator from './BaseSceneMediator';
import GameScene from './GameScene';
import LobbyScene from './LobbyScene';

export default class GameSceneMediator extends BaseSceneMediator<GameScene> {
  public static NAME: string = 'GameSceneMediator';

  constructor() {
    super(GameSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      PlayerVOProxy.INITIALIZE_SUCCESS,
      GameVOProxy.CHENGE_SCORE_NOTIFICATION,
      LobbyScene.PLAY_CLICKED_NOTIFICATION,
    );
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case LobbyScene.PLAY_CLICKED_NOTIFICATION:
        this.game.scene.start(GameScene.NAME);
        break;

      case GameVOProxy.CHENGE_SCORE_NOTIFICATION:
        {
          const gameVOProxy: GameVOProxy = this.facade.retrieveProxy(
            GameVOProxy.NAME,
          );

          this.viewComponent.updateText(`Score: ${gameVOProxy.vo.score}`);
        }
        break;
      default:
        console.warn(`${notificationName} is unhandled!!!`);
        break;
    }
  }

  protected setView(): void {
    const gameScene: GameScene = new GameScene();
    this.scene.add(GameScene.NAME, gameScene);
    this.setViewComponent(gameScene);
    super.setView();
  }

  protected setViewComponentListeners(): void {
    this.viewComponent.events.on(
      GameScene.BALL_COLLISION_BLOK_EVENT,
      this.sendBallCollisionBlokNotification,
      this,
    );

    this.viewComponent.events.on(
      GameScene.GAME_OVER_EVENT,
      this.sendGameOverNotification,
      this,
    );

    this.viewComponent.events.on(
      GameScene.GAME_OVER_EVENT,
      this.stopGameScene,
      this,
    );
  }

  private sendGameOverNotification(): void {
    this.sendNotification(GameScene.GAME_OVER_NOTIFICATION);
  }

  private sendBallCollisionBlokNotification(): void {
    this.sendNotification(GameScene.BALL_COLLISION_BLOK_NOTIFICATION);
  }

  private stopGameScene(): void {
    this.game.scene.stop(GameScene.NAME);
  }

  get playerVOProxy(): PlayerVOProxy {
    return this.facade.retrieveProxy(PlayerVOProxy.NAME);
  }
}
