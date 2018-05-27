import Phaser from 'phaser'
import WebFont from 'webfontloader'
import config from '../config'
import globals from './globals/index'
import { clone } from 'lodash'

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#FFFFFF'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload() {
    if (config.webfonts.length) {
      WebFont.load({
        google: {
          families: config.webfonts
        },
        active: this.fontsLoaded
      })
    }

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')

    this.load.spritesheet('loginBtn', './assets/images/button-bg.png', 100, 49)
    this.load.spritesheet('guideBtn', './assets/images/button-bg.png', 100, 49)
    this.load.spritesheet('giftBtn', './assets/images/button-bg.png', 100, 49)
    this.load.spritesheet('playBtn', './assets/images/button-bg.png', 100, 49)
    this.load.image('backgroundPopup', './assets/images/backgroundPopup.jpg')
    this.load.image('closeBtn', './assets/images/close-btn.png', 50, 50)

    this.load.image('tocobg', './assets/images/tocobg.jpg')
    this.load.image('toco', './assets/images/toco.png')
    this.load.image('toco_small', './assets/images/toco_small.png')
    this.load.image('cherry', './assets/images/cherry.png')
    this.load.image('cherry_small', './assets/images/cherry_small.png')
    this.load.image('fungus', './assets/images/fungus.png')
    this.load.image('fungus_small', './assets/images/fungus_small.png')
    this.load.image('lemon', './assets/images/lemon.png')
    this.load.image('lemon_small', './assets/images/lemon_small.png')
    this.load.image('brick', './assets/images/brick.png')
    this.load.image('paddle', './assets/images/49-Breakout-Tiles.png')
    this.load.image('ball', './assets/images/58-Breakout-Tiles.png')
  }

  create() {
    this.initGlobalVariables()
  }

  initGlobalVariables() {
    this.game.global = clone(globals)
  }

  render() {
    if (config.webfonts.length && this.fontsReady) {
      this.state.start('Splash')
    }
    if (!config.webfonts.length) {
      this.state.start('Splash')
    }
  }

  fontsLoaded() {
    this.fontsReady = true
  }
}
