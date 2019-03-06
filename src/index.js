import 'phaser';
import config from './config';
import BootScene from './Scenes/BootScene';

class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('Boot', BootScene);
        this.scene.start('Boot');
    }
}

window.game = new Game();

/*function resize() {
	var w = window.innerWidth ;
	var h = window.innerHeight;
	var scale = Math.min(w / 800, h / 600);

	game.canvas.setAttribute('style',
		' -ms-transform: scale(' + scale + ');'    		 + 
		' -webkit-transform: scale3d(' + scale + ', 1);' +
		' -moz-transform: scale(' + scale + ');' 		 +
		' -o-transform: scale(' + scale + ');' 			 +
		' transform: scale(' + scale + ');' 			 +
		' transform-origin: top left;'
	);

	var width  = w / scale;
	var height = h / scale;
	game.resize(width, height);
	game.scene.scenes.forEach(scene => {
		scene.cameras.main.setViewport(0, 0, width, height);
	});
}

window.addEventListener('resize', resize);

if (game.isBooted) {
	resize();
} else {
	game.events.once('boot', resize);
}*/