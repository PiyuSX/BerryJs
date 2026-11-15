# create-berryjs

Scaffold a new [BerryJS](https://github.com/PiyuSX/BerryJs) game in seconds.

## Usage

```bash
npm create berryjs my-game
cd my-game
npm install
npm run dev
```

Open the URL shown in your terminal and the demo platformer is running.

**Demo controls:** `Enter` to start, arrow keys to move, `Shift` to run, `Space` to jump, `Esc` to return to the menu.

## What you get

```
my-game/
  index.html
  main.js              # creates the game and starts it
  scenes/
    MenuScene.js       # title screen
    GameScene.js       # the playable level, edit this to make your game
  public/
    assets/
      player-sheet.png
```

The project uses [Vite](https://vitejs.dev) and depends on the [`berryjs-engine`](https://www.npmjs.com/package/berryjs-engine) package.

## Links

- [Website](https://piyusx.github.io/berryjs-site/)
- [GitHub](https://github.com/PiyuSX/BerryJs)
- [Engine on npm](https://www.npmjs.com/package/berryjs-engine)

## License

MIT
