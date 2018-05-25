import Phaser from 'phaser'
import Brick from '../prefabs/Brick'
import Paddle from '../prefabs/Paddle'
import Ball from '../prefabs/Ball'

export default class extends Phaser.State {
  constructor() {
    super()

    this.ballOnPaddle = true
  }

  init() { }
  preload() { }

  create() {
    this.setUpText()
    this.setUpBricks()
    this.setUpPaddle()
    this.setUpBall()

    this.game.input.onDown.add(this.releaseBall, this)
  }

  releaseBall () {
    if(!this.ballOnPaddle){
      return
    }

    this.ballOnPaddle = false

    this.ball.body.velocity.x = -20
    this.ball.body.velocity.y = -300
  }

  setUpBall () {
    this.ball = new Ball(this.game)
    this.game.add.existing(this.ball)

    this.putBallOnPaddle()
  }

  putBallOnPaddle() {
    this.ballOnPaddle = true
    this.ball.reset(this.paddle.body.x, this.paddle.y - this.paddle.body.height - this.ball.body.height / 2)
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
    let rows = 1
    let columns = 1
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
    this.scoreText = this.createText(20, 20, 'left', `Score: ${ this.game.global.score }`)
    this.livesText = this.createText(0, 20, 'center', `Lives: ${ this.game.global.lives }`)
    this.levelText = this.createText(-20, 20, 'right', `Level: ${ this.game.global.level }`)
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

  update () {
    if(this.ballOnPaddle){
      this.ball.body.x = this.paddle.x - (this.ball.width / 2)
    }

    this.game.physics.arcade.collide(
      this.ball,
      this.paddle,
      this.ballHitPaddle,
      null,
      this
    )

    this.game.physics.arcade.collide(
      this.ball,
      this.bricks,
      this.ballHitBrick,
      null,
      this
    )
  }

  ballHitPaddle (ball, paddle) {
    let diff = 0

    if(ball.x < paddle.x){
      diff = paddle.x - ball.x
      ball.body.velocity.x = (-10 * diff)
      return
    }

    if(ball.x > paddle.x){
      diff = ball.x - paddle.x
      ball.body.velocity.x = (10 * diff)
      return
    }
  }

  ballHitBrick (ball, brick) {
    brick.kill()

    this.game.global.score += 10
    this.scoreText.text = `Score: ${ this.game.global.score }`

    if(this.bricks.countLiving() > 0){
      return
    }

    this.game.global.level += 1
    this.levelText.text = `Level: ${ this.game.global.level }`    

    this.putBallOnPaddle()
    this.generateBricks(this.bricks)
  }

  render () {

  }
}
