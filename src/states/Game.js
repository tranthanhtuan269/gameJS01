import Phaser from 'phaser'
import Brick from '../prefabs/Brick'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.setUpText()
    this.setUpBricks()
  }

  setUpBricks(){
    this.bricks = this.game.add.group()
    this.generateBricks(this.bricks)
  }

  generateBricks(bricksGroup){
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

    console.log( bricksGroupWidth)
    bricksGroup.position.setTo(
      this.game.world.centerX - bricksGroupWidth,
      this.game.world.centerY - 250
    )
    console.log(bricksGroup)
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
