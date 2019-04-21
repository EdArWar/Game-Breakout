import { Atlases } from '../../assets';
import { gameConfig } from '../../constants/GameConfig';
import BaseScene from './BaseScene';

export default class GameScene extends BaseScene {
  public static NAME: string = 'GameScene';
  public static BALL_COLLISION_BLOK_EVENT: string = `BallCollisionBlokEvent`;
  public static BALL_COLLISION_BLOK_NOTIFICATION: string = `${
    GameScene.NAME
  }BallCollisionBlokNotification`;

  public static GAME_OVER_EVENT: string = `GameOverEvent`;
  public static GAME_OVER_NOTIFICATION: string = `${
    GameScene.NAME
  }GameOverNotification`;

  public bgImage: Phaser.GameObjects.Image;
  public scoreText: Phaser.GameObjects.Text;
  public ball: Phaser.Physics.Arcade.Image;
  public paddle: Phaser.Physics.Arcade.Image;
  public collisionSound: Phaser.Sound.BaseSound;
  public blocks: Phaser.GameObjects.Group;
  public newBrick: Phaser.Physics.Arcade.Sprite;

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
    //@ts-ignore
    this.ball.setCollideWorldBounds(true, true, true, false);
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

  public update(time: number, delta: number): void {
    super.update(time, delta);
    let min: number = gameConfig.canvasWidth / 4;
    console.warn('gmpac');

    this.physics.collide(this.ball, this.paddle);
    //vor xaxi skzbic lini paddl@ mechtexum
    if (this.input.x <= min) {
      this.paddle.x = 0;
      this.paddle.setOrigin(0, 1);
      // this.paddle.setCollideWorldBounds(true);
      // this.paddle.setBounce(1);
    } else if (this.input.x > gameConfig.canvasWidth - min) {
      this.paddle.x = gameConfig.canvasWidth;
      this.paddle.setOrigin(1, 1);
    } else {
      this.paddle.x = this.input.x || gameConfig.canvasWidth / 2;
      this.paddle.setOrigin(0.5, 1);
    }

    if (this.ball.y >= gameConfig.canvasHeight - this.ball.height / 2) {
      this.events.emit(GameScene.GAME_OVER_EVENT);
      return;
    }

    //обнаружение столкновений между мячом и кубиками
    this.physics.collide(
      this.ball,
      this.blocks.getChildren(),
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
