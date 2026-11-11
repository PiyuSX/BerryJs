import { Game } from '../../src/index.js'
import { MenuScene } from './MenuScene.js'
import { GameScene } from './GameScene.js'

const game = new Game({
    fullscreen: true
})

game.menuScene = new MenuScene()
game.gameScene = new GameScene()

game.setScene(game.menuScene)

game.start()
