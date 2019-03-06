import 'phaser';
import GameScene from '../Scenes/GameScene';

// ATTRIBUTES
var id, name, price, cooldown, img, available;

export default class Upgrade extends Phaser.GameObject {
	constructor(key, _id, _name, _price, _cooldown, _img, _available) {
		super(key);

		id = _id;
		name = _name;
		price = _price;
		cooldown = _cooldown;
		img = _img;
		available = available;

		this.show();
	}
}

// GETTER
function getId() {
	return this.id;
}
function getName() {
	return this.name;
}
function getPrice() {
	return this.price;
}
function getCooldown() {
	return this.cooldown;
}
function getImg() {
	return this.img;
}
function getAvailable() {
	return this.available;
}

// SETTER
function setId(id) {
	this.id = id;
}
function setName(name) {
	this.name = name;
}
function setPrice(price) {
	this.price = price;
}
function setCooldown(cooldown) {
	this.cooldown = cooldown;
}
function setImg(img) {
	this.img = img;
}
function setAvailable(available) {
	this.available = available;
}

// METHODS
function checkAvailable() {
	if (this.available && this.cooldown == 0) {
		return true;
	} else {
		return false;
	}
}

function show() {
	var interfaz = {
		bgScore: {
			posX,
			posY,
			xLength,
			yLength 
		},

		bgInfo: {
			posX,
			posY,
			xLength,
			yLength 
		}
	};








	var txtAbuelas = this.add.text(55, 50, "Abuelas: 0", v.TEXT_STYLE);
    txtAbuelas.setStroke('0x111111', 2);

    // END UI //
}