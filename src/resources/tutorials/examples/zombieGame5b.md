# 1 Add a Health Bar
 (Step 2/3)

##### 2. In `room.js`, Create a `handleCollision()` function inside the `onUpdate()` function so that our health bar will update when we collide with zombies.

``` javascript
// File: code/server/rooms/room.js
// Copy
g.handleCollision('players', 'zombies', (player) => {
	if (player.healthBar.filled > 0) {
		player.healthBar.filled -= 0.1;
	}
});
// End Copy
onUpdate(dt) {
	g.follow('players', 'zombies', 1, 0.1);/*[*/
	g.handleCollision('players', 'zombies', (player) => {
	if (player.healthBar.filled > 0) {
		player.healthBar.filled -= 0.1;
	}
});/*]*/
}

```