# 1 Setup Bullets
 (Step 2/10)

##### 2. in `game.js`, Create `loadImage()` function to load the image for the bullets in the `preload()` function.

``` javascript
// File: code/client/src/game.js
// Copy
g.loadImage('bullets', 'bullet.png');
// End Copy
preload() {
	g.loadImage('players', 'logo.png');
	g.loadImage('grass', 'grass.png');/*[*/
	g.loadImage('bullets', 'bullet.png');/*]*/
}
```