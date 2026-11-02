import { Keyboard } from "../../src/input/Keyboard.js"

const keyboard = new Keyboard()

window.keyboard = keyboard

console.log("Keyboard loaded!", window.keyboard)