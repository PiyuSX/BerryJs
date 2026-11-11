import { copyFile, mkdir, readFile, writeFile, access } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"


const here = dirname(fileURLToPath(import.meta.url))
const engine = resolve(here, "..")
const args = process.argv.slice(2)
const local = args.includes("--local")
const name = args.find(arg => !arg.startsWith("-")) || "my-game"
const target = resolve(process.cwd(), name)


try {
    await access(target)
    console.error(name + "already exists")
    process.exit(1)
} catch {
    
}

await mkdir(join(target, "scenes"), { recursive: true })
await mkdir(join(target, "assets"), { recursive: true })

async function copyScene(file) {
    const source = join(engine, "examples", "basic", file)
    let text = await readFile(source, "utf8")

    text = text.replaceAll("../../src/index.js", "cherryjs")
    text = text.replaceAll("/src/assets/player-sheet.png", "/assets/player-sheet.png")

    await writeFile(join(target, "scenes", file), text)
}


await copyScene("MenuScene.js")
await copyScene("GameScene.js")

await copyFile(
    join(engine, "src", "assets", "player-sheet.png"),
    join(target, "assets", "player-sheet.png")
)

await writeFile(join(target, "main.js"), `import { Game } from 'cherryjs'
import { MenuScene } from './scenes/MenuScene.js'
import { GameScene } from './scenes/GameScene.js'

const game = new Game({
    fullscreen: true
})

game.menuScene = new MenuScene()
game.gameScene = new GameScene()

game.setScene(game.menuScene)
game.start()
`)


await writeFile(join(target, "index.html"), `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CherryJs</title>
</head>
<body>
    <script type="module" src="/main.js"></script>
 </body>
</html>
`)


const pkg = {
    name,
    private: true,
    type: "module",
    scripts: {
        dev: "vite",
        build: "vite build"
    },
    dependencies: {
        cherryjs: local ? "file:" + engine.replaceAll("\\", 
            "/") : "^0.1.0"
    },
    devDependencies: {
        vite: "^8.3.5"
    }
}


await writeFile(join(target, "package.json"), JSON.stringify(pkg, null, 2) + "\n")

console.log("Created " + name)
console.log("")
console.log("Next:")
console.log("  cd " + name)
console.log("  npm install")
console.log("  npm run dev")

