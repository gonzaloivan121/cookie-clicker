import 'phaser';
import LoaderScene from './LoaderScene';

export default class BootScene extends Phaser.Scene {
   constructor(key) {
      super(key);

      game.scene.add('LoaderScene', LoaderScene);

      game.scene.start('LoaderScene');
   }
}