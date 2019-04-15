import { Atlases } from '../../assets';
import { gameConfig } from '../../constants/GameConfig';
import BaseScene from './BaseScene';

export default class LobbyScene extends BaseScene {
  public static NAME: string = 'LobbyScene';
  public static PLAY_CLICKED_EVENT: string = `PlayClickedEvent`;
  public static PLAY_CLICKED_NOTIFICATION: string = `${
    LobbyScene.NAME
  }PlayClickedNotification`;

  public bgImage: Phaser.GameObjects.Image;
  public playImage: Phaser.GameObjects.Image;

  constructor() {
    super(LobbyScene.NAME);
  }

  public create(): void {
    this.createImage();
    this.setListener();
  }

  private createImage(): void {
    //BackgroundImage
    this.bgImage = this.add.image(
      gameConfig.canvasWidth / 2,
      gameConfig.canvasHeight / 2,
      Atlases.Main.Atlas.Name,
      Atlases.Main.Atlas.Frames.Bg,
    );
    this.bgImage.setOrigin(0.5, 0.5);

    //PlayeImage
    this.playImage = this.add
      .image(
        gameConfig.canvasWidth / 2,
        gameConfig.canvasHeight / 2,
        Atlases.Main.Atlas.Name,
        Atlases.Main.Atlas.Frames.Play,
      )
      .setInteractive();
  }

  public setListener(): void {
    this.playImage.on('pointerup', this.emitPlayClickedEvent, this);
  }

  public emitPlayClickedEvent(): void {
    this.events.emit(LobbyScene.PLAY_CLICKED_EVENT);
  }
}
