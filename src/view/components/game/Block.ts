import GameScene from '../../scenes/GameScene';

export default class Block extends Phaser.GameObjects.Container {
  private backgroundGraphics: Phaser.GameObjects.Graphics;
  private text: Phaser.GameObjects.Text;
  constructor(protected scene: GameScene, public value: number) {
    super(scene);
    this.createBody();
  }

  public preDestroy(): void {
    this.scene.events.emit('blockDestroyed', this);
    super.preDestroy();
  }

  public decreaseValue(): void {
    this.value--;
    if (this.value <= 0) {
      return this.destroy();
    }
    this.text.setText(`${this.value}`);
  }

  private createBody(): void {
    this.setSize(40, 40);
    this.createBackground();
    this.createText();
  }

  private createBackground(): void {
    this.backgroundGraphics = this.scene.make.graphics({});
    this.add(this.backgroundGraphics);
    this.backgroundGraphics.fillStyle(0xff0000);
    this.backgroundGraphics.lineStyle(2, 0x000000);
    this.backgroundGraphics.fillRectShape(this.shape);
    this.backgroundGraphics.strokeRectShape(this.shape);
  }

  private createText(): void {
    this.text = this.scene.make.text({
      x: 0,
      y: 0,
      text: `${this.value}`,
    });
    this.text.setOrigin(0.5);
    this.add(this.text);
  }

  get shape(): Phaser.Geom.Rectangle {
    return new Phaser.Geom.Rectangle(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height,
    );
  }
}
