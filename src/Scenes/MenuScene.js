import 'phaser';

import GameScene from './GameScene';
import v from '../Utilities/Variables';

var mainMenu = [];
var hoverSound;
var selectSound;
var cookie;
var logo;

export default class MenuScene extends Phaser.Scene {
	constructor(key) {
		super(key);
		game.scene.add('GameScene', GameScene);
	}

	update() {
		cookie.angle += 0.25;

	}

	create() {
		hoverSound = this.sound.add('hover');
		selectSound = this.sound.add('select');
		hoverSound.volume  = 0.05;
		selectSound.volume = 0.1 ;

		var bg = this.add.graphics();
		bg.fillStyle(0x4281A4);
		bg.fillRect(0,0,v.WORLD_WIDTH,v.WORLD_HEIGHT);

		cookie = this.add.image(-200, 350, 'cookie_cartoon');
		this.tweens.add({
			targets: cookie,
			x: 800 - (800 / 4),
			duration: v.FADE_TIME,
			delay: v.FADE_DELAY,
			ease: 'Expo.easeOut'
		});

		logo = this.add.image(602, -100, 'logo_cookie');
		logo.setScale(.5);
		this.tweens.add({
			targets: logo,
			y: 100,
			duration: v.FADE_TIME,
			delay: 1000,
			ease: 'Expo.easeOut'
		});
		console.log(logo)

		mainMenu.bg = this.add.graphics();
		mainMenu.bg.fillStyle(0x333333);
		mainMenu.bg.fillRect(-v.WORLD_WIDTH / 2, 0, v.WORLD_WIDTH / 2, v.WORLD_HEIGHT);
			mainMenu.txt = [];
			mainMenu.txt[0] = this.add.text(-v.WORLD_WIDTH / 2 + v.MENU_PADDING_LEFT, v.MENU_PADDING_TOP, "Jugar", v.TEXT_STYLE);
			mainMenu.txt[1] = this.add.text(-v.WORLD_WIDTH / 2 + v.MENU_PADDING_LEFT, mainMenu.txt[0].y + v.MENU_PADDING_BOTTOM, "Ajustes",  v.TEXT_STYLE);
			mainMenu.txt[2] = this.add.text(-v.WORLD_WIDTH / 2 + v.MENU_PADDING_LEFT, mainMenu.txt[1].y + v.MENU_PADDING_BOTTOM, "Créditos", v.TEXT_STYLE);
			mainMenu.txt[3] = this.add.text(-v.WORLD_WIDTH / 2 + v.MENU_PADDING_LEFT, mainMenu.txt[2].y + v.MENU_PADDING_BOTTOM, "Extras",   v.TEXT_STYLE);
			mainMenu.txt[4] = this.add.text(-v.WORLD_WIDTH / 2 + v.MENU_PADDING_LEFT, mainMenu.txt[3].y + v.MENU_PADDING_BOTTOM, "Salir",    v.TEXT_STYLE);

		///////////// sliding background & text /////////////
		this.tweens.add({
			targets: mainMenu.bg,
			x: v.WORLD_WIDTH / 2,
			duration: v.FADE_TIME,
			delay: v.FADE_DELAY,
			ease: 'Expo.easeOut'
		});
		this.tweens.add({
			targets: mainMenu.txt,
			x:  v.MENU_PADDING_LEFT,
			duration: v.FADE_TIME,
			delay: v.FADE_DELAY,
			ease: 'Expo.easeOut'
		});

		///////////// fade-out before launching the next scene /////////////
		mainMenu.txt[0].on('pointerdown', () => {

			selectSound.play();

			this.tweens.add({
				targets: mainMenu.txt,
				x: -v.WORLD_WIDTH / 2 + v.MENU_PADDING_LEFT,
				duration: v.FADE_TIME,
				ease: 'Expo.easeIn'
			});
			this.tweens.add({
				targets: mainMenu.bg,
				x: -v.WORLD_WIDTH / 2,
				duration: v.FADE_TIME,
				onComplete: this.fadeToGame,
				ease: 'Expo.easeIn'
			});
			this.tweens.add({
				targets: logo,
				y: -100,
				duration: 1000,
				ease: 'Expo.easeIn'
			});
			this.tweens.add({
				targets: cookie,
				x: -200,
				duration: v.FADE_TIME,
				ease: 'Expo.easeIn'
			});
		}, this);

		mainMenu.txt.forEach((button) => {
			button.setInteractive(); // obligatorio para que el menú se pueda seleccionar
			
			button.on('pointerover', () => {
				console.log("Hover on: " + button.text)
				button.setStroke('0x111111', 4);
				hoverSound.play();
			}, this);

			button.on('pointerout', () => {
				console.log("Hover off: " + button.text)
				button.setStroke('0x111111', 0);
			}, this);
		});
	}


	fadeToGame() {
		game.scene.pause();
    	game.scene.start('GameScene');
		game.scene.bringToTop('GameScene');
	}
}