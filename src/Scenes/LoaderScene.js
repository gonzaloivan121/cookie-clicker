import 'phaser';
import MenuScene from './MenuScene';
import v from '../Utilities/Variables';

export default class Loader extends Phaser.Scene {
   constructor(key) {
      super(key);

      game.scene.add('MenuScene', MenuScene);
   }

   preload() {
      var bg = this.add.graphics();
      bg.fillStyle(0x4281A4);
      bg.fillRect(0, 0, v.WORLD_WIDTH, v.WORLD_HEIGHT);

      var progressBar = this.add.graphics();
      var progressBox = this.add.graphics();
      progressBox.fillStyle(0x48A9A6, 0.8);
      progressBox.fillRect(240, 270, 320, 50);
      
      var loadingText = this.make.text({
         x: v.WORLD_WIDTH  / 2,
         y: v.WORLD_HEIGHT / 2 - 50,
         text: 'Cargando...',
         style: {
            font: '30px monospace',
            fill: '#ffffff'
         }
      });
      loadingText.setOrigin(0.5, 0.5);

      var percentText = this.make.text({
         x: v.WORLD_WIDTH  / 2,
         y: v.WORLD_HEIGHT / 2 - 5,
         text: '0%',
         style: {
            font: '20px monospace',
            fill: '#ffffff'
         }
      });
      percentText.setOrigin(0.5, 0.5);

      var assetText = this.make.text({
         x: v.WORLD_WIDTH  / 2,
         y: v.WORLD_HEIGHT / 2 + 50,
         text: '',
         style: {
            font: '18px monospace',
            fill: '#ffffff'
         }
      });
      assetText.setOrigin(0.5, 0.5);

      // Load images
      this.load.image('cookie_cartoon', 'assets/images/cookie_cartoon.png');
      this.load.image('logo_cookie', 'assets/images/cookielogo.png');

      for (var i = 0; i < 25; i++) {
         this.load.image('test' + i, 'assets/images/cookie_cartoon.png');
      }

      for (var i = 1; i <= 3 ; i++) {
         this.load.audio('bite_' + i, 'assets/audio/bite_'+i+'.wav');
      }

      // Load audio
      this.load.audio('hover', 'assets/audio/hover.mp3');
      this.load.audio('select', 'assets/audio/select.mp3');


      // Progress functions
      this.load.on('progress', (valor) => {
         percentText.setText(parseInt(valor * 100) + '%');
         progressBar.clear();
         progressBar.fillStyle(0xffffff, 1);
         progressBar.fillRect(250, 280, 300 * valor, 30);
      });
   
      this.load.on('fileprogress', (archivo) => {
         assetText.setText('Cargando: ' + archivo.key);
      });

      this.load.on('complete', () => {
         console.log('Precarga Completa');
         progressBar.destroy();
         progressBox.destroy();
         loadingText.destroy();
         percentText.destroy();
         assetText.destroy();

         game.scene.start('MenuScene');
      });
   }
}