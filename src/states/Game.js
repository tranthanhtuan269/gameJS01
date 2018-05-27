import Phaser from 'phaser'
// import Brick from '../prefabs/Brick'
// import Paddle from '../prefabs/Paddle'
// import Ball from '../prefabs/Ball'
import Toco from '../prefabs/Toco'
import Cherry from '../prefabs/Cherry'
import Lemon from '../prefabs/Lemon'
import Fungus from '../prefabs/Fungus'

export default class extends Phaser.State {
  constructor() {
    super()
  }

  init() { }
  preload() { }

  create() {
    this.setUpBackground()
    this.setUpToco()
    this.setUpText()
    this.setUpCherry()
    this.setUpLemons()
    this.setUpFunguses()
    this.setUpTime()
  }

  setUpTime() {
    game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
  }

  updateCounter() {
    if(this.game.global.times == 0){
      this.endGame()
    }
    this.game.global.times--;
    this.timesText.text = `Times: ${ this.game.global.times }`  
  }

  endGame() {
    this.game.state.start('Gameover')
  }

  setUpBackground() {
    let background = this.game.add.sprite(0, 0, 'tocobg')
    background.x = 0
    background.y = 0
    background.height = game.height
    background.width = game.width
    background.smoothed = false
  }

  setUpCherry() {
    this.cherrys = this.game.add.group()
    this.generateCherrys(this.cherrys)
  }

  setUpLemons() {
    this.lemons = this.game.add.group()
    this.generateLemons(this.lemons)
  }

  setUpFunguses() {
    this.funguses = this.game.add.group()
    this.generateFunguses(this.funguses)
  }

  generateFunguses(fungusesGroup) {
    let rows        = 1
    let columns     = 8
    let xRow        = 80
    let xOffset     = 120
    let yOffset     = 80
    let randomStart = 80
    let fungus

    for (let y = 0; y < rows; y++){
      for (var x = 0; x < columns; x++) {
        // y = 0, 1
        // x = 0, 1
        fungus = new Fungus(
          this.game,
          x * xOffset + xRow,
          y * yOffset + this.game.rnd.integerInRange(randomStart, 600 + randomStart)
        )

        fungus.events.onDragStop.add(function(currentSprite){
          this.stopDrag(currentSprite, this.toco);
        }, this)

        fungusesGroup.add(fungus)
      }
    }

    let fungusesGroupWidth = ((xOffset * columns) - (xOffset - fungus.width)) / 2

    fungusesGroup.position.setTo(
      this.game.world.centerX - fungusesGroupWidth,
      this.game.world.centerY - 250
    )
  }

  generateLemons(lemonsGroup) {
    let rows        = 1
    let columns     = 8
    let xRow        = 40
    let xOffset     = 120
    let yOffset     = 80
    let randomStart = 80
    let lemon

    for (let y = 0; y < rows; y++){
      for (var x = 0; x < columns; x++) {
        // y = 0, 1
        // x = 0, 1
        lemon = new Lemon(
          this.game,
          x * xOffset + 40,
          y * yOffset + this.game.rnd.integerInRange(randomStart, 600 + randomStart)
        )

        lemon.events.onDragStop.add(function(currentSprite){
          this.stopDrag(currentSprite, this.toco);
        }, this)

        lemonsGroup.add(lemon)
      }
    }

    let lemonsGroupWidth = ((xOffset * columns) - (xOffset - lemon.width)) / 2

    lemonsGroup.position.setTo(
      this.game.world.centerX - lemonsGroupWidth,
      this.game.world.centerY - 250
    )
  }

  generateCherrys(cherrysGroup) {
    let rows = 1
    let columns = 8
    let xOffset = 120
    let yOffset = 80
    let randomStart = 80
    let cherry

    for (let y = 0; y < rows; y++){
      for (var x = 0; x < columns; x++) {
        // y = 0, 1
        // x = 0, 1
        cherry = new Cherry(
          this.game,
          x * xOffset,
          y * yOffset + this.game.rnd.integerInRange(randomStart, 600 + randomStart)
        )

        cherry.events.onDragStop.add(function(currentSprite){
          this.stopDrag(currentSprite, this.toco);
        }, this)

        cherrysGroup.add(cherry)
      }
    }

    let cherrysGroupWidth = ((xOffset * columns) - (xOffset - cherry.width)) / 2

    cherrysGroup.position.setTo(
      this.game.world.centerX - cherrysGroupWidth,
      this.game.world.centerY - 250
    )
  }

  stopDrag(obj, toco) {
    obj.y = this.game.rnd.integerInRange(600, 1200)
    this.game.physics.arcade.collide(
      obj,
      toco,
      this.checkHitToco,
      null,
      this
    )
  }

  checkHitToco (obj, toco) {
    console.log('drag to toco')
    switch(obj.key){
      case 'lemon':
        this.game.global.lemon++
        this.lemonText.text = `${this.game.global.lemon}`
        break
      case 'cherry':
        this.game.global.cherry++
        this.cherryText.text = `${this.game.global.cherry}`
        break
      case 'fungus':
        this.game.global.fungus++
        this.fungusText.text = `${this.game.global.fungus}`
        break
      default:
        break
    }
  }

  setUpToco() {
    this.toco = new Toco(
      this.game,
      this.game.world.width / 2 - 70,
      this.game.world.height / 2 - 100
    )

    this.game.add.existing(this.toco)
  }

  setUpText() {
    let marginLeftText = 20
    let marginTopText = 40
    let scoreWidth = 60
    let scoreHeight = 50
    let timeWidth = 160
    let timeHeight = 50

    let bmd = this.game.add.bitmapData(scoreWidth,scoreHeight);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,scoreWidth,scoreHeight);
    bmd.ctx.fillStyle = '#008fff';
    bmd.ctx.fill();
    let sprite = game.add.sprite(10, 10, bmd);

    let bmd2 = this.game.add.bitmapData(timeWidth,timeHeight);
    bmd2.ctx.beginPath();
    bmd2.ctx.rect(0,0,timeWidth,timeHeight);
    bmd2.ctx.fillStyle = '#008fff';
    bmd2.ctx.fill();
    let sprite2 = game.add.sprite(this.game.world.width / 2 - timeWidth / 2, 10, bmd2);

    let xPossition = this.game.world.width / 2 - 30
    let yPossition = this.game.world.height / 2 - 50

    this.cherryText = this.createText(xPossition, yPossition, 'left', `${ this.game.global.cherry }`)
    this.lemonText = this.createText(xPossition , yPossition + marginTopText, 'left', `${ this.game.global.lemon }`)
    this.fungusText = this.createText(xPossition, yPossition + 2 * marginTopText, 'left', `${ this.game.global.fungus }`)

    this.game.add.sprite(xPossition + marginLeftText, yPossition, 'cherry')
    this.game.add.sprite(xPossition + marginLeftText, yPossition + marginTopText, 'lemon')
    this.game.add.sprite(xPossition + marginLeftText, yPossition + 2 * marginTopText, 'fungus')

    this.game.add.sprite(40, 20, 'toco_small')
    this.tocoText = this.createText(20, 20, 'left', `${ this.game.global.toco }`)
    this.timesText = this.createText(0, 20, 'center', `Times: ${ this.game.global.times }`)
  }

  createText(xOffset, yOffset, align, text) {
    return this.game.add.text(
      xOffset, 
      yOffset, 
      text, 
      { 
        font: '26px Arial', 
        fill: '#fff', 
        boundsAlignH: align 
      }
    ).setTextBounds(0, 0, this.game.world.width, 0)
  }

  update () {
    this.checkCreateToco()
  }

  checkCreateToco() {
    let cherryNum = this.game.global.cherry
    let lemonNum = this.game.global.lemon
    let fungusNum = this.game.global.fungus
    
    if(cherryNum >= 5 && lemonNum >= 5 && fungusNum >= 2){
      this.game.global.cherry   = 0
      this.game.global.lemon    = 0
      this.game.global.fungus   = 0
      this.cherryText.text      = `${ this.game.global.cherry }`
      this.lemonText.text       = `${ this.game.global.lemon }`
      this.fungusText.text      = `${ this.game.global.fungus }`

      this.game.global.toco++
      this.tocoText.text = `${ this.game.global.toco }`
    }
  }

  render () {

  }
}
