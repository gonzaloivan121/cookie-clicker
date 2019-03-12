import 'phaser';
import MenuScene from './MenuScene';
import v from '../Utilities/Variables';

var hoverSound;
var selectSound;
var score = 0;
var multiplicator = 1;
var biteSound = [];
var pausa = false;
var loggedIn = false;

export default class GameScene extends Phaser.Scene {
	constructor(key) {
		super(key);
	}

	create() {
      console.log("Juego Iniciado")
      hoverSound = this.sound.add('hover');
      selectSound = this.sound.add('select');
      for (var i = 1; i <= 3; i++) {
         biteSound.push(this.sound.add('bite_' + i));
      }
      for (var i = 0; i < biteSound.length; i++) {
         biteSound[i].volume = 0.15;
      }
      hoverSound.volume      = 0.05;
      selectSound.volume     = 0.1 ;

      // FONDO DEL JUEGO
      var bg = this.createGraphic(0x00ffff, 1, 0, 0, v.WORLD_WIDTH, v.WORLD_HEIGHT);

      // UI
      var bgInfoL = this.createGraphic(0x222222, 0.25, 30, 30, 170, 350);

      var txtAbuelas = this.add.text(55, 50, "Abuelas: 0", v.TEXT_STYLE);
          txtAbuelas.setStroke('0x111111', 2);

      var bgScore = this.createGraphic(0x222222, 0.25, 200, 30, 400, 50);

      var txtScore = this.add.text(325, 42, "Galletas: " + score, v.TEXT_STYLE);
          txtScore.setStroke('0x111111', 2);

      var bgInfoR = this.createGraphic(0x222222, 0.25, 600, 30, 170, 350);

      var bgBtnAbuela     = this.createGraphic(0x222222, 0.25, 200, 460, 50, 50);
      var bgBtnHorno      = this.createGraphic(0x222222, 0.25, 270, 460, 50, 50);
      var bgBtnFamilia    = this.createGraphic(0x222222, 0.25, 340, 460, 50, 50);
      var bgBtnComunidad  = this.createGraphic(0x222222, 0.25, 410, 460, 50, 50);
      var bgBtnFabrica    = this.createGraphic(0x222222, 0.25, 480, 460, 50, 50);
      var bgBtnCiudad     = this.createGraphic(0x222222, 0.25, 550, 460, 50, 50);
      var bgBtnPais       = this.createGraphic(0x222222, 0.25, 200, 530, 50, 50);
      var bgBtnContinente = this.createGraphic(0x222222, 0.25, 270, 530, 50, 50);
      var bgBtnPlaneta    = this.createGraphic(0x222222, 0.25, 340, 530, 50, 50);
      var bgBtnSistSolar  = this.createGraphic(0x222222, 0.25, 410, 530, 50, 50);
      var bgBtnGalaxia    = this.createGraphic(0x222222, 0.25, 480, 530, 50, 50);
      var bgBtnMultiverso = this.createGraphic(0x222222, 0.25, 550, 530, 50, 50);


      // AÑADE LA GALLETA
      var cookie = this.add.image(800 / 2, 600 / 2, 'cookie_cartoon');
      cookie.setInteractive();

      cookie.on('pointerover', () => {
         cookie.setScale(1.1);
      }, this);

      cookie.on('pointerout', () => {
         cookie.setScale(1);
      }, this);


      cookie.on('pointerdown', () => {
         cookie.setScale(1.15);
         var r = Math.floor((Math.random() * 2));
         biteSound[r].play();
         score++;

         var authInstance = gapi.auth2.getAuthInstance();

         if (authInstance.isSignedIn.Ab) {
            gapi.client.load("games", "v1", (response) => {

               if (score == 100) {
                  alert('¡Has desbloqueado el logro: "100 Cookies"!');

                  var request = gapi.client.games.achievements
                  .unlock({
                     achievementId: "CgkIq7HH3dgBEAIQAQ"
                  });

                  request.execute(function(response) {
                     console.log(response)
                  })
               }

               if (score == 250) {
                  alert('¡Has desbloqueado el logro: "250 Cookies"!');

                  var request = gapi.client.games.achievements
                  .unlock({
                     achievementId: "CgkIq7HH3dgBEAIQAg"
                  });

                  request.execute(function(response) {
                     console.log(response)
                  })
               }

               if (score == 500) {
                  alert('¡Has desbloqueado el logro: "500 Cookies"!');

                  var request = gapi.client.games.achievements
                  .unlock({
                     achievementId: "CgkIq7HH3dgBEAIQAw"
                  });

                  request.execute(function(response) {
                     console.log(response)
                  })
               }

               if (score == 1000) {
                  alert('¡Has desbloqueado el logro: "1000 Cookies"!');

                  var request = gapi.client.games.achievements
                  .unlock({
                     achievementId: "CgkIq7HH3dgBEAIQBA"
                  });

                  request.execute(function(response) {
                     console.log(response)
                  })
               }

            });
         }

         txtScore.setText("Galletas: " + score);
      }, this);

      cookie.on('pointerup', () => {
         cookie.setScale(1.1);
      }, this);

      // PAUSA
      var fondoPausa = this.createGraphic(0x222222, 0.25, 33, v.WORLD_HEIGHT - 50, 100, 30);

      var textoPausa = this.add.text(50, v.WORLD_HEIGHT - 50, "Pausa", v.TEXT_STYLE);
		    textoPausa.setStroke('0x111111', 2);
		    textoPausa.setInteractive();

      var fadeScreen = this.createGraphic(v.FADE_COLOR, 1, 0, 0, v.WORLD_WIDTH, v.WORLD_HEIGHT);

      ///////////// animación fade-in /////////////
      this.tweens.add({
         targets: fadeScreen,
         alpha:  0,
         duration: v.FADE_TIME,
			delay: v.FADE_DELAY,
         ease: 'Linear'
      });

      ///////////// fade-out antes de arrancar la siguiente escena /////////////

      textoPausa.on('pointerover', () => {
         hoverSound.play();

         textoPausa.setStroke('0x111111', 4);
      }, this);

      textoPausa.on('pointerout', () => {
         textoPausa.setStroke('0x111111', 2);
      }, this);

      textoPausa.on('pointerdown', () => {
         selectSound.play();

         this.tweens.add({
            targets: fadeScreen,
            alpha:  1,
            duration: v.FADE_TIME,
            onComplete: this.fadeToMenu,
            ease: 'Linear'
         });
      }, this);

	}

   createGraphic(color, alpha, posX, posY, x, y) {
      var graphic = this.add.graphics();
          graphic.fillStyle(color, alpha);
          graphic.fillRect(posX, posY, x, y);

      return graphic;
   }

	fadeToMenu() {
      if (pausa) {
         game.scene.pause();
         game.scene.bringToTop('MenuScene');
      } else {
         game.scene.pause();
         game.scene.start('MenuScene');
         game.scene.bringToTop('MenuScene');
      }
	}

}