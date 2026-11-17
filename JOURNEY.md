# BerryJS — Development Journey

> A look behind the scenes at building a beginner-friendly 2D JavaScript game engine, from the first ideas to publishing the packages on npm.

BerryJS started as an idea: make a small 2D game engine that helps beginners get started without having to build every basic system themselves. I wanted people to be able to make their own games, experiment, and eventually build things like a simple platformer — or even a tiny 2D Minecraft.

This document follows the actual development process: the features I added, the bugs I ran into, the tests I wrote, and the decisions that shaped the engine.

---

## 1. Starting the engine

The first step was deciding what should go into the first version. I spent time thinking about the features a beginner would need and how the engine should be structured.

I started building the basic game foundation and worked on getting images to appear as characters. Even this early stage involved debugging a few silly mistakes. Once images were rendering, the next goal was to let players control those characters with the keyboard.

![Early BerryJS development](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793598459580.png)

I then continued improving how images appeared in the game and started preparing the engine for keyboard controls.

![Sprite rendering progress](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793602947174.png)

## 2. Collision detection

After getting the basic character rendering working, I moved on to collision detection. I created a system that could detect when two actors overlap, then wrote tests to check that behaviour.

There were quite a few errors along the way, but I worked through them and got the first collision system working. The next step was to improve it and add basic physics.

![Collision detection progress](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793626621977.png)

![Collision testing](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793626629662.png)

## 3. Physics and solid platforms

I integrated basic physics into the collision system. Actors could now have velocity and gravity, and solid objects could handle collisions automatically instead of requiring every game to manually check for them.

To test it, I created a player and a platform. The player could fall and land on the platform. Getting that behaviour right took debugging and some time thinking through how collisions should work.

I wanted BerryJS to be beginner-friendly, so that someone new to game development could focus more on making their game and less on rebuilding common systems.

![Physics and collision integration](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793716573060.png)

![Player landing on a platform](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793716582475.png)

## 4. Introducing scenes

As the engine grew, I needed a better way to organize a game. I created a `Scene` class to manage actors and connected it to the `Game` class. I also implemented `setScene()` so a game could switch between scenes.

After that, I added scene lifecycle methods:

- `start()` — called when a scene starts.
- `update(dt)` — called during the game loop.
- `end()` — called when a scene ends.

I connected these methods to the game so scenes would start, update, and end at the right times. I also wrote tests for scene switching, lifecycle methods, and default scene initialization. Some of the tests needed fixes related to Canvas behaviour.

The test count reached 21 passing tests after the lifecycle work, then 23 after the first platformer physics tests.

![Scene system progress](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793722927242.png)

![Scene lifecycle development](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793771242757.png)

![Scene system testing](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793771246431.png)

## 5. Turning the demo into a platformer

I continued the scene demo and turned it into a small platformer. Actors could originally only draw a sprite, which meant the platform was invisible. I added support for drawing a coloured rectangle.

My first attempt used the wrong Canvas API (`ctx.fillStyleRect`), which broke the render loop. I corrected it to use `fillStyle` and `fillRect`.

Then I added jumping. Pressing Space sets the player's vertical velocity, but only when the player is grounded. At first, I put the Space handling in `isDown()` instead of the keydown handling, and landing behaviour also needed fixing because the vertical velocity was being reset.

I added tests for jumping and landing. They failed a few times while I fixed the implementation, and the suite reached 23 passing tests.

![Platformer demo](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793801076670.png)

![Platformer development](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793801107961.png)

## 6. Camera, sprite flipping, and animation

Next, I added a camera that follows the player, keeping the character near the middle while the level moves around it.

I ran into a few issues while testing it. Movement to the right was getting trapped by a clamp, so I removed that restriction and made the platform wider. I also made the menu reset the camera and made the camera move away when the player starts.

The sprite setup caused another problem: passing `64, 64` to the `Sprite` constructor sliced the image into tiny pieces, so I only saw the character's head. Using the image without those frame dimensions fixed that particular issue. The source image also had a 1:2 aspect ratio, so I had to correct how it was drawn.

I added character flipping so the player faces the direction they move. I wrote tests for that too. At this stage, the suite reached 28 passing tests.

![Camera following the

![Camera and platformer progress](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793863717166.png)

![Character movement](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793863722263.png)

I then moved the character animations into a single sprite sheet instead of using three separate images. The sheet had five columns and four rows. The idle, walking, and jumping animations used different rows, while the run row was left unused until the player had a separate running speed.

The animation test initially failed because the test advanced time by `0.1` seconds while the animation frame time was `0.12`. I changed the frame time back to `0.1` so the test could advance to the next frame.

The walking animation also looked like the character was floating because the sprite sheet had empty space below the feet. I used `offsetY` to move the picture down without changing the collision box. The jump animation had another issue: it cycled through several poses instead of holding the raised-hands pose, so I limited the animation to the intended frame range. One hand was still clipped at the top of its cell, which I fixed using sprite bleeding.

After this work, all 29 tests were passing and the animations worked with the following camera.

![Sprite sheet animation progress](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793896133688.png)

![Animation frame setup](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793896147320.png)

![Character animation sheet](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793896164183.jpg)

I also recorded a video of the example gameplay:

[Watch the example gameplay](https://drive.google.com/file/d/1E9uLy16kWBHgn-O-VYTmcpU5pzaLT8ed/view?usp=sharing)

## 7. Sprinting, audio, and removing actors

I added character sprinting to the engine and tested it in the example game. I also added an option to introduce audio into a game and a way to remove a character or actor, which can be useful in an elimination-style game.

![Sprinting and audio feature](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1793971199818.png)

## 8. Camera boundaries, tags, one-way platforms, and fullscreen

I added camera boundaries so a following camera stops at the edges of a level. A fixed camera ignores these boundaries.

I also worked on touch detection and used it in the demo to create a coin and score system. The engine reports when actors touch; the demo decides what to do with that information. At first, the game scene went blank because `draw()` ran before `start()` had finished creating `this.player`. The coin was also positioned using the picture rather than the hitbox, so the score did not increase until I moved it. Once I fixed those issues, touching the coin removed it and increased the score to one. The test suite reached 34 passing tests.

Tags came next, so a game could find objects by a shared label instead of keeping separate references to every coin. I made a small mistake by assigning a string to a variable instead of using the actor's tag, so nothing was collected at first. After fixing it, 35 tests passed.

One-way platforms took more debugging. The player could jump up through the platform and land on it, but the character's head could pass through the platform while standing on the floor. The sprite was taller than its 64×64 collision box, so I moved the platform up and adjusted the jump velocity to `-420`. The test count reached 37 passing tests.

Finally, I added fullscreen support. With `fullscreen: true`, the game fills the browser, but the floor was still positioned at a fixed `y = 500`. I changed the level placement to use `game.height` and locked the camera vertically so the floor stays at the bottom.

![Recent camera and platformer work](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1794726949912.png)

## 9. Creating the starter CLI

I wanted it to be easier for someone to start a BerryJS game. Installing the engine alone does not create a ready-to-use game project, so I built a separate starter package: `create-berryjs`.

The first generated project had a few problems: a stray backslash in a script, a missing quote in `index.html`, and a folder reference that said `scene` instead of `scenes`. After fixing those, the generated game ran.

I also had to make sure the starter would work after being published. It originally read files from the engine's development folder, which would not be available to someone installing the package. I moved the example project into `create-berryjs/template` and put the image in `public/assets`.

## 10. The CherryJS rename and npm publishing

One of the more stressful moments came when I checked the package names. The name `cherryjs` was already taken. I tried several names and was worried that I would not find a good one.

Eventually, I chose **BerryJS**. I checked the names and got `berryjs-core`, along with the package names `berryjs` and `create-berryjs` for the engine and starter workflow.

I published the npm packages:

- [`berryjs`](https://www.npmjs.com/package/berryjs) — the game engine.
- [`create-berryjs`](https://www.npmjs.com/package/create-berryjs) — the starter tool for creating a game project.

The project now has the engine, a fullscreen demo, and the starter template in the repository. I also wrote the GitHub README.

![README and repository progress](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1794410735829.png)

![BerryJS project progress](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1794410759008.png)

![BerryJS project screenshot](https://cdn.piyushrajbanshi.com.np/Berry-Js/journal-1794410770327.png)

## 11. Current status

At the time of this update:

- The BerryJS engine is in the repository.
- The fullscreen example game is in the repository.
- The `create-berryjs` starter template is included.
- The GitHub README has been written.
- The `berryjs` and `create-berryjs` npm packages have been published.
- The last test run I had confirmed 37 passing tests. I have not rerun the tests since the rename, so that result still needs to be verified against the renamed project.

## 12. What's next

BerryJS has come a long way from its first sprite-rendering experiments. I want to keep improving the engine, make the starter experience reliable, and make it easier for beginners to build their own 2D games.

There will definitely be more bugs to fix and more things to learn. That's part of building an engine from scratch — and this is the record of that process.

---

*Built through experimentation, debugging, testing, and a lot of stubbornness.*
