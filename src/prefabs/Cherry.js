import Phaser from 'phaser'

class Cherry extends Phaser.Sprite {
	constructor (game, x, y) {
		super(game, x, y, 'cherry')
		this.game.physics.arcade.enableBody(this)
		this.body.immovable = true
		this.anchor.setTo(0.5, 0.5)
		this.inputEnabled = true
		this.input.enableDrag(true)
		this.input.useHandCursor = true
	}

	update () {		
		this.y -= 1
		// this.rotation += 0.05
		this.angle += 1

		if(this.y < -100){
			this.y += this.game.rnd.integerInRange(600, 1200)
		}
	}
}

export default Cherry