import Phaser from 'phaser'

class Toco extends Phaser.Sprite {
	constructor (game, x, y) {
		super(game, x, y, 'toco')

		this.game.physics.arcade.enableBody(this)

		this.body.immovable = true
	}
}

export default Toco