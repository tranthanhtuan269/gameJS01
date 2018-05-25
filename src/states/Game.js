import Phaser from 'phaser'
import Brick from '../prefabs/Brick'
import Paddle from '../prefabs/Paddle'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.setUpText()
    this.setUpBricks()
    this.setUpPaddle()
  }

  setUpPaddle() {
    this.paddle = new Paddle(
      this.game,
      this.game.world.centerX,
      this.game.world.height - 100
    )

    this.game.add.existing(this.paddle)
  }

  setUpBricks() {
    this.bricks = this.game.add.group()
    this.generateBricks(this.bricks)
  }

  generateBricks(bricksGroup) {
    let rows = 5
    let columns = 15
    let xOffset = 80
    let yOffset = 45
    let brick

    for (let y = 0; y < rows; y++){
      for (var x = 0; x < columns; x++) {
        brick = new Brick(
          this.game,
          x * xOffset,
          y * yOffset
        )

        bricksGroup.add(brick)
      }
    }

    let bricksGroupWidth = ((xOffset * columns) - (xOffset - brick.width)) / 2

    bricksGroup.position.setTo(
      this.game.world.centerX - bricksGroupWidth,
      this.game.world.centerY - 250
    )
  }

  setUpText() {
    this.createText(20, 20, 'left', `Score: ${ this.game.global.score }`)
    this.createText(-20, 20, 'right', `Time: ${ this.game.global.timecount }`)
  }

  createText(xOffset, yOffset, align, text) {
    return this.game.add.text(
      xOffset, 
      yOffset, 
      text, 
      { 
        font: '18px Arial', 
        fill: '#000', 
        boundsAlignH: align 
      }
    ).setTextBounds(0, 0, this.game.world.width, 0)
  }

  render() {

  }
}
