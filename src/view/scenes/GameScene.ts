import { Atlases } from '../../assets';
import { gameConfig } from '../../constants/GameConfig';
import BaseScene from './BaseScene';

export default class GameScene extends BaseScene {
  public static NAME: string = 'GameScene';
  public static BALL_COLLISION_BLOK_EVENT: string = `BallCollisionBlokEvent`;
  public static BALL_COLLISION_BLOK_NOTIFICATION: string = `${
    GameScene.NAME
  }BallCollisionBlokNotification`;
  public bgImage: Phaser.GameObjects.Image;
  public scoreText: Phaser.GameObjects.Text;
  public ball: Phaser.Physics.Arcade.Image;
  public paddle: Phaser.Physics.Arcade.Image;
  public collisionSound: Phaser.Sound.BaseSound;
  public blocks: any;
  public newBrick: any;

  constructor() {
    super(GameScene.NAME);
  }

  public preload(): void {
    this.load.audio('collisionSound', 'assets/audios/game.mp3');
  }

  public create(): void {
    this.createBGImage();
    this.createText();
    this.createSound();
    this.createBall();
    this.createPaddle();
    this.createBlocks();
  }

  public createSound(): void {
    this.collisionSound = this.sound.add('collisionSound');
  }
  public createBGImage(): void {
    this.bgImage = this.add.image(
      gameConfig.canvasWidth / 2,
      gameConfig.canvasHeight / 2,
      Atlases.Main.Atlas.Name,
      Atlases.Main.Atlas.Frames.Bg,
    );
  }

  public createText(): void {
    this.scoreText = this.add.text(gameConfig.canvasWidth / 2, 30, 'Score: 0', {
      font: '32px Arial',
      fill: '#0095DD',
    });

    this.scoreText.setOrigin(0.5, 0);
  }

  public updateText(text: string) {
    this.scoreText.setText(text);
  }

  public createBall(): void {
    this.ball = this.physics.add.image(
      gameConfig.canvasWidth / 2,
      gameConfig.canvasHeight - 60,
      Atlases.Main.Atlas.Name,
      Atlases.Main.Atlas.Frames.Ball,
    );

    this.ball.setOrigin(0.5, 0.5);

    //sharjvel X Y
    this.ball.setVelocity(500, -500);
    //pater@ chanachel
    this.ball.setCollideWorldBounds(true);
    //otbit linel
    this.ball.setBounce(1);
  }

  public createPaddle(): void {
    this.paddle = this.physics.add.image(
      gameConfig.canvasWidth / 2,
      gameConfig.canvasHeight,
      Atlases.Main.Atlas.Name,
      Atlases.Main.Atlas.Frames.Paddle,
    );
    this.paddle.setOrigin(0.5, 1);
    this.paddle.setScale(0.4, 0.3);
    //vor shariki kpnelu paddle chsharjvi
    this.paddle.setImmovable(true);
  }

  public createBlocks(): void {
    let brickInfo = {
      width: 70,
      height: 1,
      count: {
        row: 3,
        col: 5,
      },
      offset: {
        top: 120,
        left: 70,
      },
      padding: 30,
    };

    this.blocks = this.add.group();
    for (let i = 0; i < brickInfo.count.col; i++) {
      for (let ii = 0; ii < brickInfo.count.row; ii++) {
        var brickX =
          i * (brickInfo.width + brickInfo.padding) + brickInfo.offset.left;
        var brickY =
          ii * (brickInfo.height + brickInfo.padding) + brickInfo.offset.top;
        this.newBrick = this.physics.add.sprite(
          brickX,
          brickY,
          Atlases.Main.Atlas.Name,
          Atlases.Main.Atlas.Frames.Block,
        );
        this.newBrick.body.immovable = true;
        this.newBrick.setOrigin(0.5, 0.5);
        this.newBrick.setScale(0.2, 0.2);
        this.blocks.add(this.newBrick);
      }
    }
  }

  public update() {
    this.physics.collide(this.ball, this.paddle);
    //vor xaxi skzbic lini paddl@ mechtexum
    this.paddle.x = this.input.x || gameConfig.canvasWidth / 2;

    // if (this.ball.y >= gameConfig.canvasHeight - 40) {
    //   this.ball.setCollideWorldBounds(false);

    //   location.reload();
    // }

    //обнаружение столкновений между мячом и кубиками
    this.physics.collide(
      this.ball,
      this.blocks,
      this.ballHitBrick,
      this.emitSceneClickedEvent,
      this,
    );
  }

  public count: number = 0;
  public ballHitBrick(ball: any, block: any): void {
    this.collisionSound.play();
    block.destroy();
  }

  public emitSceneClickedEvent(): void {
    this.events.emit(GameScene.BALL_COLLISION_BLOK_EVENT);
    console.log('EVENTS');
  }
}
