import { Atlases } from '../../../assets';
import { gameConfig } from '../../../constants/GameConfig';
import GameScene from '../../scenes/GameScene';

const speed: number = 10;
export default class Ball extends Phaser.GameObjects.Sprite {
  public speedX: number;
  public speedY: number;
  constructor(protected scene: GameScene) {
    super(scene, 0, 0, Atlases.Main.Atlas.Name, Atlases.Main.Atlas.Frames.Ball);
    this.setScale(0.5);
  }
  public reactByY(): void {
    this.y -= this.speedY;
    this.speedY *= -1;
  }

  public reactByX(): void {
    this.x -= this.speedX;
    this.speedX *= -1;
  }

  public startMovement(angle: number): void {
    this.speedX = speed * Math.cos(angle);
    this.speedY = speed * Math.sin(angle);
  }

  public update(): void {
    if (!this.speedX || !this.speedY) {
      return;
    }
    if (
      this.x + this.displayWidth / 2 + this.speedX >= gameConfig.canvasWidth ||
      this.x - this.displayWidth / 2 + this.speedX <= 0
    ) {
      this.reactByX();
    }
    if (
      this.y + this.displayHeight / 2 + this.speedY >=
        gameConfig.canvasHeight ||
      this.y - this.displayHeight / 2 + this.speedY <= 0
    ) {
      this.reactByY();
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }

  get shape(): Phaser.Geom.Rectangle {
    return new Phaser.Geom.Rectangle(
      this.x - this.displayWidth / 2,
      this.y - this.displayHeight / 2,
      this.displayWidth,
      this.displayHeight,
    );
  }
}
