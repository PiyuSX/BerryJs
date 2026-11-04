import { Game } from '../../src/index.js'
import { MenuScene } from './MenuScene.js'
import { GameScene } from './GameScene.js'

const game = new Game({
    width: 800,
    height: 600
})

game.menuScene = new MenuScene()
game.gameScene = new GameScene()

game.setScene(game.menuScene)

game.start()
