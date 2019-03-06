import 'phaser';

export default { 
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: true,
    roundPixels: true,
    physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: { y: 0 }
		}
	}/*,
    callbacks: {
        postBoot: (game) => {
            game.canvas.style.width  = "100%";
            game.canvas.style.height = "100%";
        }
    }*/
};