import Phaser from 'phaser'
import { clone } from 'lodash'
import globals from './globals/index'

export default class extends Phaser.State {
  init () {}

  preload () {
  }

  create () {
    let text = this.add.text(
        this.game.width * 0.5,
        this.game.height * 0.5,
        `Game over\n\nYou reched level ${this.game.global.level} with score ${this.game.global.score}`,
        {
          font: '24px Arial',
          fill: '#000',
          align: 'center'
        }
    )

    text.anchor.set(0.5)

    this.input.onDown.add(this.restartGame, this)
  }

  restartGame() {
    this.resetGlobalVariables()
    this.game.state.start('Game')
  }

  resetGlobalVariables() {
    this.game.global = clone(globals)
  }
}
