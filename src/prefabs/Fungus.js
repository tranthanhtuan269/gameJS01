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
		this.alpha = 0
	}

	update () {		
		let minScale = 0.1
		let subScale = 0.003
		// this.y -= 1
		this.angle += 1

		if(this.alpha < 1){
			this.alpha += 0.02
		}

		if(this.scale.x > minScale){
			this.scale.x -= subScale
			this.scale.y -= subScale
		}else{
			this.kill();
		}

		if(this.y < -100){
			this.y += this.game.rnd.integerInRange(600, 1200)
		}
	}
}

export default Fungus