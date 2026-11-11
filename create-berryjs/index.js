#!/usr/bin/env node
import { cp, mkdir, writeFile, access } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"


const here = dirname(fileURLToPath(import.meta.url))
const template = join(here, "template")
const engine = resolve(here, "..")
const args = process.argv.slice(2)
const local = args.includes("--local")
const name = args.find(arg => !arg.startsWith("-")) || "my-game"
const target = resolve(process.cwd(), name)

try {
    await access(target)
    console.error(name + " already exists")
    process.exit(1)
} catch {
    
}

await mkdir(target, { recursive: true })
await cp(join(template, "scenes"), join(target, "scenes"), { recursive: true })
await cp(join(template, "public"), join(target, "public"), { recursive: true })

await writeFile(join(target, "main.js"), `import { Game } from "berryjs"
import { MenuScene } from "./scenes/MenuScene.js"
import { GameScene } from "./scenes/GameScene.js"

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
    <title>BerryJs</title>
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
        berryjs: local ? "file:" + engine.replaceAll("\\", "/") : "^0.1.0"
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