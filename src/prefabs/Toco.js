import Phaser from 'phaser'

class Toco extends Phaser.Sprite {
	constructor (game, x, y) {
		super(game, x, y, 'toco')

		this.game.physics.arcade.enableBody(this)
		this.anchor.setTo(0.5, 0.5)

		this.body.immovable = true
	}
}

export default Toco