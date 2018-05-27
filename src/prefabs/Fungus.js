import Phaser from 'phaser'

class Fungus extends Phaser.Sprite {
	constructor (game, x, y) {
		super(game, x, y, 'fungus')
		this.game.physics.arcade.enableBody(this)
		this.body.immovable = true
		this.anchor.setTo(0.5, 0.5)
		this.inputEnabled = true
		this.input.enableDrag(true)
		this.input.useHandCursor = true
	}

	update () {		
		this.y -= 1
		this.angle += 1
		let randomStart = 600;

		if(this.y < -100){
			this.y += this.game.rnd.integerInRange(randomStart, 600 + randomStart)
		}
	}
}

export default Fungus