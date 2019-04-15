import PlayerVOProxy from '../../model/PlayerVOProxy';
import BaseSceneMediator from './BaseSceneMediator';
import LobbyScene from './LobbyScene';
import PreloadScene from './PreloadScene';

export default class LobbySceneMediator extends BaseSceneMediator<LobbyScene> {
  public static NAME: string = 'LobbySceneMediator';

  constructor() {
    super(LobbySceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      PreloadScene.LOAD_COMPLETE_NOTIFICATION,
      PlayerVOProxy.INITIALIZE_SUCCESS,
    );
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case PreloadScene.LOAD_COMPLETE_NOTIFICATION:
        this.game.scene.start(LobbyScene.NAME);
        break;

      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }

  protected setView(): void {
    const lobbyScene: LobbyScene = new LobbyScene();
    this.scene.add(LobbyScene.NAME, lobbyScene);
    this.setViewComponent(lobbyScene);
    super.setView();
  }

  protected setViewComponentListeners(): void {
    this.viewComponent.events.on(
      LobbyScene.PLAY_CLICKED_EVENT,
      this.sendPlayClickedNotification,
      this,
    );
  }

  private sendPlayClickedNotification(): void {
    this.viewComponent.playImage.removeInteractive();
    this.sendNotification(LobbyScene.PLAY_CLICKED_NOTIFICATION);
  }

  get playerVOProxy(): PlayerVOProxy {
    return this.facade.retrieveProxy(PlayerVOProxy.NAME);
  }
}
